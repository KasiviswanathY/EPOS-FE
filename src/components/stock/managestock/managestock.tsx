'use client';
import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import Table from "@/core/common/pagination/datatable";
import CommonFooter from "@/core/common/footer/commonFooter";
import { deleteStock, getAllStock, Stock, updateStock } from "@/lib/redux/actions/stockActions";
import AddStockModal from "@/core/modals/inventory/addstockmodal";

const PAGE_SIZE = 10;

export default function ManageStockComponent() {
  const dispatch = useDispatch<AppDispatch>();
  const { stockRecords, loading, page, total, totalPages } = useSelector((state: RootState) => state.stock);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentStock, setCurrentStock] = useState<Stock | null>(null);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getAllStock({ page: currentPage, pageSize: PAGE_SIZE }));
  }, [dispatch, currentPage]);

  const handleAddSuccess = () => {
    dispatch(getAllStock({ page: currentPage, pageSize: PAGE_SIZE }));
  };

  const handleEditClick = (record: Stock) => {
    setCurrentStock(record);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (record: Stock) => {
    setCurrentStock(record);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (currentStock) {
      await dispatch(deleteStock(currentStock.id));
      setIsDeleteModalOpen(false);
    }
  };

  const handlePreviousPage = () => setCurrentPage(p => Math.max(p - 1, 1));
  const handleNextPage = () => setCurrentPage(p => Math.min(p + 1, totalPages));

  const columns = useMemo(() => [
    { title: "Product Name", key: 'name', render: (record: Stock) => record.product?.name || '--' },
    { title: "Location", key: 'location', render: (record: Stock) => record.location?.name || '--' },
    { title: "Quantity", key: 'quantity', dataIndex: 'quantity' },
    { title: "Min Stock", key: 'minStockLevel', dataIndex: 'minStockLevel' },
    { title: "Max Stock", key: 'maxStockLevel', dataIndex: 'maxStockLevel' },
    { title: "Reorder Level", key: 'reorderLevel', dataIndex: 'reorderLevel' },
    { title: "Actions", key: 'action', render: (record: Stock) => (
      <div className="dropdown">
        <button className="btn p-0" data-bs-toggle="dropdown">⋮</button>
        <ul className="dropdown-menu">
          <li><button className="dropdown-item" onClick={() => handleEditClick(record)}>Edit</button></li>
          <li><button className="dropdown-item text-danger" onClick={() => handleDeleteClick(record)}>Delete</button></li>
        </ul>
      </div>
    )}
  ], [stockRecords]);

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="card shadow-sm border-0">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5>Manage Stock</h5>
            <button className="btn btn-primary" onClick={() => setIsAddModalOpen(true)}>+ Add Stock</button>
          </div>
          <div className="card-body px-4">
            <Table columns={columns} dataSource={stockRecords} loading={loading} />
            {!loading && total > 0 && (
              <div className="d-flex justify-content-between mt-3">
                <span>Showing {(page-1)*PAGE_SIZE+1}-{Math.min(page*PAGE_SIZE,total)} of {total}</span>
                <div className="btn-group">
                  <button className="btn btn-outline-secondary" onClick={handlePreviousPage} disabled={page<=1}>Previous</button>
                  <button className="btn btn-outline-secondary" onClick={handleNextPage} disabled={page>=totalPages}>Next</button>
                </div>
              </div>
            )}
          </div>
        </div>

        <AddStockModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onAddSuccess={handleAddSuccess} />

        {/* Edit/Delete modals similar to previous code */}

        <CommonFooter />
      </div>
    </div>
  );
}
