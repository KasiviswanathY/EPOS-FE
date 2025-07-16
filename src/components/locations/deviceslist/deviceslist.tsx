"use client";

import { useState } from "react";
import Link from "next/link";

const mockDevices = [
  {
    name: "Till1",
    description: "Default device created automatically",
    type: "EposSystem",
    location: "Main Location",
    enabled: true,
    priceMode: "Exc. Tax",
    autoCloseTill: false,
  },
  {
    name: "Till2",
    description: "Front counter till",
    type: "EposSystem",
    location: "Branch A",
    enabled: false,
    priceMode: "Inc. Tax",
    autoCloseTill: true,
  },
  {
    name: "Tablet1",
    description: "Mobile sales device",
    type: "Tablet",
    location: "Warehouse",
    enabled: true,
    priceMode: "Exc. Tax",
    autoCloseTill: true,
  },
  {
    name: "Kiosk1",
    description: "Self-service kiosk",
    type: "Kiosk",
    location: "Main Location",
    enabled: true,
    priceMode: "Inc. Tax",
    autoCloseTill: false,
  },
  {
    name: "POS-Backup",
    description: "Backup till for emergencies",
    type: "EposSystem",
    location: "Branch A",
    enabled: false,
    priceMode: "Exc. Tax",
    autoCloseTill: false,
  },
  {
    name: "Kiosk1",
    description: "Self-service kiosk",
    type: "Kiosk",
    location: "Main Location",
    enabled: true,
    priceMode: "Inc. Tax",
    autoCloseTill: false,
  },
  {
    name: "POS-Backup",
    description: "Backup till for emergencies",
    type: "EposSystem",
    location: "Branch A",
    enabled: false,
    priceMode: "Exc. Tax",
    autoCloseTill: false,
  },
   {
    name: "Tablet1",
    description: "Mobile sales device",
    type: "Tablet",
    location: "Warehouse",
    enabled: true,
    priceMode: "Exc. Tax",
    autoCloseTill: true,
  },

  
];

export default function DevicesListComponent() {
  const [location, setLocation] = useState("Main Location");

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="fw-bold mb-0">Devices</h4>
          <div>
            <Link href="/addlocationlist" className="btn btn-outline-primary me-2">
              Add Location
            </Link>
            <Link href="/add-device" className="btn btn-primary">
              Add Device
            </Link>
          </div>
        </div>
        <div className="mb-4">
          <label className="form-label fw-semibold">Choose a Location:</label>
          <select
            className="form-select"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option>Main Location</option>
            <option>Branch A</option>
            <option>Warehouse</option>
          </select>
        </div>
        <div className="card">
          <div className="card-body table-responsive">
            <table className="table table-bordered align-middle">
<thead>
                <tr>
                  <th style={{ width: "80px" }}> </th>
                  <th>Name ⬍</th>
                  <th>Description ⬍</th>
                  <th>Type ⬍</th>
                  <th>Location ⬍</th>
                  <th>Enabled ⬍</th>
                  <th>Price Mode ⬍</th>
                  <th>Auto Close Till ⬍</th>
                  <th>Unassign License</th>
                   <th>Actions</th>
                  <th> </th>
                </tr>
              </thead>
              <tbody>
                {mockDevices.map((device, idx) => (
                  <tr key={idx}>
                    <td>
                    </td>
                    <td>{device.name}</td>
                    <td>{device.description}</td>
                    <td>{device.type}</td>
                    <td>{device.location}</td>
                    <td>
                      <input type="checkbox" checked={device.enabled} readOnly />
                    </td>
                    <td>{device.priceMode}</td>
                    <td>
                      <input type="checkbox" checked={device.autoCloseTill} readOnly />
                    </td>
                    <td>
                      <button className="btn btn-outline-primary btn-sm">
                        UNASSIGN LICENSE
                      </button>
                    </td>
                    <td>
                    <div className="d-flex justify-content-end gap-2">
                    <button className="btn btn-outline-secondary btn-sm">EDIT</button>
                   <button className="btn btn-outline-danger btn-sm">X</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}