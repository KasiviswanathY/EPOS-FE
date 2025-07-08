"use client";
/* eslint-disable @next/next/no-img-element */

import CollapesIcon from "@/core/common/tooltip-content/collapes";
import RefreshIcon from "@/core/common/tooltip-content/refresh";
import TooltipIcons from "@/core/common/tooltip-content/tooltipIcons";
import { all_routes } from "@/data/all_routes";
import { PlusCircle } from "feather-icons-react";
import Link from "next/link";
import React, { useState, useRef } from "react";
export default function ProductviewComponent() {
  const [showAddProduct, setShowAddProduct] = useState(false);
  // Custom dropdown state for Unit of Sale and Master Products
  const [unitDropdownOpen, setUnitDropdownOpen] = useState(false);
  const [unitOfSale, setUnitOfSale] = useState("Select Unit of Sale");
  const [masterDropdownOpen, setMasterDropdownOpen] = useState(false);
  const [masterProduct, setMasterProduct] = useState("Top Level");
  const unitDropdownRef = useRef(null);
  const masterDropdownRef = useRef(null);

  // Close dropdowns on outside click
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        unitDropdownRef.current &&
        !(unitDropdownRef.current as any).contains(event.target)
      ) {
        setUnitDropdownOpen(false);
      }
      if (
        masterDropdownRef.current &&
        !(masterDropdownRef.current as any).contains(event.target)
      ) {
        setMasterDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <>
      <div className="page-wrapper" style={{ background: 'linear-gradient(120deg, #f8fafc 0%, #e0e7ef 100%)', minHeight: '100vh', paddingBottom: 40 }}>
        <div className="content" style={{ borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.07)', background: '#fff', marginTop: 32, padding: 32 }}>
          <div className="card mb-4" style={{ borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
            <div className="card-body" style={{ background: 'linear-gradient(90deg, #f0f4ff 0%, #f8fafc 100%)', borderRadius: 12 }}>
              <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-3">
                <div className="flex-grow-1">
                  <label className="form-label d-block">Search by Product, Barcode, Supplier or SKU</label>
                  <div className="d-flex">
                    <input
                      type="text"
                      className="form-control me-2"
                      placeholder="Enter product info..."
                    />
                    <button className="btn btn-primary">Search</button>
                  </div>
                </div>
                <div className="ms-3" style={{ minWidth: "200px" }}>
                  <label className="form-label">Filter by Category</label>
                  <select className="form-select">
                    <option>Top Level</option>
                    <option>Category A</option>
                    <option>Category B</option>
                    <option>Category C</option>
                  </select>
                </div>
                <div className="d-flex flex-column">
                  <label className="form-label invisible">.</label> 
                  <button
                    className="btn"
                    style={{ backgroundColor: "#FFA500", color: "#fff" }}
                    onClick={() => setShowAddProduct(true)}
                  >
                    Add Product
                  </button>
                </div>
              </div>
              <div className="d-flex flex-wrap gap-4">
                <label className="form-check-label">
                  <input type="checkbox" className="form-check-input me-1" />
                  Show Price Details
                </label>
                <label className="form-check-label">
                  <input type="checkbox" className="form-check-input me-1" />
                  Show Supplier Details
                </label>
                <label className="form-check-label">
                  <input type="checkbox" className="form-check-input me-1" />
                  Show Till Details
                </label>
              </div>
            </div>
          </div>
          <div className="employee-grid-widget">
            <div className="row">
              <div className="card">
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-bordered table-striped">
                      <thead className="thead-light">
                        <tr>
                          <th>Name</th>
                          <th>Description</th>
                          <th>Barcode</th>
                          <th>Category</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Hershey Ice Cream 6 OZ Cups</td>
                          <td>Hershey Ice Cream 6 OZ Cups</td>
                          <td>070640023974</td>
                          <td>Ice Cream</td>
                          <td>
                            <button className="btn btn-sm btn-outline-primary me-1">Quick Edit</button>
                            <button className="btn btn-sm btn-outline-secondary me-1">Edit</button>
                            <button className="btn btn-sm btn-outline-info me-1">Inventory</button>
                            <button className="btn btn-sm btn-outline-success me-1">
                              <i className="ti ti-archive"></i>
                            </button>
                            <button className="btn btn-sm btn-outline-danger">
                              <i className="ti ti-trash"></i>
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td>Mass Energy Drinks</td>
                          <td>Mass Energy Drinks</td>
                          <td>***********</td>
                          <td>Mass Energy Drinks</td>
                          <td>
                            <button className="btn btn-sm btn-outline-primary me-1">Quick Edit</button>
                            <button className="btn btn-sm btn-outline-secondary me-1">Edit</button>
                            <button className="btn btn-sm btn-outline-info me-1">Inventory</button>
                            <button className="btn btn-sm btn-outline-success me-1">
                              <i className="ti ti-archive"></i>
                            </button>
                            <button className="btn btn-sm btn-outline-danger">
                              <i className="ti ti-trash"></i>
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td>Juicy Drop Sour Gel</td>
                          <td>Juicy Drop Sour Gel</td>
                          <td>070640023974</td>
                          <td>Candy</td>
                          <td>
                            <button className="btn btn-sm btn-outline-primary me-1">Quick Edit</button>
                            <button className="btn btn-sm btn-outline-secondary me-1">Edit</button>
                            <button className="btn btn-sm btn-outline-info me-1">Inventory</button>
                            <button className="btn btn-sm btn-outline-success me-1">
                              <i className="ti ti-archive"></i>
                            </button>
                            <button className="btn btn-sm btn-outline-danger">
                              <i className="ti ti-trash"></i>
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td>Hershey Ice Cream 6 OZ Cups</td>
                          <td>Hershey Ice Cream 6 OZ Cups</td>
                          <td>070640023974</td>
                          <td>Ice Cream</td>
                          <td>
                            <button className="btn btn-sm btn-outline-primary me-1">Quick Edit</button>
                            <button className="btn btn-sm btn-outline-secondary me-1">Edit</button>
                            <button className="btn btn-sm btn-outline-info me-1">Inventory</button>
                            <button className="btn btn-sm btn-outline-success me-1">
                              <i className="ti ti-archive"></i>
                            </button>
                            <button className="btn btn-sm btn-outline-danger">
                              <i className="ti ti-trash"></i>
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td>Water</td>
                          <td>Water</td>
                          <td>8492050673</td>
                          <td>Water</td>
                          <td>
                            <button className="btn btn-sm btn-outline-primary me-1">Quick Edit</button>
                            <button className="btn btn-sm btn-outline-secondary me-1">Edit</button>
                            <button className="btn btn-sm btn-outline-info me-1">Inventory</button>
                            <button className="btn btn-sm btn-outline-success me-1">
                              <i className="ti ti-archive"></i>
                            </button>
                            <button className="btn btn-sm btn-outline-danger">
                              <i className="ti ti-trash"></i>
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td>Soda</td>
                          <td>Soda</td>
                          <td>********</td>
                          <td>Soda</td>
                          <td>
                            <button className="btn btn-sm btn-outline-primary me-1">Quick Edit</button>
                            <button className="btn btn-sm btn-outline-secondary me-1">Edit</button>
                            <button className="btn btn-sm btn-outline-info me-1">Inventory</button>
                            <button className="btn btn-sm btn-outline-success me-1">
                              <i className="ti ti-archive"></i>
                            </button>
                            <button className="btn btn-sm btn-outline-danger">
                              <i className="ti ti-trash"></i>
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td>Juice</td>
                          <td>Juice</td>
                          <td>*********</td>
                          <td>Juice</td>
                          <td>
                            <button className="btn btn-sm btn-outline-primary me-1">Quick Edit</button>
                            <button className="btn btn-sm btn-outline-secondary me-1">Edit</button>
                            <button className="btn btn-sm btn-outline-info me-1">Inventory</button>
                            <button className="btn btn-sm btn-outline-success me-1">
                              <i className="ti ti-archive"></i>
                            </button>
                            <button className="btn btn-sm btn-outline-danger">
                              <i className="ti ti-trash"></i>
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <nav className="mt-3">
                    <ul className="pagination">
                      <li className="page-item active"><a className="page-link" href="#">1</a></li>
                      <li className="page-item"><a className="page-link" href="#">2</a></li>
                      <li className="page-item"><a className="page-link" href="#">3</a></li>
                      <li className="page-item"><a className="page-link" href="#">Next</a></li>
                    </ul>
                  </nav>
                  <div className="mt-3">
                    <button className="btn btn-outline-primary me-2">Export to .CSV</button>
                    <button className="btn btn-outline-primary me-2">Export to Word</button>
                    <button className="btn btn-outline-primary me-2">Export to Excel</button>
                    <button className="btn btn-outline-secondary">Print</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Add Product Modal */}
      {showAddProduct && (
        <div className="modal d-block" tabIndex={-1} role="dialog" style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 2000 }}>
          <div className="modal-dialog modal-xl" role="document">
            <div className="modal-content" style={{ maxHeight: "90vh", overflowY: "auto", borderRadius: 18, boxShadow: '0 8px 32px rgba(0,0,0,0.18)' }}>
              <div className="modal-header" style={{ background: 'linear-gradient(90deg, #256DFF 0%, #256DFF 100%)', color: '#fff', borderTopLeftRadius: 18, borderTopRightRadius: 18 }}>
                <h4 className="modal-title" style={{ fontWeight: 700, letterSpacing: 1 }}>Add a Product</h4>
                <button type="button" className="btn-close" onClick={() => setShowAddProduct(false)} style={{ filter: 'none', backgroundColor: '#FF3B3B',  }}></button>
              </div>
              <div className="modal-body" style={{ background: '#f8fafc', borderBottomLeftRadius: 18, borderBottomRightRadius: 18 }}>
                {/* Product Details Section */}
                <h5 className="mb-3" style={{ color: '#256DFF', fontWeight: 600, letterSpacing: 0.5 }}>Product Details</h5>
                <div className="row g-3 mb-4">
                  <div className="col-md-6">
                    <label className="form-label">Name</label>
                    <input className="form-control" placeholder="Appears on POS" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Description</label>
                    <input className="form-control" placeholder="Appears on receipt" />
                  </div>
                  <div className="col-md-6">
                    <div className="form-check mt-4">
                      <input className="form-check-input" type="checkbox" id="sellOnPOS" defaultChecked />
                      <label className="form-check-label" htmlFor="sellOnPOS">
                        Sell on POS
                      </label>
                    </div>
                  </div>
                  <div className="col-md-6"></div>
                  <div className="col-md-4">
                    <label className="form-label">Category</label>
                    <div className="input-group">
                      <select className="form-select">
                        <option>Top Level</option>
                      </select>
                      <button className="btn btn-outline-primary">CREATE</button>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Brand</label>
                    <div className="input-group">
                      <select className="form-select">
                        <option>Select Brand</option>
                      </select>
                      <button className="btn btn-outline-primary">CREATE</button>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Supplier</label>
                    <div className="input-group">
                      <select className="form-select">
                        <option>Select Supplier</option>
                      </select>
                      <button className="btn btn-outline-primary">CREATE</button>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Additional Suppliers</label>
                    <select className="form-select">
                      <option>Select Additional Suppliers</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Barcode</label>
                    <div className="input-group">
                      <input className="form-control" placeholder="Enter barcode no..." />
                      <span className="input-group-text">
                        <input type="checkbox" className="form-check-input me-1" />Auto Generate
                      </span>
                    </div>
                    <small className="text-muted">Separate multiple barcodes with a comma</small>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Product Order Code</label>
                    <input className="form-control" placeholder="For reference to supplier" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Article Code</label>
                    <input className="form-control" placeholder="For use in accounting" />
                  </div>
                  <div className="col-md-12">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="preventLoyalty" />
                      <label className="form-check-label" htmlFor="preventLoyalty">
                        Prevent gaining loyalty points for this Product
                      </label>
                    </div>
                    <small className="text-muted">
                      If enabled, customers will not gain any loyalty points from purchasing this Product
                    </small>
                  </div>
                </div>
                {/* Pricing Section */}
                <h5 className="mb-3" style={{ color: '#256DFF', fontWeight: 600, letterSpacing: 0.5 }}>Pricing</h5>
                <div className="row g-3 mb-4">
                  <div className="col-md-4">
                    <label className="form-label">Cost Price</label>
                    <input className="form-control" placeholder="$" />
                    <small className="text-muted">Excluding Tax</small>
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Tax Rate</label>
                    <div className="input-group">
                      <select className="form-select">
                        <option>Select Tax Rate</option>
                      </select>
                      <button className="btn btn-outline-primary">CREATE TAX RATE</button>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Sale Price</label>
                    <input className="form-control" placeholder="$" />
                    <small className="text-muted">Including Tax</small>
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Sale Price</label>
                    <input className="form-control" placeholder="$" />
                    <small className="text-muted">Excluding Tax</small>
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Recommended Retail Price (RRP)</label>
                    <input className="form-control" placeholder="$" />
                  </div>
                  <div className="col-md-4 d-flex align-items-center">
                    <div className="form-check me-3">
                      <input className="form-check-input" type="checkbox" id="variablePrice" />
                      <label className="form-check-label" htmlFor="variablePrice">Variable Price</label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="taxExempt" />
                      <label className="form-check-label" htmlFor="taxExempt">Tax Exempt</label>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Container Fees</label>
                    <select className="form-select">
                      <option>Select Container Fee</option>
                    </select>
                  </div>
                </div>
                {/* Customer Specific Pricing Section */}
                <h5 className="mb-3" style={{ color: '#256DFF', fontWeight: 600, letterSpacing: 0.5 }}>Customer Specific Pricing</h5>
                <div className="row g-3 mb-4">
                  <div className="col-md-6">
                    <label className="form-label">Customer Type</label>
                    <div className="input-group">
                      <select className="form-select">
                        <option>Select Customer Type</option>
                      </select>
                      <button className="btn btn-outline-primary">CREATE</button>
                    </div>
                  </div>
                </div>
                {/* Add Multiple Choice Products Section */}
                <h5 className="mb-3" style={{ color: '#256DFF', fontWeight: 600, letterSpacing: 0.5 }}>Add multiple choice products</h5>
                <div className="row g-3 mb-4">
                  <div className="col-md-12">
                    <div className="form-check mb-2">
                      <input className="form-check-input" type="checkbox" id="optionalMultipleChoice1" />
                      <label className="form-check-label" htmlFor="optionalMultipleChoice1">
                        Optional Multiple Choice Products
                      </label>
                    </div>
                    <div className="input-group mb-2">
                      <select className="form-select">
                        <option>Select Multiple Choice Product Group</option>
                      </select>
                      <button className="btn btn-outline-primary">CREATE</button>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-check mb-2">
                      <input className="form-check-input" type="checkbox" id="optionalMultipleChoice2" />
                      <label className="form-check-label" htmlFor="optionalMultipleChoice2">
                        Optional Multiple Choice Products
                      </label>
                    </div>
                    <div className="input-group mb-2">
                      <select className="form-select">
                        <option>Select Multiple Choice Product Group</option>
                      </select>
                      <button className="btn btn-outline-primary">CREATE</button>
                    </div>
                  </div>
                </div>
                {/* Add Product Tags Section */}
                <h5 className="mb-3" style={{ color: '#256DFF', fontWeight: 600, letterSpacing: 0.5 }}>Add product tags</h5>
                <div className="row g-3 mb-4">
                  <div className="col-md-12">
                    <select className="form-select">
                      <option>Select Tag</option>
                    </select>
                  </div>
                </div>
                {/* POS Options Section */}
                <h5 className="mb-3" style={{ color: '#256DFF', fontWeight: 600, letterSpacing: 0.5 }}>POS Options</h5>
                <div className="row g-3 mb-4">
                  <div className="col-md-6">
                    <label className="form-label">POS Order</label>
                    <input className="form-control" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Button Color</label>
                    <div className="d-flex gap-2 flex-wrap align-items-center">
                      {/* Color circles */}
                      {["#ccc","#888","#444","#FFA500","#FF0000","#00BFFF","#32CD32","#FFD700","#FF69B4","#8A2BE2","#000","#008000"].map((color, idx) => (
                        <span key={idx} style={{ width: 24, height: 24, borderRadius: "50%", background: color, border: "1px solid #ddd", display: "inline-block", cursor: "pointer" }}></span>
                      ))}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Popup Note</label>
                    <div className="input-group">
                      <select className="form-select">
                        <option>Select Popup Note</option>
                        <option>Age 21 verifica</option>
                        <option>ID VERIFICATION</option>
                      </select>
                      <button className="btn btn-outline-primary">CREATE</button>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Multiple Choice Note</label>
                    <div className="input-group">
                      <select className="form-select">
                        <option>Select Popup Note</option>
                      </select>
                      <button className="btn btn-outline-primary">CREATE</button>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-check mt-4">
                      <input className="form-check-input" type="checkbox" id="scannableOnly" />
                      <label className="form-check-label" htmlFor="scannableOnly">Scannable Only</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Order Quantity Limit</label>
                    <div className="d-flex align-items-center gap-2">
                      <button className="btn btn-outline-secondary">-</button>
                      <input className="form-control w-25" />
                      <button className="btn btn-outline-secondary">+</button>
                    </div>
                    <small className="text-muted">Control the maximum amount of this item that can be added to the cart</small>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Unit of Sale</label>
                    <div className="dropdown" ref={unitDropdownRef}>
                      <button
                        className="form-select text-start"
                        type="button"
                        onClick={() => setUnitDropdownOpen((open) => !open)}
                        style={{ position: "relative" }}
                      >
                        {unitOfSale}
                      </button>
                      {unitDropdownOpen && (
                        <ul className="dropdown-menu show w-100" style={{ position: "absolute", top: "100%", left: 0, zIndex: 1000 }}>
                          {["Cards","Half Pints","Full Pints","Liters","Gallons","Cup","cl","cm","Each","ft","kg","ib","l","ml"].map((option) => (
                            <li key={option}>
                              <button
                                className="dropdown-item"
                                type="button"
                                onClick={() => {
                                  setUnitOfSale(option);
                                  setUnitDropdownOpen(false);
                                }}
                              >
                                {option}
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Volume of Sale</label>
                    <input className="form-control" placeholder="E.g. 352 half pints in a keg." />
                  </div>
                </div>
                {/* Master Products Section */}
                <h5 className="mb-3" style={{ color: '#256DFF', fontWeight: 600, letterSpacing: 0.5 }}>Connect your Master Products</h5>
                <div className="row g-3 mb-4">
                  <div className="col-md-12">
                    <input className="form-control mb-2" placeholder="Type in a master product..." />
                    <div className="dropdown" ref={masterDropdownRef}>
                      <button
                        className="form-select text-start"
                        type="button"
                        onClick={() => setMasterDropdownOpen((open) => !open)}
                        style={{ position: "relative" }}
                      >
                        {masterProduct}
                      </button>
                      {masterDropdownOpen && (
                        <ul className="dropdown-menu show w-100" style={{ position: "absolute", top: "100%", left: 0, zIndex: 1000 }}>
                          {["Top Level","Accesserios","Apparel","Bakery","Bar","Beer","Beverages","Books","Butcher","Candy","Clothing","Cosmetics","Electronics","Food","Fruits","Groceries","Hardware","Household","Jewelry","Kitchen","Meat"].map((option) => (
                            <li key={option}>
                              <button
                                className="dropdown-item"
                                type="button"
                                onClick={() => {
                                  setMasterProduct(option);
                                  setMasterDropdownOpen(false);
                                }}
                              >
                                {option}
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <div className="text-center my-3">
                      <div style={{ fontSize: 48, color: "#ccc" }}>
                        <i className="ti ti-network"></i>
                      </div>
                      <div>Connect Master Products</div>
                      <small className="text-muted">Choose from your Master Products to build this product or create a recipe.</small>
                    </div>
                  </div>
                </div>
                {/* Inventory Section */}
                <h5 className="mb-3" style={{ color: '#256DFF', fontWeight: 600, letterSpacing: 0.5 }}>Inventory</h5>
                <div className="row g-3 mb-4">
                  <div className="col-md-12">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="trackStock" />
                      <label className="form-check-label" htmlFor="trackStock">Do you track stock for this product?</label>
                    </div>
                    <small className="text-muted">This option turns on the stock taking capabilities Epos Now provide for this product.</small>
                  </div>
                </div>
                {/* Purchase Order Amounts Section */}
                <h5 className="mb-3" style={{ color: '#256DFF', fontWeight: 600, letterSpacing: 0.5 }}>Purchase Order Amounts</h5>
                <div className="row g-3 mb-4">
                  <div className="col-md-6">
                    <label className="form-label">Minimum Order Amount</label>
                    <div className="d-flex align-items-center gap-2">
                      <button className="btn btn-outline-secondary">-</button>
                      <input className="form-control w-25" />
                      <button className="btn btn-outline-secondary">+</button>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Order Increment Amount</label>
                    <div className="d-flex align-items-center gap-2">
                      <button className="btn btn-outline-secondary">-</button>
                      <input className="form-control w-25" />
                      <button className="btn btn-outline-secondary">+</button>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <label className="form-label">Supplier</label>
                    <select className="form-select">
                      <option>Select Supplier</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="modal-footer d-flex justify-content-end gap-2 flex-wrap" style={{ padding: '1rem', background: '#f0f4ff', borderBottomLeftRadius: 18, borderBottomRightRadius: 18 }}>
                <button className="btn" style={{ background: 'orange', color: '#fff', fontWeight: 600, minWidth: 120 }}>Cancel</button>
                <button className="btn" style={{ background: 'orange', color: '#fff', fontWeight: 600, minWidth: 120 }}>Add Another</button>
                <button className="btn" style={{ background: 'orange', color: '#fff', fontWeight: 600, minWidth: 170 }}>Create &amp; Duplicate</button>
                <button className="btn" style={{ background: 'orange', color: '#fff', fontWeight: 600, minWidth: 120 }}>Create</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

