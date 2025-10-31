"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { getErrorMessage } from "@/core/utils";
import Link from "next/link";
import { createStockMovementReason, deleteStockMovementReason, getAllStockMovementReasons, updateStockMovementReason } from "@/lib/redux/actions/stockmovementreasonsAction";
import { StockMovementReason } from "@/core/interfaces/StockMovementReason";

export default function StockMovementReasons() {
  const dispatch = useDispatch<AppDispatch>();
  const { stockMovementReasons, loading, error } = useSelector(
    (state: RootState) => state.stockMovementReasons
  );

  const [newReason, setNewReason] = useState("");
  const [search, setSearch] = useState("");

  // Edit modal
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [editReason, setEditReason] = useState("");

  // Delete modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    dispatch(getAllStockMovementReasons());
  }, [dispatch]);

  const handleAdd = () => {
    if (!newReason.trim()) return;
    const payload: Partial<StockMovementReason> = {
      reason: newReason,
      isActive: true,
    };
    dispatch(createStockMovementReason(payload))
      .unwrap()
      .then(() => {
        setNewReason("");
        dispatch(getAllStockMovementReasons());
      })
      .catch((err) => console.error("Error adding reason:", err));
  };

  const handleEditClick = (item: StockMovementReason) => {
    setSelectedId(item.id);
    setEditReason(item.reason);
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    if (!selectedId) return;
    const data: Partial<StockMovementReason> = {
      reason: editReason,
    };
    dispatch(updateStockMovementReason({ id: selectedId, data }))
      .unwrap()
      .then(() => {
        setShowEditModal(false);
        dispatch(getAllStockMovementReasons());
      })
      .catch((err) => console.error("Error updating:", err));
  };

  const handleDeleteClick = (id: string) => {
    setSelectedId(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (!selectedId) return;
    dispatch(deleteStockMovementReason(selectedId))
      .unwrap()
      .then(() => {
        setShowDeleteModal(false);
        dispatch(getAllStockMovementReasons());
      })
      .catch((err) => console.error("Error deleting:", err));
  };

  const filtered = (stockMovementReasons || []).filter((r) =>
    r.reason.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="fw-bold mb-0">Stock Movement Reasons</h4>
          <Link href="/addstockmovementreasons" className="btn btn-primary">
            ADD STOCK MOVEMENT REASONS
          </Link>
        </div>

        {/* Add Form */}
        <div className="card mb-4">
          <div className="card-header fw-semibold">Add Stock Movement Reason</div>
          <div className="card-body">
            {error && (
              <div className="alert alert-danger">
                <strong>Error:</strong> {getErrorMessage(error)}
              </div>
            )}
            <div className="row mb-3 align-items-center">
              <label className="col-sm-2 col-form-label text-end">reason:</label>
              <div className="col-sm-6">
                <input
                  type="text"
                  className="form-control"
                  value={newReason}
                  onChange={(e) => setNewReason(e.target.value)}
                  placeholder="Enter stock movement reason"
                />
              </div>
            </div>
            <div className="text-end">
              <button className="btn btn-success" onClick={handleAdd} disabled={loading}>
                {loading ? "Adding..." : "ADD"}
              </button>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="card mb-3">
          <div className="card-body d-flex align-items-center gap-2">
            <input
              type="text"
              placeholder="Filter by reason"
              className="form-control"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <div className="card">
          <div className="card-body p-0">
            <table className="table mb-0">
              <thead className="table-light">
                <tr>
                  <th className="text-start" style={{ width: "80%" }}>reason</th>
                  <th className="text-end" style={{ width: "20%" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={2} className="text-center p-4">
                      <div className="spinner-border spinner-border-sm me-2" role="status"></div>
                      Loading stock movement reasons...
                    </td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={2} className="text-center p-4 text-muted">
                      No stock movement reasons found.
                    </td>
                  </tr>
                ) : (
                  filtered.map((item, index) => (
                    <tr key={item.id || index}>
                      <td className="text-start align-middle">{item.reason}</td>
                      <td className="text-end align-middle">
                        <div className="d-flex justify-content-end gap-2">
                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => handleEditClick(item)}
                            disabled={loading}
                          >
                            EDIT
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDeleteClick(item.id)}
                            disabled={loading}
                          >
                            X
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Edit Modal */}
        {showEditModal && (
          <div className="modal show d-block" tabIndex={-1}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Edit Stock Movement Reason</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowEditModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <label>reason</label>
                  <input
                    className="form-control"
                    value={editReason}
                    onChange={(e) => setEditReason(e.target.value)}
                  />
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={() => setShowEditModal(false)}>
                    Cancel
                  </button>
                  <button className="btn btn-primary" onClick={handleSaveEdit} disabled={loading}>
                    {loading ? "Saving..." : "Save"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete Modal */}
        {showDeleteModal && (
          <div className="modal show d-block" tabIndex={-1}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirm Delete</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowDeleteModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  Are you sure you want to delete this stock movement reason?
                </div>
                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                    onClick={() => setShowDeleteModal(false)}
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={handleConfirmDelete}
                    disabled={loading}
                  >
                    {loading ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
