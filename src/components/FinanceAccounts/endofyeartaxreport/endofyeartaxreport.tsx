"use client";
import { useState } from "react";

export default function EndOfYearTaxReport() {
  const [year, setYear] = useState(2025);
  const [location, setLocation] = useState("");
  const [device, setDevice] = useState("All Devices");

  const monthlyData = [
    { month: "January", salesExTax: 92349.43, taxTotal: 3733.24, salesIncTax: 96082.67 },
    { month: "February", salesExTax: 77014.09, taxTotal: 3090.15, salesIncTax: 80104.24 },
    { month: "March", salesExTax: 101750.53, taxTotal: 4110.56, salesIncTax: 105861.09 },
    { month: "April", salesExTax: 103289.82, taxTotal: 4105.51, salesIncTax: 107395.33 },
    { month: "May", salesExTax: 97057.77, taxTotal: 4292.72, salesIncTax: 101350.49 },
    { month: "June", salesExTax: 91809.92, taxTotal: 4192.64, salesIncTax: 96002.56 },
    { month: "July", salesExTax: 44575.13, taxTotal: 1931.37, salesIncTax: 46506.50 },
  ];

  const totals = monthlyData.reduce(
    (acc, item) => {
      acc.salesExTax += item.salesExTax;
      acc.taxTotal += item.taxTotal;
      acc.salesIncTax += item.salesIncTax;
      return acc;
    },
    { salesExTax: 0, taxTotal: 0, salesIncTax: 0 }
  );

  const handleApply = () => {
    console.log("Applied filters:", { year, location, device });
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <h4 className="fw-bold mb-3">End of Year Tax</h4>

        <div className="alert alert-light border p-3 mb-4">
          On this page you have a list of transactions by month, including the Tax amount.
        </div>

        <div className="card p-3 mb-4">
          <div className="row mb-3">
            <div className="col-md-4">
              <label>Filter by Year</label>
              <input
                type="number"
                className="form-control"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
              />
            </div>
            <div className="col-md-4">
              <label>Filter by Location</label>
              <input
                type="text"
                className="form-control"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter location"
              />
            </div>
            <div className="col-md-4">
              <label>Filter by Device</label>
              <select
                className="form-select"
                value={device}
                onChange={(e) => setDevice(e.target.value)}
              >
                <option>All Devices</option>
                <option>Device 1</option>
                <option>Device 2</option>
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

        <div className="table-responsive card p-3">
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>Month</th>
                <th>Sales Exc. Tax</th>
                <th>Tax Total</th>
                <th>Sales Inc. Tax</th>
              </tr>
            </thead>
            <tbody>
              {monthlyData.map((monthData, idx) => (
                <tr key={idx}>
                  <td>{monthData.month}</td>
                  <td>${monthData.salesExTax.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                  <td>${monthData.taxTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                  <td>${monthData.salesIncTax.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                </tr>
              ))}

              <tr className="fw-bold text-primary">
                <td>Total:</td>
                <td>${totals.salesExTax.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                <td>${totals.taxTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                <td>${totals.salesIncTax.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
