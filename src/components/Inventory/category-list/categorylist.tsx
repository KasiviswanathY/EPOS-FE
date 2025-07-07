"use client";

import React, { useState } from "react";
import CommonFooter from "@/core/common/footer/commonFooter";
import EditCategoryList from "@/core/modals/inventory/editcategorylist";
import CommonDeleteModal from "@/core/common/modal/commonDeleteModal";

type Category = {
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
  image?: string;
};

type Column = {
  title: string;
  dataIndex: keyof Category;
  render?: (value: any) => React.ReactNode;
};

const categorylist: Category[] = [
  {
    category: "Glass & Accessories",
    description: "-",
    parentCategory: "Tobacco Accessories",
    reportCategory: "Tobacco Accessories",
    orderPrinter: "No Order Printer",
    course: "No Course",
    wetDry: "Dry",
    buttonColour: "Light Orange",
    popupNote: "Age 21 verification",
    tillOrder: "-",
    showOnTill: true,
    nominalCode: "-",
    image: undefined,
  },
  {
    category: "Juice",
    description: "-",
    parentCategory: "Drinks",
    reportCategory: "Drinks",
    orderPrinter: "No Order Printer",
    course: "No Course",
    wetDry: "Dry",
    buttonColour: "Light Orange",
    popupNote: "None",
    tillOrder: "-",
    showOnTill: false,
    nominalCode: "-",
    image: undefined,
  },
  {
    category: "Snacks",
    description: "-",
    parentCategory: "Snacks",
    reportCategory: "Snacks",
    orderPrinter: "No Order Printer",
    course: "No Course",
    wetDry: "Dry",
    buttonColour: "Grey Yellow",
    popupNote: "None",
    tillOrder: "4",
    showOnTill: true,
    nominalCode: "1234",
    image: undefined,
  },
  {
    category: "Beer/Wine",
    description: "-",
    parentCategory: "Top Level",
    reportCategory: "Top Level",
    orderPrinter: "No Order Printer",
    course: "No Course",
    wetDry: "Dry",
    buttonColour: "Light Red",
    popupNote: "Age 21 verification",
    tillOrder: "3",
    showOnTill: true,
    nominalCode: "5678",
    image: undefined,
  },
];

const columns: Column[] = [
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
    render: (val: boolean | undefined) => <input type="checkbox" checked={val} disabled />,
  },
  { title: "Nominal Code", dataIndex: "nominalCode" },
  {
    title: "Image",
    dataIndex: "image",
    render: (src: string | undefined) =>
      src ? <img src={src} alt="category" style={{ width: 24, height: 24 }} /> : "-",
  },
];

export default function CategoryListComponent() {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header d-flex justify-content-between align-items-center">
          <div className="page-title">
            <h4 className="fw-bold">Categories</h4>
          </div>
          <div className="page-btn">
            <button onClick={() => setShowPopup(true)} className="btn btn-primary">
              <i className="ti ti-circle-plus me-1"></i>Add Category
            </button>
          </div>
        </div>

        <div className="card table-list-card">
          <div className="card-body">
            <div className="table-responsive category-table">
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    {columns.map((col, i) => (
                      <th key={i}>{col.title}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {categorylist.map((item, rowIndex) => (
                    <tr key={rowIndex}>
                      {columns.map((col, colIndex) => {
                        const data = item[col.dataIndex];
                        return (
                          <td key={colIndex}>
                            {typeof col.render === "function" ? col.render(data) : data ?? "-"}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {showPopup && (
          <div className="modal d-block" tabIndex={-1} role="dialog" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
            <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Add Category</h5>
                  <button type="button" className="btn-close" onClick={() => setShowPopup(false)}></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Category Name *</label>
                    <input type="text" className="form-control" required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Parent Category</label>
                    <select className="form-select">
                      <option>Top Level</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Report Category</label>
                    <select className="form-select">
                      <option>Top Level</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea className="form-control" rows={2}></textarea>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Order Printer</label>
                    <select className="form-select">
                      <option>No Order Printer</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Course</label>
                    <select className="form-select">
                      <option>No Course</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Wet / Dry</label>
                    <select className="form-select">
                      <option>Dry</option>
                      <option>Wet</option>
                    </select>
                  </div>
                  <div className="form-check mb-3">
                    <input type="checkbox" className="form-check-input" id="showOnTill" defaultChecked />
                    <label htmlFor="showOnTill" className="form-check-label">Show on Till</label>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Button Colour</label>
                    <select className="form-select">
                      <option>None</option>
                      <option>Light Orange</option>
                      <option>Grey Yellow</option>
                      <option>Light Red</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Till Order</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Popup Note</label>
                    <select className="form-select">
                      <option>None</option>
                      <option>Age 21 verification</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Nominal Code</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Image</label>
                    <input type="file" className="form-control" />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowPopup(false)}>Close</button>
                  <button type="submit" className="btn btn-primary">Save</button>
                </div>
              </div>
            </div>
          </div>
        )}

        <CommonFooter />
      </div>

      <EditCategoryList />
      <CommonDeleteModal />
    </div>
  );
}
