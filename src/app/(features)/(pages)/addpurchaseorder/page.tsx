"use client";

import React, { useState } from "react";

export default function AddPurchaseOrder() {
  const [location, setLocation] = useState("");
  const [orderedBy, setOrderedBy] = useState("");

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <h4 className="fw-bold">Add Purchase Order</h4>
        </div>
        <div className="card mb-4">
          <div className="card-body">
            <form>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Expected Delivery Date</label>
                  <div className="input-group input-group-sm">
                    <input type="date" className="form-control" defaultValue="2025-07-01" />
                    <span className="input-group-text">
                      <i className="bi bi-calendar"></i>
                    </span>
                  </div>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Cancel Date</label>
                  <div className="input-group input-group-sm">
                    <input type="date" className="form-control" />
                    <span className="input-group-text">
                      <i className="bi bi-calendar"></i>
                    </span>
                  </div>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Deliver Stock To</label>
                  <select
                    className={`form-select form-select-sm ${!location ? "is-invalid" : ""}`}
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  >
                    <option value="">Location</option>
                    <option value="Warehouse A">Warehouse A</option>
                    <option value="Warehouse B">Warehouse B</option>
                  </select>
                  {!location && (
                    <div className="invalid-feedback">This field is required.</div>
                  )}
                </div>
                <div className="col-md-6">
                  <label className="form-label">Ordered By</label>
                  <select
                    className="form-select form-select-sm"
                    value={orderedBy}
                    onChange={(e) => setOrderedBy(e.target.value)}
                  >
                    <option value="">Select staff member</option>
                    <option value="John Doe">John Doe</option>
                    <option value="Jane Smith">Jane Smith</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="card mb-4">
          <div className="card-header">
            <h6 className="card-title mb-0">Supplier List</h6>
          </div>
          <div className="card-body">
            <div className="mb-3">
              <label className="form-label">Find Supplier</label>
              <div className="d-flex">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Search by Name"
                />
                <button className="btn btn-sm btn-primary ms-2">SEARCH</button>
              </div>
            </div>

            <div className="d-flex align-items-center gap-4 mb-3">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="minStock" />
                <label className="form-check-label" htmlFor="minStock">
                  Show products with less than min stock
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="stockTracked" />
                <label className="form-check-label" htmlFor="stockTracked">
                  Show all suppliers and stock tracked products
                </label>
              </div>
            </div>
            <div className="table-responsive">
              <table className="table table-bordered table-sm">
                <thead>
                  <tr>
                    <th>SUPPLIER</th>
                    <th>EMAIL ADDRESS</th>
                    <th>PHONE</th>
                    <th>PRODUCTS BELOW MINIMUM STOCK</th>
                    <th>EXPECTED DELIVERY COST (EXC TAX)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={5} className="text-center text-muted">No suppliers loaded.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="mb-5">
          <h6 className="fw-semibold mb-3">Export To</h6>
          <div className="d-flex flex-wrap gap-2">
            <button className="btn btn-sm btn-info text-white">
              <i className="bi bi-filetype-csv me-1"></i> CSV
            </button>
            <button className="btn btn-sm btn-primary">
              <i className="bi bi-file-earmark-word me-1"></i> WORD
            </button>
            <button className="btn btn-sm btn-success">
              <i className="bi bi-file-earmark-excel me-1"></i> EXCEL
            </button>
            <button className="btn btn-sm btn-secondary">
              <i className="bi bi-printer me-1"></i> PRINT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
