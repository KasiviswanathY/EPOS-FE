"use client";

import Link from "next/link";
import React from "react";

export default function PurchaseListComponent() {
  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="page-title">
            <h4>Purchase Orders</h4>
          </div>
          <div className="d-flex gap-2 mt-2 mt-md-0">
              <button className="btn btn-sm btn-primary">Apply</button>
              <Link href="/addpurchaseorder" className="btn btn-sm btn-success">Add Purchase Order</Link>

            </div>
        </div>
        <div className="card mb-3">
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-3">
                <label className="form-label">From Date</label>
                <input type="date" className="form-control form-control-sm" defaultValue="2025-06-24" />
              </div>
              <div className="col-md-3">
                <label className="form-label">To Date</label>
                <input type="date" className="form-control form-control-sm" defaultValue="2025-07-01" />
              </div>
              <div className="col-md-3">
                <label className="form-label">Filter by Location</label>
                <select className="form-select form-select-sm">
                  <option>All Locations</option>
                  <option>Warehouse A</option>
                  <option>Warehouse B</option>
                </select>
              </div>
              <div className="col-md-3">
                <label className="form-label">Filter by Supplier</label>
                <select className="form-select form-select-sm">
                  <option>All Suppliers</option>
                  <option>2Five2</option>
                  <option>Albemarle</option>
                  <option>City Beverage</option>
                  <option>Coca Cola</option>
                  <option>core mark</option>
                  <option>Frito Lays</option>
                  <option>Goody's Kitchen</option>
                  <option>Hershey</option>
                </select>
              </div>

              <div className="col-md-3">
                <label className="form-label">Show Inc / Ex Tax</label>
                <select className="form-select form-select-sm">
                  <option>Exc Tax</option>
                  <option>Inc Tax</option>
                </select>
              </div>
              <div className="col-md-3">
                <label className="form-label">Filter by Status</label>
                <select className="form-select form-select-sm">
                  <option>All Orders</option>
                  <option>Pending</option>
                  <option>Completed</option>
                  <option>Received</option>
                  <option>Cancelled</option>
                  <option>Partially Received</option>
                  <option>Partially Cancelled</option>
                  <option>Partially Invoiced</option>
                  <option>Partially Paid</option>
                  <option>Partially Refunded</option>

                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label">Find Order or GRN</label>
                <div className="d-flex">
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="Search or Scan an order"
                  />
                  <button className="btn btn-sm btn-primary ms-2">SEARCH</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
