"use client";
import React, { useState } from "react";
import Table from "@/core/common/pagination/datatable";
import Link from "next/link";

const dummyData = [
  {
    staff: "Jagrut",
    customer: "",
    location: "Goody's Convenience",
    device: "Till1",
    quantity: 2,
    product: "$10 Scratch Off",
    category: "Lottery",
    barcode:
      "843051007839,843051007457,",
  },
  {
    staff: "Jagrut",
    customer: "",
    location: "Goody's Convenience",
    device: "Till1",
    quantity: 1,
    product: "lottery",
    category: "Lottery",
    barcode: "",
  },
  {
    staff: "Jagrut",
    customer: "",
    location: "Goody's Convenience",
    device: "Till1",
    quantity: 1,
    product: "Budweiser 16 Oz",
    category: "Beer/Wine",
    barcode: "01847325,018200004735",
  },
  {
    staff: "Jagrut",
    customer: "",
    location: "Goody's Convenience",
    device: "Till1",
    quantity: 1,
    product: "Salem",
    category: "Cigarettes",
    barcode:
      "090500002095,090500006969,",
  },
  {
    staff: "Jagrut",
    customer: "",
    location: "Goody's Convenience",
    device: "Till1",
    quantity: 1,
    product: "Modelo 24 oz Can",
    category: "Beer/Wine",
    barcode:
      "0335440080093,033544005437,",
  },
  {
    staff: "Jagrut",
    customer: "",
    location: "Goody's Convenience",
    device: "Till1",
    quantity: 2,
    product: "Bud Light 16 oz Can",
    category: "Beer/Wine",
    barcode: "018200005381",
  },
  {
    staff: "Jagrut",
    customer: "",
    location: "Goody's Convenience",
    device: "Till1",
    quantity: 1,
    product: "Michelob Ultra 16 Oz",
    category: "Beer/Wine",
    barcode: "01866542,018200006654,018200005244",
  },
];

const columns = [
  {
    title: <input type="checkbox" />,
    dataIndex: "checkbox",
    render: () => <input type="checkbox" />,
  },
  {
    title: <span className="fw-bold text-uppercase">Staff</span>,
    dataIndex: "staff",
  },
  {
    title: <span className="fw-bold text-uppercase">Customer Full Name</span>,
    dataIndex: "customer",
  },
  {
    title: <span className="fw-bold text-uppercase">Location Name</span>,
    dataIndex: "location",
  },
  {
    title: <span className="fw-bold text-uppercase">Device Name</span>,
    dataIndex: "device",
  },
  {
    title: <span className="fw-bold text-uppercase">Quantity</span>,
    dataIndex: "quantity",
  },
  {
    title: <span className="fw-bold text-uppercase">Product</span>,
    dataIndex: "product",
  },
  {
    title: <span className="fw-bold text-uppercase">Category</span>,
    dataIndex: "category",
  },
  {
    title: <span className="fw-bold text-uppercase">Barcode</span>,
    dataIndex: "barcode",
  },
];

export default function BookkeepingComponent() {
  const [filters, setFilters] = useState({
    startDate: "2025-07-10",
    endDate: "2025-07-16",
    location: "Goody's Convenience",
    staff: "All Staff",
    device: "All Devices",
    tender: "All Tender",
  });

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="page-title">
            <h4 className="fw-bold">Bookkeeping</h4>
            <p className="text-muted mb-2">
              This page contains all items within a transaction with extended information This shows you how business has performed over the time period selected.
            </p>
          </div>
        </div>
        <div className="card p-4 mb-4">
          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label fw-medium">Show data from</label>
              <div className="row g-2">
                <div className="col">
                  <input
                    type="date"
                    className="form-control"
                    value={filters.startDate}
                    onChange={(e) =>
                      setFilters({ ...filters, startDate: e.target.value })
                    }
                  />
                </div>
                <div className="col">
                  <input
                    type="date"
                    className="form-control"
                    value={filters.endDate}
                    onChange={(e) =>
                      setFilters({ ...filters, endDate: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <label className="form-label fw-medium">Filter by Location</label>
              <select
                className="form-select"
                value={filters.location}
                onChange={(e) =>
                  setFilters({ ...filters, location: e.target.value })
                }
              >
                <option>Goody's Convenience</option>
              </select>
            </div>

            <div className="col-md-4">
              <label className="form-label fw-medium">Filter by Staff</label>
              <select
                className="form-select"
                value={filters.staff}
                onChange={(e) =>
                  setFilters({ ...filters, staff: e.target.value })
                }
              >
                <option>All Staff</option>
              </select>
            </div>

            <div className="col-md-4">
              <label className="form-label fw-medium">Filter by Device</label>
              <select
                className="form-select"
                value={filters.device}
                onChange={(e) =>
                  setFilters({ ...filters, device: e.target.value })
                }
              >
                <option>All Devices</option>
              </select>
            </div>

            <div className="col-md-4">
              <label className="form-label fw-medium">Filter by Tender</label>
              <select
                className="form-select"
                value={filters.tender}
                onChange={(e) =>
                  setFilters({ ...filters, tender: e.target.value })
                }
              >
                <option>All Tender</option>
              </select>
            </div>

            <div className="col-md-4 d-flex align-items-end justify-content-end">
              <button className="btn btn-outline-secondary me-2">Reset</button>
              <button className="btn btn-primary">Apply</button>
            </div>
          </div>
        </div>
        <div className="d-flex flex-wrap gap-2 mb-3">
          <button className="btn btn-outline-primary">EXPORT TO .CSV</button>
          <button className="btn btn-outline-primary">EXPORT TO WORD</button>
          <button className="btn btn-outline-primary">EXPORT TO EXCEL</button>
          <button className="btn btn-outline-primary">EXPORT TO LEDGER</button>
          <button className="btn btn-outline-primary">PRINT</button>
        </div>
        <div className="card table-list-card">
          <div className="card-body px-0">
            <div className="table-responsive">
              <Table columns={columns} dataSource={dummyData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
