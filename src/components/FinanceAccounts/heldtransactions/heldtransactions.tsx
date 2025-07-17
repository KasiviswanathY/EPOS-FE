"use client";
import { useState } from "react";

export default function HeldTransactionsComponent() {
  const [locationFilter, setLocationFilter] = useState("");
  const [deviceFilter, setDeviceFilter] = useState("All Devices");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTransactionIndex, setSelectedTransactionIndex] = useState<number | null>(null);

  const transactions = [
    {
      staff: "jagrut",
      location: "Outlet 1",
      device: "Till 1",
      customerType: "John Doe - Regular",
      table: "Table 5",
      datetime: "7/9/2025 6:01:11 PM",
      discount: "$2.55",
      total: "$12.80",
      items: [
        { name: "Body Armor 16 Oz", barcode: "858170002189", value: "$2.55", qty: 1, total: "$2.55" },
      ],
    },
     {
      staff: "jagrut",
      location: "Outlet 1",
      device: "Till 1",
      customerType: "John Doe - Regular",
      table: "Table 5",
      datetime: "7/9/2025 6:01:11 PM",
      discount: "$2.55",
      total: "$12.80",
      items: [
        { name: "Body Armor 16 Oz", barcode: "858170002189", value: "$2.55", qty: 1, total: "$2.55" },
      ],
    },
     {
      staff: "jagrut",
      location: "Outlet 1",
      device: "Till 1",
      customerType: "John Doe - Regular",
      table: "Table 5",
      datetime: "7/9/2025 6:01:11 PM",
      discount: "$2.55",
      total: "$12.80",
      items: [
        { name: "Body Armor 16 Oz", barcode: "858170002189", value: "$2.55", qty: 1, total: "$2.55" },
      ],
    },
     {
      staff: "jagrut",
      location: "Outlet 1",
      device: "Till 1",
      customerType: "John Doe - Regular",
      table: "Table 5",
      datetime: "7/9/2025 6:01:11 PM",
      discount: "$2.55",
      total: "$12.80",
      items: [
        { name: "Body Armor 16 Oz", barcode: "858170002189", value: "$2.55", qty: 1, total: "$2.55" },
      ],
    },
     {
      staff: "jagrut",
      location: "Outlet 1",
      device: "Till 1",
      customerType: "John Doe - Regular",
      table: "Table 5",
      datetime: "7/9/2025 6:01:11 PM",
      discount: "$2.55",
      total: "$12.80",
      items: [
        { name: "Body Armor 16 Oz", barcode: "858170002189", value: "$2.55", qty: 1, total: "$2.55" },
      ],
    },
     {
      staff: "jagrut",
      location: "Outlet 1",
      device: "Till 1",
      customerType: "John Doe - Regular",
      table: "Table 5",
      datetime: "7/9/2025 6:01:11 PM",
      discount: "$2.55",
      total: "$12.80",
      items: [
        { name: "Body Armor 16 Oz", barcode: "858170002189", value: "$2.55", qty: 1, total: "$2.55" },
      ],
    },
     {
      staff: "jagrut",
      location: "Outlet 1",
      device: "Till 1",
      customerType: "John Doe - Regular",
      table: "Table 5",
      datetime: "7/9/2025 6:01:11 PM",
      discount: "$2.55",
      total: "$12.80",
      items: [
        { name: "Body Armor 16 Oz", barcode: "858170002189", value: "$2.55", qty: 1, total: "$2.55" },
      ],
    },
     {
      staff: "jagrut",
      location: "Outlet 1",
      device: "Till 1",
      customerType: "John Doe - Regular",
      table: "Table 5",
      datetime: "7/9/2025 6:01:11 PM",
      discount: "$2.55",
      total: "$12.80",
      items: [
        { name: "Body Armor 16 Oz", barcode: "858170002189", value: "$2.55", qty: 1, total: "$2.55" },
      ],
    },
  ];

  const filteredTransactions = transactions.filter(txn => {
    return (
      (locationFilter === "" || txn.location.includes(locationFilter)) &&
      (deviceFilter === "All Devices" || txn.device === deviceFilter)
    );
  });

  const pageSize = 10;
  const pagedData = filteredTransactions.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleShowItems = (index: number) => {
    setSelectedTransactionIndex(index === selectedTransactionIndex ? null : index);
  };

  return (
     <div className="page-wrapper">
      <div className="content">
    <div className="container mt-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="fw-bold">Held Transactions</h4>
     
        </div>
      <p>This report will display all transactions that are currently being held on the till.</p>
      <p>This will give staff members the ability to resume the transaction at a later date if required and lets the business track any such transactions.</p>

      <div className="row mb-3">
        <div className="col-md-6">
          <label>Filter by Location</label>
          <input
            className="form-control"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            placeholder="Enter location..."
          />
        </div>
        <div className="col-md-6">
          <label>Filter by Device</label>
          <select
            className="form-select"
            value={deviceFilter}
            onChange={(e) => setDeviceFilter(e.target.value)}
          >
            <option>All Devices</option>
            <option>Till 1</option>
            <option>Till 2</option>
          </select>
        </div>
      </div>

      <div className="mb-3 d-flex gap-2">
        <button className="btn btn-outline-primary btn-sm">EXPORT TO CSV</button>
        <button className="btn btn-outline-primary btn-sm">EXPORT TO WORD</button>
        <button className="btn btn-outline-primary btn-sm">EXPORT TO EXCEL</button>
        <button className="btn btn-outline-primary btn-sm">PRINT</button>
      </div>

      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>STAFF</th>
            <th>LOCATION</th>
            <th>DEVICE</th>
            <th>CUSTOMER & TYPE</th>
            <th>TABLE/TAB NAME</th>
            <th>DATE/TIME</th>
            <th>DISCOUNT</th>
            <th>TOTAL</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {pagedData.map((txn, index) => (
            <tr key={index} className={index % 2 === 0 ? "table-info" : ""}>
              <td>{txn.staff}</td>
              <td>{txn.location}</td>
              <td>{txn.device}</td>
              <td>{txn.customerType}</td>
              <td>{txn.table}</td>
              <td>{txn.datetime}</td>
              <td>{txn.discount}</td>
              <td>{txn.total}</td>
              <td>
                <button
                  className="btn btn-success btn-sm"
                  onClick={() => handleShowItems(index)}
                >
                  {selectedTransactionIndex === index ? "HIDE ITEMS" : "SHOW ITEMS"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedTransactionIndex !== null && (
        <>
          <table className="table table-bordered mt-4">
            <thead className="table-light">
              <tr>
                <th>NAME</th>
                <th>BARCODE</th>
                <th>NOTES</th>
                <th>REFUND REASON</th>
                <th>DISCOUNT VALUE</th>
                <th>DISCOUNT REASON</th>
                <th>VALUE (INC. TAX)</th>
                <th>QTY</th>
                <th>TOTAL (INC. TAX)</th>
              </tr>
            </thead>
            <tbody>
              {transactions[selectedTransactionIndex].items.map((item, i) => (
                <tr key={i}>
                  <td>{item.name}</td>
                  <td>{item.barcode}</td>
                  <td colSpan={4}></td>
                  <td>{item.value}</td>
                  <td>{item.qty}</td>
                  <td>{item.total}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mb-3 d-flex gap-2">
            <button className="btn btn-outline-primary btn-sm">EXPORT TO CSV</button>
            <button className="btn btn-outline-primary btn-sm">EXPORT TO WORD</button>
            <button className="btn btn-outline-primary btn-sm">EXPORT TO EXCEL</button>
            <button className="btn btn-outline-primary btn-sm">PRINT</button>
          </div>
        </>
      )}

      <div className="d-flex justify-content-between align-items-center mt-3">
        <div>
          <button
            className="btn btn-light btn-sm me-2"
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          >
            &lt;
          </button>
          <button
            className="btn btn-light btn-sm"
            onClick={() =>
              setCurrentPage((p) => (p * pageSize < filteredTransactions.length ? p + 1 : p))
            }
          >
            &gt;
          </button>
        </div>
        <div>
          Page {currentPage}
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-secondary btn-sm">RESET</button>
          <button className="btn btn-primary btn-sm">APPLY</button>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
}
