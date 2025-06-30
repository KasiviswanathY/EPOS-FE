"use client";

import { useState } from "react";
import Table from "@/core/common/pagination/datatable";
import CommonFooter from "@/core/common/footer/commonFooter";

export default function NonSellingStocks() {
  const [selectedPeriod, setSelectedPeriod] = useState("Last 7 days");
  const [customDateRange] = useState("22 Jun 2025 - 28 Jun 2025");

  const periodOptions = [
    "Today", "Yesterday", "This Week", "This Month", "This Quarter", "Last Week",
    "Last Month", "Last 7 days", "Last 14 days", "Last 30 days", "Last 60 days",
    "Last 90 days", "Custom"
  ];

  const data = [
    {
      name: "2Five2 Stickers $3.50",
      barcode: "3000368543",
      brand: "2Five2",
      stock: -10,
      min: 0,
      max: 100,
    },
    {
      name: "2Five2 Stickers $4.00",
      barcode: "6512576480",
      brand: "2Five2",
      stock: -29,
      min: 0,
      max: 100,
    },
    {
      name: "2Five2 Stickers $5.00",
      barcode: "3121764565",
      brand: "2Five2",
      stock: -23,
      min: 0,
      max: 100,
    },
    {
      name: "apothic inferno",
      barcode: "085000024904",
      brand: "Snuff",
      stock: 0,
      min: 0,
      max: 3,
    },
    {
      name: "Body Oil",
      barcode: "8847710000",
      brand: "2FIVE2",
      stock: 11,
      min: 3,
      max: 50,
    },
    {
      name: "Eon Smoke",
      barcode: `852675072741`,
      brand: "Snuff`,",
      stock: -478,
      min: 0,
      max: 90,
    },
    {
      name: "Flat Wrap",
      barcode: "812319010492",
      brand: "Snuff",
      stock: -294,
      min: 0,
      max: 0,
    },
     {
      name: "apothic inferno",
      barcode: "085000024904",
      brand: "2FIVE2",
      stock: 0,
      min: 0,
      max: 3,
    },
    {
      name: "2Five2 Stickers $5.00",
      barcode: "3121764565",
      brand: "2Five2",
      stock: -23,
      min: 0,
      max: 100,
    },
    {
      name: "apothic inferno",
      barcode: "085000024904",
      brand: "2Five2",
      stock: 0,
      min: 0,
      max: 3,
    },
  ];

  const columns = [
    { title: "Name", dataIndex: "name" },
    { title: "Barcode", dataIndex: "barcode" },
    { title: "Brand", dataIndex: "brand" },
    { title: "Current Stock", dataIndex: "stock" },
    { title: "Min Stock", dataIndex: "min" },
    { title: "Max Stock", dataIndex: "max" },
  ];

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header mb-3 d-flex align-items-center justify-content-between">
          <h4 className="fw-bold">
            Non-selling Products <span className="text-primary fs-6">HELP</span>
          </h4>
        </div>
        <div className="card p-3 mb-3">
          <div className="row g-3 align-items-end">
            <div className="col-md-4">
              <label className="form-label">Show data from</label>
              <select
                className="form-select"
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
              >
                {periodOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className="col-md-8">
              <label className="form-label invisible">Date Range</label>
              <p className="mb-0 text-muted">{customDateRange}</p>
            </div>
          </div>
        </div>
        <div className="card p-3 mb-3">
          <div className="row g-3 align-items-end">
            <div className="col-md-6">
              <label className="form-label">Filter by Location</label>
              <select className="form-select">
                <option>Warehouse 1</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">Filter by Device</label>
              <select className="form-select">
                <option>All Devices</option>
              </select>
            </div>
            <div className="col-md-12 d-flex justify-content-between flex-wrap gap-2 pt-2">
              <div className="d-flex flex-wrap gap-2">
                <button className="btn btn-sm text-white" style={{ backgroundColor: "#fd7e14" }}>EXPORT TO WORD</button>               
                <button className="btn btn-sm text-white" style={{ backgroundColor: "#fd7e14" }}>EXPORT TO EXCEL</button>
                <button className="btn btn-sm text-white" style={{ backgroundColor: "#fd7e14" }}>PRINT</button>
              </div>
              <div className="d-flex gap-2">
                <button className="btn btn-outline-dark btn-sm fw-semibold">RESET</button>
                <button className="btn btn-sm text-white" style={{ backgroundColor: "#fd7e14" }}>APPLY</button>
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-body p-0">
            <div className="table-responsive">
              <Table columns={columns} dataSource={data} />
            </div>
          </div>
        </div>

        <CommonFooter />
      </div>
    </div>
  );
}
