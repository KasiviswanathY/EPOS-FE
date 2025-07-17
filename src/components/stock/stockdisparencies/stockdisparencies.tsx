"use client";
import { useState } from "react";

export default function StockDiscrepanciesPage() {
  const [filters, setFilters] = useState({
    dateRange: "Last 90 days",
    fromDate: "12 Apr 2025",
    toDate: "10 Jul 2025",
    location: "",
    reason: "* All Reasons",
  });

  const [hasResults, setHasResults] = useState(false);

  const handleApply = () => {
    setHasResults(false); 
  };

  const handleReset = () => {
    setFilters({
      dateRange: "Last 90 days",
      fromDate: "12 Apr 2025",
      toDate: "10 Jul 2025",
      location: "",
      reason: "* All Reasons",
    });
    setHasResults(false);
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header d-flex justify-content-between align-items-center">
          <h4 className="fw-bold">Stock Discrepancies</h4>
          <a href="#" className="text-primary small">HELP</a>
        </div>

        <div className="card mb-3">
          <div className="card-body">
            <p className="mb-2">
              On this page you’ll find a list of discrepancies in your stock movements and stock takes. Use the calendars and the dropdowns to filter.
            </p>
            <p className="text-muted mb-0">
              This will help you monitor your stock and eliminate wasted time and money, which could be used in other areas of the business.
            </p>
          </div>
        </div>

        <div className="card mb-3">
          <div className="card-body">
            <div className="mb-3">
              <label className="form-label fw-semibold">Show data from</label>
              <select className="form-select" value={filters.dateRange}>
                <option>Last 90 days</option>
                <option>Last 30 days</option>
                <option>This month</option>
              </select>
              <div className="mt-2 text-muted">
                {filters.fromDate} - {filters.toDate}
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Filter by Location</label>
              <select className="form-select" value={filters.location}>
                <option>Select a Location</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Filter by Reason</label>
              <select className="form-select" value={filters.reason}>
                <option>* All Reasons</option>
              </select>
            </div>
            <div className="d-flex flex-wrap gap-2 mt-4 mb-3">
              <button className="btn btn-outline-primary">EXPORT TO .CSV</button>
              <button className="btn btn-outline-primary">EXPORT TO WORD</button>
              <button className="btn btn-outline-primary">EXPORT TO EXCEL</button>
              <button className="btn btn-outline-secondary">PRINT</button>
            </div>
            <div className="d-flex justify-content-end gap-3">
              <button className="btn btn-link" onClick={handleReset}>RESET</button>
              <button className="btn btn-info text-white" onClick={handleApply}>APPLY</button>
            </div>
          </div>
        </div>

        {!hasResults && (
          <div className="alert alert-warning d-flex align-items-center" role="alert">
            <span className="me-2">⚠️</span>
            Sorry, no data has been found for the filters you have selected
          </div>
        )}
      </div>
    </div>
  );
}
