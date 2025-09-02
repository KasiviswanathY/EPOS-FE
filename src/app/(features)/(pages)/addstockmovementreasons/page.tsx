'use client';
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/redux/store";
import { createStockMovementReason } from "@/lib/redux/actions/stockmovementreasonAction";

export default function AddStockMovementReason() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  // ✅ Must be "reason", not description
  const [reason, setReason] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleCancel = () => {
    router.push("/stock-movement-reasons");
  };

  // ADD button
  const handleAdd = async () => {
    if (!reason.trim()) {
      alert("Please enter a reason.");
      return;
    }
    setError(null);

    try {
      await dispatch(createStockMovementReason({ reason })).unwrap();
      router.push("/stock-movement-reasons");
    } catch (err: any) {
      const errorMessage = err.error?.error || "An unknown error occurred.";
      if (errorMessage.includes("Unique constraint failed")) {
        setError(`A reason named "${reason}" already exists.`);
      } else {
        setError("Failed to create the reason. Please try again.");
      }
    }
  };

  // ADD ANOTHER button
  const handleAddAnother = async () => {
    if (!reason.trim()) {
      alert("Please enter a reason.");
      return;
    }
    setError(null);

    try {
      await dispatch(createStockMovementReason({ reason })).unwrap();
      setReason(""); // Clear input
    } catch (err: any) {
      const errorMessage = err.error?.error || "An unknown error occurred.";
      if (errorMessage.includes("Unique constraint failed")) {
        setError(`A reason named "${reason}" already exists.`);
      } else {
        setError("Failed to create the reason. Please try again.");
      }
    }
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <h5 className="fw-bold mb-3">Stock Movements Reason</h5>
        <div className="card">
          <div className="card-header fw-semibold">Add Stock Movements Reason</div>
          <div className="card-body">
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}

            <div className="row mb-4 align-items-center">
              <label className="col-sm-3 col-form-label text-end">Reason</label>
              <div className="col-sm-6">
                <input
                  type="text"
                  className="form-control"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />
              </div>
            </div>

            <div className="d-flex justify-content-between">
              <button className="btn btn-danger" onClick={handleCancel}>
                CANCEL
              </button>
              <div>
                <button className="btn btn-success me-2" onClick={handleAddAnother}>
                  ADD ANOTHER
                </button>
                <button className="btn btn-success" onClick={handleAdd}>
                  ADD
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
