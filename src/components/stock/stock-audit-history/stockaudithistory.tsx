"use client";

import { useState } from "react";
import Table from "@/core/common/pagination/datatable";
import CommonFooter from "@/core/common/footer/commonFooter";

export default function StockHistory() {
  const [selectedDate, setSelectedDate] = useState("2025-06-28");

  const data = [
    {
      name: "$20 Scratch Off",
      barcode: "843051007891, 843051007655",
      category: "Lottery",
      brand: "",
      supplier: "",
      orderCode: "-",
      stock: -12779,
      costPrice: "$18.60",
      salePrice: "$20.00",
      totalCost: "-$237,689.40",
      totalSale: "-$255,580.00",
      margin: "-$17,890.60",
      marginPercent: "7.00%",
    },
    {
      name: "$3 Scratch Off",
      barcode: "843051008133, 843051008089",
      category: "Lottery",
      brand: "",
      supplier: "",
      orderCode: "-",
      stock: -21219,
      costPrice: "$2.79",
      salePrice: "$3.00",
      totalCost: "-$59,201.01",
      totalSale: "-$63,657.00",
      margin: "-$4,455.99",
      marginPercent: "7.00%",
    },
    {
      name: "Pizza",
      barcode: "894224001796",
      category: "Pizza",
      brand: "",
      supplier: "",
      orderCode: "-",
      stock: -101248.75,
      costPrice: "$5.50",
      salePrice: "$11.99",
      totalCost: "-$556,868.13",
      totalSale: "-$1,213,972.51",
      margin: "-$657,104.39",
      marginPercent: "54.13%",
    },
    {
      name: "$1 Scratch Off",
      barcode: "843051007662, 843051008034",
      category: "Lottery",
      brand: "",
      supplier: "",
      orderCode: "-",
      stock: -56440,
      costPrice: "$0.93",
      salePrice: "$1.00",
      totalCost: "-$52,489.20",
      totalSale: "-$56,440.00",
      margin: "-$3,950.80",
      marginPercent: "7.00%",
    },
    {
      name: "Pizza",
      barcode: "894224001796",
      category: "Pizza",
      brand: "",
      supplier: "",
      orderCode: "-",
      stock: -101248.75,
      costPrice: "$5.50",
      salePrice: "$11.99",
      totalCost: "-$556,868.13",
      totalSale: "-$1,213,972.51",
      margin: "-$657,104.39",
      marginPercent: "54.13%",
    },
     {
      name: "$1 Scratch Off",
      barcode: "843051007662, 843051008034",
      category: "Lottery",
      brand: "",
      supplier: "",
      orderCode: "-",
      stock: -56440,
      costPrice: "$0.93",
      salePrice: "$1.00",
      totalCost: "-$52,489.20",
      totalSale: "-$56,440.00",
      margin: "-$3,950.80",
      marginPercent: "7.00%",
    },
    {
      name: "Pizza",
      barcode: "894224001796",
      category: "Pizza",
      brand: "",
      supplier: "",
      orderCode: "-",
      stock: -101248.75,
      costPrice: "$5.50",
      salePrice: "$11.99",
      totalCost: "-$556,868.13",
      totalSale: "-$1,213,972.51",
      margin: "-$657,104.39",
      marginPercent: "54.13%",
    },
    {
      name: "$1 Scratch Off",
      barcode: "843051007662, 843051008034",
      category: "Lottery",
      brand: "",
      supplier: "",
      orderCode: "-",
      stock: -56440,
      costPrice: "$0.93",
      salePrice: "$1.00",
      totalCost: "-$52,489.20",
      totalSale: "-$56,440.00",
      margin: "-$3,950.80",
      marginPercent: "7.00%",
    },
  ];

  const columns = [
    { title: "Product", dataIndex: "name" },
    { title: "Barcode", dataIndex: "barcode" },
    { title: "Category", dataIndex: "category" },
    { title: "Brand", dataIndex: "brand" },
    { title: "Supplier", dataIndex: "supplier" },
    { title: "Order Code", dataIndex: "orderCode" },
    { title: "Stock", dataIndex: "stock" },
    { title: "Current Cost Price (Exc. Tax)", dataIndex: "costPrice" },
    { title: "Current Sale Price (Exc. Tax)", dataIndex: "salePrice" },
    { title: "Total Cost (Exc. Tax)", dataIndex: "totalCost" },
    { title: "Total Sale Value (Exc. Tax)", dataIndex: "totalSale" },
    { title: "Total Margin", dataIndex: "margin" },
    { title: "Margin %", dataIndex: "marginPercent" },
  ];

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header mb-3 d-flex align-items-center justify-content-between">
          <h4 className="fw-bold">
            Stock History <span className="text-primary fs-6">HELP</span>
          </h4>
        </div>
        <div className="card p-3 mb-3">
          <label className="form-label fw-semibold">Select Date</label>
          <input
            type="date"
            className="form-control"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
        <div className="card p-3 mb-3">
          <div className="row g-3">
            <div className="col-md-12">
              <label className="form-label">Filter by Location</label>
              <select className="form-select">
                <option>Warehouse A</option>
              </select>
            </div>

            <div className="col-md-12">
              <label className="form-label">Filter by Product, Brand or Barcode:</label>
              <input type="text" className="form-control" placeholder="Search..." />
            </div>
            <div className="col-md-12 d-flex justify-content-between flex-wrap gap-2">
              <div className="d-flex flex-wrap gap-2">
                <button className="btn btn-primary btn-sm text-white fw-semibold">EXPORT TO .CSV</button>
                <button className="btn btn-primary btn-sm text-white fw-semibold">EXPORT TO WORD</button>
                <button className="btn btn-primary btn-sm text-white fw-semibold">EXPORT TO EXCEL</button>
                <button className="btn btn-primary btn-sm text-white fw-semibold">PRINT</button>
              </div>
              <div className="d-flex flex-wrap gap-2">
                <button className="btn btn-outline-dark btn-sm fw-semibold">RESET</button>
                <button className="btn btn-primary btn-sm text-white fw-semibold">APPLY</button>
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-body p-0">
            <div className="table-responsive">
              <Table columns={columns} dataSource={data} pagination={false} />
            </div>
            <div className="w-100 bg-info text-white px-4 py-2 fw-bold" style={{ fontSize: "14px" }}>
              <div className="row">
                <div className="col">Total:</div>
                <div className="col text-end">
                  -2,149,103.39 &nbsp;|&nbsp; -3,122,022.62 &nbsp;|&nbsp; -972,919.24 &nbsp;|&nbsp; 31.16%
                </div>
              </div>
            </div>
          </div>
        </div>

        <CommonFooter />
      </div>
    </div>
  );
}
