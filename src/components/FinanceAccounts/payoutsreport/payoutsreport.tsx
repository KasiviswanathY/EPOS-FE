"use client";
import { useState } from "react";
import Link from "next/link";
export default function PayoutsReport() {
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
    console.log("Applied filters:", { location, device, staff });
  };

  const dateRange = "10 Jul 2025 - 16 Jul 2025";

  const payouts = [
    {
      reason: "Lottery Payout",
      qty: 97,
      avg: -29.56,
      total: -2867.0,
    },
  ];

  const totalQty = payouts.reduce((acc, p) => acc + p.qty, 0);
  const totalAvg = payouts.reduce((acc, p) => acc + p.avg, 0); 
  const totalSum = payouts.reduce((acc, p) => acc + p.total, 0);

  return (
    <div className="page-wrapper">
      <div className="content">
        <h4 className="fw-bold mb-2">Payouts</h4>
        <p>
          On this page you can view the pay outs made by reason as well as drill down to see details
          of individual pay outs.
        </p>
        <p className="mb-4">
          Keep on top of these by drilling down further to see details of dates and staff members
          processing the payouts.
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
                <th>REASON</th>
                <th>QTY</th>
                <th>AVERAGE</th>
                <th>TOTAL</th>
                <th>SHOW DETAILS</th>
              </tr>
            </thead>
            <tbody>
              {payouts.map((item, index) => (
                <tr key={index}>
                  <td>{item.reason}</td>
                  <td>{item.qty}</td>
                  <td>${item.avg.toFixed(2)}</td>
                  <td>${item.total.toFixed(2)}</td>
                  <td>
<Link href="/showdetails" className="btn btn-primary"> SHOW DETAILS</Link>                  </td>
                </tr>
              ))}
              <tr className="fw-bold bg- text-white">
                <td>Total:</td>
                <td>{totalQty}</td>
                <td>${totalAvg.toFixed(2)}</td>
                <td>${totalSum.toFixed(2)}</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
