"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CustomerTypes() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [discount, setDiscount] = useState("");

  const handleBack = () => {
    router.back(); 
  };

  const handleSave = () => {
    if (!name.trim()) return;
    console.log("Saved:", { name, description, discount });
    
  };

  return (
    <div className="page-wrapper">
      <div className="content">
       <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="fw-bold mb-0">Customer Types</h4>
        </div>
        <p className="mb-3">
          No customer types have been created. Use the panel below to create a new customer type.
        </p>
       
       <div className="card">
          <div className="card-header fw-semibold">Add Customer Type</div>
          <div className="card-body">

            <div className="row mb-3 align-items-center">
              <label className="col-sm-3 col-form-label text-end">Name</label>
              <div className="col-sm-6">
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

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

            <div className="row mb-4 align-items-center">
              <label className="col-sm-3 col-form-label text-end">Discount (%)</label>
              <div className="col-sm-6">
                <input
                  type="number"
                  className="form-control"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                />
              </div>
            </div>

            <div className="d-flex justify-content-between">
              <button className="btn btn-danger" onClick={handleBack}>BACK</button>
              <button className="btn btn-success" onClick={handleSave}>SAVE</button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
