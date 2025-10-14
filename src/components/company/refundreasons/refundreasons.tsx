'use client';
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";

import CommonDeleteModal from "@/core/common/modal/commonDeleteModal";
import { deleteRefundReason, getAllRefundReasons, RefundReason, updateRefundReason } from "@/lib/redux/actions/refundreasonsAction";


export default function RefundReasonsComponent() {
  const dispatch = useDispatch<AppDispatch>();

    const refundReasonsState = useSelector((state: RootState) => state.RefundReasons);
  const refundReasons = refundReasonsState.refundReasons || [];
  const loading = refundReasonsState.loading;

  const [selectedReason, setSelectedReason] = useState<RefundReason | null>(null);
  const [reasonToDelete, setReasonToDelete] = useState<RefundReason | null>(null);
  const [editError, setEditError] = useState<string | null>(null);

  useEffect(() => {
    dispatch(getAllRefundReasons());
  }, [dispatch]);

  const handleDeleteConfirm = () => {
    if (reasonToDelete) {
      dispatch(deleteRefundReason(reasonToDelete.id));
      setReasonToDelete(null);
    }
  };

  const handleSaveEdit = async () => {
    if (!selectedReason) return;
    setEditError(null);

    try {
      await dispatch(
        updateRefundReason({
          id: selectedReason.id,
          data: {
            description: selectedReason.description,
            shortDescription: selectedReason.shortDescription,
            returnToStock: selectedReason.returnToStock,
          },
        })
      ).unwrap();
      setSelectedReason(null);
    } catch (err: any) {
      console.error("Failed to save edit:", err);
      setEditError("An error occurred while saving. Please try again.");
    }
  };

  const handleEditClick = (item: RefundReason) => {
    setEditError(null);
    setSelectedReason(item);
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="fw-bold mb-0">Refund Reasons</h4>
          <Link href="/addrefundreason" className="btn btn-primary">
            ADD REFUND REASON
          </Link>
        </div>
        <div className="card">
          <div className="card-body p-0">
            {loading && <p className="p-3 text-center">Loading...</p>}
            <table className="table mb-0">
              <thead className="table-light">
                <tr>
                  <th>Description</th>
                  <th>Short Description</th>
                  <th className="text-center">Return to Stock</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {refundReasons.map((item) => (
                  <tr key={item.id}>
                    <td>{item.description}</td>
                    <td>{item.shortDescription}</td>
                    <td className="text-center">
                      <input
                        type="checkbox"
                        checked={item.returnToStock}
                        readOnly
                      />
                    </td>
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
      {selectedReason && (
        <div
          className="modal fade show d-block"
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Refund Reason</h5>
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
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    value={selectedReason.description}
                    onChange={(e) =>
                      setSelectedReason({
                        ...selectedReason,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Short Description</label>
                  <input
                    type="text"
                    className="form-control"
                    value={selectedReason.shortDescription}
                    onChange={(e) =>
                      setSelectedReason({
                        ...selectedReason,
                        shortDescription: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="returnToStock"
                    checked={selectedReason.returnToStock}
                    onChange={(e) =>
                      setSelectedReason({
                        ...selectedReason,
                        returnToStock: e.target.checked,
                      })
                    }
                  />
                  <label
                    className="form-check-label"
                    htmlFor="returnToStock"
                  >
                    Return to Stock
                  </label>
                </div>
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
            <CommonDeleteModal
        title="Delete Refund Reason"
        description={`Are you sure you want to delete "${reasonToDelete?.description}"? This action cannot be undone.`}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}