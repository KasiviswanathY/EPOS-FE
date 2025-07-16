"use client";

import Link from "next/link";
import React from "react";

export default function StockTakes() {
  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header d-flex justify-content-between align-items-center flex-wrap">
          <div>
            <h4>Stock Takes</h4>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-3">
            <label className="form-label">From Date</label>
            <input type="date" className="form-control" defaultValue="2025-06-18" />
          </div>
          <div className="col-md-3">
            <label className="form-label">To Date</label>
            <input type="date" className="form-control" defaultValue="2025-07-01" />
          </div>
        </div>
        <div className="card mb-4">
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-4">
                <label className="form-label">Filter by Location</label>
                <select className="form-select">
                  <option>* All Locations</option>
                  <option>Warehouse A</option>
                  <option>Warehouse B</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="card mb-3">
          <div className="card-body">
            <label className="form-label">Scan Order Barcode</label>
            <div className="d-flex">
              <input
                type="text"
                className="form-control"
                placeholder="Scan or enter barcode"
              />
              <button className="btn btn-primary ms-2">SEARCH</button>
            </div>
          </div>
        </div>
        <div className="card mb-4">
          <div className="card-body">
            <p className="text-muted m-0">
              No stock movements were found matching the criteria you have selected.
            </p>
          </div>
        </div>
        <div className="d-flex flex-wrap gap-2 mb-5">
          <button className="btn btn-sm text-white" style={{ backgroundColor: "#fd7e14" }}>EXPORT TO .CSV</button>
          <button className="btn btn-sm text-white" style={{ backgroundColor: "#fd7e14" }}>EXPORT TO WORD</button>               
          <button className="btn btn-sm text-white" style={{ backgroundColor: "#fd7e14" }}>EXPORT TO EXCEL</button>
          <button className="btn btn-sm text-white" style={{ backgroundColor: "#fd7e14" }}>PRINT</button>
        </div>
      </div>
    </div>
  );
}
