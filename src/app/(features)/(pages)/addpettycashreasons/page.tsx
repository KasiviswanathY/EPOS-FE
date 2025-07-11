"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddPettyCashReason() {
  const router = useRouter();
  const [reason, setReason] = useState("");
  const handleCancel = () => router.push("/petty-cash-reasons");

  const handleAdd = (resetAfterAdd: boolean) => {
    if (!reason.trim()) return;
    // TODO: send to API or context
    console.log("Saved Reason ➜", reason);
    if (resetAfterAdd) {
      setReason("");
    } else {
      router.push("/petty-cash-reasons");
    }
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <h2 className="fw-bold mb-4">Add Petty Cash Reasons:</h2>
        <div className="card mb-3">
          <div className="card-header fw-semibold">Guide</div>
           
        </div>
        <div className="card">
          <div className="card-header fw-semibold">Add Petty Cash Reason</div>
          <div className="card-body">

            <div className="row mb-4 align-items-center">
              <label className="col-sm-3 col-form-label text-end">Reasons</label>
              <div className="col-sm-6">
                <input
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
                <button
                  className="btn btn-success me-2"
                  onClick={() => handleAdd(true)}
                >
                  ADD ANOTHER
                </button>
                <button
                  className="btn btn-success"
                  onClick={() => handleAdd(false)}
                >
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
