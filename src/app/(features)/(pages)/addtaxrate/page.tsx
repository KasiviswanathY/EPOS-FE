"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
export default function AddTaxRate() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [percentage, setPercentage] = useState("");
  const [taxCode, setTaxCode] = useState("");
  const [description, setDescription] = useState("");
  const [taxType, setTaxType] = useState("Standard");

  const handleCancel = () => router.push("/tax-rateslist");

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="fw-bold mb-0">Add a Tax Rate</h4>
        </div>
        <div className="card mb-4">
          <div className="card-body small">
            <p className="mb-1">
              On this page you can create a new tax rate. Select 'Combined' to have greater flexibility over tax charged at different locations.Once you add a new Tax Rate you will then be able to apply it to any product you like.
            </p>
          </div>
        </div>
        <div className="card">
          <div className="card-header fw-semibold">Tax Rate</div>
          <div className="card-body">
            <div className="row mb-3 align-items-center">
              <label className="col-sm-3 col-form-label text-end">Name</label>
              <div className="col-sm-6">
                <input
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div className="row mb-3 align-items-center">
              <label className="col-sm-3 col-form-label text-end">Percentage</label>
              <div className="col-sm-6">
                <input
                  type="number"
                  className="form-control"
                  value={percentage}
                  onChange={(e) => setPercentage(e.target.value)}
                />
              </div>
            </div>
            <div className="row mb-3 align-items-center">
              <label className="col-sm-3 col-form-label text-end">Tax Code</label>
              <div className="col-sm-6">
                <input
                  className="form-control"
                  value={taxCode}
                  onChange={(e) => setTaxCode(e.target.value)}
                />
              </div>
            </div>
            <div className="row mb-3 align-items-center">
              <label className="col-sm-3 col-form-label text-end">Description</label>
              <div className="col-sm-6">
                <input
                  className="form-control"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
            <div className="row mb-4 align-items-center">
              <label className="col-sm-3 col-form-label text-end">Tax Type</label>
              <div className="col-sm-6">
                <select
                  className="form-select"
                  value={taxType}
                  onChange={(e) => setTaxType(e.target.value)}
                >
                  <option value="Standard">Standard</option>
                  <option value="Combined">Combined</option>
                </select>
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
