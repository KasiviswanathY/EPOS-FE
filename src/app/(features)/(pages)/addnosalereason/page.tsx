
'use client'; 
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddNoSaleReason() {
  const router = useRouter();
  const [reason, setReason] = useState("");

  const handleCancel = () => {
    router.push("/no-sale-reason");
  };

  return (
    <div className="page-wrapper">
      <div className="content">

       
        <h5 className="fw-bold mb-3">Add No Sale Reason</h5>

        <div className="card">
          <div className="card-header fw-semibold">No Sale Reason</div>
          <div className="card-body">

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
                <button className="btn btn-success me-2">ADD ANOTHER</button>
                <button className="btn btn-success">ADD</button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
