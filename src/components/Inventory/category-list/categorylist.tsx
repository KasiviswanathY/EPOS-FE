"use client";
/* eslint-disable @next/next/no-img-element */

import CommonFooter from "@/core/common/footer/commonFooter";
import CollapesIcon from "@/core/common/tooltip-content/collapes";
import RefreshIcon from "@/core/common/tooltip-content/refresh";
import TooltipIcons from "@/core/common/tooltip-content/tooltipIcons";
import Link from "next/link";
import EditCategoryList from "@/core/modals/inventory/editcategorylist";
import CommonDeleteModal from "@/core/common/modal/commonDeleteModal";
import { useState } from "react";


interface CategoryItem {
  category: string;
  description: string;
  parentCategory: string;
  reportCategory: string;
  orderPrinter: string;
  course: string;
  wetDry: string;
  buttonColour: string;
  popupNote: string;
  tillOrder: string;
  showOnTill: boolean;
  nominalCode: string;
  image: string;
}


interface ColumnType {
  title: string;
  dataIndex: keyof CategoryItem;
  render?: (value: any, record: CategoryItem, rowIndex: number) => React.ReactNode;
}

const categorylist: CategoryItem[] = [
  {
    category: "Laptop",
    description: "-",
    parentCategory: "Electronics",
    reportCategory: "Electronics",
    orderPrinter: "No Order Printer",
    course: "No Course",
    wetDry: "Dry",
    buttonColour: "Light Orange",
    popupNote: "Age 21 verifca",
    tillOrder: "-",
    showOnTill: true,
    nominalCode: "-",
    image: "",
  },
  {
    category: "Electronics",
    description: "-",
    parentCategory: "Top Level",
    reportCategory: "Electronics",
    orderPrinter: "No Order Printer",
    course: "No Course",
    wetDry: "Dry",
    buttonColour: "Light Orange",
    popupNote: "None",
    tillOrder: "-",
    showOnTill: true,
    nominalCode: "-",
    image: "",
  },
  {
    category: "Shoe",
    description: "-",
    parentCategory: "Footwear",
    reportCategory: "Footwear",
    orderPrinter: "No Order Printer",
    course: "No Course",
    wetDry: "Dry",
    buttonColour: "Light Orange",
    popupNote: "None",
    tillOrder: "-",
    showOnTill: true,
    nominalCode: "-",
    image: "",
  },
  {
    category: "Speaker",
    description: "-",
    parentCategory: "Electronics",
    reportCategory: "Audio",
    orderPrinter: "No Order Printer",
    course: "No Course",
    wetDry: "Dry",
    buttonColour: "Light Orange",
    popupNote: "None",
    tillOrder: "-",
    showOnTill: true,
    nominalCode: "-",
    image: "",
  },
  {
    category: "Furniture",
    description: "-",
    parentCategory: "Home",
    reportCategory: "Home",
    orderPrinter: "No Order Printer",
    course: "No Course",
    wetDry: "Dry",
    buttonColour: "None",
    popupNote: "None",
    tillOrder: "-",
    showOnTill: false,
    nominalCode: "-",
    image: "",
  },
  {
    category: "Bags",
    description: "-",
    parentCategory: "Accessories",
    reportCategory: "Bags",
    orderPrinter: "No Order Printer",
    course: "No Course",
    wetDry: "Dry",
    buttonColour: "Grey Yellow",
    popupNote: "None",
    tillOrder: "-",
    showOnTill: true,
    nominalCode: "-",
    image: "",
  },
  {
    category: "Phone",
    description: "-",
    parentCategory: "Electronics",
    reportCategory: "Electronics",
    orderPrinter: "No Order Printer",
    course: "No Course",
    wetDry: "Dry",
    buttonColour: "Light Orange",
    popupNote: "Age 21 verifca",
    tillOrder: "-",
    showOnTill: true,
    nominalCode: "-",
    image: "",
  },
  {
    category: "Chairs",
    description: "-",
    parentCategory: "Furniture",
    reportCategory: "Furniture",
    orderPrinter: "No Order Printer",
    course: "No Course",
    wetDry: "Dry",
    buttonColour: "None",
    popupNote: "None",
    tillOrder: "-",
    showOnTill: true,
    nominalCode: "-",
    image: "",
  },
  {
    category: "Laptop",
    description: "-",
    parentCategory: "Electronics",
    reportCategory: "Electronics",
    orderPrinter: "No Order Printer",
    course: "No Course",
    wetDry: "Dry",
    buttonColour: "Light Orange",
    popupNote: "Age 21 verifca",
    tillOrder: "-",
    showOnTill: true,
    nominalCode: "-",
    image: "",
  },
  {
    category: "Chairs",
    description: "-",
    parentCategory: "Furniture",
    reportCategory: "Furniture",
    orderPrinter: "No Order Printer",
    course: "No Course",
    wetDry: "Dry",
    buttonColour: "None",
    popupNote: "None",
    tillOrder: "-",
    showOnTill: true,
    nominalCode: "-",
    image: "",
  },
  {
    category: "Bags",
    description: "-",
    parentCategory: "Accessories",
    reportCategory: "Bags",
    orderPrinter: "No Order Printer",
    course: "No Course",
    wetDry: "Dry",
    buttonColour: "Grey Yellow",
    popupNote: "None",
    tillOrder: "-",
    showOnTill: true,
    nominalCode: "-",
    image: "",
  },
];

export default function CategoryListComponent() {
  const columns: ColumnType[] = [
    { title: "Name", dataIndex: "category" },
    { title: "Description", dataIndex: "description" },
    { title: "Parent Category", dataIndex: "parentCategory" },
    { title: "Report Category", dataIndex: "reportCategory" },
    { title: "Order Printer", dataIndex: "orderPrinter" },
    { title: "Course", dataIndex: "course" },
    { title: "Wet/Dry", dataIndex: "wetDry" },
    {
      title: "Button colour",
      dataIndex: "buttonColour",
      render: (color: string) => (
        <span className="d-inline-flex align-items-center gap-1">
          <span
            className="rounded-circle d-inline-block"
            style={{
              width: 10,
              height: 10,
              backgroundColor: color?.toLowerCase().replace(" ", "") || "#ccc",
            }}
          ></span>
        </span>
      ),
    },
    { title: "Popup Note", dataIndex: "popupNote" },
    { title: "Till order", dataIndex: "tillOrder" },
    {
      title: "Show On Till",
      dataIndex: "showOnTill",
      render: (val: boolean) => (
        <input type="checkbox" checked={val} disabled />
      ),
    },
    { title: "Nominal Code", dataIndex: "nominalCode" },
    {
      title: "Image",
      dataIndex: "image",
      render: (src: string) =>
        src ? (
          <img src={src} alt="category" style={{ width: 24, height: 24 }} />
        ) : (
          "-"
        ),
    },
  ];

  const [showFilter, setShowFilter] = useState(false);
  const [parentCategory, setParentCategory] = useState("All Categories");
  const [reportCategory, setReportCategory] = useState("All Categories");
  const [orderPrinter, setOrderPrinter] = useState("All Order Printers");
  const [buttonColour, setButtonColour] = useState("All Button colours");
  const [showColumns, setShowColumns] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [selectedColumns, setSelectedColumns] = useState([
    "Name",
    "Parent Category",
    "Report Category",
    "Order Printer",
    "Button colour",
    "Popup Note",
    "Till order",
    "Show On Till",
    "Nominal Code",
    "Image",
  ]);

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header d-flex justify-content-between align-items-center">
          <div className="page-title">
            <h4 className="fw-bold">Categories</h4>
          </div>
          <div className="page-btn">
            <button
              className="btn btn-primary"
              onClick={() => setShowAddCategory(true)}
            >
              <i className="ti ti-circle-plus me-1"></i>Add Category
            </button>
          </div>
        </div>
        <div className="card table-list-card">
          <div className="card-header d-flex justify-content-between align-items-center flex-wrap">
            <div className="input-group" style={{ maxWidth: "300px" }}>
              <span className="input-group-text bg-white">
                <i className="ti ti-search text-muted"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Search"
              />
            </div>
            <div className="d-flex align-items-center gap-2 mt-2 mt-md-0">
              <button className="btn btn-outline-dark d-flex align-items-center" onClick={() => setShowColumns(true)}>
                <i className="ti ti-layout-grid me-1"></i> Columns
              </button>
              <button className="btn btn-outline-dark d-flex align-items-center" onClick={() => setShowFilter(true)}>
                <i className="ti ti-filter me-1"></i> Filter
              </button>
            </div>
          </div>
          <div className="card-body">
            <div className="table-responsive category-table">
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    {columns.map((col, index) => (
                      <th key={index}>{col.title}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {categorylist.map((item, rowIndex) => (
                    <tr key={rowIndex}>
                      {columns.map((col, colIndex) => {
                        const data = item[col.dataIndex as keyof typeof item];
                        return (
                          <td key={colIndex}>
                            {col.render
                              ? col.render(data, item, rowIndex)
                              : data ?? "-"}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="d-flex justify-content-between align-items-center flex-wrap mt-3 px-2">
              <div className="d-flex align-items-center gap-2">
                <span className="text-muted">Row Per Page</span>
                <select className="form-select form-select-sm w-auto">
                  <option>10</option>
                  <option>25</option>
                  <option>50</option>
                </select>
                <span className="text-muted">Entries</span>
              </div>
              <div className="ms-auto">
                <ul className="pagination mb-0">
                  <li className="page-item">
                    <a className="page-link" href="#">
                      &lt;
                    </a>
                  </li>
                  <li className="page-item active">
                    <a
                      className="page-link"
                      style={{backgroundColor: "#FFA500", color: "#fff",
                        borderRadius: "50%",
                        width: "32px",
                        height: "32px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "none",
                       
                      }}
                      href="#"
                    >
                      1
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      &gt;
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <CommonFooter />
      </div>

      <EditCategoryList />
      <CommonDeleteModal />

      {showFilter && (
        <div style={{
          position: 'fixed',
          top: 0,
          right: 0,
          height: '100vh',
          width: 370,
          background: '#fff',
          zIndex: 5000,
          boxShadow: '-4px 0 24px rgba(0,0,0,0.10)',
          borderLeft: '1px solid #e0e7ef',
          display: 'flex',
          flexDirection: 'column',
        }}>
          <div className="d-flex justify-content-between align-items-center p-4 pb-2 border-bottom">
            <span className="fw-bold" style={{ fontSize: 20, color: '#1a237e' }}>Filters</span>
            <button className="btn btn-sm btn-light" style={{ borderRadius: 6, color: '#FF3B3B', fontWeight: 700, fontSize: 20, lineHeight: 1, width: 32, height: 32 }} onClick={() => setShowFilter(false)}>&times;</button>
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: 24, paddingTop: 16 }}>
            <div className="mb-3">
              <label className="form-label" style={{ fontWeight: 500 }}>Parent Category</label>
              <select className="form-select" value={parentCategory} onChange={e => setParentCategory(e.target.value)}>
                <option>All Categories</option>
                
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label" style={{ fontWeight: 500 }}>Report Category</label>
              <select className="form-select" value={reportCategory} onChange={e => setReportCategory(e.target.value)}>
                <option>All Categories</option>
               
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label" style={{ fontWeight: 500 }}>Order Printer</label>
              <select className="form-select" value={orderPrinter} onChange={e => setOrderPrinter(e.target.value)}>
                <option>All Order Printers</option>
              
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label" style={{ fontWeight: 500 }}>Button colour</label>
              <select className="form-select" value={buttonColour} onChange={e => setButtonColour(e.target.value)}>
                <option>All Button colours</option>
                
              </select>
            </div>
          </div>
          <div className="d-flex justify-content-end align-items-center gap-2 p-3 border-top" style={{ minHeight: 64 }}>
            <button className="btn btn-outline-secondary" style={{ minWidth: 80, borderRadius: 6, fontWeight: 600 }} onClick={() => { setParentCategory("All Categories"); setReportCategory("All Categories"); setOrderPrinter("All Order Printers"); setButtonColour("All Button colours"); }}>Reset</button>
            <button className="btn btn-primary" style={{ minWidth: 80, borderRadius: 6, fontWeight: 600, background: '#003087' }}>Apply</button>
          </div>
        </div>
      )}

      {showColumns && (
        <div style={{
          position: 'fixed',
          top: 0,
          right: 0,
          height: '100vh',
          width: 370,
          background: '#fff',
          zIndex: 5000,
          boxShadow: '-4px 0 24px rgba(0,0,0,0.10)',
          borderLeft: '1px solid #e0e7ef',
          display: 'flex',
          flexDirection: 'column',
        }}>
          <div className="d-flex justify-content-between align-items-center p-4 pb-2 border-bottom">
            <span className="fw-bold" style={{ fontSize: 20, color: '#1a237e' }}>Columns</span>
            <button className="btn btn-sm btn-light" style={{ borderRadius: 6, color: '#FF3B3B', fontWeight: 700, fontSize: 20, lineHeight: 1, width: 32, height: 32 }} onClick={() => setShowColumns(false)}>&times;</button>
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: 24, paddingTop: 16 }}>
            {selectedColumns.map((col, idx) => (
              <div key={col} className="form-check d-flex align-items-center mb-2" style={{paddingLeft: 0}}>
                <input
                  className="form-check-input me-2"
                  type="checkbox"
                  checked={selectedColumns.includes(col)}
                  onChange={() => {
                    setSelectedColumns(selectedColumns.includes(col)
                      ? selectedColumns.filter(c => c !== col)
                      : [...selectedColumns, col]);
                  }}
                  id={`col-${idx}`}
                  style={{marginLeft: 0}}
                />
                <label className="form-check-label" htmlFor={`col-${idx}`}>{col}</label>
              </div>
            ))}
          </div>
          <div className="d-flex justify-content-end align-items-center gap-2 p-3 border-top" style={{ minHeight: 64, background: '#f8fafc' }}>
            <button className="btn btn-outline-secondary" style={{ minWidth: 120, borderRadius: 6, fontWeight: 600 }} onClick={() => setSelectedColumns([
              "Name",
              "Parent Category",
              "Report Category",
              "Order Printer",
              "Button colour",
              "Popup Note",
              "Till order",
              "Show On Till",
              "Nominal Code",
              "Image",
            ])}>Reset Columns</button>
          </div>
        </div>
      )}

      {showAddCategory && (
        <div style={{
          position: 'fixed',
          top: 0,
          right: 0,
          height: '100vh',
          width: 400,
          background: '#fff',
          zIndex: 6000,
          boxShadow: '-4px 0 24px rgba(0,0,0,0.10)',
          borderLeft: '1px solid #e0e7ef',
          display: 'flex',
          flexDirection: 'column',
        }}>
          <div className="d-flex justify-content-between align-items-center p-4 pb-2 border-bottom">
            <span className="fw-bold" style={{ fontSize: 20, color: '#1a237e' }}>Add category</span>
            <button className="btn btn-sm btn-light" style={{ borderRadius: 6, color: '#FF3B3B', fontWeight: 700, fontSize: 20, lineHeight: 1, width: 32, height: 32 }} onClick={() => setShowAddCategory(false)}>&times;</button>
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: 24, paddingTop: 16 }}>
            <div className="mb-3">
              <label className="form-label" style={{ fontWeight: 500 }}>Category Name</label>
              <input className="form-control is-invalid" placeholder="Category Name" />
              <div className="invalid-feedback d-flex align-items-center" style={{ fontSize: 13 }}>
                <i className="ti ti-info-circle me-1"></i> Category Name is required.
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Parent Category (optional)</label>
              <select className="form-select">
                <option>Top Level</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Report Category (optional)</label>
              <select className="form-select">
                <option>Top Level</option>
              </select>
            </div>
            <div className="mb-2">
              <a href="#" className="text-primary" style={{ fontWeight: 500, fontSize: 15 }}>Hide advanced settings <i className="ti ti-chevron-up"></i></a>
            </div>
            <div className="mb-3">
              <label className="form-label">Description (optional)</label>
              <input className="form-control" />
            </div>
            <div className="mb-3">
              <label className="form-label">Order Printer (optional)</label>
              <select className="form-select">
                <option>No Order Printer</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Course (optional)</label>
              <select className="form-select">
                <option>No Course</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Wet / Dry (optional)</label>
              <select className="form-select">
                <option>Dry</option>
              </select>
            </div>
            <div className="mb-3 d-flex align-items-center">
              <input type="checkbox" className="form-check-input me-2" id="showOnTill" defaultChecked />
              <label htmlFor="showOnTill" className="form-check-label">Show on Till</label>
            </div>
            <div className="mb-3">
              <label className="form-label">Button Colour</label>
              <select className="form-select">
                <option>None</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Till order (optional)</label>
              <input className="form-control" />
              <div className="form-text">Position the category appears on the Till</div>
            </div>
            <div className="mb-3">
              <label className="form-label">Popup note (optional)</label>
              <select className="form-select">
                <option>None</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Nominal code (optional)</label>
              <input className="form-control" />
              <div className="form-text">Used for accounting purposes</div>
            </div>
            <div className="mb-3">
              <label className="form-label">Image (optional)</label>
              <div style={{ border: '1px dashed #bfc9da', borderRadius: 8, padding: 16, textAlign: 'center', background: '#f8fafc' }}>
                <div style={{ fontWeight: 500, marginBottom: 8 }}>Drag and Drop your image here</div>
                <div style={{ fontSize: 13, color: '#888', marginBottom: 8 }}>Format: JPG, JPEG, PNG<br />Size: 1024x1024px, up to 256KB</div>
                <button className="btn btn-outline-primary" style={{ borderRadius: 6, fontWeight: 600 }}>
                  <i className="ti ti-upload me-1"></i> Browse your file
                </button>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-end align-items-center gap-2 p-3 border-top" style={{ minHeight: 64 }}>
            <button className="btn btn-primary" style={{ minWidth: 80, borderRadius: 6, fontWeight: 600, background: '#003087' }}>Save</button>
          </div>
        </div>
      )}
    </div>
  );
}
