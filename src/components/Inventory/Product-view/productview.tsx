"use client";
/* eslint-disable @next/next/no-img-element */

import CollapesIcon from "@/core/common/tooltip-content/collapes";
import RefreshIcon from "@/core/common/tooltip-content/refresh";
import TooltipIcons from "@/core/common/tooltip-content/tooltipIcons";
import { all_routes } from "@/data/all_routes";
import { PlusCircle } from "feather-icons-react";
import Link from "next/link";
import React from "react";
export default function ProductviewComponent  ()  {
  return (
    <>
<div className="page-wrapper">
  <div className="content">
    <div className="card mb-4">
  <div className="card-body">
    <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-3">
      <div className="flex-grow-1">
        <label className="form-label d-block">Search by Product, Barcode, Supplier or SKU</label>
        <div className="d-flex">
          <input
            type="text"
            className="form-control me-2"
            placeholder="Enter product info..."
          />
          <button className="btn btn-primary">Search</button>
        </div>
      </div>
      <div className="ms-3" style={{ minWidth: "200px" }}>
        <label className="form-label">Filter by Category</label>
        <select className="form-select">
          <option>Top Level</option>
          <option>Category A</option>
          <option>Category B</option>
          <option>Category C</option>
        </select>
      </div>
      <div className="d-flex flex-column">
      <label className="form-label invisible">.</label> {/* Spacer for alignment */}
      <button className="btn" style={{ backgroundColor: "#FFA500", color: "#fff" }}>
        Add Product
       </button>
       </div>
       </div>
      <div className="d-flex flex-wrap gap-4">
      <label className="form-check-label">
        <input type="checkbox" className="form-check-input me-1" />
        Show Price Details
      </label>
      <label className="form-check-label">
        <input type="checkbox" className="form-check-input me-1" />
        Show Supplier Details
      </label>
      <label className="form-check-label">
        <input type="checkbox" className="form-check-input me-1" />
        Show Till Details
      </label>
    </div>
  </div>
</div>
  <div className="employee-grid-widget">
  <div className="row"> 
   <div className="card">
  <div className="card-body">
    <div className="table-responsive">
      <table className="table table-bordered table-striped">
        <thead className="thead-light">
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Barcode</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Hershey Ice Cream 6 OZ Cups</td>
            <td>Hershey Ice Cream 6 OZ Cups</td>
            <td>070640023974</td>
            <td>Ice Cream</td>
            <td>
              <button className="btn btn-sm btn-outline-primary me-1">Quick Edit</button>
              <button className="btn btn-sm btn-outline-secondary me-1">Edit</button>
              <button className="btn btn-sm btn-outline-info me-1">Inventory</button>
              <button className="btn btn-sm btn-outline-success me-1">
                <i className="ti ti-archive"></i>
              </button>
              <button className="btn btn-sm btn-outline-danger">
                <i className="ti ti-trash"></i>
              </button>
            </td>
          </tr>
          <tr>
            <td>Mass Energy Drinks</td>
            <td>Mass Energy Drinks</td>
            <td>***********</td>
            <td>Mass Energy Drinks</td>
            <td>
              <button className="btn btn-sm btn-outline-primary me-1">Quick Edit</button>
              <button className="btn btn-sm btn-outline-secondary me-1">Edit</button>
              <button className="btn btn-sm btn-outline-info me-1">Inventory</button>
              <button className="btn btn-sm btn-outline-success me-1">
                <i className="ti ti-archive"></i>
              </button>
              <button className="btn btn-sm btn-outline-danger">
                <i className="ti ti-trash"></i>
              </button>
            </td>
          </tr>
          <tr>
            <td>Juicy Drop Sour Gel</td>
            <td>Juicy Drop Sour Gel</td>
            <td>070640023974</td>
            <td>Candy</td>
            <td>
              <button className="btn btn-sm btn-outline-primary me-1">Quick Edit</button>
              <button className="btn btn-sm btn-outline-secondary me-1">Edit</button>
              <button className="btn btn-sm btn-outline-info me-1">Inventory</button>
              <button className="btn btn-sm btn-outline-success me-1">
                <i className="ti ti-archive"></i>
              </button>
              <button className="btn btn-sm btn-outline-danger">
                <i className="ti ti-trash"></i>
              </button>
            </td>
          </tr>
          <tr>
            <td>Hershey Ice Cream 6 OZ Cups</td>
            <td>Hershey Ice Cream 6 OZ Cups</td>
            <td>070640023974</td>
            <td>Ice Cream</td>
            <td>
              <button className="btn btn-sm btn-outline-primary me-1">Quick Edit</button>
              <button className="btn btn-sm btn-outline-secondary me-1">Edit</button>
              <button className="btn btn-sm btn-outline-info me-1">Inventory</button>
              <button className="btn btn-sm btn-outline-success me-1">
                <i className="ti ti-archive"></i>
              </button>
              <button className="btn btn-sm btn-outline-danger">
                <i className="ti ti-trash"></i>
              </button>
            </td>
          </tr>
          <tr>
            <td>Water</td>
            <td>Water</td>
            <td>8492050673</td>
            <td>Water</td>
            <td>
              <button className="btn btn-sm btn-outline-primary me-1">Quick Edit</button>
              <button className="btn btn-sm btn-outline-secondary me-1">Edit</button>
              <button className="btn btn-sm btn-outline-info me-1">Inventory</button>
              <button className="btn btn-sm btn-outline-success me-1">
                <i className="ti ti-archive"></i>
              </button>
              <button className="btn btn-sm btn-outline-danger">
                <i className="ti ti-trash"></i>
              </button>
            </td>
          </tr>
          <tr>
            <td>Soda</td>
            <td>Soda</td>
            <td>********</td>
            <td>Soda</td>
            <td>
              <button className="btn btn-sm btn-outline-primary me-1">Quick Edit</button>
              <button className="btn btn-sm btn-outline-secondary me-1">Edit</button>
              <button className="btn btn-sm btn-outline-info me-1">Inventory</button>
              <button className="btn btn-sm btn-outline-success me-1">
                <i className="ti ti-archive"></i>
              </button>
              <button className="btn btn-sm btn-outline-danger">
                <i className="ti ti-trash"></i>
              </button>
            </td>
          </tr>
          <tr>
            <td>Juice</td>
            <td>Juice</td>
            <td>*********</td>
            <td>Juice</td>
            <td>
              <button className="btn btn-sm btn-outline-primary me-1">Quick Edit</button>
              <button className="btn btn-sm btn-outline-secondary me-1">Edit</button>
              <button className="btn btn-sm btn-outline-info me-1">Inventory</button>
              <button className="btn btn-sm btn-outline-success me-1">
                <i className="ti ti-archive"></i>
              </button>
              <button className="btn btn-sm btn-outline-danger">
                <i className="ti ti-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  <nav className="mt-3">
      <ul className="pagination">
        <li className="page-item active"><a className="page-link" href="#">1</a></li>
        <li className="page-item"><a className="page-link" href="#">2</a></li>
        <li className="page-item"><a className="page-link" href="#">3</a></li>
        <li className="page-item"><a className="page-link" href="#">Next</a></li>
      </ul>
    </nav>
   <div className="mt-3">
      <button className="btn btn-outline-primary me-2">Export to .CSV</button>
      <button className="btn btn-outline-primary me-2">Export to Word</button>
      <button className="btn btn-outline-primary me-2">Export to Excel</button>
      <button className="btn btn-outline-secondary">Print</button>
    </div>
  </div>
</div>
</div>
</div>
</div>
</div>
</>

  );
};

