"use client";

import CollapesIcon from "@/core/common/tooltip-content/collapes";
import RefreshIcon from "@/core/common/tooltip-content/refresh";
import TooltipIcons from "@/core/common/tooltip-content/tooltipIcons";
import { all_routes } from "@/data/all_routes";
import { PlusCircle } from "feather-icons-react";
import Link from "next/link";
import React from "react";
export default function EmployeesGridComponent  ()  {
  return (
    <>
  <div className="page-wrapper">
  <div className="content">
    <div className="card mt-4">
  <div className="card-body">
    <div className="d-flex justify-content-between flex-wrap align-items-center mb-3">
      <input
        type="search"
        placeholder="Filter by Name, Location or Role"
        className="form-control me-2"
        style={{ maxWidth: "300px" }}
      />
      <a href="editstaff" className="btn btn-sm btn-success"> Add Staff</a>

    </div>
    <div className="table-responsive">
      <table className="table table-striped align-middle text-center">
        <thead>
          <tr className="bg-light">
            <th>Name</th>
            <th>Locations</th>
            <th>Show at All Locations</th>
            <th>Role</th>
            <th>Hourly Rate</th>
            <th>Job Code</th>
            <th>Passcode</th>
            <th>Swipe Card</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {[
            {
              name: "Jagrut",
              location: "Goodys Convenience",
              showAll: false,
              role: "Manager",
              rate: "$0.00",
              jobCode: "",
              passcode: "****",
              swipeCard: "********",
            },
            {
              name: "Felisha",
              location: "Goodys Convenience",
              showAll: false,
              role: "Manager",
              rate: "$8.00",
              jobCode: "",
              passcode: "****",
              swipeCard: "********",
            },
            {
              name: "Carolyn",
              location: "Goodys Convenience",
              showAll: false,
              role: "Cashier",
              rate: "$8.00",
              jobCode: "",
              passcode: "****",
              swipeCard: "********",
            },
            {
              name: "Yolanda",
              location: "Goodys Convenience",
              showAll: false,
              role: "Cashier",
              rate: "$8.00",
              jobCode: "",
              passcode: "****",
              swipeCard: "********",
            },
            {
              name: "Grettel",
              location: "Goodys Convenience",
              showAll: false,
              role: "Manager",
              rate: "$8.00",
              jobCode: "",
              passcode: "****",
              swipeCard: "********",
            },
            {
              name: "Courtney",
              location: "Goodys Convenience",
              showAll: false,
              role: "Cashier",
              rate: "$8.00",
              jobCode: "",
              passcode: "****",
              swipeCard: "********",
            },
            {
              name: "	Xu Feng ",
              location: "Goodys Convenience",
              showAll: false,
              role: "Manager",
              rate: "$9.00",
              jobCode: "",
              passcode: "****",
              swipeCard: "********",
            },
            {
              name: "	Chen Hao ",
              location: "Goodys Convenience",
              showAll: false,
              role: "Cashier",
              rate: "$8.00",
              jobCode: "",
              passcode: "****",
              swipeCard: "********",
            },
            {
              name: "	Zhang Lei",
              location: "Goodys Convenience",
              showAll: false,
              role: "Cashier",
              rate: "$6.00",
              jobCode: "",
              passcode: "****",
              swipeCard: "********",
            },
            {
              name: "Wang Wei",
              location: "Goodys Convenience",
              showAll: false,
              role: "manager",
              rate: "$3.00",
              jobCode: "",
              passcode: "****",
              swipeCard: "********",
            },
          ].map((emp, index) => (
            <tr key={index}>
              <td>{emp.name}</td>
              <td>{emp.location}</td>
              <td>
                <input type="checkbox" checked={emp.showAll} readOnly />
              </td>
              <td>{emp.role}</td>
              <td>{emp.rate}</td>
              <td>{emp.jobCode}</td>
              <td>{emp.passcode}</td>
              <td>{emp.swipeCard}</td>
              <td>
              <button className="btn btn-outline-danger btn-sm me-2">X</button>
              <button className="btn btn-outline-primary btn-sm">Edit</button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
<Link href="editstaff" className="btn btn-sm btn-primary">
  Edit Roles
</Link>

  </div>
</div>


  </div>
</div>
    </>

  );
};

