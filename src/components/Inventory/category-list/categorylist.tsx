"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import {
  getAllCateogry,
  createCateogry,
  updateCateogry,
  deletecateogry,
} from "@/lib/redux/actions/categoryActions";
import { getAllPopups } from "@/lib/redux/actions/popupAction";
import { Cateogry } from "@/core/interfaces/Cateogry";

interface ColumnType {
  title: string;
  dataIndex: keyof Cateogry | "actions";
  render?: (value: any, record: Cateogry, rowIndex: number) => React.ReactNode;
}

const CategoryListComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { categories, loading } = useSelector(
    (state: RootState) => state.categories
  );
  const { popups } = useSelector((state: RootState) => state.popup);

  const [showPanel, setShowPanel] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Omit<Cateogry, "id">>({
    name: "",
    description: "",
    reportCategory: "",
    wetOrDry: "",
    showonTill: false,
    nominalCode: "",
    popupNoteId: "",
  });

  // load categories & popups
  useEffect(() => {
    dispatch(getAllCateogry());
    dispatch(getAllPopups());
  }, [dispatch]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, type, value } = target;
    if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: target.checked,
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing && editId) {
      dispatch(updateCateogry({ id: editId, data: formData })).then(() => {
        resetForm();
      });
    } else {
      dispatch(createCateogry(formData)).then(() => {
        resetForm();
      });
    }
  };

  const handleEdit = (category: Cateogry) => {
    setIsEditing(true);
    setEditId(category.id);
    setFormData({
      name: category.name,
      description: category.description,
      reportCategory: category.reportCategory,
      wetOrDry: category.wetOrDry,
      showonTill: category.showonTill,
      nominalCode: category.nominalCode,
      popupNoteId: category.popupNoteId || "",
    });
    setShowPanel(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this category?")) {
      dispatch(deletecateogry(id));
    }
  };

  const resetForm = () => {
    setShowPanel(false);
    setIsEditing(false);
    setEditId(null);
    setFormData({
      name: "",
      description: "",
      reportCategory: "",
      wetOrDry: "",
      showonTill: false,
      nominalCode: "",
      popupNoteId: "",
    });
  };

  const columns: ColumnType[] = [
    { title: "Name", dataIndex: "name" },
    { title: "Description", dataIndex: "description" },
    { title: "Report Category", dataIndex: "reportCategory" },
    { title: "Wet/Dry", dataIndex: "wetOrDry" },
    { title: "Nominal Code", dataIndex: "nominalCode" },
    {
      title: "Popup Note",
      dataIndex: "popupNoteId",
      render: (id: string) =>
        popups.find((p: any) => p.id === id)?.name ?? "-",
    },
    {
      title: "Show On Till",
      dataIndex: "showonTill",
      render: (val: boolean) => <input type="checkbox" checked={val} disabled />,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (_: any, record: Cateogry) => (
        <div className="d-flex gap-2">
          <button
            className="btn btn-sm btn-warning"
            onClick={() => handleEdit(record)}
          >
            Edit
          </button>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => handleDelete(record.id)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header d-flex justify-content-between align-items-center">
          <h4 className="fw-bold">Categories</h4>
          <button
            className="btn btn-primary"
            onClick={() => {
              resetForm();
              setShowPanel(true);
            }}
          >
            <i className="ti ti-circle-plus me-1"></i>
            Add Category
          </button>
        </div>

        {/* Table */}
        <div className="card table-list-card">
          <div className="card-body">
            {loading ? (
              <p>Loading categories...</p>
            ) : (
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
                    {categories.length > 0 ? (
                      categories.map((item, rowIndex) => (
                        <tr key={rowIndex}>
                          {columns.map((col, colIndex) => {
                            if (col.render) {
                              return (
                                <td key={colIndex}>
                                  {col.render(
                                    item[col.dataIndex as keyof Cateogry],
                                    item,
                                    rowIndex
                                  )}
                                </td>
                              );
                            }
                            const data = item[col.dataIndex as keyof Cateogry];
                            return <td key={colIndex}>{data ?? "-"}</td>;
                          })}
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={columns.length} className="text-center">
                          No categories found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add/Edit Panel */}
      {showPanel && (
        <div
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            height: "100vh",
            width: 400,
            background: "#fff",
            zIndex: 6000,
            boxShadow: "-4px 0 24px rgba(0,0,0,0.10)",
            borderLeft: "1px solid #e0e7ef",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div className="d-flex justify-content-between align-items-center p-4 pb-2 border-bottom">
            <span className="fw-bold" style={{ fontSize: 20, color: "#1a237e" }}>
              {isEditing ? "Edit Category" : "Add Category"}
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
              onClick={resetForm}
            >
              &times;
            </button>
          </div>

          <form
            onSubmit={handleSubmit}
            style={{ flex: 1, overflowY: "auto", padding: 24 }}
          >
            <div className="mb-3">
              <label className="form-label">Category Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Report Category</label>
              <input
                name="reportCategory"
                value={formData.reportCategory}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Wet/Dry</label>
              <input
                name="wetOrDry"
                value={formData.wetOrDry}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="mb-3 form-check">
              <input
                type="checkbox"
                name="showonTill"
                checked={formData.showonTill}
                onChange={handleChange}
                className="form-check-input"
                id="showonTill"
              />
              <label className="form-check-label" htmlFor="showonTill">
                Show on Till
              </label>
            </div>

            <div className="mb-3">
              <label className="form-label">Nominal Code</label>
              <input
                name="nominalCode"
                value={formData.nominalCode}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Popup Note</label>
              <select
                name="popupNoteId"
                value={formData.popupNoteId}
                onChange={handleChange}
                className="form-select"
              >
                <option value="">-- Select Popup --</option>
                {Array.isArray(popups) &&
                  popups.map((popup: any) => (
                    <option key={popup.id} value={popup.id}>
                      {popup.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="mt-3">
              <button type="submit" className="btn btn-success">
                {isEditing ? "Update" : "Save"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default CategoryListComponent;
