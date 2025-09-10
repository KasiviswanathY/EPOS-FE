"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { getAllstocks, deletestock } from "@/lib/redux/actions/stockActions";
import AddStockModal from "@/core/modals/inventory/addstockmodal";
import CommonFooter from "@/core/common/footer/commonFooter";
import Table from "@/core/common/pagination/datatable";
import { Edit, Trash2 } from "feather-icons-react";
import Link from "next/link";
import { Stock } from "@/core/interfaces/Stock";

export default function ManageStockComponent() {
  const dispatch = useDispatch<AppDispatch>();
  const { stockRecords, loading } = useSelector(
    (state: RootState) => state.stock
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState<Stock | undefined>(undefined);

  // delete modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Fetch all stocks on mount
  useEffect(() => {
    dispatch(getAllstocks());
  }, [dispatch]);

  const handleAdd = () => {
    setSelectedStock(undefined);
    setIsModalOpen(true);
  };

  const handleEdit = (stock: Stock) => {
    setSelectedStock(stock);
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    if (deleteId) {
      await dispatch(deletestock(deleteId));
      setIsDeleteModalOpen(false);
      setDeleteId(null);
    }
  };

  const columns = [
    {
      title: "Product",
      dataIndex: "product",
      render: (product: any) => product?.name || "-",
    },
    {
      title: "Location",
      dataIndex: "location",
      render: (location: any) => location?.name || "-",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
    },
    {
      title: "Min Level",
      dataIndex: "minStockLevel",
    },
    {
      title: "Max Level",
      dataIndex: "maxStockLevel",
    },
    {
      title: "Reorder Level",
      dataIndex: "reorderLevel",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (_: any, record: Stock) => (
        <div className="d-flex gap-2">
          <Link href="#" onClick={() => handleEdit(record)}>
            <Edit className="feather-edit" />
          </Link>
          <Link
            href="#"
            onClick={() => {
              setDeleteId(record.id);
              setIsDeleteModalOpen(true);
            }}
          >
            <Trash2 className="feather-trash-2" />
          </Link>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header d-flex justify-content-between">
            <div>
              <h4>Manage Stock</h4>
              <h6>Manage your stock</h6>
            </div>
            <div className="page-btn">
              <button className="btn btn-primary" onClick={handleAdd}>
                <i className="ti ti-circle-plus me-1"></i>
                Add Stock
              </button>
            </div>
          </div>

          <div className="card table-list-card manage-stock">
            <div className="card-body">
              {loading ? (
                <p>Loading...</p>
              ) : (
                <Table columns={columns} dataSource={stockRecords} />
              )}
            </div>
          </div>
        </div>
        <CommonFooter />
      </div>

      {/* Add/Edit Modal */}
      <AddStockModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => dispatch(getAllstocks())}
        stock={selectedStock}
      />

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="modal fade show d-block" tabIndex={-1} role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content p-3">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setIsDeleteModalOpen(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this stock record?</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setIsDeleteModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
