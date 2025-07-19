"use client";
import { useState } from "react";

export default function MonthlyTaxComponent() {
  const [year, setYear] = useState("2025");
  const [month, setMonth] = useState("July");
  const [location, setLocation] = useState("");
  const [device, setDevice] = useState("All Devices");

  const defaultFilters = {
    year: "2025",
    month: "July",
    location: "",
    device: "All Devices",
  };

  const handleReset = () => {
    setYear(defaultFilters.year);
    setMonth(defaultFilters.month);
    setLocation(defaultFilters.location);
    setDevice(defaultFilters.device);
  };

  const handleApply = () => {
    // You can fetch or filter data here based on current state
    console.log("Applied Filters:", { year, month, location, device });
  };

  const taxSummary = [
    {
      name: "Sales Tax (2%)",
      code: "02",
      rate: 2.0,
      salesExclTax: 45.65,
      tax: 0.93,
      salesInclTax: 46.58,
    },
    {
      name: "Sales Tax (6.75%)",
      code: "01",
      rate: 6.75,
      salesExclTax: 28609.06,
      tax: 1930.44,
      salesInclTax: 30539.50,
    },
    {
      name: "Tax Free",
      code: "03",
      rate: 0.0,
      salesExclTax: 15920.42,
      tax: 0.0,
      salesInclTax: 15920.42,
    },
    {
      name: "Sales Tax (6.75%)",
      code: "01",
      rate: 6.75,
      salesExclTax: 28609.06,
      tax: 1930.44,
      salesInclTax: 30539.50,
    },
    {
      name: "Sales Tax (6.75%)",
      code: "01",
      rate: 6.75,
      salesExclTax: 28609.06,
      tax: 1930.44,
      salesInclTax: 30539.50,
    },
    {
      name: "Sales Tax (6.75%)",
      code: "01",
      rate: 6.75,
      salesExclTax: 28609.06,
      tax: 1930.44,
      salesInclTax: 30539.50,
    },
    {
      name: "Sales Tax (6.75%)",
      code: "01",
      rate: 6.75,
      salesExclTax: 28609.06,
      tax: 1930.44,
      salesInclTax: 30539.50,
    },
  ];

  const totalTax = taxSummary.reduce((acc, t) => acc + t.tax, 0);

  return (
    <div className="page-wrapper px-4 py-4">
      <div className="content">
        <h4 className="fw-bold mb-2">
          Monthly Tax <span className="text-primary">HELP</span>
        </h4>
        <p className="mb-4">On this page you have a breakdown of all tax by tax rate.</p>

        <div className="row g-3 mb-3">
          <div className="col-md-3">
            <label className="form-label">Year</label>
            <select className="form-select" value={year} onChange={(e) => setYear(e.target.value)}>
              <option>2025</option>
              <option>2024</option>
              <option>2023</option>
            </select>
          </div>

          <div className="col-md-3">
            <label className="form-label">Month</label>
            <select className="form-select" value={month} onChange={(e) => setMonth(e.target.value)}>
              {[
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
              ].map((m) => (
                <option key={m}>{m}</option>
              ))}
            </select>
          </div>

          <div className="col-md-3">
            <label className="form-label">Filter by Location</label>
            <input
              className="form-control"
              placeholder="Enter location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div className="col-md-3">
            <label className="form-label">Filter by Device</label>
            <select className="form-select" value={device} onChange={(e) => setDevice(e.target.value)}>
              <option>All Devices</option>
              <option>Device A</option>
              <option>Device B</option>
            </select>
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center mb-3">
  <div>
    <button className="btn btn-outline-warning me-2">EXPORT TO .CSV</button>
    <button className="btn btn-outline-warning me-2">EXPORT TO WORD</button>
    <button className="btn btn-outline-warning me-2">EXPORT TO EXCEL</button>
    <button className="btn btn-outline-dark">PRINT</button>
  </div>
  <div>
    <button
      className="btn btn-link text-decoration-none text-primary me-2 fw-bold"
      onClick={handleReset}
    >
      RESET
    </button>
    <button className="btn btn-warning fw-bold" onClick={handleApply}>
      APPLY
    </button>
  </div>
</div>


        <div className="table-responsive card mb-4">
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
              {taxSummary.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.code}</td>
                  <td>{item.rate.toFixed(3)}%</td>
                  <td>${item.salesExclTax.toFixed(2)}</td>
                  <td>${item.tax.toFixed(2)}</td>
                  <td>${item.salesInclTax.toFixed(2)}</td>
                </tr>
              ))}
              <tr className="fw-bold bg-primary text-white">
                <td colSpan={4}>Total:</td>
                <td>${totalTax.toFixed(2)}</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mt-3">Example Integrations:</p>
      </div>
    </div>
  );
}
