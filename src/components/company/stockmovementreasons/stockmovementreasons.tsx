'use client';
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import CommonDeleteModal from "@/core/common/modal/commonDeleteModal";
import {
  deleteStockMovementReason,
  getAllStockMovementReasons,
  StockMovementReason,
  updateStockMovementReason,
} from "@/lib/redux/actions/stockmovementreasonAction";

export default function StockMovementReasons() {
  const dispatch = useDispatch<AppDispatch>();
  const { stockMovementReasons, loading } = useSelector(
    (state: RootState) => state.stockmovementreasons
  );

  const [selectedReason, setSelectedReason] = useState<StockMovementReason | null>(null);
  const [reasonToDelete, setReasonToDelete] = useState<StockMovementReason | null>(null);
  const [editError, setEditError] = useState<string | null>(null);

  useEffect(() => {
    dispatch(getAllStockMovementReasons());
  }, [dispatch]);

  const handleDeleteConfirm = () => {
    if (reasonToDelete) {
      dispatch(deleteStockMovementReason(reasonToDelete.id));
      setReasonToDelete(null);
    }
  };

  const handleSaveEdit = async () => {
    if (!selectedReason) return;
    setEditError(null);

    try {
      await dispatch(
        updateStockMovementReason({
          id: selectedReason.id,
          data: { reason: selectedReason.reason }, // ✅ matches API
        })
      ).unwrap();
      setSelectedReason(null);
    } catch (err: any) {
      setEditError("Failed to update reason. The name may already exist.");
    }
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="fw-bold mb-0">Stock Movement Reasons</h4>
          <Link href="/addstockmovementreasons" className="btn btn-primary">
            ADD STOCK MOVEMENT REASONS
          </Link>
        </div>
        <div className="card">
          <div className="card-body p-0">
            <table className="table mb-0">
              <thead className="table-light">
                <tr>
                  <th className="text-start" style={{ width: "80%" }}>Description</th>
                  <th className="text-end" style={{ width: "20%" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr><td colSpan={2} className="text-center">Loading...</td></tr>
                )}
                {!loading && stockMovementReasons.map((reason) => (
                  <tr key={reason.id}>
                    <td className="text-start">{reason.reason}</td>
                    <td className="text-end">
                      <div className="d-flex justify-content-end gap-2">
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => setSelectedReason(reason)}
                        >
                          EDIT
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          data-bs-toggle="modal"
                          data-bs-target="#delete-modal"
                          onClick={() => setReasonToDelete(reason)}
                        >
                          X
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {!loading && stockMovementReasons.length === 0 && (
                  <tr><td colSpan={2} className="text-center">No reasons found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {selectedReason && (
        <div className="modal fade show d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Reason</h5>
                <button type="button" className="btn-close" onClick={() => setSelectedReason(null)} />
              </div>
              <div className="modal-body">
                {editError && <div className="alert alert-danger">{editError}</div>}
                <label className="form-label">Description</label>
                <input
                  type="text"
                  className="form-control"
                  value={selectedReason.reason}
                  onChange={(e) =>
                    setSelectedReason({
                      ...selectedReason,
                      reason: e.target.value,
                    })
                  }
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setSelectedReason(null)}>Cancel</button>
                <button type="button" className="btn btn-primary" onClick={handleSaveEdit}>Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <CommonDeleteModal
        title="Delete Stock Movement Reason"
        description={`Are you sure you want to delete "${reasonToDelete?.reason}"?`}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
