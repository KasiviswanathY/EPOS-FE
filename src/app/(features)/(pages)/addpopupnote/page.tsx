"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddPopupNote() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [showOnce, setShowOnce] = useState(false);

  return (
    <div className="page-wrapper">
      <div className="content">
        <h4 className="fw-bold mb-3">Popup Notes </h4>
        <div className="card mb-3">
          <div className="card-body">
            <p><strong>'Name'</strong> is used to identify this popup note when using the Back Office.</p>
            <p><strong>'Message'</strong> will be displayed to the user when the product is added to the current transaction on the Till.</p>
          </div>
        </div>
        <div className="card">
          <div className="card-header">Add Popup Note</div>
          <div className="card-body">
            <form>
              <div className="row mb-3">
                <label className="col-sm-2 col-form-label text-end">Name</label>
                <div className="col-sm-10">
                  <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
              </div>

              <div className="row mb-3">
                <label className="col-sm-2 col-form-label text-end">Message</label>
                <div className="col-sm-10">
                  <input type="text" className="form-control" value={message} onChange={(e) => setMessage(e.target.value)} />
                </div>
              </div>

              <div className="row mb-3">
                <label className="col-sm-2 col-form-label text-end">Show Once Per Transaction</label>
                <div className="col-sm-10">
                  <input type="checkbox" checked={showOnce} onChange={(e) => setShowOnce(e.target.checked)} />
                </div>
              </div>
            </form>
          </div>
          <div className="card-footer d-flex justify-content-between">
            <button className="btn btn-danger" onClick={() => router.back()}>
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
  );
}
