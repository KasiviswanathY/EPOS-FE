"use client";
import { useState } from "react";

export default function StaffPayrollReport() {
  const [dateRange, setDateRange] = useState("Last 2 days");
  const [location, setLocation] = useState("");
  const [staff, setStaff] = useState("All Staff");
  const [clockingType, setClockingType] = useState("All Clocking Types");

  const handleApply = () => {
    console.log("Applied filters:", {
      dateRange,
      location,
      staff,
      clockingType,
    });
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <h4 className="fw-bold mb-3">Staff Payroll</h4>

        <div className="alert alert-light border p-3 mb-4">
          On this page you can view staff payroll including a breakdown of hours worked by each staff.
          This will help highlight labour costs including hourly rate and hours worked.
        </div>

        <div className="card p-3 mb-4">
          <div className="row mb-3">
            <div className="col-md-12">
              <label>Show data from</label>
              <select
                className="form-select"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
              >
                <option>Last 2 days</option>
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>This Month</option>
                <option>Last Month</option>
                <option>Custom Range</option>
              </select>
              <small className="text-muted d-block mt-1">10 Jul 2025 - 16 Jul 2025</small>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label>Filter by Location</label>
              <input
                type="text"
                className="form-control"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter location"
              />
            </div>
            <div className="col-md-6">
              <label>Filter by Staff</label>
              <select
                className="form-select"
                value={staff}
                onChange={(e) => setStaff(e.target.value)}
              >
                <option>All Staff</option>
                <option>Staff A</option>
                <option>Staff B</option>
                <option>Staff C</option>
              </select>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label>Filter by Clocking Type</label>
              <select
                className="form-select"
                value={clockingType}
                onChange={(e) => setClockingType(e.target.value)}
              >
                <option>All Clocking Types</option>
                <option>Clock In</option>
                <option>Break</option>
                <option>Clock Out</option>
              </select>
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center">
            <div>
              <button className="btn btn-primary btn-sm me-2">EXPORT TO .CSV</button>
              <button className="btn btn-primary btn-sm me-2">EXPORT TO WORD</button>
              <button className="btn btn-primary btn-sm me-2">EXPORT TO EXCEL</button>
              <button className="btn btn-primary btn-sm">PRINT</button>
            </div>
            <div>
              <button className="btn btn-outline-secondary btn-sm me-2">RESET</button>
              <button onClick={handleApply} className="btn btn-primary btn-sm">APPLY</button>
            </div>
          </div>
        </div>

        <div className="alert alert-warning p-3 mt-3">
          <i className="bi bi-exclamation-triangle me-2"></i>
          Sorry, no data has been found for the filters you have selected.
        </div>
      </div>
    </div>
  );
}
