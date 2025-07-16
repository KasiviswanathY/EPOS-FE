"use client";
import React, { useState } from "react";
import CommonFooter from "@/core/common/footer/commonFooter";
import Link from "next/link";

export default function HoursComponent() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [location, setLocation] = useState("All Locations");
  const [staff, setStaff] = useState("All Staff");
  const [clockingType, setClockingType] = useState("All Clocking Types");

  const data = [
    {
      id: 1,
      staffName: "Felisha",
      location: "Sample Location",
      clockIn: "27/04/2019 15:55:41",
      clockOut: "-",
      hoursWorked: "-",
      clockingType: "None",
      notes: "-",
    },
    {
      id: 2,
      staffName: "Felisha",
      location: "Sample Location",
      clockIn: "27/04/2019 15:55:41",
      clockOut: "-",
      hoursWorked: "-",
      clockingType: "None",
      notes: "-",
    },
    {
      id: 3,
      staffName: "Felisha",
      location: "Sample Location",
      clockIn: "27/04/2019 15:55:41",
      clockOut: "-",
      hoursWorked: "-",
      clockingType: "None",
      notes: "-",
    },
    {
      id: 4,
      staffName: "Felisha",
      location: "Sample Location",
      clockIn: "27/04/2019 15:55:41",
      clockOut: "-",
      hoursWorked: "-",
      clockingType: "None",
      notes: "-",
    },
    {
      id: 5,
      staffName: "Felisha",
      location: "Sample Location",
      clockIn: "27/04/2019 15:55:41",
      clockOut: "-",
      hoursWorked: "-",
      clockingType: "None",
      notes: "-",
    },
  ];

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header d-flex justify-content-between align-items-center mb-3">
          <h4>Hours</h4>
         <Link href="/addhours" className="btn btn-primary">ADD HOURS</Link>
        </div>

        <div className="card p-4">
          <div className="mb-3">
            <strong>Guide</strong>
            <p>
              Here you can amend the hours worked by your staff by clicking on
              the ‘Edit’ button or add new hours by clicking on the ‘Add Hours’
              button.You can filter your clocking information using the drop downs and
              calendars below. Clockings will be shown if they begin <strong>OR</strong> end the
              dates selected.
            </p>
          </div>

          <div className="row mb-4">
            <div className="col-md-3 mb-3">
              <label>From Date</label>
              <input
                type="date"
                className="form-control"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
            </div>
            <div className="col-md-3 mb-3">
              <label>To Date</label>
              <input
                type="date"
                className="form-control"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </div>
            <div className="col-md-3 mb-3">
              <label>Filter by Location</label>
              <select
                className="form-select"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                <option>All Locations</option>
                <option>Location A</option>
                <option>Location B</option>
              </select>
            </div>
            <div className="col-md-3 mb-3">
              <label>Filter by Staff</label>
              <select
                className="form-select"
                value={staff}
                onChange={(e) => setStaff(e.target.value)}
              >
                <option>All Staff</option>
                <option>Staff A</option>
                <option>Staff B</option>
              </select>
            </div>
          </div>

          <div className="row align-items-end mb-4">
            <div className="col-md-3 mb-3">
              <label>Filter by Clocking Type</label>
              <select
                className="form-select"
                value={clockingType}
                onChange={(e) => setClockingType(e.target.value)}
              >
                <option>All Clocking Types</option>
                <option>Type A</option>
                <option>Type B</option>
              </select>
            </div>

            <div className="col-md-9 d-flex justify-content-end gap-2">
              <button className="btn btn-outline-primary">Export to CSV</button>
              <button className="btn btn-outline-primary">Export to Word</button>
              <button className="btn btn-outline-primary">Export to Excel</button>
              <button className="btn btn-outline-primary">Print</button>
              <button className="btn btn-secondary">Reset</button>
              <button className="btn btn-primary">Apply</button>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-striped">
              <thead className="table-light">
                <tr>
                  <th>Staff Name</th>
                  <th>Location</th>
                  <th>Clocking In Date & Time</th>
                  <th>Clocking Out Date & Time</th>
                  <th>Hours Worked</th>
                  <th>Clocking Type</th>
                  <th>Notes</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((entry) => (
                  <tr key={entry.id}>
                    <td>{entry.staffName}</td>
                    <td>{entry.location}</td>
                    <td>{entry.clockIn}</td>
                    <td>{entry.clockOut}</td>
                    <td>{entry.hoursWorked}</td>
                    <td>{entry.clockingType}</td>
                    <td>{entry.notes}</td>
                    <td>
<Link href="/edithours" className="btn btn-primary">Edit</Link> <button className="btn btn-sm btn-danger">X</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <CommonFooter />
    </div>
  );
}
