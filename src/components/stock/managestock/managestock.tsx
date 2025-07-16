"use client";
import CommonFooter from "@/core/common/footer/commonFooter";
import CommonDeleteModal from "@/core/common/modal/commonDeleteModal";
import Link from "next/link";
import Table from "@/core/common/pagination/datatable";

export default function ManageStockComponent() {
  const data = [
    {
      name: "Hi 5 Disposable",
      category: "Nicotine Vape",
      costPriceExTax: "$6.50",
      salePriceExTax: "$7.99",
      salePriceIncTax: "$8.53",
      stock: 84,
      onOrder: "-",
      minStock: 100,
      maxStock: 300,
      supplier: "None",
    },
    {
      name: "Royal Honey",
      category: "Accessories",
      costPriceExTax: "$2.00",
      salePriceExTax: "$5.99",
      salePriceIncTax: "$6.39",
      stock: -237,
      onOrder: "-",
      minStock: 0,
      maxStock: 120,
      supplier: "None",
    },
    {
      name: "Juul Refill",
      category: "Cigarettes",
      costPriceExTax: "$12.30",
      salePriceExTax: "$17.99",
      salePriceIncTax: "$19.20",
      stock: -1721,
      onOrder: "-",
      minStock: 4,
      maxStock: 60,
      supplier: "None",
    },
     {
      name: "Body Oil",
      category: "Accessories",
      costPriceExTax: "$0.75",
      salePriceExTax: "$2.29",
      salePriceIncTax: "$2.44",
      stock: 11,
      onOrder: "-",
      minStock: 3,
      maxStock: 50,
      supplier: "None",
    },
    {
      name: "Juul Refill",
      category: "Cigarettes",
      costPriceExTax: "$12.30",
      salePriceExTax: "$17.99",
      salePriceIncTax: "$19.20",
      stock: -1721,
      onOrder: "-",
      minStock: 4,
      maxStock: 60,
      supplier: "None",
    },
    {
      name: "Juul Refill",
      category: "Cigarettes",
      costPriceExTax: "$12.30",
      salePriceExTax: "$17.99",
      salePriceIncTax: "$19.20",
      stock: -1721,
      onOrder: "-",
      minStock: 4,
      maxStock: 60,
      supplier: "None",
    },
     {
      name: "Body Oil",
      category: "Accessories",
      costPriceExTax: "$0.75",
      salePriceExTax: "$2.29",
      salePriceIncTax: "$2.44",
      stock: 11,
      onOrder: "-",
      minStock: 3,
      maxStock: 50,
      supplier: "None",
    },
    {
      name: "Juul Refill",
      category: "Cigarettes",
      costPriceExTax: "$12.30",
      salePriceExTax: "$17.99",
      salePriceIncTax: "$19.20",
      stock: -1721,
      onOrder: "-",
      minStock: 4,
      maxStock: 60,
      supplier: "None",
    },
    {
      name: "Juul Refill",
      category: "Cigarettes",
      costPriceExTax: "$12.30",
      salePriceExTax: "$17.99",
      salePriceIncTax: "$19.20",
      stock: -1721,
      onOrder: "-",
      minStock: 4,
      maxStock: 60,
      supplier: "None",
    },
    {
      name: "Hi 5 Disposable",
      category: "Nicotine Vape",
      costPriceExTax: "$6.50",
      salePriceExTax: "$7.99",
      salePriceIncTax: "$8.53",
      stock: 84,
      onOrder: "-",
      minStock: 100,
      maxStock: 300,
      supplier: "None",
    },
    {
      name: "Juul Refill",
      category: "Cigarettes",
      costPriceExTax: "$12.30",
      salePriceExTax: "$17.99",
      salePriceIncTax: "$19.20",
      stock: -1721,
      onOrder: "-",
      minStock: 4,
      maxStock: 60,
      supplier: "None",
    },
    {
      name: "Juul Refill",
      category: "Cigarettes",
      costPriceExTax: "$12.30",
      salePriceExTax: "$17.99",
      salePriceIncTax: "$19.20",
      stock: -1721,
      onOrder: "-",
      minStock: 4,
      maxStock: 60,
      supplier: "None",
    },
    {
      name: "Hi 5 Disposable",
      category: "Nicotine Vape",
      costPriceExTax: "$6.50",
      salePriceExTax: "$7.99",
      salePriceIncTax: "$8.53",
      stock: 84,
      onOrder: "-",
      minStock: 100,
      maxStock: 300,
      supplier: "None",
    },
    
  ];

  const columns = [
    { title: "Name", dataIndex: "name" },
    { title: "Category", dataIndex: "category" },
    { title: "Cost price (exTAX)", dataIndex: "costPriceExTax" },
    { title: "Sale Price (exTAX)", dataIndex: "salePriceExTax" },
    { title: "Sale Price (incTAX)", dataIndex: "salePriceIncTax" },
    { title: "Stock", dataIndex: "stock" },
    { title: "On order", dataIndex: "onOrder" },
    { title: "Min", dataIndex: "minStock" },
    { title: "Max", dataIndex: "maxStock" },
    { title: "Supplier", dataIndex: "supplier" },
    {
      title: "",
      dataIndex: "action",
      render: () => (
        <div className="dropdown">
          <button className="btn p-0" data-bs-toggle="dropdown">
            <i className="ti ti-dots-vertical fs-5"></i>
          </button>
          <ul className="dropdown-menu">
            <li>
              <Link className="dropdown-item" href="#">
                Inventory
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" href="#">
                Advanced Edit
              </Link>
            </li>
          </ul>
        </div>
      ),
    },
  ];

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header d-flex justify-content-between align-items-center mb-3">
          <div className="page-title">
            <h4 className="fw-bold mb-1">Stock management</h4>
            <p className="text-muted mb-0" style={{ fontSize: "14px" }}>
              Stock management allows you to track and control the products you buy from suppliers and sell to customers.
            </p>
          </div>
          <div className="page-btn">
            <Link
              href="#"
              className="btn btn-warning text-white"
              data-bs-toggle="modal"
              data-bs-target="#adjust-stock"
            >
              <i className="ti ti-adjustments-horizontal me-1"></i>
              Adjust Stock
            </Link>
          </div>
        </div>
        <div className="card shadow-sm border-0">
          <div className="card-header d-flex justify-content-between align-items-center flex-wrap gap-3 py-3 px-4 bg-white">
            <div className="d-flex align-items-center flex-wrap gap-3">
              <div className="position-relative" style={{ minWidth: "250px" }}>
               <i
                  className="ti ti-search text-muted position-absolute"
                  style={{
                    left: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    fontSize: "14px",
                  }}
                ></i>
              </div>
            </div>
            <div className="d-flex align-items-center gap-2">
              <button className="btn btn-outline-dark btn-sm d-flex align-items-center">
                <i className="ti ti-layout-grid me-1"></i> Columns
              </button>
              <button className="btn btn-outline-dark btn-sm d-flex align-items-center">
                <i className="ti ti-filter me-1"></i> Filter
              </button>
            </div>
          </div>
          <div className="card-body px-0">
            <div className="table-responsive px-4">
              <Table columns={columns} dataSource={data} />
            </div>
          </div>
          <div
            className="d-flex justify-content-between align-items-center flex-wrap px-4 py-3"
            style={{ background: "#f9f9f9", borderTop: "1px solid #eee" }}
          >
          </div>
        </div>

        <CommonFooter />
        <CommonDeleteModal />
      </div>
    </div>
  );
}
