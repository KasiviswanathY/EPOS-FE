"use client";
/* eslint-disable @next/next/no-img-element */

import CommonFooter from "@/core/common/footer/commonFooter";
import CollapesIcon from "@/core/common/tooltip-content/collapes";
import RefreshIcon from "@/core/common/tooltip-content/refresh";
import TooltipIcons from "@/core/common/tooltip-content/tooltipIcons";
import Link from "next/link";
import EditCategoryList from "@/core/modals/inventory/editcategorylist";
import CommonDeleteModal from "@/core/common/modal/commonDeleteModal";

// Define a type for the category item
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

// Define a type for the column
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

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header d-flex justify-content-between align-items-center">
          <div className="page-title">
            <h4 className="fw-bold">Categories</h4>
          </div>
          <div className="page-btn">
            <Link
              href="#"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#add-category"
            >
              <i className="ti ti-circle-plus me-1"></i>Add Category
            </Link>
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
              <button className="btn btn-outline-dark d-flex align-items-center">
                <i className="ti ti-layout-grid me-1"></i> Columns
              </button>
              <button className="btn btn-outline-dark d-flex align-items-center">
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
    </div>
  );
}
