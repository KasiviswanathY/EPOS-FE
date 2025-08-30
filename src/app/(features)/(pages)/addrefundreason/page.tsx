'use client';
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/redux/store";
import { createRefundReason } from "@/lib/redux/actions/refundreasonsAction";

export default function AddRefundReason() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const [description, setDescription] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [returnToStock, setReturnToStock] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetForm = () => {
    setDescription("");
    setShortDescription("");
    setReturnToStock(false);
  };

  const handleCancel = () => {
    router.push("/refund-reasons");
  };

  const handleAdd = async () => {
    if (!description.trim() || !shortDescription.trim()) {
      alert("Please fill in both description and short description.");
      return;
    }
    setError(null);

    try {
      await dispatch(
        createRefundReason({
          description,
          shortDescription,
          returnToStock,
        })
      ).unwrap();

      router.push("/refund-reasons"); // ✅ Redirect back
    } catch (err: any) {
      const errorMessage = err.error?.error || "An unknown error occurred.";
      setError(errorMessage);
    }
  };

  const handleAddAnother = async () => {
    if (!description.trim() || !shortDescription.trim()) {
      alert("Please fill in both description and short description.");
      return;
    }
    setError(null);

    try {
      await dispatch(
        createRefundReason({
          description,
          shortDescription,
          returnToStock,
        })
      ).unwrap();

      resetForm(); // ✅ Clear form for next entry
    } catch (err: any) {
      const errorMessage = err.error?.error || "An unknown error occurred.";
      setError(errorMessage);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <h5 className="fw-bold mb-3">Add Refund Reason</h5>

        <div className="card">
          <div className="card-header fw-semibold">Refund Reason</div>
          <div className="card-body">
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}

            {/* Description */}
            <div className="row mb-3 align-items-center">
              <label className="col-sm-3 col-form-label text-end">
                Description
              </label>
              <div className="col-sm-6">
                <input
                  type="text"
                  className="form-control"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>

            {/* Short Description */}
            <div className="row mb-3 align-items-center">
              <label className="col-sm-3 col-form-label text-end">
                Short Description
              </label>
              <div className="col-sm-6">
                <input
                  type="text"
                  className="form-control"
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                />
              </div>
            </div>

            {/* Return to Stock */}
            <div className="row mb-4 align-items-center">
              <label className="col-sm-3 col-form-label text-end">
                Return to Stock
              </label>
              <div className="col-sm-6 pt-1">
                <input
                  type="checkbox"
                  checked={returnToStock}
                  onChange={(e) => setReturnToStock(e.target.checked)}
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="d-flex justify-content-between">
              <button className="btn btn-danger" onClick={handleCancel}>
                CANCEL
              </button>
              <div>
                <button
                  className="btn btn-success me-2"
                  onClick={handleAddAnother}
                >
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
