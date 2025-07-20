"use client";
import { useState } from "react";
import Link from "next/link";
export default function EndOfDayVarianceReport() {
  const [dateRange, setDateRange] = useState("Last 7 days");
  const [location, setLocation] = useState("");
  const [staff, setStaff] = useState("All Staff");
  const [device, setDevice] = useState("All Devices");

  const additionalInfo = [
    "Show Sales Breakdown",
    "Show Wet Dry Breakdown",
    "Show Product Breakdown",
    "Show Employee Breakdown",
    "Show Refund Breakdown",
    "Show Category Breakdown",
    "Show Void Summary Breakdown",
    "Show Tax Summary Breakdown",
    "Show Credit Purchased Breakdown",
    "Show Credit Spent Breakdown",
  ];

  const data = [
    {
      ref: 3607,
      id: 5778894,
      till: "Till1",
      location: "Location A",
      openedBy: "Jagrut",
      openedAt: "7/15/2025 5:52:01 AM",
      closedBy: "Jagrut",
      closedAt: "7/15/2025 9:04:04 PM",
      openingBalance: "$0.00",
      netSales: "$2,958.81",
      transactions: 228,
      credits: "$0.00",
      pettyCash: "-$1,852.16",
      tipOuts: "$0.00",
      banked: "$0.00",
      expected: "$836.65",
      actual: "$0.00",
      variance: "-$836.65",
    },
    {
      ref: 3608,
      id: 5778894,
      till: "Till1",
      location: "Location A",
      openedBy: "Jagrut",
      openedAt: "7/15/2025 5:52:01 AM",
      closedBy: "Jagrut",
      closedAt: "7/15/2025 9:04:04 PM",
      openingBalance: "$0.00",
      netSales: "$2,958.81",
      transactions: 228,
      credits: "$0.00",
      pettyCash: "-$1,852.16",
      tipOuts: "$0.00",
      banked: "$0.00",
      expected: "$836.65",
      actual: "$0.00",
      variance: "-$836.65",
    },
    {
      ref: 3609,
      id: 5778894,
      till: "Till1",
      location: "Location A",
      openedBy: "Jagrut",
      openedAt: "7/15/2025 5:52:01 AM",
      closedBy: "Jagrut",
      closedAt: "7/15/2025 9:04:04 PM",
      openingBalance: "$0.00",
      netSales: "$2,958.81",
      transactions: 228,
      credits: "$0.00",
      pettyCash: "-$1,852.16",
      tipOuts: "$0.00",
      banked: "$0.00",
      expected: "$836.65",
      actual: "$0.00",
      variance: "-$836.65",
    },
    {
      ref: 3610,
      id: 5778894,
      till: "Till1",
      location: "Location A",
      openedBy: "Jagrut",
      openedAt: "7/15/2025 5:52:01 AM",
      closedBy: "Jagrut",
      closedAt: "7/15/2025 9:04:04 PM",
      openingBalance: "$0.00",
      netSales: "$2,958.81",
      transactions: 228,
      credits: "$0.00",
      pettyCash: "-$1,852.16",
      tipOuts: "$0.00",
      banked: "$0.00",
      expected: "$836.65",
      actual: "$0.00",
      variance: "-$836.65",
    },
    {
      ref: 3611,
      id: 5778894,
      till: "Till1",
      location: "Location A",
      openedBy: "Jagrut",
      openedAt: "7/15/2025 5:52:01 AM",
      closedBy: "Jagrut",
      closedAt: "7/15/2025 9:04:04 PM",
      openingBalance: "$0.00",
      netSales: "$2,958.81",
      transactions: 228,
      credits: "$0.00",
      pettyCash: "-$1,852.16",
      tipOuts: "$0.00",
      banked: "$0.00",
      expected: "$836.65",
      actual: "$0.00",
      variance: "-$836.65",
    },
    {
      ref: 3612,
      id: 5778894,
      till: "Till1",
      location: "Location A",
      openedBy: "Jagrut",
      openedAt: "7/15/2025 5:52:01 AM",
      closedBy: "Jagrut",
      closedAt: "7/15/2025 9:04:04 PM",
      openingBalance: "$0.00",
      netSales: "$2,958.81",
      transactions: 228,
      credits: "$0.00",
      pettyCash: "-$1,852.16",
      tipOuts: "$0.00",
      banked: "$0.00",
      expected: "$836.65",
      actual: "$0.00",
      variance: "-$836.65",
    },
  ];

  const handleApply = () => {
    console.log("Filters applied:", { dateRange, location, staff, device });
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <h4 className="fw-bold mb-3">End of Day Variance </h4>

        <div className="alert alert-light border p-3 mb-4">
          On this page you can view reports on End of Day till closure variance.
          This will help you to identify any discrepancies or variances in your transactions.
        </div>

        <div className="card p-3 mb-4">
          <div className="row mb-3">
            <div className="col-md-4">
              <label>Show data from</label>
              <select className="form-select" value={dateRange} onChange={(e) => setDateRange(e.target.value)}>
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>This Month</option>
                <option>Last Month</option>
              </select>
              <small className="text-muted">10 Jul 2025 - 16 Jul 2025</small>
            </div>

           <div className="col-md-4">
  <label>Filter by Location</label>
  <select
    className="form-select"
    value={location}
    onChange={(e) => setLocation(e.target.value)}
  >
    <option value="">Select Location</option>
    <option value="Location A">Location A</option>
    <option value="Location B">Location B</option>
    <option value="Location C">Location C</option>
  </select>
</div>


            <div className="col-md-2">
              <label>Filter by Device</label>
              <select className="form-select" value={device} onChange={(e) => setDevice(e.target.value)}>
                <option>All Devices</option>
                <option>Device A</option>
                <option>Device B</option>
              </select>
            </div>

            <div className="col-md-2">
              <label>Filter by Staff</label>
              <select className="form-select" value={staff} onChange={(e) => setStaff(e.target.value)}>
                <option>All Staff</option>
                <option>Staff A</option>
                <option>Staff B</option>
              </select>
            </div>
          </div>

          <div className="mb-3">
            <label>Show additional information</label>
            <div className="d-flex flex-wrap gap-3 mt-2">
              {additionalInfo.map((info, idx) => (
                <div key={idx} className="form-check">
                  <input className="form-check-input" type="checkbox" defaultChecked />
                  <label className="form-check-label">{info}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center mt-3">
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
                <th>End of Day Ref</th>
                <th>End of Day ID</th>
                <th>Till Name</th>
                <th>Location</th>
                <th>Opened By</th>
                <th>Date/Time Opened</th>
                <th>Closed By</th>
                <th>Date/Time Closed</th>
                <th>Opening Balance</th>
                <th>Net Sales Inc. Tax</th>
                <th>Transaction Qty</th>
                <th>Customer Credits Purchased</th>
                <th>Petty Cash</th>
                <th>Cash Tip Outs</th>
                <th>Banked</th>
                <th>Expected</th>
                <th>Actual</th>
                <th>Variance</th>
                <th>Show Tenders</th>
                <th>Show Notes</th>
              </tr>
            </thead>
            <tbody>
              {data.map((d, idx) => (
                <tr key={idx}>
                  <td>{d.ref}</td>
                  <td>{d.id}</td>
                  <td>{d.till}</td>
                  <td>{d.location}</td>
                  <td>{d.openedBy}</td>
                  <td>{d.openedAt}</td>
                  <td>{d.closedBy}</td>
                  <td>{d.closedAt}</td>
                  <td>{d.openingBalance}</td>
                  <td>{d.netSales}</td>
                  <td>{d.transactions}</td>
                  <td>{d.credits}</td>
                  <td>{d.pettyCash}</td>
                  <td>{d.tipOuts}</td>
                  <td>{d.banked}</td>
                  <td>{d.expected}</td>
                  <td>{d.actual}</td>
                  <td className="text-danger fw-bold">{d.variance}</td>
                  <td>
  <Link href={"/showtenders"}>
    <button className="btn btn-success btn-sm">SHOW TENDERS</button>
  </Link>
</td>
                  <td><button className="btn btn-success btn-sm">SHOW NOTES</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
