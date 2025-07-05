"use client";
import React from "react";
import Link from "next/link";

export default function SupplierListComponent() {
  const dummySuppliers = [
    {
      name: "CORE MARK",
      description: "CORE MARK Supplier",
      type: "General",
      address1: "123 Main St",
      address2: "Suite 101",
      town: "Raleigh",
      state: "NC",
      zip: "27601",
      contact1: "919-123-4567",
      contact2: "919-765-4321",
      email: "coremark@example.com",
    },
    {
      name: "Albemarle Distributors",
      description: "Albemarle Supplier",
      type: "Soft Drinks & Wines",
      address1: "456 Beverage Blvd",
      address2: "",
      town: "Charlotte",
      state: "NC",
      zip: "28202",
      contact1: "252-338-8936",
      contact2: "",
      email: "albemarle@example.com",
    },
    {
      name: "Sams Club",
      description: "Bulk Distributor",
      type: "Retail",
      address1: "789 Club Lane",
      address2: "Floor 2",
      town: "Durham",
      state: "NC",
      zip: "27701",
      contact1: "919-555-1111",
      contact2: "919-555-2222",
      email: "sams@example.com",
    },
    {
      name: "Pepsi",
      description: "Soda Supplier",
      type: "Beverages",
      address1: "Pepsi Way",
      address2: "Plant 5",
      town: "Winston-Salem",
      state: "NC",
      zip: "27101",
      contact1: "919-600-7000",
      contact2: "",
      email: "pepsi@example.com",
    },
    {
      name: "Coca Cola",
      description: "Beverage Co",
      type: "Drinks",
      address1: "Coca St",
      address2: "",
      town: "Greensboro",
      state: "NC",
      zip: "27401",
      contact1: "919-800-9000",
      contact2: "919-800-9001",
      email: "coke@example.com",
    },
    {
      name: "Sams Club",
      description: "Bulk Distributor",
      type: "Retail",
      address1: "789 Club Lane",
      address2: "Floor 2",
      town: "Durham",
      state: "NC",
      zip: "27701",
      contact1: "919-555-1111",
      contact2: "919-555-2222",
      email: "sams@example.com",
    },
    {
      name: "Pepsi",
      description: "Soda Supplier",
      type: "Beverages",
      address1: "Pepsi Way",
      address2: "Plant 5",
      town: "Winston-Salem",
      state: "NC",
      zip: "27101",
      contact1: "919-600-7000",
      contact2: "",
      email: "pepsi@example.com",
    },
    {
      name: "Sams Club",
      description: "Bulk Distributor",
      type: "Retail",
      address1: "789 Club Lane",
      address2: "Floor 2",
      town: "Durham",
      state: "NC",
      zip: "27701",
      contact1: "919-555-1111",
      contact2: "919-555-2222",
      email: "sams@example.com",
    },
    {
      name: "CORE MARK",
      description: "CORE MARK Supplier",
      type: "General",
      address1: "123 Main St",
      address2: "Suite 101",
      town: "Raleigh",
      state: "NC",
      zip: "27601",
      contact1: "919-123-4567",
      contact2: "919-765-4321",
      email: "coremark@example.com",
    },
    
  ];

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="mb-0">Suppliers List</h4>
          <Link href="/addsuppliers" className="btn btn-sm btn-primary">ADD SUPPLIERS LIST</Link>

        </div>
        <div className="card mb-4">
          <div className="card-body">
            <div className="d-flex">
              <input
                type="text"
                className="form-control me-2"
                placeholder="Filter by Description, Type or Address"
              />
              <button className="btn btn-primary">Search</button>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-bordered table-striped">
                <thead className="thead-light">
                  <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Type</th>
                    <th>Address 1</th>
                    <th>Address 2</th>
                    <th>Town</th>
                    <th>State</th>
                    <th>Zip Code</th>
                    <th>Contact Number</th>
                    <th>Contact Number 2</th>
                    <th>Email Address</th>
                    <th>Directions</th>
                    <th>Map</th>
                    <th>Delete</th>
                    <th>Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {dummySuppliers.map((s, index) => (
                    <tr key={index}>
                      <td>{s.name}</td>
                      <td>{s.description}</td>
                      <td>{s.type}</td>
                      <td>{s.address1}</td>
                      <td>{s.address2 || "-"}</td>
                      <td>{s.town}</td>
                      <td>{s.state}</td>
                      <td>{s.zip}</td>
                      <td>{s.contact1}</td>
                      <td>{s.contact2 || "-"}</td>
                      <td>{s.email}</td>
                      <td>
                        <select
                          className="form-select form-select-sm w-100"
                          style={{ minWidth: "160px" }}
                        >
                          <option>* Select Location</option>
                          <option>Warehouse</option>
                          <option>Delivery Hub</option>
                          <option>Main Office</option>
                        </select>
                      </td>
                      <td>
                        <button className="btn btn-outline-info btn-sm">MAP</button>
                      </td>
                      <td>
                        <button className="btn btn-outline-danger btn-sm">X</button>
                      </td>
                      <td>
                        <button className="btn btn-outline-primary btn-sm">EDIT</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <nav className="mt-3">
              <ul className="pagination">
                <li className="page-item active">
                  <a className="page-link" href="#">1</a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">2</a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">3</a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">4</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
