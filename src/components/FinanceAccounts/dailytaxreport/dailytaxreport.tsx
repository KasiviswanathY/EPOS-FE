"use client";
import { useState } from "react";

export default function TaxSummaryComponent() {
  const [dateRange] = useState("10 Jul 2025 - 16 Jul 2025");
  const [location, setLocation] = useState("");
  const [device, setDevice] = useState("All Devices");

  const dailySummary = [
    { date: "7/15/2025", salesExclTax: 2285.20, tax: 103.59, salesInclTax: 2388.79 },
    { date: "7/14/2025", salesExclTax: 3216.25, tax: 111.01, salesInclTax: 3327.28 },
    { date: "7/13/2025", salesExclTax: 2376.71, tax: 99.25, salesInclTax: 2475.94 },
    { date: "7/12/2025", salesExclTax: 3932.69, tax: 186.67, salesInclTax: 4139.45 },
    { date: "7/11/2025", salesExclTax: 3174.27, tax: 139.17, salesInclTax: 3313.53 },
    { date: "7/10/2025", salesExclTax: 2962.48, tax: 135.29, salesInclTax: 3097.72 }
  ];

  const taxBreakdown = [
    { name: "Sales Tax (2%)", code: "02", rate: 2.0, salesExclTax: 2.57, tax: 0.06, salesInclTax: 2.63 },
    { name: "Sales Tax (6.75%)", code: "01", rate: 6.75, salesExclTax: 1534.13, tax: 103.53, salesInclTax: 1637.66 },
    { name: "Tax Free", code: "03", rate: 0.0, salesExclTax: 1318.50, tax: 0.0, salesInclTax: 1318.50 },
  ];

  const totalSalesExclTax = dailySummary.reduce((acc, row) => acc + row.salesExclTax, 0);
  const totalTax = dailySummary.reduce((acc, row) => acc + row.tax, 0);
  const totalSalesInclTax = dailySummary.reduce((acc, row) => acc + row.salesInclTax, 0);

  return (
    <div className="page-wrapper">
      <div className="content">
        <h4 className="fw-bold mb-2">Tax Summary </h4>
        <p className="mb-4">On this page you have a breakdown of your tax takings by day with an available breakdown by tax rate.</p>

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

          <div className="col-md-4">
            <label className="form-label">Filter by Device</label>
            <select
              className="form-select"
              value={device}
              onChange={(e) => setDevice(e.target.value)}
            >
              <option>All Devices</option>
              <option>Device A</option>
              <option>Device B</option>
            </select>
          </div>
        </div>

        <div className="mb-3">
          <button className="btn btn-outline-primary me-2">EXPORT TO CSV</button>
          <button className="btn btn-outline-primary me-2">EXPORT TO WORD</button>
          <button className="btn btn-outline-primary me-2">EXPORT TO EXCEL</button>
          <button className="btn btn-outline-secondary">PRINT</button>
        </div>

        <div className="table-responsive card mb-4">
          <table className="table table-bordered mb-0 text-center align-middle">
            <thead className="table-light">
              <tr>
                <th>DATE</th>
                <th>SALES EXC. TAX</th>
                <th>TAX TOTAL</th>
                <th>SALES INC. TAX</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {dailySummary.map((item, index) => (
                <tr key={index}>
                  <td>{item.date}</td>
                  <td>${item.salesExclTax.toFixed(2)}</td>
                  <td>${item.tax.toFixed(2)}</td>
                  <td>${item.salesInclTax.toFixed(2)}</td>
                  <td>
                    <button className="btn btn-success btn-sm">SHOW BREAKDOWN</button>
                  </td>
                </tr>
              ))}
              <tr className="fw-bold bg-primary text-white">
                <td>Total:</td>
                <td>${totalSalesExclTax.toFixed(2)}</td>
                <td>${totalTax.toFixed(2)}</td>
                <td>${totalSalesInclTax.toFixed(2)}</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>

        <h6 className="mb-3">Example Integrations:</h6>

        <h5 className="mt-4">Tax Breakdown</h5>
        <div className="table-responsive card mb-3">
          <table className="table table-bordered mb-0 text-center align-middle">
            <thead className="table-light">
              <tr>
                <th>TAX NAME</th>
                <th>TAX CODE</th>
                <th>TAX %</th>
                <th>SALES EXC. TAX</th>
                <th>TAX TOTAL</th>
                <th>SALES INC. TAX</th>
              </tr>
            </thead>
            <tbody>
              {taxBreakdown.map((row, index) => (
                <tr key={index}>
                  <td>{row.name}</td>
                  <td>{row.code}</td>
                  <td>{row.rate.toFixed(2)}%</td>
                  <td>${row.salesExclTax.toFixed(2)}</td>
                  <td>${row.tax.toFixed(2)}</td>
                  <td>${row.salesInclTax.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mb-3">
          <button className="btn btn-outline-primary me-2">EXPORT TO CSV</button>
          <button className="btn btn-outline-primary me-2">EXPORT TO WORD</button>
          <button className="btn btn-outline-primary me-2">EXPORT TO EXCEL</button>
          <button className="btn btn-outline-secondary">PRINT</button>
        </div>
      </div>
    </div>
  );
}
