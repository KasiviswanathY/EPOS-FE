"use client";

import React from "react";
import Link from "next/link";

export default function PromotionListComponent() {
  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="fw-bold mb-0">Promotions </h5>
         <button
            className="btn btn-sm"style={{ backgroundColor: "#FE9F43", color: "#fff", fontWeight: 600 }}>
            ADD PROMOTION
          </button>
        </div>
        <div className="card mb-3">
          <div className="card-body">
            <div className="row g-2 align-items-end">
              <div className="col-md-4">
                <label className="form-label">Filter by Promotion Type</label>
                <select className="form-select form-select-sm">
                  <option>* Show All</option>
                  <option>X for $</option>
                  <option>% Off</option>
                  <option>% Discount</option>
                  <option>Spend $ Save %</option>
                  <option>Spend $ Save $</option>
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label">Filter by Customer Type</label>
                <select className="form-select form-select-sm">
                  <option>* Show All</option>
                  <option>Student</option>
                  <option>Senior</option>
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label">Search by Name or Description</label>
                <div className="d-flex">
                  <input type="text" className="form-control form-control-sm" />
                  <button className="btn btn-sm btn-primary ms-2">SEARCH</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-bordered align-middle">
                <thead className="table-light">
                  <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Starts</th>
                    <th>Ends</th>
                    <th>Meal Deal</th>
                    <th>Type</th>
                    <th>Required Quantity</th>
                    <th>Amount</th>
                    <th>Mix and Match</th>
                    <th>Not used in Conjunction</th>
                    <th>Enabled</th>
                    <th>Days Enabled</th>
                    <th>Customer Type</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
               {Array.from({ length: 10 }).map((_, index) => (
                <tr key={index}>
                 <td></td>
                <td>Hunt Brothers Pizza {index + 2}/$6.{index + 69}</td>
                <td>Hunt Brothers Pizza {index + 2}/$6.{index + 69}</td>
            <td>--</td>
            <td>--</td>
            <td>--</td>
            <td>
            <select className="form-select form-select-sm">
             <option>X For $</option>
             <option>% Off</option>
             
             </select>
           </td>
           <td>Buy {index + 2}</td>
           <td>For ${((index + 2) * 3.33).toFixed(2)}</td>
           <td>Mix and Match</td>
           <td>Not used in Conjunction</td>
           <td>Enabled</td>
            <td>Mon, Tue, Wed, Thu, Fri, Sat, Sun</td>
            <td>All</td>
            <td className="text-end">
            <button className="btn btn-sm btn-primary me-1">EDIT</button>
            <button className="btn btn-sm btn-info text-white me-1">DETAILS</button>
            <button className="btn btn-sm btn-danger">X</button>
           </td>
           </tr>
           ))}
           </tbody>

              </table>
            </div>
            <div className="d-flex justify-content-between align-items-center mt-4">
              <nav>
                <ul className="pagination pagination-sm mb-0">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <li className="page-item" key={i}>
                      <a className={`page-link ${i === 0 ? "active" : ""}`} href="#">
                        {i + 1}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              <span>Items per page: 50</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
