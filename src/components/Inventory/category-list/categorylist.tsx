"use client"
import CommonFooter from "@/core/common/footer/commonFooter";
import CollapesIcon from "@/core/common/tooltip-content/collapes";
import RefreshIcon from "@/core/common/tooltip-content/refresh";
import TooltipIcons from "@/core/common/tooltip-content/tooltipIcons";
import { categorylist } from "@/core/json/categorylistdata";
import Link from "next/link";
import Table from "@/core/common/pagination/datatable";
import EditCategoryList from "@/core/modals/inventory/editcategorylist";
import CommonDeleteModal from "@/core/common/modal/commonDeleteModal";

export default function CategoryListComponent() {
  const data = categorylist;

  const columns = [
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
          {color}
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
    {
      title: "",
      dataIndex: "actions",
      render: () => (
        <div className="action-table-data">
          <div className="edit-delete-action d-flex align-items-center gap-2">
            <Link
              className="p-2"
              href="#"
              data-bs-toggle="modal"
              data-bs-target="#edit-category"
            >
              <i data-feather="edit" className="feather-edit"></i>
            </Link>
            <Link
              href="#"
              data-bs-toggle="modal"
              data-bs-target="#delete-modal"
              className="p-2"
            >
              <i data-feather="trash-2" className="feather-trash-2 text-danger"></i>
            </Link>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div>
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
                <i className="ti ti-circle-plus me-1"></i>
                Add Category
              </Link>
            </div>
          </div>
          <div className="card table-list-card">
            <div className="card-header d-flex justify-content-between align-items-center flex-wrap">
              <div className="input-group" style={{ maxWidth: "300px" }}>
                <span className="input-group-text bg-white">
                  <i className="ti ti-search text-muted"></i>
                </span>
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
                <Table columns={columns} dataSource={data} />
              </div>
            </div>
          </div>
          <CommonFooter />
        </div>
        <div className="modal fade" id="add-category">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="page-wrapper-new p-0">
                <div className="content">
                  <div className="modal-header">
                    <div className="page-title">
                      <h4>Add Category</h4>
                    </div>
                    <button
                      type="button"
                      className="close bg-danger text-white fs-16"
                      data-bs-dismiss="modal"
                    >
                      <span>×</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <form>
                      <div className="mb-3">
                        <label className="form-label">
                          Category<span className="text-danger">*</span>
                        </label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">
                          Category Slug<span className="text-danger">*</span>
                        </label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <label className="form-label mb-0">
                          Status<span className="text-danger">*</span>
                        </label>
                        <input
                          type="checkbox"
                          className="form-check-input"
                          defaultChecked
                        />
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Cancel
                    </button>
                    <Link
                      href="#"
                      data-bs-dismiss="modal"
                      className="btn btn-primary"
                    >
                      Add Category
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <EditCategoryList />
        <CommonDeleteModal />
      </div>
    </div>
  );
}
