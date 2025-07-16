'use client'; 
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function AddPayoutReason() {
  const router = useRouter();
  const [reason, setReason] = useState("");

  const handleCancel = () => router.push("/pay-out-reasons");
  const handleSave = (stay: boolean) => {
    if (!reason.trim()) return;
    console.log("New payout reason:", reason);
    stay ? setReason("") : router.push("/pay-out-reasons");
  };

  return (
    <div className="page-wrapper">
      <div className="content">

        <h2 className="fw-bold mb-4">Add Payout Reasons:</h2>
        <div className="card">
          <div className="card-header fw-semibold">Payout Reasons</div>

          <div className="card-body">

            <h6 className="mb-4">Add Payout Reason</h6>

            <div className="row mb-4 align-items-center">
              <label className="col-sm-3 col-form-label text-end">Reason</label>
              <div className="col-sm-6">
                <input
                  className="form-control"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />
              </div>
            </div>
            <div className="d-flex justify-content-between">
             <button className="btn btn-danger" onClick={handleCancel}>CANCEL</button>

              <div>
                <button
                  className="btn btn-success me-2"
                  onClick={() => handleSave(true)}
                >
                  ADD ANOTHER
                </button>
                <button
                  className="btn btn-success"
                  onClick={() => handleSave(false)}
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
