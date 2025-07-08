"use client";
import Table from "@/core/common/pagination/datatable";
import CommonFooter from "@/core/common/footer/commonFooter";
import Link from "next/link";

export default function StockWarningsComponent() {
  const data = [
    {
      name: "2Five2 Stickers $3.50",
      barcode: "3000368543",
      category: "Accessories",
      brand: "2Five2",
      supplier: "2Five2",
      stock: -10,
      min: 0,
      max: 100,
      onOrder: 0,
      reorder: 110,
    },
    {
      name: "2Five2 Stickers $4.00",
      barcode: "6512576480",
      category: "Accessories",
      brand: "2Five2",
      supplier: "2Five2",
      stock: -29,
      min: 0,
      max: 100,
      onOrder: 0,
      reorder: 129,
    },
    {
      name: "2Five2 Stickers $5.00",
      barcode: "3121764565",
      category: "Accessories",
      brand: "2Five2",
      supplier: "2Five2",
      stock: -23,
      min: 0,
      max: 100,
      onOrder: 0,
      reorder: 123,
    },
    {
      name: "Royal Honey",
      barcode: "955401019997, 9555755800043",
      category: "Accessories",
      brand: "Jull",
      supplier: "None",
      stock: -239,
      min: 0,
      max: 120,
      onOrder: 0,
      reorder: 359,
    },
    {
      name: "Eon Smoke",
      barcode: `852675072741,`,
      category: "Cigarettes",
      brand: "Jull",
      supplier: "NONE",
      stock: -478,
      min: 0,
      max: 90,
      onOrder: 0,
      reorder: 568,
    },
    {
      name: "Juul Device",
      barcode: "819913011580, 819913015434",
      category: "Cigarettes",
      brand: "Juul",
      supplier: "None",
      stock: -110,
      min: 1,
      max: 40,
      onOrder: 0,
      reorder: 150,
    },
    {
      name: "Juul Refills",
      barcode: `819913011405, 819913011382,`,
      category: "Cigarettes",
      brand: "Jull",
      supplier: "None",
      stock: -1721,
      min: 4,
      max: 60,
      onOrder: 0,
      reorder: 1781,
    },
    {
      name: "S1 Scratch Off",
      barcode: "843051007662",
      category: "Lottery",
      brand: "Jull",
      supplier: "NONE",
      stock: -56440,
      min: 0,
      max: 5000,
      onOrder: 0,
      reorder: 61440,
    },
    {
      name: "Juul Refills",
      barcode: `819913011405, 819913011382,`,
      category: "Cigarettes",
      brand: "252",
      supplier: "None",
      stock: -1721,
      min: 4,
      max: 60,
      onOrder: 0,
      reorder: 1781,
    },
    {
      name: "Juul Device",
      barcode: "819913011580, 819913015434",
      category: "Cigarettes",
      brand: "Juul",
      supplier: "None",
      stock: -110,
      min: 1,
      max: 40,
      onOrder: 0,
      reorder: 150,
    },
    {
      name: "2Five2 Stickers $5.00",
      barcode: "3121764565",
      category: "Accessories",
      brand: "2Five2",
      supplier: "2Five2",
      stock: -23,
      min: 0,
      max: 100,
      onOrder: 0,
      reorder: 123,
    },
    {
      name: "Juul Device",
      barcode: "819913011580, 819913015434",
      category: "Cigarettes",
      brand: "Juul",
      supplier: "None",
      stock: -110,
      min: 1,
      max: 40,
      onOrder: 0,
      reorder: 150,
    },
  ];

  const columns = [
    { title: "Product", dataIndex: "name" },
    { title: "Barcode", dataIndex: "barcode" },
    { title: "Category", dataIndex: "category" },
    { title: "Brand", dataIndex: "brand" },
    { title: "Supplier", dataIndex: "supplier" },
    { title: "Current Stock", dataIndex: "stock" },
    { title: "Min Stock", dataIndex: "min" },
    { title: "Max Stock", dataIndex: "max" },
    { title: "On Order", dataIndex: "onOrder" },
    { title: "Reorder", dataIndex: "reorder" },
  ];

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header mb-3 d-flex align-items-center justify-content-between">
          <h4 className="fw-bold">
            Stock Warnings <Link href="#" className="text-primary fs-6">HELP</Link>
          </h4>
        </div>
        <div className="card mb-3 p-3">
          <div className="row g-3">
            <div className="col-md-12">
              <label className="form-label">Filter by Location</label>
              <select className="form-select">
                <option>Warehouse 1</option>
                <option>Warehouse 2</option>
              </select>
            </div>
            <div className="col-md-12 d-flex justify-content-between flex-wrap gap-2 pt-2">
              <div className="d-flex flex-wrap gap-2">
                <button className="btn btn-sm text-white" style={{ backgroundColor: "#fd7e14" }}>EXPORT TO.CSV</button>
                <button className="btn btn-sm text-white" style={{ backgroundColor: "#fd7e14" }}>EXPORT TO WORD</button>
                <button className="btn btn-sm text-white" style={{ backgroundColor: "#fd7e14" }}>EXPORT TO EXCEL</button>
                <button className="btn btn-sm text-white" style={{ backgroundColor: "#fd7e14" }}>PRINT</button>
              </div>

              <div className="d-flex gap-2">
                <button className="btn btn-outline-dark btn-sm fw-semibold">RESET</button>
                <button className="btn btn-sm text-white" style={{ backgroundColor: "#fd7e14" }}>APPLY</button>
                <button className="btn btn-sm text-white" style={{ backgroundColor: "#fd7e14" }}>ADD STOCK</button>

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
  );
}
