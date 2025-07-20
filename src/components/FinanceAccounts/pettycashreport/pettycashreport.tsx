"use client";
import { useState } from "react";

export default function PettyCashReport() {
  const [location, setLocation] = useState("");
  const [device, setDevice] = useState("All Devices");
  const [staff, setStaff] = useState("All Staff");

  const handleReset = () => {
    setLocation("");
    setDevice("All Devices");
    setStaff("All Staff");
  };

  const handleApply = () => {
    console.log("Applied Filters:", { location, device, staff });
  };

  const pettyCashData = [
    { reason: "ATM", staff: "Jagrut", device: "Till", datetime: "7/15/2025 9:04:33 PM", amount: 1220.0 },
    { reason: "other", staff: "Jagrut", device: "Till", datetime: "7/15/2025 9:03:31 PM", amount: 512.0 },
    { reason: "North State Payout", staff: "Jagrut", device: "Till", datetime: "7/15/2025 2:15:44 PM", amount: 120.16 },
    { reason: "ATM", staff: "Jagrut", device: "Till", datetime: "7/14/2025 9:54:21 PM", amount: 1440.0 },
    { reason: "other", staff: "Jagrut", device: "Till", datetime: "7/14/2025 9:52:23 PM", amount: 50.0 },
    { reason: "other", staff: "Jagrut", device: "Till", datetime: "7/14/2025 9:48:11 PM", amount: 40.0 },
    { reason: "other", staff: "Jagrut", device: "Till", datetime: "7/12/2025 9:10:51 PM", amount: 60.0 },
  ];

  const totalAmount = pettyCashData.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="page-wrapper">
      <div className="content">
        <h4 className="fw-bold mb-2">Petty Cash Report </h4>
        <p>
          Shown on this page is the history of any Petty Cash that has been withdrawn.
        </p>
        <p className="mb-4">
          This gives you a chance to monitor everyday costs and reduce risk.
        </p>

        <div className="row g-3 mb-3">
          <div className="col-md-4">
            <label className="form-label">Show data from</label>
            <select className="form-select">
              <option>Last 7 days</option>
              <option>This Month</option>
              <option>Custom</option>
            </select>
            <div className="form-text">10 Jul 2025 - 16 Jul 2025</div>
          </div>

          <div className="col-md-4">
            <label className="form-label">Filter by Location</label>
            <input
              className="form-control"
              placeholder="Enter location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div className="col-md-2">
            <label className="form-label">Filter by Device</label>
            <select className="form-select" value={device} onChange={(e) => setDevice(e.target.value)}>
              <option>All Devices</option>
              <option>Till</option>
              <option>Till 2</option>
            </select>
          </div>

          <div className="col-md-2">
            <label className="form-label">Filter by Staff</label>
            <select className="form-select" value={staff} onChange={(e) => setStaff(e.target.value)}>
              <option>All Staff</option>
              <option>Jagrut</option>
              <option>Riya</option>
            </select>
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <button className="btn btn-outline-primary me-2">EXPORT TO CSV</button>
            <button className="btn btn-outline-primary me-2">EXPORT TO WORD</button>
            <button className="btn btn-outline-primary me-2">EXPORT TO EXCEL</button>
            <button className="btn btn-outline-secondary">PRINT</button>
          </div>
          <div>
            <button className="btn btn-link text-primary fw-bold me-2" onClick={handleReset}>RESET</button>
            <button className="btn btn-info fw-bold text-white" onClick={handleApply}>APPLY</button>
          </div>
        </div>

        <div className="table-responsive card">
          <table className="table table-bordered align-middle text-center mb-0">
            <thead className="table-light">
              <tr>
                <th>REASON</th>
                <th>STAFF</th>
                <th>DEVICE</th>
                <th>DATE/TIME</th>
                <th>AMOUNT</th>
              </tr>
            </thead>
            <tbody>
              {pettyCashData.map((entry, idx) => (
                <tr key={idx}>
                  <td>{entry.reason}</td>
                  <td>{entry.staff}</td>
                  <td>{entry.device}</td>
                  <td>{entry.datetime}</td>
                  <td>${entry.amount.toFixed(2)}</td>
                </tr>
              ))}
              <tr className="fw-bold text-white">
                <td colSpan={1}>Total:</td><td></td><td></td><td></td>
                <td>${totalAmount.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
