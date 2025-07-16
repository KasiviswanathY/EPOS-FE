"use client";
import { useState } from "react";
import Link from "next/link";
const pageSlice = <T,>(arr: T[], p: number, size: number) =>
  arr.slice((p - 1) * size, p * size);
const PAGE_SIZE = 9;
const dummyCustomers = [
  {
    id: 1,
    title: "Mr",
    firstName: "Roger",
    lastName: "Flood",
    businessName: "",
    address1: "12 High Street",
    town: "Derby",
    zip: "DE1 1DG",
    type: "Retail",
    signUpLocation: "Derby Store",
  },
  {
    id: 2,
    title: "Mr",
    firstName: "Kennedy",
    lastName: "Bryant",
    businessName: "",
    address1: "1 Example Road",
    town: "London",
    zip: "SW1A 1AA",
    type: "Retail",
    signUpLocation: "Web",
  },
  {
    id: 3,
    title: "Mr",
    firstName: "Winston",
    lastName: "Abbott",
    businessName: "",
    address1: "33 Station Way",
    town: "York",
    zip: "YO1 6GA",
    type: "Trade",
    signUpLocation: "York Depot",
  },
  {
    id: 4,
    title: "Mr",
    firstName: "Tony",
    lastName: "Daylov",
    businessName: "TD Building",
    address1: "7 Builder Lane",
    town: "Leeds",
    zip: "LS1 4BA",
    type: "Trade",
    signUpLocation: "Leeds Branch",
  },
  {
    id: 5,
    title: "Ms",
    firstName: "Mary",
    lastName: "Rome",
    businessName: "",
    address1: "Flat 2, 3 King St",
    town: "Manchester",
    zip: "M1 1AE",
    type: "Retail",
    signUpLocation: "Mobile App",
  },
  {
    id: 6,
    title: "Mrs",
    firstName: "Carolyn",
    lastName: "Byrum",
    businessName: "",
    address1: "99 Sample Ave",
    town: "Bristol",
    zip: "BS1 2HQ",
    type: "Retail",
    signUpLocation: "Bristol Store",
  },
  {
    id: 7,
    title: "Mr",
    firstName: "Tiny",
    lastName: "March",
    businessName: "",
    address1: "22 Garden Rd",
    town: "Cardiff",
    zip: "CF10 1AA",
    type: "Retail",
    signUpLocation: "Cardiff Store",
  },
  {
    id: 8,
    title: "Ms",
    firstName: "Gretel",
    lastName: "Smith",
    businessName: "",
    address1: "4 Woodland Walk",
    town: "Nottingham",
    zip: "NG1 6AA",
    type: "Trade",
    signUpLocation: "HQ",
  },
  {
    id: 9,
    title: "Mrs",
    firstName: "Carrie",
    lastName: "Privett",
    businessName: "Mrs Kaye",
    address1: "11 River Drive",
    town: "Sheffield",
    zip: "S1 4AG",
    type: "Retail",
    signUpLocation: "Sheffield Store",
  },
  {
    id: 10,
    title: "Ms",
    firstName: "Sarah",
    lastName: "White",
    businessName: "",
    address1: "5 Meadow Close",
    town: "Oxford",
    zip: "OX1 2BG",
    type: "Retail",
    signUpLocation: "Oxford Store",
  },
];

export default function CustomersComponent() {
  const [customerType, setCustomerType] = useState("* Show All");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const filtered = dummyCustomers.filter((c) => {
    const matchesType =
      customerType === "* Show All" || c.type === customerType;
    const q = query.trim().toLowerCase();
    const matchesQuery =
      q === "" ||
      [
        c.firstName,
        c.lastName,
        c.businessName,
        c.address1,
        c.town,
        c.zip,
      ]
        .join(" ")
        .toLowerCase()
        .includes(q);
    return matchesType && matchesQuery;
  });

  const pageCount = Math.ceil(filtered.length / PAGE_SIZE) || 1;
  const paginated = pageSlice(filtered, page, PAGE_SIZE);

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="mb-0">
            Customer Search{" "}
            <small className="ms-2 text-info">
              
            </small>
          </h4>
          <Link href="/addcustomers" className="btn btn-sm btn-primary">
            ADD CUSTOMER
          </Link>
        </div>

        <div className="alert alert-secondary d-flex justify-content-between">
          <div>
            <p className="mb-2 fw-semibold">
              <a href="#" className="text-decoration-underline">
                Drive brand loyalty through customer interaction with apps from
                the Epos Now App Store
              </a>
            </p>
            <p className="mb-1">
              On this page you can view, edit and delete your Customers. To add
              a new customer, tap “Add Customer” button at the top of the page.
            </p>
            <p className="mb-0">
              Use the search box below to find a certain customer that has been
              stored on your database. Either insert their name or postcode.
            </p>
          </div>
          <button
            type="button"
            className="btn-close"
            onClick={(e) =>
              (e.currentTarget.parentElement!.style.display = "none")
            }
          />
        </div>

        <div className="card mb-4">
          <div className="card-body">
            <div className="row g-2">
              <div className="col-lg-6">
                <label className="form-label d-lg-none">
                  Filter by Customer Type
                </label>
                <select
                  className="form-select"
                  value={customerType}
                  onChange={(e) => {
                    setCustomerType(e.target.value);
                    setPage(1);
                  }}
                >
                  <option>* Show All</option>
                  <option>Retail</option>
                  <option>Trade</option>
                </select>
              </div>
              <div className="col-lg-5">
                <label className="form-label d-lg-none">
                  Filter by Name, Business, Main Address or Contact Number
                </label>
                <input
                  className="form-control"
                  placeholder="Filter by Name, Business, Main Address or Contact Number"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <div className="col-lg-1 d-grid">
                <button
                  className="btn btn-primary"
                  onClick={() => setPage(1)}
                >
                  SEARCH
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-bordered table-striped align-middle">
                <thead className="table-light">
                  <tr>
                    <th style={{ width: "60px" }}></th>
                    <th>Title</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Business Name</th>
                    <th>Address Line 1</th>
                    <th>Town</th>
                    <th>ZIP Code</th>
                    <th>Type</th>
                    <th>Sign Up Location</th>
                    <th style={{ width: "90px" }}></th>
                    <th style={{ width: "90px" }}></th>
                    <th style={{ width: "40px" }}></th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.map((c) => (
                    <tr key={c.id}>
                      <td>
                        <Link
                          href={`/customers/${c.id}/edit`}
                          className="btn btn-outline-primary btn-sm w-100"
                        >
                          EDIT
                        </Link>
                      </td>

                      <td>{c.title}</td>
                      <td>{c.firstName}</td>
                      <td>{c.lastName}</td>
                      <td>{c.businessName || "-"}</td>
                      <td>{c.address1}</td>
                      <td>{c.town}</td>
                      <td>{c.zip}</td>
                      <td>{c.type}</td>
                      <td>{c.signUpLocation}</td>
                      <td>
                        <Link href="/addcustomerdetails" className=" btn btn-outline-info btn-sm w-100">
            DETAILS
          </Link>
                      </td>
                      <td>
                        <Link
                          href={`/customers/${c.id}/invoice`}
                          className="btn btn-outline-info btn-sm w-100"
                        >
                          INVOICE
                        </Link>
                      </td>
                      <td>
                        <button
                          className="btn btn-outline-danger btn-sm w-100"
                          onClick={() =>
                            confirm(
                              `Delete ${c.firstName} ${c.lastName}?`,
                            )
                          }
                        >
                          ×
                        </button>
                      </td>
                    </tr>
                  ))}

                  {paginated.length === 0 && (
                    <tr>
                      <td colSpan={13} className="text-center py-4">
                        No customers match your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <nav className="mt-3">
              <ul className="pagination mb-0">
                {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
                  <li key={n} className={`page-item ${page === n ? "active" : ""}`}>
                    <button
                      className="page-link"
                      onClick={() => setPage(n)}
                    >
                      {n}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
