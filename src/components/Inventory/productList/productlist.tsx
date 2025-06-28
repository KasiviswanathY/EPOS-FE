"use client";
/* eslint-disable @next/next/no-img-element */
import Table from "@/core/common/pagination/datatable";
import CollapesIcon from "@/core/common/tooltip-content/collapes";
import RefreshIcon from "@/core/common/tooltip-content/refresh";
import TooltipIcons from "@/core/common/tooltip-content/tooltipIcons";
import { productlistdata } from "@/core/json/productlistdata";
import Brand from "@/core/modals/inventory/brand";
import { all_routes } from "@/data/all_routes";
import Link from "next/link";

export default function ProductListComponent() {
  const dataSource = productlistdata;
  const route = all_routes;

  const columns = [
    {
      title: "Name",
      dataIndex: "product",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Sale Price (excTAX)",
      dataIndex: "salePriceExcTax",
      render: (value: number) =>
        typeof value === "number" ? `$${value.toFixed(2)}` : "$0.00",
    },
    {
      title: "Sale Price (incTAX)",
      dataIndex: "salePriceIncTax",
      render: (value: number) =>
        typeof value === "number" ? `$${value.toFixed(2)}` : "$0.00",
    },
    {
      title: "Button colour",
      dataIndex: "buttonColor",
      render: (value: string) =>
        !value || value === "None" ? (
          "None"
        ) : (
          <span className="d-flex align-items-center">
            <span className="dot bg-success me-1" /> {value}
          </span>
        ),
    },
    {
      title: "",
      dataIndex: "action",
      render: () => (
        <div className="dropdown text-end">
          <a
            href="#"
            className="btn btn-sm btn-icon"
            data-bs-toggle="dropdown"
          >
            <i className="ti ti-dots-vertical"></i>
          </a>
          <ul className="dropdown-menu dropdown-menu-end">
            <li>
              <Link href="#">Edit</Link>
            </li>
            <li>
              <Link href="#">Delete</Link>
            </li>
          </ul>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="page-wrapper">
        <div className="content">

          {/* Tabs + Search + Add Buttons */}
          <div className="d-flex align-items-center justify-content-between flex-wrap mb-3">
            <div className="d-flex align-items-center flex-wrap gap-2">
              <ul className="nav nav-tabs border-0">
                <li className="nav-item">
                  <a className="nav-link active" href="#">
                    Current
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Archived
                  </a>
                </li>
              </ul>
              <input
                type="text"
                className="form-control ms-2"
                placeholder="Search"
                style={{ width: "250px", height: "36px" }}
              />
            </div>
            <div className="d-flex align-items-center gap-2 mt-2 mt-sm-0">
              <Link
                href="#"
                className="btn"
                style={{
                  backgroundColor: "#FFA500",
                  color: "#fff",
                  fontWeight: 600,
                }}
              >
                + Advanced Add
              </Link>
              <Link
                href="#"
                className="btn"
                style={{
                  border: "1px solid orange",
                  color: "#FFA500",
                  fontWeight: 600,
                }}
              >
                ⚡ Quick Add
              </Link>
            </div>
          </div>

          

          {/* Table */}
          <div className="card table-list-card">
            <div className="card-body">
              <div className="table-responsive">
                <Table columns={columns} dataSource={productlistdata} />
              </div>

              {/* Footer */}
              <div className="d-flex justify-content-between align-items-center mt-4">
                <Link href="#" className="text-primary">
                  <i className="ti ti-download me-1" /> Export
                </Link>
                <span>Items per page: 50</span>
              </div>
            </div>
          </div>

          {/* Import Modal Placeholder */}
          <Brand />
        </div>
      </div>
    </>
  );
}
