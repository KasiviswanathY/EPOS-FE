"use client";
import { useState } from "react";

export default function IntegratedCardTypes() {
  const [range, setRange] = useState("Last 90 Days");
  const [fromDate, setFromDate] = useState("2025-04-18");
  const [fromTime, setFromTime] = useState("05:00");
  const [toDate, setToDate] = useState("2025-07-17");
  const [toTime, setToTime] = useState("05:00");
  const [location, setLocation] = useState("");
  const [device, setDevice] = useState("All Devices");

  return (
    <div className="page-wrapper">
      <div className="content">
        <h4 className="fw-bold mb-2">Integrated Card Types </h4>
        <p className="mb-4">
          This report can be used to view the breakdown of transactions by card brand for payments taken using an integrated card machine.
        </p>

        <div className="row g-3 mb-3 align-items-end">
          <div className="col-md-3">
            <label className="form-label">Date Range</label>
            <select className="form-select" value={range} onChange={(e) => setRange(e.target.value)}>
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>Last 90 Days</option>
              <option>Custom</option>
            </select>
          </div>

          <div className="col-md-3">
            <label className="form-label">From</label>
            <div className="d-flex gap-2">
              <input
                type="date"
                className="form-control"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
              <input
                type="time"
                className="form-control"
                value={fromTime}
                onChange={(e) => setFromTime(e.target.value)}
              />
            </div>
          </div>

          <div className="col-md-3">
            <label className="form-label">To</label>
            <div className="d-flex gap-2">
              <input
                type="date"
                className="form-control"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
              <input
                type="time"
                className="form-control"
                value={toTime}
                onChange={(e) => setToTime(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="row g-3 mb-4">
          <div className="col-md-6">
            <label className="form-label">Filter by Location</label>
            <select className="form-select" value={location} onChange={(e) => setDevice(e.target.value)}>
              <option>location A</option>
              <option>location B</option>
              <option>location C</option>
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">Filter by Device</label>
            <select className="form-select" value={device} onChange={(e) => setDevice(e.target.value)}>
              <option>All Devices</option>
              <option>Terminal A</option>
              <option>Terminal B</option>
            </select>
          </div>
        </div>

        <div className="alert alert-light text-center border py-5">
          No items for selected filters
        </div>
      </div>
    </div>
  );
}
