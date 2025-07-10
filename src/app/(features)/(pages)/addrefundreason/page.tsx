'use client'; 
import { useRouter } from 'next/navigation';
import { use, useState } from "react";

export default function AddRefundReason() {
  const router = useRouter();

  const [description, setDescription] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [returnToStock, setReturnToStock] = useState(false);

  const handleCancel = () => {
    router.push("/refund-reasons");
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="fw-bold mb-0">Add a Refund Reason</h5>
          
        </div>

        <div className="card">
          <div className="card-header fw-semibold">Refund Reason</div>
          <div className="card-body">

            <div className="row mb-3 align-items-center">
              <label className="col-sm-3 col-form-label text-end">Description</label>
              <div className="col-sm-6">
                <input
                  type="text"
                  className="form-control"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>

            <div className="row mb-3 align-items-center">
              <label className="col-sm-3 col-form-label text-end">Short Description</label>
              <div className="col-sm-6">
                <input
                  type="text"
                  className="form-control"
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                />
              </div>
            </div>

            <div className="row mb-4 align-items-center">
              <label className="col-sm-3 col-form-label text-end">Return to Stock</label>
              <div className="col-sm-6 pt-1">
                <input
                  type="checkbox"
                  checked={returnToStock}
                  onChange={(e) => setReturnToStock(e.target.checked)}
                />
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <button className="btn btn-danger" onClick={handleCancel}>CANCEL</button>
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
