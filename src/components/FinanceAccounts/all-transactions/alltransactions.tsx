"use client";

import React, { useState } from "react";
import Table from "@/core/common/pagination/datatable";
import Link from "next/link";

export default function CompletedTransactions() {
  const [selectedDate, setSelectedDate] = useState("2025-06-16");
  const [location, setLocation] = useState("");
  const [device, setDevice] = useState("All Devices");

  const columns = [
    { title: "Staff", dataIndex: "staff", key: "staff" },
    { title: "Location", dataIndex: "location", key: "location" },
    { title: "Device", dataIndex: "device", key: "device" },
    { title: "Table/Tab Name", dataIndex: "table", key: "table" },
    { title: "Date/Time", dataIndex: "datetime", key: "datetime" },
    { title: "Customer & Type", dataIndex: "customer", key: "customer" },
    { title: "Discount", dataIndex: "discount", key: "discount" },
    { title: "Discount Reason", dataIndex: "reason", key: "reason" },
    { title: "Total", dataIndex: "total", key: "total" },
    { title: "Tender", dataIndex: "tender", key: "tender" },
    { title: "Change", dataIndex: "change", key: "change" },
    {
      title: "Actions",
      key: "actions",
      render: () => (
        <div className="d-flex justify-content-center">
          <button className="btn btn-success btn-sm me-2">SHOW ITEMS</button>
          <button className="btn btn-danger btn-sm">X</button>
        </div>
      ),
    },
  ];

  const dataSource = [
    {
      staff: "Alex",
      location: "Main Branch",
      device: "Till1",
      table: "A12",
      datetime: "6/17/2025 4:58:34 AM",
      customer: "Guest / Dine-in",
      discount: "$14.82",
      reason: "Coupon",
      total: "$100.00",
      tender: "Cash",
      change: "$5.18",
    },
    {
      staff: "Emma",
      location: "East Wing",
      device: "Till2",
      table: "B5",
      datetime: "6/17/2025 3:45:12 PM",
      customer: "Member / Takeaway",
      discount: "$3.00",
      reason: "Member Discount",
      total: "$25.00",
      tender: "Card",
      change: "$0.00",
    },
    {
      staff: "John",
      location: "North Branch",
      device: "Till1",
      table: "C3",
      datetime: "6/16/2025 1:20:00 PM",
      customer: "Guest / Takeaway",
      discount: "$0.00",
      reason: "",
      total: "$50.00",
      tender: "Cash",
      change: "$0.00",
    },
    {
      staff: "Sophia",
      location: "Main Branch",
      device: "Till2",
      table: "A7",
      datetime: "6/15/2025 7:30:45 PM",
      customer: "Member / Dine-in",
      discount: "$5.00",
      reason: "Promo Code",
      total: "$80.00",
      tender: "Card",
      change: "$0.00",
    },
    {
      staff: "Liam",
      location: "East Wing",
      device: "Till1",
      table: "D2",
      datetime: "6/15/2025 9:10:10 AM",
      customer: "Guest / Dine-in",
      discount: "$2.50",
      reason: "Coupon",
      total: "$30.00",
      tender: "Cash",
      change: "$0.50",
    },
    {
      staff: "Olivia",
      location: "North Branch",
      device: "Till2",
      table: "E1",
      datetime: "6/14/2025 11:05:00 AM",
      customer: "Member / Takeaway",
      discount: "$1.00",
      reason: "Member Discount",
      total: "$20.00",
      tender: "Card",
      change: "$0.00",
    },
    {
      staff: "Noah",
      location: "Main Branch",
      device: "Till1",
      table: "F4",
      datetime: "6/13/2025 2:22:22 PM",
      customer: "Guest / Dine-in",
      discount: "$0.00",
      reason: "",
      total: "$60.00",
      tender: "Cash",
      change: "$10.00",
    },
    {
      staff: "Ava",
      location: "East Wing",
      device: "Till2",
      table: "G6",
      datetime: "6/12/2025 5:55:55 PM",
      customer: "Member / Dine-in",
      discount: "$4.00",
      reason: "Promo Code",
      total: "$90.00",
      tender: "Card",
      change: "$0.00",
    },
    {
      staff: "William",
      location: "North Branch",
      device: "Till1",
      table: "H8",
      datetime: "6/11/2025 8:08:08 AM",
      customer: "Guest / Takeaway",
      discount: "$0.00",
      reason: "",
      total: "$40.00",
      tender: "Cash",
      change: "$0.00",
    },
    {
      staff: "Mia",
      location: "Main Branch",
      device: "Till2",
      table: "I9",
      datetime: "6/10/2025 10:10:10 AM",
      customer: "Member / Dine-in",
      discount: "$2.00",
      reason: "Member Discount",
      total: "$70.00",
      tender: "Card",
      change: "$0.00",
    },
    {
      staff: "James",
      location: "East Wing",
      device: "Till1",
      table: "J10",
      datetime: "6/09/2025 12:12:12 PM",
      customer: "Guest / Dine-in",
      discount: "$1.50",
      reason: "Coupon",
      total: "$35.00",
      tender: "Cash",
      change: "$0.00",
    },
    {
      staff: "Charlotte",
      location: "North Branch",
      device: "Till2",
      table: "K11",
      datetime: "6/08/2025 3:33:33 PM",
      customer: "Member / Takeaway",
      discount: "$3.00",
      reason: "Promo Code",
      total: "$55.00",
      tender: "Card",
      change: "$0.00",
    },
  ];

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="mb-0">Completed Transactions</h4>
        </div>
        <div className="card p-3 mb-3">
          <div className="row align-items-end g-3">
            <div className="col-md-3">
              <label className="form-label">Select Date</label>
              <input
                type="date"
                className="form-control"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>

            <div className="col-md-5">
              <label className="form-label">Filter by Location</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">Filter by Device</label>
              <select
                className="form-select"
                value={device}
                onChange={(e) => setDevice(e.target.value)}
              >
                <option>All Devices</option>
                <option>Till1</option>
                <option>Till2</option>
              </select>
            </div>
          </div>

          <div className="form-check mt-3">
            <input type="checkbox" className="form-check-input" id="barcodeToggle" />
            <label className="form-check-label" htmlFor="barcodeToggle">
              Show Transaction Barcode
            </label>
          </div>
        </div>
        <div className="d-flex flex-wrap gap-2 mb-3">
          <button className="btn btn-outline-primary">EXPORT TO .CSV</button>
          <button className="btn btn-outline-primary">EXPORT TO WORD</button>
          <button className="btn btn-outline-primary">EXPORT TO EXCEL</button>
          <button className="btn btn-outline-secondary">PRINT</button>
        </div>
        <div className="card">
          <div className="card-body">
            <div className="table-responsive">
              <Table columns={columns} dataSource={dataSource} rowKey="datetime" pagination={{ pageSize: 10 }} />
            </div>
          </div>
        </div>
      </div>
      <div className="footer d-sm-flex align-items-center justify-content-between border-top bg-white p-3">
        <p className="mb-0 text-gray-9">2014-2025 © DreamsPOS. All Right Reserved</p>
        <p>
          Designed &amp; Developed By <Link href="#" className="text-primary">Dreams</Link>
        </p>
      </div>
    </div>
  );
}
