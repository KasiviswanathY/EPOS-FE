"use client";
import { useState } from "react";

export default function FloatAdjustmentsReport() {
  const [location, setLocation] = useState("");
  const [device, setDevice] = useState("All Devices");
  const [staff, setStaff] = useState("All Staff");

  const defaultFilters = {
    location: "",
    device: "All Devices",
    staff: "All Staff",
  };

  const handleReset = () => {
    setLocation(defaultFilters.location);
    setDevice(defaultFilters.device);
    setStaff(defaultFilters.staff);
  };

  const handleApply = () => {
    console.log("Filters applied:", { location, device, staff });
  };

  const dateRange = "10 Jul 2025 - 16 Jul 2025";

  const floatData = [
    { staff: "Jagrut", device: "Till 1", datetime: "7/15/2025 9:03:56 PM", amount: 200.0 },
    { staff: "Jagrut", device: "Till 1", datetime: "7/15/2025 9:03:50 PM", amount: 50.0 },
    { staff: "Jagrut", device: "Till 1", datetime: "7/12/2025 9:12:50 PM", amount: 25.0 },
    { staff: "Jagrut", device: "Till 1", datetime: "7/11/2025 9:04:46 PM", amount: 100.0 },
    { staff: "Jagrut", device: "Till 1", datetime: "7/11/2025 9:04:42 PM", amount: 150.0 },
  ];

  const totalAmount = floatData.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="page-wrapper">
      <div className="content">
        <h4 className="fw-bold mb-2">Float Adjustments Report</h4>
        <p>Shown on this page is the history of any Float Adjustments that have been made.</p>
        <p className="mb-4">
          This will give you more control over your cash management, highlighting any deposits or
          withdrawals made to the float from the front till.
        </p>

        <div className="row g-3 mb-3">
          <div className="col-md-4">
            <label className="form-label">Show data from</label>
            <select className="form-select">
              <option>Last 7 days</option>
              <option>This Month</option>
              <option>Custom</option>
            </select>
            <div className="form-text">{dateRange}</div>
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
              <option>Till 1</option>
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
            <button className="btn btn-outline-primary me-2">EXPORT TO .CSV</button>
            <button className="btn btn-outline-primary me-2">EXPORT TO WORD</button>
            <button className="btn btn-outline-primary me-2">EXPORT TO EXCEL</button>
            <button className="btn btn-outline-secondary">PRINT</button>
          </div>
          <div>
            <button
              className="btn btn-link text-decoration-none text-primary me-2 fw-bold"
              onClick={handleReset}
            >
              RESET
            </button>
            <button className="btn btn-info fw-bold text-white" onClick={handleApply}>
              APPLY
            </button>
          </div>
        </div>

        <div className="table-responsive card">
          <table className="table table-bordered mb-0 align-middle text-center">
            <thead className="table-light">
              <tr>
                <th>STAFF</th>
                <th>DEVICE</th>
                <th>DATE/TIME</th>
                <th>AMOUNT</th>
              </tr>
            </thead>
            <tbody>
              {floatData.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.staff}</td>
                  <td>{entry.device}</td>
                  <td>{entry.datetime}</td>
                  <td>${entry.amount.toFixed(2)}</td>
                </tr>
              ))}
              <tr className="fw-bold bg- text-white">
                <td colSpan={3}>Total:</td>
                <td>${totalAmount.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
