"use client";
import Link from "next/link";
import { useState } from "react";

const tenderTypes = [
  { key: "cash", name: "Cash", description: "Cash", classification: "Cash" },
  { key: "ccfs", name: "CC/FS", description: "CC/FS", classification: "Other" },
  { key: "house_account", name: "House Account", description: "House Account", classification: "Other" },
];

const initialDevices = [
  {
    name: "Till1",
    assigned: {
      cash: true,
      ccfs: true,
      house_account: true,
    },
  },
];

const locations = ["Main Location", "Branch A"];

export default function TenderTypes() {
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);
  const [deviceAssignments, setDeviceAssignments] = useState(initialDevices);
  const [cashRounding, setCashRounding] = useState("Disable Cash Rounding");
  const [roundingUnit, setRoundingUnit] = useState("Other");
  const [roundingValue, setRoundingValue] = useState("0.01");

  const handleCheckboxChange = (deviceIndex: number, tenderKey: string) => {
    setDeviceAssignments((prev) => {
      const updated = [...prev];
      const device = { ...updated[deviceIndex] };
      const assigned = { ...device.assigned };
      updated[deviceIndex] = { ...device, assigned };
      return updated;
    });
  };

  const cashTenderOptions = [
    "Disable Cash Rounding",
    ...tenderTypes.filter((t) => t.classification === "Cash").map((t) => t.name),
  ];

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="fw-bold">Tender Types</h4>
     <Link href="/addtendertypes" className="btn btn-primary"> ADD TENDER TYPES</Link>
        </div>
        <div className="card mb-4">
          <div className="card-header fw-semibold">Active Tender Types</div>
          <div className="card-body table-responsive">
            <table className="table table-bordered align-middle">
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Button Color</th>
                  <th>Till Order</th>
                  <th>Classification</th>
                  <th>Other Tenders</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {tenderTypes.map((tender) => (
                  <tr key={tender.key}>
                    <td>
                      <button className="btn btn-outline-primary btn-sm">EDIT</button>
                    </td>
                    <td>{tender.name}</td>
                    <td>{tender.description}</td>
                    <td className="text-center">⦻</td>
                    <td className="text-center">✔</td>
                    <td>{tender.classification}</td>
                    <td className="text-center">
                      <input type="checkbox" disabled />
                    </td>
                   <td className="text-end">
        <button className="btn btn-outline-danger btn-sm">DELETE</button>
      </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="card mb-4">
          <div className="card-header fw-semibold">Assign Tenders to Devices</div>
          <div className="card-body">
            <div className="mb-3">
              <label className="form-label">Locations</label>
              <select
                className="form-select w-auto"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                {locations.map((loc, i) => (
                  <option key={i} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            <div className="table-responsive">
              <table className="table table-bordered align-middle">
                <thead>
                  <tr>
                    <th>Device</th>
                    {tenderTypes.map((tender) => (
                      <th key={tender.key}>{tender.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {deviceAssignments.map((device, deviceIdx) => (
                    <tr key={device.name}>
                      <td>{device.name}</td>
                      {tenderTypes.map((tender) => (
                        <td key={tender.key} className="text-center">
                          <input
                            type="checkbox"
                            
                            onChange={() => handleCheckboxChange(deviceIdx, tender.key)}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="d-flex justify-content-end mt-3">
              <button className="btn btn-outline-secondary me-2">Collapse All</button>
              <button className="btn btn-success">Save Changes</button>
            </div>
          </div>
        </div>
        <div className="card mb-4">
          <div className="card-header fw-semibold">Integrated Tender Types</div>
          <div className="card-body">
            <p className="text-muted mb-0">
              View and edit your integrated tender types.There are no Integrated Tender Types
            </p>
            
          </div>
        </div>
        <div className="card mb-4">
          <div className="card-header fw-semibold">Cash Rounding</div>
          <div className="card-body">
            <div className="mb-3">
              <label className="form-label">Use Cash Rounding for:</label>
              <select
                className="form-select"
                value={cashRounding}
                onChange={(e) => setCashRounding(e.target.value)}
              >
                {cashTenderOptions.map((option, i) => (
                  <option key={i} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <small className="text-muted d-block mt-1">
                This should be the tender type that should have Cash Rounding applied to it.
                Note: The tender type will need to have the "Cash" classification to appear in this list.
              </small>
            </div>
            <div className="row g-2 align-items-end mb-3">
              <div className="col-md-2">
                <label className="form-label">Minimum Denomination</label>
                <select
                  className="form-select"
                  value={roundingUnit}
                  onChange={(e) => setRoundingUnit(e.target.value)}
                >
                  <option value="Other">Other</option>
                  <option value="USD">$</option>
                  <option value="EUR">€</option>
                  <option value="INR">₹</option>
                </select>
              </div>
              <div className="col-md-2">
                <label className="form-label">&nbsp;</label>
                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  className="form-control"
                  value={roundingValue}
                  onChange={(e) => setRoundingValue(e.target.value)}
                />
              </div>
            </div>

            <p className="text-muted small">
              If your currency rounds up certain figures, please put in the smallest amount your currency can be.
              For example, if your currency’s smallest coin is 5 cents, enter 0.05. This will only affect tenders
              marked as “Cash Rounding”.
            </p>

            <div className="text-end">
              <button className="btn btn-success">SAVE CASH ROUNDING SETTINGS</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
