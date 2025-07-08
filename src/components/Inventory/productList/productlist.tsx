"use client";
import Table from "@/core/common/pagination/datatable";
import CollapesIcon from "@/core/common/tooltip-content/collapes";
import RefreshIcon from "@/core/common/tooltip-content/refresh";
import TooltipIcons from "@/core/common/tooltip-content/tooltipIcons";
import { productlistdata } from "@/core/json/productlistdata";
import Brand from "@/core/modals/inventory/brand";
import { all_routes } from "@/data/all_routes";
import Link from "next/link";
import React, { useState } from "react";

const unitOfSaleOptions = [
  "Select Unit of Sale",
  "Cards",
  "cl",
  "cm",
  "cup",
  "dozen",
  "ft",
  "g",
  "gal",
  "kg",
  "lb",
  "l",
  "m",
  "ml",
  "oz",
  "pack",
  "piece",
  "pint",
  "qt",
  "sheet",
  "sq ft",
  "sq m",
  "unit",
];

function CustomDropdown({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} style={{ position: "relative", width: "100%" }}>
      <button
        type="button"
        className="form-select text-start"
        style={{ width: "100%", cursor: "pointer" }}
        onClick={() => setOpen((o) => !o)}
      >
        {value || "Select Unit of Sale"}
      </button>
      {open && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            width: "100%",
            background: "#fff",
            border: "1px solid #e0e7ef",
            borderRadius: 6,
            boxShadow: "0 4px 16px rgba(0,0,0,0.10)",
            zIndex: 100,
            maxHeight: 220,
            overflowY: "auto",
          }}
        >
          {unitOfSaleOptions.map((opt) => (
            <div
              key={opt}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              style={{
                padding: "8px 16px",
                cursor: "pointer",
                background: value === opt ? "#f0f4ff" : "#fff",
                color: opt === "Select Unit of Sale" ? "#aaa" : "#222",
                fontWeight: value === opt ? 600 : 400,
              }}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProductListComponent() {
  const dataSource = productlistdata;
  const route = all_routes;

  const columns = [
    {
      title: (
        <span style={{  color: '#1a237e', padding: '6px 12px', borderRadius: 6, fontWeight: 700, fontSize: 16 }}>
          Name
        </span>
      ),
      dataIndex: "product",
    },
    {
      title: (
        <span style={{  color: '#1a237e', padding: '6px 12px', borderRadius: 6, fontWeight: 700, fontSize: 16 }}>
          Category
        </span>
      ),
      dataIndex: "category",
    },
    {
      title: (
        <span style={{  color: '#1a237e', padding: '6px 12px', borderRadius: 6, fontWeight: 700, fontSize: 16 }}>
          Sale Price (excTAX)
        </span>
      ),
      dataIndex: "salePriceIncTax",
      render: (value: number) =>
        typeof value === "number" ? `$${value.toFixed(2)}` : "$0.00",
    },
   {
      title: (
        <span style={{  color: '#1a237e', padding: '6px 12px', borderRadius: 6, fontWeight: 700, fontSize: 16 }}>
          Sale Price (incTAX)
        </span>
      ),
      dataIndex: "salePriceIncTax",
      render: (value: number) =>
        typeof value === "number" ? `$${value.toFixed(2)}` : "$0.00",
    },
    {
      title: (
        <span style={{  color: '#1a237e', padding: '6px 12px', borderRadius: 6, fontWeight: 700, fontSize: 16 }}>
          Button colour
        </span>
      ),
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

  const [showFilters, setShowFilters] = useState(false);
  const [showColumns, setShowColumns] = useState(false);
  const [selectedColumns, setSelectedColumns] = useState([
    "Name",
    "Category",
    "Sale price (excTAX)",
    "Sale price (incTAX)",
    "Button colour",
  ]);

  const allColumns = [
    "Name",
    "Category",
    "Sale price (excTAX)",
    "Sale price (incTAX)",
    "Button colour",
    "Barcode",
    "Description",
    "Cost price (excTAX)",
    "Cost price (incTAX)",
    "Sale Tax Rate",
    "Variable price",
    "Tax exemptable",
    "Container Fees",
    "Brand",
    "Supplier",
    "Sell on Till",
    "Till order",
    "Recommended Retail Price (RRP)",
    "Order code",
    "Article code",
    "Popup note",
    "Multiple choice note",
    "Margin",
    "Stock Tracked",
  ];

  const handleColumnChange = (col: string) => {
    setSelectedColumns((prev) =>
      prev.includes(col)
        ? prev.filter((c) => c !== col)
        : [...prev, col]
    );
  };

  const handleResetColumns = () => {
    setSelectedColumns([
      "Name",
      "Category",
      "Sale price (excTAX)",
      "Sale price (incTAX)",
      "Button colour",
    ]);
  };

  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [showAdvancedAdd, setShowAdvancedAdd] = useState(false);
  const [unitOfSale, setUnitOfSale] = useState("");

  return (
    <>
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
          <div className="mb-3">
            <div className="d-flex align-items-center justify-content-between flex-wrap mb-2">
              <div>
                <h4
                  className="fw-bold mb-1"
                  style={{ color: "#1a237e" }}
                >
                  Product List
                </h4>
                <div style={{ fontSize: 15, color: "#6c757d" }}>
                  
                  <br />
                  To manage your stock, check out{" "}
                  <a
                    href="#"
                    className="text-primary text-decoration-underline"
                  >
                    Stock Management
                  </a>
                </div>
              </div>
              <div className="d-flex align-items-center gap-2">
                <Link
                  href="#"
                  className="btn"
                  style={{
                    backgroundColor: "orange",
                    color: "#fff",
                    fontWeight: 600,
                    borderRadius: 6,
                    minWidth: 140,
                  }}
                  onClick={e => { e.preventDefault(); setShowAdvancedAdd(true); }}
                >
                  + Advanced Add
                </Link>
                <Link
                  href="#"
                  className="btn"
                  style={{
                   backgroundColor: "#256DFF",
                    color: "#fff",
                    fontWeight: 600,
                    borderRadius: 6,
                    minWidth: 120,
                  }}
                  onClick={e => { e.preventDefault(); setShowQuickAdd(true); }}
                >
                  ⚡ Quick Add
                </Link>
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-between flex-wrap mt-3 mb-2">
              <div className="d-flex align-items-center gap-3 flex-wrap">
                <ul
                  className="nav nav-tabs border-0"
                  style={{ background: "transparent" }}
                >
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      href="#"
                      style={{
                        fontWeight: 600,
                        color: "#6c757d",
                        background: "transparent",
                      }}
                    >
                      Current
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      href="#"
                      style={{
                        fontWeight: 600,
                        color: "#6c757d",
                        background: "transparent",
                      }}
                    >
                      Archived
                    </a>
                  </li>
                </ul>
                <div className="input-group" style={{ width: 260 }}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search"
                    style={{ height: 36, borderRadius: 6 }}
                  />
                  <span
                    className="input-group-text bg-white"
                    style={{
                      borderLeft: 0,
                      borderRadius: "0 6px 6px 0",
                    }}
                  >
                    <i
                      className="ti ti-search"
                      style={{ color: "#256DFF" }}
                    ></i>
                  </span>
                </div>
              </div>
              <div className="d-flex align-items-center gap-3 flex-wrap">
                
                <button
                  className="btn btn-link text-secondary p-0 d-flex align-items-center"
                  style={{
                    fontWeight: 500,
                    fontSize: 15,
                  }}
                  onClick={() => setShowColumns(true)}
                >
                  <i className="ti ti-layout-grid me-1"></i> Columns
                </button>
                <button
                  className="btn btn-link text-secondary p-0 d-flex align-items-center"
                  style={{
                    fontWeight: 500,
                    fontSize: 15,
                  }}
                  onClick={() => setShowFilters(true)}
                >
                  <i className="ti ti-filter me-1"></i> Filter
                </button>
              </div>
            </div>
          </div>
          <div
            className="card table-list-card"
            style={{
              borderRadius: 12,
              boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
            }}
          >
            <div className="card-body">
              <div className="table-responsive">
                <Table columns={columns} dataSource={productlistdata} />
              </div>
              <div className="d-flex justify-content-between align-items-center mt-4">
                <Link href="#" className="text-primary">
                  <i className="ti ti-download me-1" /> Export
                </Link>
                <span>Items per page: 50</span>
              </div>
            </div>
          </div>
          <Brand />
        </div>
      </div>
     
      {showFilters && (
        <div
          style={{
            position: "fixed",
            top: 100,
            right: 48,
            zIndex: 3000,
            minWidth: 340,
            maxWidth: 370,
            background: "#fff",
            borderRadius: 12,
            boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
            padding: 24,
            border: "1px solid #e0e7ef",
            display: 'flex',
            flexDirection: 'column',
            gap: 0,
            alignItems: 'stretch',
            overflowY: 'auto',
            maxHeight: '80vh',
          }}
        >
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span
              className="fw-bold"
              style={{ fontSize: 18, color: "#1a237e" }}
            >
              Filters
            </span>
            <button
              className="btn btn-sm btn-light"
              style={{
                borderRadius: 6,
                color: "#FF3B3B",
                fontWeight: 700,
                fontSize: 20,
                lineHeight: 1,
                width: 32,
                height: 32,
              }}
              onClick={() => setShowFilters(false)}
            >
              &times;
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div className="mb-2">
              <label className="form-label">Category</label>
              <select className="form-select">
                <option>All Categories</option>
                <option>Accessories</option>
                <option>THC & Delta</option>
                <option>Candy</option>
                <option>Snacks</option>
                <option>Beer/Wine</option>
              
              </select>
            </div>
            <div className="mb-2">
              <label className="form-label">Sale Tax Rate</label>
              <select className="form-select">
                <option>All Tax Rates</option>
                <option>0%</option>
                <option>5%</option>
                <option>10%</option>
              
              </select>
            </div>
            <div className="mb-2">
              <label className="form-label">Brand</label>
              <select className="form-select">
                <option>All Brands</option>
               
              </select>
            </div>
            <div className="mb-2">
              <label className="form-label">Supplier</label>
              <select className="form-select">
                <option>All Suppliers</option>
               
              </select>
            </div>
            <div className="mb-2">
              <label className="form-label">Button colour</label>
              <select className="form-select">
                <option>All Button colours</option>
                <option>Red</option>
                <option>Green</option>
                <option>Blue</option>
               
              </select>
            </div>
            <div className="mb-2">
              <label className="form-label">Variable price</label>
              <select className="form-select">
                <option>All Products</option>
                <option>Enabled</option>
                <option>Disabled</option>
              </select>
            </div>
            <div className="mb-2">
              <label className="form-label">Tax Exempt/EBT Eligible</label>
              <select className="form-select">
                <option>All Products</option>
                <option>Enabled</option>
                <option>Disabled</option>
              </select>
            </div>
            <div className="mb-2">
              <label className="form-label">Sell On Till</label>
              <select className="form-select">
                <option>All Products</option>
                <option>Enabled</option>
                <option>Disabled</option>
              </select>
            </div>
            <div className="mb-2">
              <label className="form-label">Stock tracking</label>
              <select className="form-select">
                <option>All Products</option>
                <option>Enabled</option>
                <option>Disabled</option>
              </select>
            </div>
          </div>
        </div>
      )}
      {showColumns && (
        <div
          style={{
            position: "fixed",
            top: 100,
            right: 48,
            zIndex: 3000,
            minWidth: 340,
            maxWidth: 370,
            background: "#fff",
            borderRadius: 12,
            boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
            padding: 24,
            border: "1px solid #e0e7ef",
            display: 'flex',
            flexDirection: 'column',
            gap: 0,
            alignItems: 'stretch',
            overflowY: 'auto',
            maxHeight: '80vh',
          }}
        >
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span
              className="fw-bold"
              style={{ fontSize: 18, color: "#1a237e" }}
            >
              Columns
            </span>
            <button
              className="btn btn-sm btn-light"
              style={{
                borderRadius: 6,
                color: "#FF3B3B",
                fontWeight: 700,
                fontSize: 20,
                lineHeight: 1,
                width: 32,
                height: 32,
              }}
              onClick={() => setShowColumns(false)}
            >
              &times;
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {allColumns.map((col, idx) => (
              <div key={col} className="form-check d-flex align-items-center mb-2" style={{paddingLeft: 0}}>
                <input
                  className="form-check-input me-2"
                  type="checkbox"
                  checked={selectedColumns.includes(col)}
                  onChange={() => handleColumnChange(col)}
                  id={`col-${idx}`}
                  style={{marginLeft: 0}}
                />
                <label className="form-check-label" htmlFor={`col-${idx}`}>{col}</label>
                {col === "Till order" && (
                  <span style={{marginLeft: 4, color: '#256DFF', cursor: 'pointer'}} title="This is the till order info.">
                    <i className="ti ti-info-circle"></i>
                  </span>
                )}
                {/* Add up/down arrows for Supplier as in screenshot */}
                {col === "Supplier" && (
                  <span style={{marginLeft: 8}}>
                    <i className="ti ti-arrow-up" style={{fontSize: 14, marginRight: 2}}></i>
                    <i className="ti ti-arrow-down" style={{fontSize: 14}}></i>
                  </span>
                )}
              </div>
            ))}
          </div>
          <button
            className="btn btn-outline-primary mt-3"
            style={{ borderRadius: 6, fontWeight: 600 }}
            onClick={handleResetColumns}
          >
            Reset Columns
          </button>
        </div>
      )}
      {showQuickAdd && (
        <div
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            width: 400,
            height: '100vh',
            background: '#fff',
            zIndex: 4000,
            boxShadow: '-4px 0 24px rgba(0,0,0,0.10)',
            display: 'flex',
            flexDirection: 'column',
            padding: 32,
            borderLeft: '1px solid #e0e7ef',
          }}
        >
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className="fw-bold" style={{ fontSize: 20, color: '#1a237e' }}>Add Product</span>
            <button
              className="btn btn-sm btn-light"
              style={{ borderRadius: 6, color: '#FF3B3B', fontWeight: 700, fontSize: 20, lineHeight: 1, width: 32, height: 32 }}
              onClick={() => setShowQuickAdd(false)}
            >
              &times;
            </button>
          </div>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            <div className="mb-3">
              <input className="form-control" placeholder="Product Name" />
            </div>
            <div className="mb-3">
              <label className="form-label">Category</label>
              <select className="form-select">
                <option>Top Level</option>
                {/* Add more categories as needed */}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Tax Rate</label>
              <select className="form-select">
                <option>No Tax</option>
                {/* Add more tax rates as needed */}
              </select>
            </div>
            <div className="mb-3 d-flex gap-2">
              <div style={{ flex: 1 }}>
                <label className="form-label">Cost (Excluding Tax)</label>
                <div className="input-group">
                  <span className="input-group-text">$</span>
                  <input className="form-control" defaultValue="0.00" />
                </div>
              </div>
            </div>
            <div className="mb-3 d-flex gap-2">
              <div style={{ flex: 1 }}>
                <label className="form-label">Price (Excluding Tax)</label>
                <div className="input-group">
                  <span className="input-group-text">$</span>
                  <input className="form-control" defaultValue="0.00" />
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <label className="form-label">Price (Including Tax)</label>
                <div className="input-group">
                  <span className="input-group-text">$</span>
                  <input className="form-control" defaultValue="0.00" />
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Button Color</label>
              <select className="form-select">
                <option>None</option>
                {/* Add more colors as needed */}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Barcode (optional)</label>
              <input className="form-control" />
              <a href="#" className="text-primary mt-1 d-block" style={{ fontSize: 14 }}>+ Auto Generate Barcode</a>
            </div>
            <div className="mb-3 d-flex align-items-center">
              <span style={{ fontWeight: 500, marginRight: 8 }}>Track stock</span>
              <div className="form-check form-switch m-0">
                <input className="form-check-input" type="checkbox" id="trackStockSwitch" />
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center mt-3">
            <a href="#" className="text-secondary" style={{ fontWeight: 500, fontSize: 15 }}>Advanced Options</a>
            <button className="btn btn-primary" style={{ minWidth: 80, fontWeight: 600 }}>Save</button>
          </div>
        </div>
      )}
      {showAdvancedAdd && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.12)',
            zIndex: 5000,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            overflowY: 'auto',
          }}
        >
          <div style={{
            background: '#fff',
            marginTop: 32,
            borderRadius: 8,
            minWidth: 900,
            maxWidth: 1100,
            width: '90vw',
            boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
            padding: 0,
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
          }}>
            <div className="d-flex justify-content-between align-items-center p-4 border-bottom" style={{position: 'relative'}}>
              <h3 className="mb-0" style={{ fontWeight: 600 }}>Add a Product</h3>
              <button
                className="btn btn-sm btn-light"
                style={{ position: 'absolute', top: 16, right: 16, borderRadius: 6, color: '#FF3B3B', fontWeight: 700, fontSize: 20, lineHeight: 1, width: 32, height: 32, zIndex: 10 }}
                onClick={() => setShowAdvancedAdd(false)}
                aria-label="Close"
              >
                &times;
              </button>
            </div>
            <div style={{ padding: 32, paddingTop: 24, maxHeight: '70vh', overflowY: 'auto' }}>
              {/* Product Details Section (already present) */}
              <div className="mb-4" style={{border: '1px solidrgb(17, 119, 235)', borderRadius: 10, boxShadow: '0 2px 12px rgba(0,0,0,0.04)', background: '#fcfdff' }}>
                <div className="p-3" style={{ background: '#e3f0ff', borderRadius: '10px 10px 0 0', borderBottom: '1px solid #e0e7ef', fontWeight: 700, fontSize: 20, color: '#1a237e', letterSpacing: 0.5 }}>
                  Product Details
                </div>
                <div className="p-4">
                  <div className="row g-3 align-items-center">
                    <div className="col-md-3">
                      <label className="form-label mb-0">Name</label>
                      <input className="form-control" placeholder="Appears on POS" />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label mb-0">Description</label>
                      <input className="form-control" placeholder="Appears on receipt" />
                    </div>
                    <div className="col-md-3 d-flex align-items-center" style={{marginTop: 30}}>
                      <input type="checkbox" className="form-check-input me-2" defaultChecked id="sellOnPOS" />
                      <label htmlFor="sellOnPOS" className="form-check-label">Sell on POS</label>
                    </div>
                  </div>
                  <div className="row g-3 align-items-center mt-2">
                    <div className="col-md-3">
                      <label className="form-label mb-0">Category</label>
                      <div className="input-group">
                        <select className="form-select">
                          <option>Top Level</option>
                        </select>
                        <button className="btn btn-outline-primary">Create</button>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <label className="form-label mb-0">Brand</label>
                      <div className="input-group">
                        <select className="form-select">
                          <option>Select Brand</option>
                        </select>
                        <button className="btn btn-outline-primary">Create</button>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <label className="form-label mb-0">Supplier</label>
                      <div className="input-group">
                        <select className="form-select">
                          <option>Supplier</option>
                        </select>
                        <button className="btn btn-outline-primary">Create</button>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <label className="form-label mb-0">Additional Suppliers</label>
                      <select className="form-select">
                        <option>Select Additional Suppliers</option>
                      </select>
                    </div>
                  </div>
                  <div className="row g-3 align-items-center mt-2">
                    <div className="col-md-3">
                      <label className="form-label mb-0">Barcode</label>
                      <div className="input-group">
                        <input className="form-control" placeholder="Enter barcode no..." />
                        <button className="btn btn-outline-secondary">Auto Generate</button>
                      </div>
                      <div className="form-text">Separate multiple barcodes with a comma</div>
                    </div>
                    <div className="col-md-3">
                      <label className="form-label mb-0">Product Order Code</label>
                      <input className="form-control" placeholder="For reference to supplier" />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label mb-0">Article Code</label>
                      <input className="form-control" placeholder="For use in accounting" />
                    </div>
                    <div className="col-md-3 d-flex align-items-center" style={{marginTop: 30}}>
                      <input type="checkbox" className="form-check-input me-2" id="preventLoyalty" />
                      <label htmlFor="preventLoyalty" className="form-check-label">Prevent gaining loyalty points for this Product</label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pricing Section */}
              <div className="mb-4" style={{ border: '1px solidrgb(17, 119, 235)', borderRadius: 10, boxShadow: '0 2px 12px rgba(0,0,0,0.04)', background: '#fcfdff' }}>
                <div className="p-3" style={{ background: '#e3f0ff', borderRadius: '10px 10px 0 0', borderBottom: '1px solid #e0e7ef', fontWeight: 700, fontSize: 20, color: '#1a237e', letterSpacing: 0.5 }}>
                  Pricing <span className="text-muted" style={{ fontWeight: 400, fontSize: 14, marginLeft: 8 }}>Set the pricing for your product to give you maximum profits. Use our calculator to work out how much your product is priced. Inputting the cost price and the sales price, you can set your margins easily!</span>
                </div>
                <div className="p-4">
                  <div className="row mb-3">
                    <div className="col-md-3">
                      <label className="form-label mb-1">Cost Price</label>
                      <div className="input-group">
                        <span className="input-group-text">$</span>
                        <input className="form-control" placeholder="Excluding Tax" />
                      </div>
                    </div>
                    <div className="col-md-6 d-flex align-items-end justify-content-center">
                      <span className="btn btn-outline-secondary w-100" >
                        Calculate Cost from Master Products
                      </span>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-3">
                      <label className="form-label mb-1">Sale Price</label>
                      <div className="input-group">
                        <span className="input-group-text">$</span>
                        <input className="form-control" placeholder="Excluding Tax" />
                      </div>
                    </div>
                    <div className="col-md-3">
                      <label className="form-label mb-1">Tax Rate</label>
                      <div className="d-flex align-items-center">
                        <select className="form-select me-2">
                          <option>Select Tax Rate</option>
                        </select>
                        <button className="btn btn-outline-secondary" style={{ fontWeight: 500, fontSize: 15, borderRadius: 6, height: 40, minWidth: 140 }}>
                          Create Tax Rate
                        </button>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <label className="form-label mb-1">Sale Price</label>
                      <div className="input-group">
                        <span className="input-group-text">$</span>
                        <input className="form-control" placeholder="Including Tax" />
                      </div>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-3">
                      <label className="form-label mb-1">Recommended Retail Price (RRP)</label>
                      <div className="input-group">
                        <span className="input-group-text">$</span>
                        <input className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-3">
                      <label className="form-label mb-1">Container Fees</label>
                      <select className="form-select">
                        <option>Select Container Fee</option>
                      </select>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-md-3 d-flex align-items-center">
                      <input type="checkbox" className="form-check-input me-2" id="variablePrice" />
                      <label htmlFor="variablePrice" className="form-check-label mb-0">Variable Price</label>
                    </div>
                    <div className="col-md-6">
                      <span className="text-muted" style={{ fontSize: 12 }}>This option allows you to set the price of the product upon sale. The pricing set will be the default price on the POS.</span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-3 d-flex align-items-center">
                      <input type="checkbox" className="form-check-input me-2" id="taxExempt" />
                      <label htmlFor="taxExempt" className="form-check-label mb-0">Tax Exempt</label>
                    </div>
                    <div className="col-md-6">
                      <span className="text-muted" style={{ fontSize: 12 }}>Select if the product is tax exemptible or EBT eligible</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Customer Specific Pricing Section */}
              <div className="mb-4" style={{ border: '1px solidrgb(17, 119, 235)', borderRadius: 10, boxShadow: '0 2px 12px rgba(0,0,0,0.04)', background: '#fcfdff' }}>
                <div className="p-3" style={{ background: '#e3f0ff', borderRadius: '10px 10px 0 0', borderBottom: '1px solid #e0e7ef', fontWeight: 700, fontSize: 20, color: '#1a237e', letterSpacing: 0.5 }}>
                  Customer Specific Pricing
                </div>
                <div className="p-4">
                  <div className="row g-3 align-items-center">
                    <div className="col-md-4">
                      <label className="form-label mb-0">Customer Type</label>
                      <div className="input-group">
                        <select className="form-select">
                          <option>Select Customer Type</option>
                        </select>
                        <button className="btn btn-outline-primary">Create</button>
                      </div>
                      <div className="form-text">Choose a customer type, then set a price for that type</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Add Multiple Choice Products Section */}
              <div className="mb-4" style={{ border: '1px solidrgb(17, 119, 235)', borderRadius: 10, boxShadow: '0 2px 12px rgba(0,0,0,0.04)', background: '#fcfdff' }}>
                <div className="p-3" style={{ background: '#e3f0ff', borderRadius: '10px 10px 0 0', borderBottom: '1px solid #e0e7ef', fontWeight: 700, fontSize: 20, color: '#1a237e', letterSpacing: 0.5 }}>
                  Add multiple choice products
                </div>
                <div className="p-4">
                  <div className="mb-2 text-muted" style={{ fontSize: 14 }}>
                    Multiple choice products are provided as options to be sold alongside this product. E.g. If you have a product called Rum, create a product group called Mixers containing Coke, Lemonade etc. Drag and drop the groups to rearrange the order they are displayed on the till.
                  </div>
                  <div className="mb-2 text-muted" style={{ fontSize: 14 }}>
                    Select one of the Multiple Choice Product Groups you've previously created from the list, you can select multiple groups if you wish.
                  </div>
                  <div className="mb-2 text-muted" style={{ fontSize: 14 }}>
                    Can't see your Multiple Choice Product Group in the list? If this product has been added as a Multiple Choice Product to the group you're trying to attach, it will NOT appear in this list.
                  </div>
                  <div className="row g-3 align-items-center mt-2">
                    <div className="col-md-4 d-flex align-items-center">
                      <input type="checkbox" className="form-check-input me-2" id="optionalMultipleChoice" />
                      <label htmlFor="optionalMultipleChoice" className="form-check-label">Optional Multiple Choice Products</label>
                      <span className="ms-2 text-muted" style={{ fontSize: 12 }}>Allows you to set the multiple choice product optional</span>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label mb-0">Multiple Choice Product Group</label>
                      <div className="input-group">
                        <select className="form-select">
                          <option>Select Multiple Choice Product Group</option>
                        </select>
                        <button className="btn btn-outline-primary">Create</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Add Product Tags Section */}
              <div className="mb-4" style={{ border: '1px solidrgb(17, 119, 235)', borderRadius: 10, boxShadow: '0 2px 12px rgba(0,0,0,0.04)', background: '#fcfdff' }}>
                <div className="p-3" style={{ background: '#e3f0ff', borderRadius: '10px 10px 0 0', borderBottom: '1px solid #e0e7ef', fontWeight: 700, fontSize: 20, color: '#1a237e', letterSpacing: 0.5 }}>
                  Add product tags
                </div>
                <div className="p-4">
                  <select className="form-select">
                    <option>Select Tag</option>
                  </select>
                </div>
              </div>

              {/* POS Options Section */}
              <div className="mb-4" style={{ border: '1px solidrgb(17, 119, 235)', borderRadius: 10, boxShadow: '0 2px 12px rgba(0,0,0,0.04)', background: '#fcfdff' }}>
                <div className="p-3" style={{ background: '#e3f0ff', borderRadius: '10px 10px 0 0', borderBottom: '1px solid #e0e7ef', fontWeight: 700, fontSize: 20, color: '#1a237e', letterSpacing: 0.5 }}>
                  POS Options
                </div>
                <div className="p-4">
                  <div className="row g-3 align-items-center">
                    <div className="col-md-3">
                      <label className="form-label mb-0">POS Order</label>
                      <input className="form-control" placeholder="Position the product appears on the POS" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label mb-0">Button Color</label>
                      <div className="d-flex align-items-center gap-2">
                        {/* Example color buttons */}
                        {['#ccc','#888','#444','#e74c3c','#3498db','#1abc9c','#f39c12','#e67e22','#2ecc71','#9b59b6','#34495e','#27ae60'].map((color, idx) => (
                          <button key={idx} className="btn" style={{ background: color, width: 24, height: 24, borderRadius: '50%', border: '1px solid #ddd' }}></button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="row g-3 align-items-center mt-2">
                    <div className="col-md-3">
                      <label className="form-label mb-0">Popup Note</label>
                      <div className="input-group">
                        <select className="form-select">
                          <option>Select Popup Note</option>
                          <option>Age 21 Verification</option>
                          <option>Product Information</option>
                          <option>Special Instructions</option>

                        </select>
                        <button className="btn btn-outline-primary">Create</button>
                      </div>
                      <div className="form-text">Appears when adding a product to a transaction</div>
                    </div>
                    <div className="col-md-3">
                      <label className="form-label mb-0">Multiple Choice Note</label>
                      <div className="input-group">
                        <select className="form-select">
                          <option>Select Multiple Choice Note</option>
                        </select>
                        <button className="btn btn-outline-primary">Create</button>
                      </div>
                      <div className="form-text">Appears when adding a product to a transaction</div>
                    </div>
                    <div className="col-md-3 d-flex align-items-center mt-4">
                      <input type="checkbox" className="form-check-input me-2" id="scannableOnly" />
                      <label htmlFor="scannableOnly" className="form-check-label">Scannable Only</label>
                      <span className="ms-2 text-muted" style={{ fontSize: 12 }}>If enabled, prevent product from being added to cart manually</span>
                    </div>
                    <div className="col-md-3">
                      <label className="form-label mb-0">Order Quantity Limit</label>
                      <div className="input-group">
                        <button className="btn btn-outline-secondary">-</button>
                        <input className="form-control text-center" style={{ maxWidth: 60 }} />
                        <button className="btn btn-outline-secondary">+</button>
                      </div>
                      <div className="form-text">Control the maximum amount of this item that can be added to the cart</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Make this a Master Product Section */}
              <div className="mb-4" style={{ border: '1px solidrgb(17, 119, 235)', borderRadius: 10, boxShadow: '0 2px 12px rgba(0,0,0,0.04)', background: '#fcfdff' }}>
                <div className="p-3 d-flex align-items-center" style={{ background: '#e3f0ff', borderRadius: '10px 10px 0 0', borderBottom: '1px solid #e0e7ef', fontWeight: 700, fontSize: 20, color: '#1a237e', letterSpacing: 0.5 }}>
                  Make this a Master Product
                  <span title="Master products are purchased in bulk and sold in smaller units" style={{ marginLeft: 8, color: '#256DFF', cursor: 'pointer', fontSize: 18 }}>
                    <i className="ti ti-info-circle"></i>
                  </span>
                </div>
                <div className="p-4">
                  <div className="mb-3 text-muted" style={{ fontSize: 15, lineHeight: 1.6 }}>
                    Choose this option if you purchase this in bulk then sell it to your customers in smaller, individual units. E.g. Buy a keg of beer and sell as pints, the keg of beer is a master product and the pints are made up of the master product.
                  </div>
                  <div className="row g-3 align-items-end">
                    <div className="col-md-4">
                      <label className="form-label mb-1 d-flex align-items-center" style={{ fontWeight: 500 }}>
                        Unit of Sale
                        <span title="The unit in which you sell this product (e.g. pint, piece, pack)" style={{ marginLeft: 6, color: '#256DFF', cursor: 'pointer', fontSize: 16 }}>
                          <i className="ti ti-help-circle"></i>
                        </span>
                      </label>
                      <CustomDropdown value={unitOfSale} onChange={setUnitOfSale} />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label mb-1" style={{ fontWeight: 500 }}>Volume of Sale</label>
                      <input className="form-control" placeholder="Enter volume of sale" style={{ height: 40 }} />
                      <div className="form-text" style={{ fontSize: 13 }}>E.g. 1 pint, 500ml, 1 piece</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Connect your Master Products Section */}
              <div className="mb-4" style={{ border: '1px solidrgb(17, 119, 235)', borderRadius: 10, boxShadow: '0 2px 12px rgba(0,0,0,0.04)', background: '#fcfdff' }}>
                <div className="p-3" style={{ background: '#e3f0ff', borderRadius: '10px 10px 0 0', borderBottom: '1px solid #e0e7ef', fontWeight: 700, fontSize: 20, color: '#1a237e', letterSpacing: 0.5 }}>
                  Connect your Master Products
                </div>
                <div className="p-4">
                  <input className="form-control mb-3" placeholder="Type in a master product..." />
                  <select className="form-select mb-3">
                    <option>Top Level</option>
                    <option>Accesseries</option>
                    <option>THC & Delta</option>
                    <option>Candy</option>
                    <option>Snacks</option>
                    <option>Beer/Wine</option>
                    <option>Vape</option>
                    <option>CBD</option>
                  </select>
                  <div className="text-center text-muted" style={{ fontSize: 18, margin: '32px 0' }}>
                    <div style={{ fontSize: 48 }}>
                      <i className="ti ti-network"></i>
                    </div>
                    Connect Master Products<br />
                    <span style={{ fontSize: 14 }}>Choose from your Master Products to build this product or create a recipe.</span>
                  </div>
                </div>
              </div>

              {/* Inventory Section */}
              <div className="mb-4" style={{ border: '1px solidrgb(17, 119, 235)', borderRadius: 10, boxShadow: '0 2px 12px rgba(0,0,0,0.04)', background: '#fcfdff' }}>
                <div className="p-3" style={{ background: '#e3f0ff', borderRadius: '10px 10px 0 0', borderBottom: '1px solid #e0e7ef', fontWeight: 700, fontSize: 20, color: '#1a237e', letterSpacing: 0.5 }}>
                  Inventory
                </div>
                <div className="p-4">
                  <div className="row g-3 align-items-center">
                    <div className="col-md-6 d-flex align-items-center">
                      <input type="checkbox" className="form-check-input me-2" id="trackStock" />
                      <label htmlFor="trackStock" className="form-check-label">Do you track stock for this product?</label>
                      <span className="ms-2 text-muted" style={{ fontSize: 12 }}>This option turns on the stock taking capabilities Epos Now provide for this product.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Purchase Order Amounts Section */}
              <div className="mb-4" style={{ border: '1px solidrgb(17, 119, 235)', borderRadius: 10, boxShadow: '0 2px 12px rgba(0,0,0,0.04)', background: '#fcfdff' }}>
                <div className="p-3" style={{ background: '#e3f0ff', borderRadius: '10px 10px 0 0', borderBottom: '1px solid #e0e7ef', fontWeight: 700, fontSize: 20, color: '#1a237e', letterSpacing: 0.5 }}>
                  Purchase Order Amounts
                </div>
                <div className="p-4">
                  <div className="row g-3 align-items-center">
                    <div className="col-md-3">
                      <label className="form-label mb-0">Minimum Order Amount</label>
                      <div className="input-group">
                        <button className="btn btn-outline-secondary">-</button>
                        <input className="form-control text-center" style={{ maxWidth: 60 }} />
                        <button className="btn btn-outline-secondary">+</button>
                      </div>
                      <div className="form-text">Select a minimum quantity that can be ordered. Ex. Supplier requires a minimum quantity of 5 cases.</div>
                    </div>
                    <div className="col-md-3">
                      <label className="form-label mb-0">Order Increment Amount</label>
                      <div className="input-group">
                        <button className="btn btn-outline-secondary">-</button>
                        <input className="form-control text-center" style={{ maxWidth: 60 }} />
                        <button className="btn btn-outline-secondary">+</button>
                      </div>
                      <div className="form-text">What is the increment of each order? Ex. Cases are incremented in steps of 5 also, so the next increment is 10 cases.</div>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label mb-0">Supplier</label>
                      <select className="form-select">
                        <option>Select Supplier</option>
                      </select>
                      <div className="form-text">Select a supplier from the drop down list. If no supplier is listed please set up a supplier in the product details section above.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-end align-items-center gap-2 p-4 border-top bg-white" style={{position: 'sticky', bottom: 0, zIndex: 20}}>
              <button className="btn btn-success" style={{ minWidth: 100, fontWeight: 600 }}>Cancel</button>
              <button className="btn btn-info" style={{ minWidth: 120, color: '#fff', fontWeight: 600 }}>Add Another</button>
              <button className="btn btn-primary" style={{ minWidth: 170, background: '#00bfff', fontWeight: 600 }}>Create & Duplicate</button>
              <button className="btn btn-success" style={{ minWidth: 100, fontWeight: 600 }}>Create</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
