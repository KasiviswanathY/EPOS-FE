
'use client'; 
import { useRouter } from "next/navigation";

import { useState } from "react";

export default function AddDiscountReason() {
  const router = useRouter();
  const [reason, setReason] = useState("");
  const [value, setValue] = useState("");

  const handleCancel = () => {
    router.push("/discount-reasons");
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="card">
          <div className="card-header fw-bold">Add a Discount Reason</div>

          <div className="card-body">
            <div className="row mb-3 align-items-center">
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

            <div className="row mb-4 align-items-center">
              <label className="col-sm-3 col-form-label text-end">Default Value</label>
              <div className="col-sm-6">
                <input
                  type="text"
                  className="form-control"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
              </div>
            </div>

            {/* Footer Buttons */}
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
