"use client";

import Link from "next/link";
import { useState } from "react";

const locationData = [
  {
    name: "Office HQ",
    description: "Main corporate office",
    address: "123 Main St, Mumbai",
    email: "hq@example.com",
  },
  {
    name: "Branch A",
    description: "Secondary branch",
    address: "456 Ring Road, Delhi",
    email: "branch@example.com",
  },
  {
    name: "Office HQ",
    description: "Main corporate office",
    address: "123 Main St, Mumbai",
    email: "hq@example.com",
  },
  {
    name: "Office HQ",
    description: "Main corporate office",
    address: "123 Main St, Mumbai",
    email: "hq@example.com",
  },
  {
    name: "Office HQ",
    description: "Main corporate office",
    address: "123 Main St, Mumbai",
    email: "hq@example.com",
  },
  {
    name: "Office HQ",
    description: "Main corporate office",
    address: "123 Main St, Mumbai",
    email: "hq@example.com",
  },
  {
    name: "Office HQ",
    description: "Main corporate office",
    address: "123 Main St, Mumbai",
    email: "hq@example.com",
  },
  {
    name: "Office HQ",
    description: "Main corporate office",
    address: "123 Main St, Mumbai",
    email: "hq@example.com",
  },

];

export default function LocationsListComponent() {
  const [filter, setFilter] = useState("");

  const filteredData = locationData.filter((item) =>
    item.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header d-flex justify-content-between align-items-center">
          <h4 className="fw-bold">Locations</h4>
          <div>
          <Link href="/addlocationlist" className="btn btn-primary me-2"> Add Location</Link>

            <Link href="/show-devices" className="btn btn-secondary">
              Show Devices
            </Link>
          </div>
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Filter by Name or Description"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        <div className="card">
          <div className="card-body table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Address</th>
                  <th>Email Address</th>
                  <th style={{ width: "100px" }}></th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>{item.address}</td>
                    <td>{item.email}</td>
                    <td>
                    <Link href="/editlocation" className="btn btn-primary me-2"> EDIT LOCATION</Link>

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="d-flex justify-content-between align-items-center mt-3">
              <div>
                <select className="form-select w-auto">
                  <option>10 items per page</option>
                  <option>25 items per page</option>
                  <option>50 items per page</option>
                </select>
              </div>
              <div>1-2 of {filteredData.length} Locations</div>
            </div>
          </div>
        </div>
      </div>
     
    </div>
  );
}
