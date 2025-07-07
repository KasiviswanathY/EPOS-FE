"use client";

import React from "react";

export default function PromotionsComponent() {
  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="fw-bold mb-0">Promotions</h5>
                <button className="btn btn-sm text-white" style={{ backgroundColor: "#fd7e14" }}>Duplicate Promotion</button>               
        </div>
        <div className="card mb-4">
          <div className="card-header">
            <h6 className="card-title mb-0">Promotion</h6>
          </div>
          <div className="card-body">
            <form className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Name</label>
                <input type="text" className="form-control form-control-sm" />
                <small className="text-muted">Appears on Till and Receipts</small>
              </div>
              <div className="col-md-6">
                <label className="form-label">Description</label>
                <input type="text" className="form-control form-control-sm" />
                <small className="text-muted">Appears on Reports</small>
              </div>

              <div className="col-md-12">
                <label className="form-label">
                  Promotion Duration (Promotion only active between two dates or times)
                </label>
                <div className="form-check form-check-inline me-3">
                  <input className="form-check-input" type="checkbox" id="betweenDates" />
                  <label className="form-check-label" htmlFor="betweenDates">Between Dates</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="checkbox" id="betweenTimes" />
                  <label className="form-check-label" htmlFor="betweenTimes">Between Times</label>
                </div>
              </div>

              <div className="col-md-6">
                <label className="form-label">From and To Dates</label>
                <input type="text" className="form-control form-control-sm" />
              </div>
              <div className="col-md-6">
                <label className="form-label">From and To Times</label>
                <input type="text" className="form-control form-control-sm" />
              </div>

              <div className="col-md-6 d-flex align-items-center">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="mealDeal" />
                  <label className="form-check-label" htmlFor="mealDeal">Meal Deal</label>
                </div>
              </div>
              <div className="col-md-6">
                <label className="form-label">Number of Meal Deal Groups</label>
                <input type="number" className="form-control form-control-sm" />
              </div>

              <div className="col-md-6">
                <label className="form-label">Type</label>
                <select className="form-select form-select-sm">
                  <option>X For $</option>
                  <option>% Off</option>
                  <option>$ Off</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">Required Quantity and Amount</label>
                <div className="d-flex align-items-center gap-2">
                  <span>Buy</span>
                  <input type="number" className="form-control form-control-sm w-auto" defaultValue={2} />
                  <span>For $</span>
                  <input type="number" className="form-control form-control-sm w-auto" defaultValue={6.69} />
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="mixMatch" defaultChecked />
                  <label className="form-check-label" htmlFor="mixMatch">Mix and Match</label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="excludeDiscount" defaultChecked />
                  <label className="form-check-label" htmlFor="excludeDiscount">
                    Customer type discounts are exempt and will further reduce the promotional offer.
                  </label>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="enabled" defaultChecked />
                  <label className="form-check-label" htmlFor="enabled">Enabled</label>
                </div>
              </div>

              <div className="col-md-6">
                <label className="form-label">Days Enabled:</label>
                <div className="d-flex flex-wrap gap-2">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                    <div className="form-check me-3" key={day}>
                      <input className="form-check-input" type="checkbox" id={`day-${day}`} defaultChecked />
                      <label className="form-check-label" htmlFor={`day-${day}`}>{day}</label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-md-12">
                <label className="form-label">Customer Type</label>
                <select className="form-select form-select-sm w-50">
                  <option>None</option>
                  <option>Student</option>
                  <option>Senior</option>
                </select>
                <small className="text-muted d-block mt-1">
                  If the chosen Customer Type has a discount applied, this will further reduce the promotional offer price.
                </small>
              </div>
            </form>
          </div>
        </div>
        <div className="card mb-4">
          <div className="card-header">
            <h6 className="card-title mb-0">Add a Category or a Product to this Promotion</h6>
          </div>
          <div className="card-body">
            <p className="mb-2">
              You can add a category or a product, or a combination of both, to a promotion. Use the dropdowns and click "Add".
            </p>
            <p className="text-muted">
              You can filter the categories/products below by searching their names.
            </p>
            <div className="row align-items-end mb-3">
              <div className="col-md-9">
                <label className="form-label">Filter Categories:</label>
                <input type="text" className="form-control form-control-sm" />
              </div>
              <div className="col-md-3">
                <button className="btn btn-primary btn-sm w-50 mt-2">Search</button>
              </div>
            </div>
            <div className="row align-items-end mb-3">
              <div className="col-md-9">
                <label className="form-label">Category:</label>
                <select className="form-select form-select-sm">
                  <option>Top Level</option>
                </select>
              </div>
              <div className="col-md-3">
                <button className="btn btn-primary btn-sm w-50 mt-2">Add</button>
              </div>
            </div>
            <p className="text-muted">No Categories have been added to this Promotion.</p>
            <p className="text-muted mt-4">
              Selecting a category filters the product dropdown. You can also search below.
            </p>
            <div className="row align-items-end mb-3">
              <div className="col-md-9">
                <label className="form-label">Filter Products:</label>
                <input type="text" className="form-control form-control-sm" />
              </div>
              <div className="col-md-3">
                <button className="btn btn-primary btn-sm w-50 mt-2">Search</button>
              </div>
            </div>
            <div className="row align-items-end mb-3">
              <div className="col-md-9">
                <label className="form-label">Product:</label>
                <select className="form-select form-select-sm">
                  <option>Hunk Slice</option>
                </select>
              </div>
              <div className="col-md-3">
                <button className="btn btn-primary btn-sm w-50 mt-2">Add</button>
              </div>
            </div>
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th className="text-end">Remove</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Hunk Slice</td>
                    <td className="text-end">
                      <button className="btn btn-sm btn-danger">X</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="d-flex justify-content-between mt-3">
              <button className="btn btn-danger btn-sm">Cancel</button>
              <button className="btn btn-success btn-sm">Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
