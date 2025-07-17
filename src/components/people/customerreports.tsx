"use client";
import { useState } from "react";

const sampleData = [
  {
    title: "Mr",
    firstName: "Tiny",
    lastName: "Manth",
    businessName: "Top Notch",
    dob: "",
    address1: "",
    address2: "",
    town: "",
    state: "",
    zip: "",
    contact1: "",
    contact2: "",
    email: "",
    type: "",
    currentBalance: -223.82,
    maxCredit: 300,
    totalSpend: 223.82,
    lastTransaction: "11/10/2017 8:44:11 AM",
    avgSpend: 223.82,
    transactions: 1,
    signUp: "11/10/2017 12:48:15 PM",
  },
  {
    title: "Mrs",
    firstName: "Carrie",
    lastName: "Privott",
    businessName: "Mrs Kaye",
    dob: "",
    address1: "",
    address2: "",
    town: "",
    state: "",
    zip: "",
    contact1: "",
    contact2: "",
    email: "",
    type: "",
    currentBalance: -286.83,
    maxCredit: 300,
    totalSpend: 286.83,
    lastTransaction: "11/10/2017 8:46:55 AM",
    avgSpend: 286.83,
    transactions: 1,
    signUp: "11/10/2017 12:48:15 PM",
  },
   {
    title: "Mrs",
    firstName: "Carrie",
    lastName: "Privott",
    businessName: "Mrs Kaye",
    dob: "",
    address1: "",
    address2: "",
    town: "",
    state: "",
    zip: "",
    contact1: "",
    contact2: "",
    email: "",
    type: "",
    currentBalance: -286.83,
    maxCredit: 300,
    totalSpend: 286.83,
    lastTransaction: "11/10/2017 8:46:55 AM",
    avgSpend: 286.83,
    transactions: 1,
    signUp: "11/10/2017 12:48:15 PM",
  },
   {
    title: "Mrs",
    firstName: "Carrie",
    lastName: "Privott",
    businessName: "Mrs Kaye",
    dob: "",
    address1: "",
    address2: "",
    town: "",
    state: "",
    zip: "",
    contact1: "",
    contact2: "",
    email: "",
    type: "",
    currentBalance: -286.83,
    maxCredit: 300,
    totalSpend: 286.83,
    lastTransaction: "11/10/2017 8:46:55 AM",
    avgSpend: 286.83,
    transactions: 1,
    signUp: "11/10/2017 12:48:15 PM",
  },
   {
    title: "Mrs",
    firstName: "Carrie",
    lastName: "Privott",
    businessName: "Mrs Kaye",
    dob: "",
    address1: "",
    address2: "",
    town: "",
    state: "",
    zip: "",
    contact1: "",
    contact2: "",
    email: "",
    type: "",
    currentBalance: -286.83,
    maxCredit: 300,
    totalSpend: 286.83,
    lastTransaction: "11/10/2017 8:46:55 AM",
    avgSpend: 286.83,
    transactions: 1,
    signUp: "11/10/2017 12:48:15 PM",
  },
   {
    title: "Mrs",
    firstName: "Carrie",
    lastName: "Privott",
    businessName: "Mrs Kaye",
    dob: "",
    address1: "",
    address2: "",
    town: "",
    state: "",
    zip: "",
    contact1: "",
    contact2: "",
    email: "",
    type: "",
    currentBalance: -286.83,
    maxCredit: 300,
    totalSpend: 286.83,
    lastTransaction: "11/10/2017 8:46:55 AM",
    avgSpend: 286.83,
    transactions: 1,
    signUp: "11/10/2017 12:48:15 PM",
  },
];

export default function CustomerReportPage() {
  const [filters, setFilters] = useState({
    creditStatus: "* All Statuses",
    customerType: "* Show All",
    location: "",
    keyword: "",
  });

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header d-flex justify-content-between align-items-center">
          <h4 className="fw-bold">Customer Report</h4>
          <a href="#" className="text-primary small">HELP</a>
        </div>

        <div className="card mb-3">
          <div className="card-body">
            <p>
              Shown on this page is the complete list of customers associated with this business.
            </p>
            <p className="text-muted">
              Giving you the scope to identify your VIP customers and offer the chance to refine your marketing systems.
            </p>
          </div>
        </div>

        <div className="card mb-3">
          <div className="card-body">
            {/* Filters */}
            <div className="mb-3">
              <label className="form-label">Filter by Credit Status</label>
              <select className="form-select" value={filters.creditStatus}>
                <option>* All Statuses</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Filter by Customer Type</label>
              <select className="form-select" value={filters.customerType}>
                <option>* Show All</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Filter by Location</label>
              <select className="form-select" value={filters.location}>
                <option>Select Location</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Filter by Any Detail</label>
              <input
                type="text"
                className="form-control"
                placeholder="Search..."
                value={filters.keyword}
                onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
              />
            </div>
            <div className="d-flex flex-wrap gap-2 mb-3">
              <button className="btn btn-outline-primary">EXPORT TO CSV</button>
              <button className="btn btn-outline-primary">EXPORT TO WORD</button>
              <button className="btn btn-outline-primary">EXPORT TO EXCEL</button>
              <button className="btn btn-outline-secondary">PRINT</button>
              <button className="btn btn-outline-success">EXPORT TO MAILCHIMP</button>
            </div>
            <div className="d-flex justify-content-end gap-2">
              <button className="btn btn-link text-muted">RESET</button>
              <button className="btn btn-info text-white">APPLY</button>
            </div>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-bordered table-hover table-striped">
            <thead className="table-light">
              <tr>
                <th>Title</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Business Name</th>
                <th>Date of Birth</th>
                <th>Address Line 1</th>
                <th>Address Line 2</th>
                <th>Town</th>
                <th>State</th>
                <th>Zip Code</th>
                <th>Contact Number</th>
                <th>Contact Number 2</th>
                <th>Email Address</th>
                <th>Customer Type</th>
                <th>Current Balance</th>
                <th>Max Credit</th>
                <th>Total Spend</th>
                <th>Last Transaction Date</th>
                <th>Average Spend</th>
                <th>Total Transactions</th>
                <th>Signup Date</th>
              </tr>
            </thead>
            <tbody>
              {sampleData.map((cust, index) => (
                <tr key={index}>
                  <td>{cust.title}</td>
                  <td>{cust.firstName}</td>
                  <td>{cust.lastName}</td>
                  <td>{cust.businessName}</td>
                  <td>{cust.dob}</td>
                  <td>{cust.address1}</td>
                  <td>{cust.address2}</td>
                  <td>{cust.town}</td>
                  <td>{cust.state}</td>
                  <td>{cust.zip}</td>
                  <td>{cust.contact1}</td>
                  <td>{cust.contact2}</td>
                  <td>{cust.email}</td>
                  <td>{cust.type}</td>
                  <td className={cust.currentBalance < 0 ? "text-danger fw-bold" : ""}>
                    ${cust.currentBalance.toFixed(2)}
                  </td>
                  <td>${cust.maxCredit.toFixed(2)}</td>
                  <td>${cust.totalSpend.toFixed(2)}</td>
                  <td>{cust.lastTransaction}</td>
                  <td>${cust.avgSpend.toFixed(2)}</td>
                  <td>{cust.transactions}</td>
                  <td>{cust.signUp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
