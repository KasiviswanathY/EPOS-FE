"use client";
import Link from "next/link";
import { useState } from "react";

const initialColumns = [
  { name: "Date", selected: true },
  { name: "Amount", selected: true },
  { name: "Tax", selected: true },
  { name: "Payment Method", selected: true },
  { name: "Staff", selected: true },
  { name: "Discount", selected: false },
  { name: "Gratuity", selected: false },
  { name: "Table", selected: false },
  { name: "Items Sold", selected: false },
  { name: "Location", selected: false },
  { name: "Device", selected: false },
  { name: "Customer", selected: false },
  { name: "Barcode", selected: false },
  { name: "Transaction ID", selected: false },
];

export default function TransactionsComponent() {
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [showColumnsPanel, setShowColumnsPanel] = useState(false);
  const [columns, setColumns] = useState(initialColumns);

  const handleToggleColumn = (index: number) => {
    const newCols = [...columns];
    newCols[index].selected = !newCols[index].selected;
    setColumns(newCols);
  };

  const handleUnselectAll = () => {
    setColumns(columns.map(col => ({ ...col, selected: false })));
  };

  const handleResetColumns = () => {
    setColumns(initialColumns);
  };

  const selectedColumns = columns.filter(col => col.selected).map(col => col.name);

  const transactions = [
    { date: "6/30/25, 12:05 AM", amount: "$3.19", tax: "$0.20", paymentMethod: "Cash", staff: "Jagrut" },
    { date: "6/30/25, 12:09 AM", amount: "$22.17", tax: "$1.40", paymentMethod: "CC/FS", staff: "Jagrut" },
    { date: "6/30/25, 12:10 AM", amount: "$40.00", tax: "$0.00", paymentMethod: "Cash", staff: "Jagrut" },
    { date: "6/30/25, 12:05 AM", amount: "$3.19", tax: "$0.20", paymentMethod: "Cash", staff: "Jagrut" },
    { date: "6/30/25, 12:09 AM", amount: "$22.17", tax: "$1.40", paymentMethod: "CC/FS", staff: "Jagrut" },
    { date: "6/30/25, 12:10 AM", amount: "$40.00", tax: "$0.00", paymentMethod: "Cash", staff: "Jagrut" },
    { date: "6/30/25, 12:05 AM", amount: "$3.19", tax: "$0.20", paymentMethod: "Cash", staff: "Jagrut" },
    { date: "6/30/25, 12:09 AM", amount: "$22.17", tax: "$1.40", paymentMethod: "CC/FS", staff: "Jagrut" },
    { date: "6/30/25, 12:10 AM", amount: "$40.00", tax: "$0.00", paymentMethod: "Cash", staff: "Jagrut" },
    { date: "6/30/25, 12:05 AM", amount: "$3.19", tax: "$0.20", paymentMethod: "Cash", staff: "Jagrut" },
    { date: "6/30/25, 12:09 AM", amount: "$22.17", tax: "$1.40", paymentMethod: "CC/FS", staff: "Jagrut" },
    { date: "6/30/25, 12:10 AM", amount: "$40.00", tax: "$0.00", paymentMethod: "Cash", staff: "Jagrut" },
    { date: "6/30/25, 12:05 AM", amount: "$3.19", tax: "$0.20", paymentMethod: "Cash", staff: "Jagrut" },
    { date: "6/30/25, 12:09 AM", amount: "$22.17", tax: "$1.40", paymentMethod: "CC/FS", staff: "Jagrut" },
    { date: "6/30/25, 12:10 AM", amount: "$40.00", tax: "$0.00", paymentMethod: "Cash", staff: "Jagrut" },
    { date: "6/30/25, 12:05 AM", amount: "$3.19", tax: "$0.20", paymentMethod: "Cash", staff: "Jagrut" },
    { date: "6/30/25, 12:09 AM", amount: "$22.17", tax: "$1.40", paymentMethod: "CC/FS", staff: "Jagrut" },
    { date: "6/30/25, 12:10 AM", amount: "$40.00", tax: "$0.00", paymentMethod: "Cash", staff: "Jagrut" },
  ];

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="d-flex align-items-center mb-3">
          <Link href="/reporting" className="text-muted me-2">Reporting</Link>
          <span className="text-muted"> &gt; </span>
          <span className="ms-2 fw-bold">Transactions</span>
        </div>

        <h4 className="fw-bold mb-1">Transactions</h4>
        <p className="text-muted" style={{ fontSize: "14px" }}>
          The transaction report provides a comprehensive view of completed transactions within a specified date range.{" "}
          <Link href="#" className="text-primary">Learn more</Link>
          <br />
          You can access the previous{" "}
          <Link href="#" className="text-primary">completed transaction report</Link>.
        </p>
        <div className="d-flex justify-content-between align-items-center my-3">
          <div className="d-flex align-items-center">
            <input
              type="text"
              placeholder="Search products"
              className="form-control me-2"
              style={{ width: "250px" }}
            />
            <button className="btn btn-light btn-sm">
              Last Week <i className="ti ti-x ms-1"></i>
            </button>
          </div>

          <div className="d-flex align-items-center gap-2">
            <button
              className="btn btn-outline-dark btn-sm"
              onClick={() => setShowColumnsPanel(true)}
            >
              <i className="ti ti-layout-grid me-1"></i> Columns
            </button>
            <button className="btn btn-outline-dark btn-sm">
              <i className="ti ti-download me-1"></i> Export
            </button>
            <button
              className="btn btn-outline-dark btn-sm"
              onClick={() => setShowFilterPanel(true)}
            >
              <i className="ti ti-filter me-1"></i> Filters
            </button>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                {columns.filter(col => col.selected).map((col, idx) => (
                  <th key={idx}>{col.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {transactions.map((txn, idx) => (
                <tr key={idx}>
                  {selectedColumns.includes("Date") && <td>{txn.date}</td>}
                  {selectedColumns.includes("Amount") && <td>{txn.amount}</td>}
                  {selectedColumns.includes("Tax") && <td>{txn.tax}</td>}
                  {selectedColumns.includes("Payment Method") && <td>{txn.paymentMethod}</td>}
                  {selectedColumns.includes("Staff") && <td>{txn.staff}</td>}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="d-flex justify-content-between align-items-center mt-3">
          <span className="text-muted">Rows per page: <strong>10</strong></span>
          <span className="text-muted">1-10 of 1146</span>
          <div>
            <button className="btn btn-light btn-sm me-1">&lt;</button>
            <button className="btn btn-light btn-sm">&gt;</button>
          </div>
        </div>
      </div>
      {showFilterPanel && (
  <div className="position-fixed top-0 end-0 bg-white shadow-lg p-4" style={{ width: "400px", height: "100vh", zIndex: 1050 }}>
    <div className="d-flex justify-content-between align-items-center mb-3">
      <h5 className="mb-0">Filters</h5>
      <button className="btn-close" onClick={() => setShowFilterPanel(false)}></button>
    </div>
    <div className="mb-3">
      <label className="form-label fw-bold">Time</label>
      <select className="form-select mb-2">
        <option>Last Week</option>
        <option>Last Month</option>
        <option>Custom</option>
      </select>

      <label className="form-label">Start Date</label>
      <input type="datetime-local" className="form-control mb-2" />

      <label className="form-label">End Date</label>
      <input type="datetime-local" className="form-control" />
    </div>

    <div className="mb-3">
      <label className="form-label fw-bold">Area</label>
      <select className="form-select mb-2">
        <option>All Location Areas</option>
      </select>
      <select className="form-select">
        <option>All Locations</option>
      </select>
    </div>

    <div className="mb-3">
      <label className="form-label fw-bold">Advanced</label>
      <select className="form-select mb-2">
        <option>All Devices</option>
      </select>
      <select className="form-select mb-2">
        <option>All Payment Methods</option>
        <option>Cash</option>
        <option>CC/FS</option>
      </select>
      <select className="form-select">
        <option>All Staff</option>
        <option>Jagrut</option>
      </select>
    </div>

    <button
      className="btn btn-primary w-100 mt-3"
      onClick={() => setShowFilterPanel(false)}
    >
      Apply
    </button>
  </div>
)}
      {showColumnsPanel && (
        <div className="position-fixed top-0 end-0 bg-white shadow-lg p-4" style={{ width: "400px", height: "100vh", zIndex: 1050, overflowY: "auto" }}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0">Columns</h5>
            <button className="btn-close" onClick={() => setShowColumnsPanel(false)}></button>
          </div>

          <div className="mb-3">
            <div className="form-check mb-2">
              <input className="form-check-input" type="checkbox" onChange={handleUnselectAll} />
              <label className="form-check-label">Unselect all</label>
            </div>

            {columns.map((col, idx) => (
              <div key={idx} className="d-flex justify-content-between align-items-center mb-2">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={col.selected}
                    onChange={() => handleToggleColumn(idx)}
                    id={`col-${idx}`}
                  />
                  <label className="form-check-label" htmlFor={`col-${idx}`}>{col.name}</label>
                </div>
                <div>
                  <button className="btn btn-sm btn-link px-1"><i className="ti ti-arrow-up"></i></button>
                  <button className="btn btn-sm btn-link px-1"><i className="ti ti-arrow-down"></i></button>
                </div>
              </div>
            ))}

            <div className="d-flex justify-content-between mt-4">
              <button className="btn btn-light w-50 me-2" onClick={handleResetColumns}>Reset</button>
              <button className="btn btn-primary w-50" onClick={() => setShowColumnsPanel(false)}>Apply</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
