'use client';
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";

import CommonDeleteModal from "@/core/common/modal/commonDeleteModal";
import { deleteNoSaleReason, getAllNoSaleReasons, NoSaleReason, updateNoSaleReason } from "@/lib/redux/actions/noSaleReasonsActions";

export default function NoSaleReasonComponent() {
  const dispatch = useDispatch<AppDispatch>();

  
  const noSaleReasons = useSelector((state: RootState) => state.noSaleReasons.noSaleReasons);
  const loading = useSelector((state: RootState) => state.noSaleReasons.loading);

  const [selectedReason, setSelectedReason] = useState<NoSaleReason | null>(null);
  const [reasonToDelete, setReasonToDelete] = useState<NoSaleReason | null>(null);
  const [editError, setEditError] = useState<string | null>(null);

  useEffect(() => {
    dispatch(getAllNoSaleReasons());
  }, [dispatch]);

  const handleDeleteConfirm = () => {
    if (reasonToDelete) {
      dispatch(deleteNoSaleReason(reasonToDelete.id));
      setReasonToDelete(null);
    }
  };

  const handleSaveEdit = async () => {
    if (!selectedReason) return;
    setEditError(null);

    try {
      await dispatch(
        updateNoSaleReason({
          id: selectedReason.id,
          data: {
            reason: selectedReason.reason,
          },
        })
      ).unwrap();
      setSelectedReason(null);
    } catch (err: any) {
      console.error("Failed to save edit:", err);
      const errorMessage = err.error?.error || "Could not save changes.";
      if (errorMessage.includes("Unique constraint failed")) {
        setEditError(`A reason named "${selectedReason.reason}" already exists.`);
      } else {
        setEditError("An error occurred while saving. Please try again.");
      }
    }
  };

  const handleEditClick = (item: NoSaleReason) => {
    setEditError(null);
    setSelectedReason(item);
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="fw-bold mb-0">No Sale Reasons</h4>
          <Link href="/addnosalereason" className="btn btn-primary">
            ADD NO SALE REASON
          </Link>
        </div>
        <div className="card">
          <div className="card-body p-0">
            {loading && <p className="p-3 text-center">Loading...</p>}
            <table className="table mb-0">
              <thead className="table-light">
                <tr>
                  <th className="text-start" style={{ width: "80%" }}>Reason</th>
                  <th className="text-end" style={{ width: "20%" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {noSaleReasons.map((item) => (
                  <tr key={item.id}>
                    <td className="text-start">{item.reason}</td>
                    <td className="text-end">
                      <div className="d-flex justify-content-end gap-2">
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => handleEditClick(item)}
                        >
                          EDIT
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          data-bs-toggle="modal"
                          data-bs-target="#delete-modal"
                          onClick={() => setReasonToDelete(item)}
                        >
                          X
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
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
                <h5 className="modal-title">Edit No Sale Reason</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSelectedReason(null)}
                />
              </div>
              <div className="modal-body">
                {editError && (
                  <div className="alert alert-danger">{editError}</div>
                )}
                <label className="form-label">Reason</label>
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
                <button
                  className="btn btn-secondary"
                  onClick={() => setSelectedReason(null)}
                >
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleSaveEdit}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <CommonDeleteModal
        title="Delete No Sale Reason"
        description={`Are you sure you want to delete "${reasonToDelete?.reason}"? This action cannot be undone.`}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}