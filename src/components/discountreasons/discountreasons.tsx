"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllDiscountReasons,
  updateDiscountReason,
  deleteDiscountReason,
} from "@/lib/redux/actions/discountReasonsActions";
import { RootState, AppDispatch } from "@/lib/redux/store";
import CommonDeleteModal from "@/core/common/modal/commonDeleteModal";
import { DiscountReason } from "@/lib/redux/actions/discountReasonsActions"; // Import the type for better safety

export default function DiscountReasonsComponent() {
  const dispatch = useDispatch<AppDispatch>();

  const { discountReasons, loading } = useSelector(
    (state: RootState) => state.discountReasonsState
  );

  const [selectedReason, setSelectedReason] = useState<DiscountReason | null>(null);
  const [reasonToDelete, setReasonToDelete] = useState<DiscountReason | null>(null);

  // Fetch discount reasons from API on mount
  useEffect(() => {
    dispatch(getAllDiscountReasons());
  }, [dispatch]);

  // Confirm delete
  const handleDeleteConfirm = () => {
    if (reasonToDelete) {
      dispatch(deleteDiscountReason(reasonToDelete.id));
      setReasonToDelete(null);
    }
  };

  // Save edit
  const handleSaveEdit = () => {
    if (!selectedReason) return;
    dispatch(
      updateDiscountReason({
        id: selectedReason.id,
        data: {
          reason: selectedReason.reason,
          defaultValue: selectedReason.defaultValue, // ✅ CORRECTED
        },
      })
    );
    setSelectedReason(null);
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <h2 className="fw-bold mb-4">Discount Reasons list:</h2>

        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Discount Reasons</h5>
            <Link href="/adddiscountreason" className="btn btn-primary">
              ADD DISCOUNT REASON
            </Link>
          </div>

          <div className="card-body p-0">
            {loading && <p className="p-3">Loading...</p>}
            <table className="table mb-0">
              <thead className="table-light">
                <tr>
                  <th>Reason</th>
                  <th className="text-end">Default Value</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {discountReasons.map((item) => (
                  <tr key={item.id}>
                    <td>{item.reason}</td>
                    <td className="text-end">{item.defaultValue}</td> {/* ✅ CORRECTED */}
                    <td className="text-end">
                      <button
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={() => setSelectedReason(item)}
                      >
                        EDIT
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        data-bs-toggle="modal"
                        data-bs-target="#delete-modal"
                        onClick={() => setReasonToDelete(item)}
                      >
                        DELETE
                      </button>
                    </td>
                  </tr>
                ))}
                {discountReasons.length === 0 && !loading && (
                  <tr>
                    <td colSpan={3} className="text-center p-3">
                      No discount reasons found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {selectedReason && (
        <div
          className="modal fade show d-block"
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Discount Reason</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSelectedReason(null)}
                />
              </div>
              <div className="modal-body">
                <div className="mb-3">
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
                <div>
                  <label className="form-label">Default Value</label>
                  <input
                    type="text"
                    className="form-control"
                    value={selectedReason.defaultValue} 
                    onChange={(e) =>
                      setSelectedReason({
                        ...selectedReason,
                        defaultValue: Number(e.target.value), 
                      })
                    }
                  />
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

      {/* Delete Modal */}
      <CommonDeleteModal
        title="Delete Discount Reason"
        description={`Are you sure you want to delete "${reasonToDelete?.reason}"?`}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}