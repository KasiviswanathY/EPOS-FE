"use client";
import { useState } from "react";

export default function QuarterlyTaxReport() {
  const [year, setYear] = useState(2025);
  const [location, setLocation] = useState("");
  const [device, setDevice] = useState("All Devices");

  const taxData = [
    {
      name: "Sales Tax (2%)",
      rate: 2.0,
      code: "02",
      quarters: [2.41, 0.93, 0, 0],
      gross: [118.96, 46.58, 0, 0],
      net: [116.55, 45.65, 0, 0],
    },
    {
      name: "Sales Tax (6.75%)",
      rate: 6.75,
      code: "01",
      quarters: [12588.46, 1930.44, 0, 0],
      gross: [199075.59, 30539.5, 0, 0],
      net: [186487.13, 28609.06, 0, 0],
    },
    {
      name: "Tax Free",
      rate: 0.0,
      code: "03",
      quarters: [0, 0, 0, 0],
      gross: [105535.89, 15920.42, 0, 0],
      net: [105535.89, 15920.42, 0, 0],
    },
    {
      name: "Non Tax Tracked",
      rate: 0.0,
      code: "NT",
      quarters: [0, 0, 0, 0],
      gross: [17.94, 0, 0, 0],
      net: [17.94, 0, 0, 0],
    },
  ];

  const handleApply = () => {
    console.log("Filters Applied: ", { year, location, device });
  };

  const totalTaxPerQuarter = [0, 0, 0, 0];
  taxData.forEach(t => {
    t.quarters.forEach((val, idx) => totalTaxPerQuarter[idx] += val);
  });

  return (
    <div className="page-wrapper">
      <div className="content">
        <h4 className="fw-bold mb-3">Quarterly Tax</h4>

        <div className="alert alert-light border p-3 mb-4">
          On this page you have the breakdown of your taxes, spread by quarter against each tax rate.
          Any products with no tax rate will be grouped into 'Non Tax Tracked'.
        </div>

        <div className="card p-3 mb-4">
          <div className="row mb-3">
            <div className="col-md-4">
              <label>Year Starting</label>
              <input
                type="number"
                className="form-control"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
              />
            </div>
            <div className="col-md-4 d-flex align-items-end">
              <div className="form-check mt-4">
                <input type="checkbox" className="form-check-input" id="runSpecific" />
                <label className="form-check-label" htmlFor="runSpecific">Run from specific date</label>
              </div>
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
                <th>Tax Rate</th>
                <th>Tax Rate %</th>
                <th>Tax Code</th>
                <th>Q1 Tax</th>
                <th>Q1 Net</th>
                <th>Q1 Gross</th>
                <th>Q2 Tax</th>
                <th>Q2 Net</th>
                <th>Q2 Gross</th>
                <th>Q3 Tax</th>
                <th>Q3 Net</th>
                <th>Q3 Gross</th>
                <th>Q4 Tax</th>
                <th>Q4 Net</th>
                <th>Q4 Gross</th>
              </tr>
            </thead>
            <tbody>
              {taxData.map((tax, index) => (
                <tr key={index}>
                  <td>{tax.name}</td>
                  <td>{tax.rate.toFixed(3)}%</td>
                  <td>{tax.code}</td>

                  <td>${tax.quarters[0].toFixed(2)}</td>
                  <td>${tax.net[0].toFixed(2)}</td>
                  <td>${tax.gross[0].toFixed(2)}</td>

                  <td>${tax.quarters[1].toFixed(2)}</td>
                  <td>${tax.net[1].toFixed(2)}</td>
                  <td>${tax.gross[1].toFixed(2)}</td>

                  <td>${tax.quarters[2].toFixed(2)}</td>
                  <td>${tax.net[2].toFixed(2)}</td>
                  <td>${tax.gross[2].toFixed(2)}</td>

                  <td>${tax.quarters[3].toFixed(2)}</td>
                  <td>${tax.net[3].toFixed(2)}</td>
                  <td>${tax.gross[3].toFixed(2)}</td>
                </tr>
              ))}
              <tr className="fw-bold text-primary">
                <td colSpan={3}>Total:</td>

                <td>${totalTaxPerQuarter[0].toFixed(2)}</td>
                <td></td><td></td>

                <td>${totalTaxPerQuarter[1].toFixed(2)}</td>
                <td></td><td></td>

                <td>${totalTaxPerQuarter[2].toFixed(2)}</td>
                <td></td><td></td>

                <td>${totalTaxPerQuarter[3].toFixed(2)}</td>
                <td></td><td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
