"use client";
/* eslint-disable @next/next/no-img-element */

import Table from "@/core/common/pagination/datatable";
import CommonFooter from "@/core/common/footer/commonFooter";
import { useState } from "react";
import Link from "next/link";

export default function StockLevelsComponent() {
  const data = [
    {
      name: "Juul Device",
      barcode: "819913011580, 819913015434",
      brand: "Juul",
      supplier: "None",
      orderCode: "-",
      category: "Cigarettes",
      currentStock: -110,
      currentVolume: "-",
      totalStock: -110,
      stockOnOrder: 0,
      avgCostPrice: "$23.00",
      avgSalePrice: "$19.99",
      totalCost: "-$2,530.00",
      totalSaleValue: "-$2,198.90",
      totalMargin: "$331.10",
      marginPercent: "-15.06%",
    },
    {
      name: "High Voltage Detox",
      barcode: "013964343175, 013964343113",
      brand: "High Voltage",
      supplier: "None",
      orderCode: "-",
      category: "Accessories",
      currentStock: 1,
      currentVolume: "1",
      totalStock: 1,
      stockOnOrder: 0,
      avgCostPrice: "$4.50",
      avgSalePrice: "$12.99",
      totalCost: "$4.50",
      totalSaleValue: "$12.99",
      totalMargin: "$8.49",
      marginPercent: "65.36%",
    },
        {
      name: "Pizza",
      barcode: "013964343175, 013964343113",
      brand: "High Voltage",
      supplier: "None",
      orderCode: "-",
      category: "Accessories",
      currentStock: 1,
      currentVolume: "1",
      totalStock: 1,
      stockOnOrder: 0,
      avgCostPrice: "$4.50",
      avgSalePrice: "$12.99",
      totalCost: "$4.50",
      totalSaleValue: "$12.99",
      totalMargin: "$8.49",
      marginPercent: "65.36%",
    },
        {
      name: "Scratch Off",
      barcode: "013964343175, 013964343113",
      brand: "High Voltage",
      supplier: "None",
      orderCode: "-",
      category: "Accessories",
      currentStock: 1,
      currentVolume: "1",
      totalStock: 1,
      stockOnOrder: 0,
      avgCostPrice: "$4.50",
      avgSalePrice: "$12.99",
      totalCost: "$4.50",
      totalSaleValue: "$12.99",
      totalMargin: "$8.49",
      marginPercent: "65.36%",
    },
        {
      name: "Zig- Zag Rolling Papers",
      barcode: "013964343175, 013964343113",
      brand: "High Voltage",
      supplier: "None",
      orderCode: "-",
      category: "Accessories",
      currentStock: 1,
      currentVolume: "1",
      totalStock: 1,
      stockOnOrder: 0,
      avgCostPrice: "$4.50",
      avgSalePrice: "$12.99",
      totalCost: "$4.50",
      totalSaleValue: "$12.99",
      totalMargin: "$8.49",
      marginPercent: "65.36%",
    },
        {
      name: "High Voltage Detox",
      barcode: "013964343175, 013964343113",
      brand: "High Voltage",
      supplier: "None",
      orderCode: "-",
      category: "Accessories",
      currentStock: 1,
      currentVolume: "1",
      totalStock: 1,
      stockOnOrder: 0,
      avgCostPrice: "$4.50",
      avgSalePrice: "$12.99",
      totalCost: "$4.50",
      totalSaleValue: "$12.99",
      totalMargin: "$8.49",
      marginPercent: "65.36%",
    },
        {
      name: "High Voltage Detox",
      barcode: "013964343175, 013964343113",
      brand: "High Voltage",
      supplier: "None",
      orderCode: "-",
      category: "Accessories",
      currentStock: 1,
      currentVolume: "1",
      totalStock: 1,
      stockOnOrder: 0,
      avgCostPrice: "$4.50",
      avgSalePrice: "$12.99",
      totalCost: "$4.50",
      totalSaleValue: "$12.99",
      totalMargin: "$8.49",
      marginPercent: "65.36%",
    },
  ];

  const columns = [
    {
      title: "",
      dataIndex: "locations",
      render: () => (
        <button className="btn btn-outline-primary btn-sm">VIEW LOCATIONS</button>
      ),
    },
    { title: "Name", dataIndex: "name" },
    { title: "Barcode", dataIndex: "barcode" },
    { title: "Brand", dataIndex: "brand" },
    { title: "Supplier", dataIndex: "supplier" },
    { title: "Order Code", dataIndex: "orderCode" },
    { title: "Category", dataIndex: "category" },
    { title: "Current Stock", dataIndex: "currentStock" },
    { title: "Current Volume", dataIndex: "currentVolume" },
    { title: "Total Stock", dataIndex: "totalStock" },
    { title: "Stock on Order", dataIndex: "stockOnOrder" },
    { title: "Average Cost Price (EXC. TAX)", dataIndex: "avgCostPrice" },
    { title: "Average Sale Price (EXC. TAX)", dataIndex: "avgSalePrice" },
    { title: "Total Cost (EXC. TAX)", dataIndex: "totalCost" },
    { title: "Total Sale Value (EXC. TAX)", dataIndex: "totalSaleValue" },
    { title: "Total Margin", dataIndex: "totalMargin" },
    { title: "Margin %", dataIndex: "marginPercent" },
  ];

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header mb-4">
            <h4 className="fw-bold">Stock Levels <Link href="#" className="text-primary fs-6">HELP</Link></h4>
          </div>
          <div className="card mb-3 p-3">
          <div className="row g-3">
          <div className="col-md-4">
         <label className="form-label">Filter by Location</label>
         <select className="form-select">
        <option>Select Location</option>
        <option>Warehouse 1</option>
      </select>
    </div>
    <div className="col-md-4">
      <label className="form-label">Filter by Supplier</label>
      <select className="form-select">
        <option>All Suppliers</option>
      </select>
    </div>
    <div className="col-md-4">
      <label className="form-label">Filter by Category</label>
      <select className="form-select">
        <option>Top Level</option>
      </select>
    </div>

    <div className="col-md-12">
      <label className="form-label">Filter by Product, Brand, Barcode or Order Code</label>
      <input type="text" className="form-control" placeholder="Type and search..." />
    </div>
    <div className="col-md-12 d-flex justify-content-between align-items-center flex-wrap gap-2">
      <div className="d-flex flex-wrap gap-2">
         <button className="btn btn-sm text-white" style={{ backgroundColor: "#fd7e14" }}>EXPORT TO .CSV</button>
         <button className="btn btn-sm text-white" style={{ backgroundColor: "#fd7e14" }}>EXPORT TO WORD</button>
         <button className="btn btn-sm text-white" style={{ backgroundColor: "#fd7e14" }}>EXPORT TO EXCEL</button>
         <button className="btn btn-sm text-white"style={{ backgroundColor: "#fd7e14" }}>PRINT</button>
      </div>

      <div className="d-flex flex-wrap gap-2">
        <button className="btn btn-outline-dark btn-sm fw-semibold">RESET</button>
        <button className="btn btn-sm text-white" style={{ backgroundColor: "#fd7e14" }}>APPLY</button>
        <button className="btn btn-sm text-white fw-semibold" style={{ backgroundColor: "#fd7e14" }}>ADD STOCK</button>

      </div>
    </div>
  </div>
</div>
 <div className="card">
<div className="card-body p-0">
<div className="table-responsive">
<Table columns={columns} dataSource={data} />
</div>
 </div>
</div>
 <CommonFooter />
        </div>
      </div>
    </>
  );
}
