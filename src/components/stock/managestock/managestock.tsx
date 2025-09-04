'use client';
import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import Table from "@/core/common/pagination/datatable";
import CommonFooter from "@/core/common/footer/commonFooter";
import { getAllStock } from "@/lib/redux/actions/stockAction";
import AddStockModal from "@/core/modals/inventory/addstockmodal";

const PAGE_SIZE = 10;

export default function ManageStockComponent() {
  const dispatch = useDispatch<AppDispatch>();
  const { stockRecords, loading, page, total, totalPages } = useSelector(
    (state: RootState) => state.stock
  );

  // State for modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Pagination + filters
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    category: "",
    supplier: "",
    brand: "",
  });

  useEffect(() => {
    dispatch(getAllStock({ page: currentPage, pageSize: PAGE_SIZE, ...filters }));
  }, [dispatch, currentPage, filters]);

  const handleApplyFilters = (newFilters: any) => {
    setCurrentPage(1);
    setFilters(newFilters);
  };

  const handleAddSuccess = () => {
    // refresh table after adding stock
    dispatch(getAllStock({ page: currentPage, pageSize: PAGE_SIZE, ...filters }));
  };

  // Columns
  const columns = useMemo(() => [
    { title: "Name", dataIndex: ['product', 'name'], key: 'name' },
    { title: "Category", dataIndex: ['product', 'category', 'name'], key: 'category' },
    { title: "Cost Price (exTAX)", dataIndex: ['product', 'costPrice'], key: 'costPrice', render: (val: number) => `$${val.toFixed(2)}` },
    { title: "Sale Price (exTAX)", dataIndex: ['product', 'salePrice'], key: 'salePrice', render: (val: number) => `$${val.toFixed(2)}` },
    { title: "Stock", dataIndex: 'quantity', key: 'stock' },
    { title: "Min Stock", dataIndex: 'minStockLevel', key: 'minStock' },
    { title: "Max Stock", dataIndex: 'maxStockLevel', key: 'maxStock' },
    {
      title: "",
      dataIndex: "action",
      key: 'action',
      render: (record: any) => (
        <div className="dropdown">
          <button className="btn p-0" data-bs-toggle="dropdown">
            <i className="ti ti-dots-vertical fs-5"></i>
          </button>
          <ul className="dropdown-menu">
            <li><Link className="dropdown-item" href={`/inventory/${record.id}`}>Inventory</Link></li>
            <li><Link className="dropdown-item" href={`/add-product/${record.product.id}`}>Advanced Edit</Link></li>
          </ul>
        </div>
      ),
    },
  ], []);

  // Pagination
  const handlePreviousPage = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const handleNextPage = () => setCurrentPage((p) => Math.min(p + 1, totalPages));
  const startItem = total > 0 ? (page - 1) * PAGE_SIZE + 1 : 0;
  const endItem = Math.min(page * PAGE_SIZE, total);

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="card shadow-sm border-0">
          <div className="card-header d-flex justify-content-between align-items-center flex-wrap gap-3 py-3 px-4 bg-white">
            <h5 className="mb-0">Manage Stock</h5>
            <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
              + Add Stock
            </button>
          </div>

          <div className="card-body px-0">
            <div className="table-responsive px-4">
              <Table columns={columns} dataSource={stockRecords} loading={loading} />
            </div>

            {!loading && total > 0 && (
              <div className="d-flex justify-content-between align-items-center mt-3 px-4 pb-3">
                <span className="text-muted">
                  Showing {startItem}-{endItem} of {total}
                </span>
                <div className="btn-group">
                  <button className="btn btn-outline-secondary" onClick={handlePreviousPage} disabled={page <= 1}>Previous</button>
                  <button className="btn btn-outline-secondary" onClick={handleNextPage} disabled={page >= totalPages}>Next</button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Add Stock Modal */}
        <AddStockModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)} onAddSuccess={function (): void {
            throw new Error("Function not implemented.");
          } }        />

        <CommonFooter />
      </div>
    </div>
  );
}
