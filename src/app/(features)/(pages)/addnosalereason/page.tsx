'use client';
import { useRouter } from "next/navigation";
import { useState } from "react";
// 1. Import Redux hooks and the create action
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/redux/store";
import { createNoSaleReason } from "@/lib/redux/actions/noSaleReasonsActions";

export default function AddNoSaleReason() {
  const router = useRouter();
  // 2. Initialize dispatch and add state for error messages
  const dispatch = useDispatch<AppDispatch>();
  const [reason, setReason] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleCancel = () => {
    router.push("/no-sale-reason");
  };

  // 3. Create the handler for the "ADD" button
  const handleAdd = async () => {
    if (!reason.trim()) {
      alert("Please enter a reason.");
      return;
    }
    setError(null); // Clear previous errors

    try {
      // Dispatch the action and wait for it to complete
      await dispatch(createNoSaleReason({ reason })).unwrap();
      router.push("/no-sale-reason"); // Redirect on success
    } catch (err: any) {
      // Catch errors and display a user-friendly message
      const errorMessage = err.error?.error || "An unknown error occurred.";
      if (errorMessage.includes("Unique constraint failed")) {
        setError(`A reason named "${reason}" already exists.`);
      } else {
        setError("Failed to create the reason. Please try again.");
      }
    }
  };

  // 4. Create the handler for the "ADD ANOTHER" button
  const handleAddAnother = async () => {
    if (!reason.trim()) {
      alert("Please enter a reason.");
      return;
    }
    setError(null);

    try {
      await dispatch(createNoSaleReason({ reason })).unwrap();
      setReason(""); // Clear the input for the next entry
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
        <h5 className="fw-bold mb-3">Add No Sale Reason</h5>
        <div className="card">
          <div className="card-header fw-semibold">No Sale Reason</div>
          <div className="card-body">
            {/* This div will display any errors returned from the API */}
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
                {/* 5. Attach the handlers to the buttons */}
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