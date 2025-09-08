"use client";
import Table from "@/core/common/pagination/datatable";
import Brand from "@/core/modals/inventory/brand";
import { all_routes } from "@/data/all_routes";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import {
  getAllproducts,
  deleteproducts,
  updateproducts,
} from "@/lib/redux/actions/productsAction";
import { Product } from "@/core/interfaces/Products";

export default function ProductListComponent() {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    dispatch(getAllproducts());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteproducts(id));
    }
  };

  const handleUpdate = (id: string, data: Partial<Product>) => {
    dispatch(updateproducts({ id, data }));
  };

  const columns = [
    {
      title: (
        <span
          style={{
            color: "#1a237e",
            padding: "6px 12px",
            borderRadius: 6,
            fontWeight: 700,
            fontSize: 16,
          }}
        >
          Name
        </span>
      ),
      dataIndex: "name",
    },
    {
      title: (
        <span
          style={{
            color: "#1a237e",
            padding: "6px 12px",
            borderRadius: 6,
            fontWeight: 700,
            fontSize: 16,
          }}
        >
          Category
        </span>
      ),
      dataIndex: "categoryId",
    },
    {
      title: (
        <span
          style={{
            color: "#1a237e",
            padding: "6px 12px",
            borderRadius: 6,
            fontWeight: 700,
            fontSize: 16,
          }}
        >
          Sale Price (excTAX)
        </span>
      ),
      dataIndex: "salePrice",
      render: (value: number) =>
        typeof value === "number" ? `$${value.toFixed(2)}` : "$0.00",
    },
    {
      title: (
        <span
          style={{
            color: "#1a237e",
            padding: "6px 12px",
            borderRadius: 6,
            fontWeight: 700,
            fontSize: 16,
          }}
        >
          Sale Price (incTAX)
        </span>
      ),
      dataIndex: "salePrice",
      render: (value: number) =>
       typeof value === "number" ? `$${(value * 1.1).toFixed(2)}` : "$0.00"
    },
    {
      title: (
        <span
          style={{
            color: "#1a237e",
            padding: "6px 12px",
            borderRadius: 6,
            fontWeight: 700,
            fontSize: 16,
          }}
        >
          Button colour
        </span>
      ),
      dataIndex: "buttonColor",
      render: (value: string) =>
        !value || value === "None" ? (
          "None"
        ) : (
          <span className="d-flex align-items-center">
            <span
              className="dot me-1"
              style={{ backgroundColor: value, width: 12, height: 12 }}
            />
            {value}
          </span>
        ),
    },
    {
      title: "",
      dataIndex: "action",
      render: (_: any, record: Product) => (
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
              <Link href="#" onClick={() => handleUpdate(record.id, record)}>
                Edit
              </Link>
            </li>
            <li>
              <Link href="#" onClick={() => handleDelete(record.id)}>
                Delete
              </Link>
            </li>
          </ul>
        </div>
      ),
    },
  ];

  return (
    <div
      className="page-wrapper"
      style={{ background: "#f8fafc", minHeight: "100vh" }}
    >
      <div
        className="content"
        style={{
          borderRadius: 16,
          boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
          background: "#fff",
          marginTop: 32,
          padding: 32,
        }}
      >
        <h4 className="fw-bold mb-3" style={{ color: "#1a237e" }}>
          Product List
        </h4>

        {loading ? (
          <div className="text-center py-5">Loading products...</div>
        ) : (
          <div
            className="card table-list-card"
            style={{
              borderRadius: 12,
              boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
            }}
          >
            <div className="card-body">
              <div className="table-responsive">
                <Table columns={columns} dataSource={products} />
              </div>
            </div>
          </div>
        )}
        <Brand />
      </div>
    </div>
  );
}
