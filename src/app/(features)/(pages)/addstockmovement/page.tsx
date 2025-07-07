"use client";

import React, { useState } from "react";

export default function AddStockMovement() {
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [staff, setStaff] = useState("");
  const [reason, setReason] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [barcode, setBarcode] = useState("");

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header d-flex justify-content-between align-items-center">
          <h4> Add Stock Movement </h4>
        </div>
        <div className="card mb-4">
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Deliver stock from</label>
                <select
                  className="form-select form-select-sm"
                  value={fromLocation}
                  onChange={(e) => setFromLocation(e.target.value)}
                >
                  <option>* Select Location</option>
                  <option>Warehouse A</option>
                  <option>Warehouse B</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">Deliver stock to</label>
                <select
                  className="form-select form-select-sm"
                  value={toLocation}
                  onChange={(e) => setToLocation(e.target.value)}
                >
                  <option>* Select Location</option>
                  <option>Store A</option>
                  <option>Store B</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">Staff member</label>
                <select
                  className="form-select form-select-sm"
                  value={staff}
                  onChange={(e) => setStaff(e.target.value)}
                >
                  <option>* Select Staff</option>
                  <option>John Doe</option>
                  <option>Jane Smith</option>
                  <option>Admin</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">Reason</label>
                <select
                  className="form-select form-select-sm"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                >
                  <option>* Select Reason</option>
                  <option>Restock</option>
                  <option>Internal Transfer</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="card mb-4">
          <div className="card-body">
            <label className="form-label">
              Search for an item using the search box below, enter a quantity and press "Insert".
            </label>
            <input
              type="text"
              className="form-control form-control-sm mb-3"
              placeholder="Product barcode or item search"
              value={barcode}
              onChange={(e) => setBarcode(e.target.value)}
            />

            <label className="form-label">Quantity to add:</label>
            <div className="d-flex align-items-center mb-3">
              <button
                type="button"
                className="btn btn-sm btn-primary"
                onClick={() => setQuantity((q) => Math.max(q - 1, 1))}
              >-</button>
              <input
                type="number"
                className="form-control mx-2 text-center"
                value={quantity}
                style={{ width: "100px" }}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
              <button
                type="button"
                className="btn btn-sm btn-primary"
                onClick={() => setQuantity((q) => q + 1)}
              >+</button>
              <button className="btn btn-sm btn-info text-white ms-auto">INSERT</button>
            </div>
          </div>
        </div>
        <div className="card mb-4">
          <div className="table-responsive">
            <table className="table table-bordered table-sm mb-0">
              <thead>
                <tr>
                  <th>PRODUCT</th>
                  <th>UNIT COST PRICE</th>
                  <th>UNIT SALE PRICE AT FROM LOCATION (INC TAX)</th>
                  <th>QUANTITY TO ADD</th>
                  <th>VOLUME TO ADD</th>
                  <th>TOTAL COST PRICE</th>
                  <th>REMOVE</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={7} className="text-muted">
                    Scan or look up an item using the search box above
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="d-flex justify-content-between mb-5">
          <button className="btn btn-sm btn-secondary">STOCK REPORT</button>
          <button className="btn btn-sm btn-success">ADD TO STOCK</button>
        </div>
      </div>
    </div>
  );
}
