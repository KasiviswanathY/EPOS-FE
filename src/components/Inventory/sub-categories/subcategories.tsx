"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import Table from "@/core/common/pagination/datatable";
import CommonFooter from "@/core/common/footer/commonFooter";
import DefaultEditor from "react-simple-wysiwyg";
import Select from "react-select";
import {
  getAllCateogry,
  createCateogry,
  updateCateogry,
  deletecateogry,
} from "@/lib/redux/actions/categoryActions";
import { getAllPopups } from "@/lib/redux/actions/popupAction";
import { Cateogry } from "@/core/interfaces/Cateogry";

const SubCategoriesComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { categories, loading: categoryLoading } = useSelector(
    (state: RootState) => state.categories
  );
  const { popups } = useSelector((state: RootState) => state.popup);

  const [showPanel, setShowPanel] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Cateogry, "id">>({
    name: "",
    description: "",
    parentId: "",
    reportCategory: "",
    wetOrDry: "WET",
    showonTill: false,
    nominalCode: "",
    popupNoteId: "",
  });
  const [editorValue, setEditorValue] = useState("");
  const [actionLoading, setActionLoading] = useState(false); // Loading for update/delete

  // Load categories and popups on mount
  useEffect(() => {
    dispatch(getAllCateogry());
    dispatch(getAllPopups());
  }, [dispatch]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, type, value, checked } = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async () => {
    setActionLoading(true);
    const payload = { ...formData, description: editorValue };
    if (isEditing && editId) {
      await dispatch(updateCateogry({ id: editId, data: payload }));
    } else {
      await dispatch(createCateogry(payload));
    }
    await dispatch(getAllCateogry()); // Reload table after update/create
    resetForm();
    setActionLoading(false);
  };

  const handleEdit = (cat: Cateogry) => {
    setIsEditing(true);
    setEditId(cat.id);
    setFormData({
      name: cat.name,
      description: cat.description,
      parentId: cat.parentId || "",
      reportCategory: cat.reportCategory,
      wetOrDry: cat.wetOrDry,
      showonTill: cat.showonTill,
      nominalCode: cat.nominalCode,
      popupNoteId: cat.popupNoteId || "",
    });
    setEditorValue(cat.description || "");
    setShowPanel(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this subcategory?")) return;
    setActionLoading(true);
    await dispatch(deletecateogry(id));
    await dispatch(getAllCateogry()); // Reload table after delete
    setActionLoading(false);
  };

  const resetForm = () => {
    setIsEditing(false);
    setEditId(null);
    setFormData({
      name: "",
      description: "",
      parentId: "",
      reportCategory: "",
      wetOrDry: "WET",
      showonTill: false,
      nominalCode: "",
      popupNoteId: "",
    });
    setEditorValue("");
    setShowPanel(false);
  };

  const parentOptions = categories.map((c) => ({ value: c.id, label: c.name }));
  const popupOptions = Array.isArray(popups)
    ? popups.map((p: any) => ({ value: p.id, label: p.name }))
    : [];

  const columns = [
    { title: "Sub Category", dataIndex: "name" },
    {
      title: "Parent Category",
      dataIndex: "parentId",
      render: (id: string) => categories.find((c) => c.id === id)?.name || "-",
    },
    { title: "Nominal Code", dataIndex: "nominalCode" },
    { title: "Report Category", dataIndex: "reportCategory" },
    { title: "Wet/Dry", dataIndex: "wetOrDry" },
    {
      title: "Popup Note",
      dataIndex: "popupNoteId",
      render: (id: string) => popups.find((p: any) => p.id === id)?.name ?? "-",
    },
    {
      title: "Show on Till",
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
            disabled={actionLoading}
          >
            Edit
          </button>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => handleDelete(record.id)}
            disabled={actionLoading}
          >
            {actionLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header d-flex justify-content-between align-items-center">
          <h4 className="fw-bold">Sub Categories</h4>
          <button
            className="btn btn-primary"
            onClick={() => {
              resetForm();
              setShowPanel(true);
            }}
          >
            <i className="ti ti-circle-plus me-1"></i> Add Sub Category
          </button>
        </div>

        <div className="card table-list-card">
          <div className="card-body">
            {categoryLoading ? (
              <p>Loading categories...</p>
            ) : (
              <Table
                columns={columns}
                dataSource={categories.filter((c) => c.parentId)}
              />
            )}
          </div>
        </div>
      </div>
      <CommonFooter />

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
              {isEditing ? "Edit Sub Category" : "Add Sub Category"}
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
              disabled={actionLoading}
            >
              &times;
            </button>
          </div>

          <form style={{ flex: 1, overflowY: "auto", padding: 24 }}>
            {/* Parent Category */}
            <div className="mb-3">
              <label className="form-label">Parent Category</label>
              <Select
                classNamePrefix="react-select"
                options={parentOptions}
                value={parentOptions.find((o) => o.value === formData.parentId)}
                onChange={(opt: any) =>
                  setFormData({ ...formData, parentId: opt.value })
                }
                isDisabled={actionLoading}
              />
            </div>

            {/* Name */}
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                name="name"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
                disabled={actionLoading}
              />
            </div>

            {/* Report Category */}
            <div className="mb-3">
              <label className="form-label">Report Category</label>
              <input
                name="reportCategory"
                className="form-control"
                value={formData.reportCategory}
                onChange={handleChange}
                disabled={actionLoading}
              />
            </div>

            {/* Wet/Dry */}
            <div className="mb-3">
              <label className="form-label">Wet/Dry</label>
              <select
                name="wetOrDry"
                className="form-select"
                value={formData.wetOrDry}
                onChange={handleChange}
                disabled={actionLoading}
              >
                <option value="WET">WET</option>
                <option value="DRY">DRY</option>
              </select>
            </div>

            {/* Nominal Code */}
            <div className="mb-3">
              <label className="form-label">Nominal Code</label>
              <input
                name="nominalCode"
                className="form-control"
                value={formData.nominalCode}
                onChange={handleChange}
                disabled={actionLoading}
              />
            </div>

            {/* Popup Note */}
            <div className="mb-3">
              <label className="form-label">Popup Note</label>
              <select
                name="popupNoteId"
                className="form-select"
                value={formData.popupNoteId}
                onChange={handleChange}
                disabled={actionLoading}
              >
                <option value="">-- Select Popup --</option>
                {popupOptions.map((p) => (
                  <option key={p.value} value={p.value}>
                    {p.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div className="mb-3">
              <label className="form-label">Description</label>
              <DefaultEditor
                value={editorValue}
                onChange={(e: any) => setEditorValue(e.target.value)}
                disabled={actionLoading}
              />
            </div>

            <div className="d-flex justify-content-end gap-2">
              <button
                type="button"
                className="btn btn-light"
                onClick={resetForm}
                disabled={actionLoading}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmit}
                disabled={actionLoading}
              >
                {actionLoading ? (isEditing ? "Updating..." : "Creating...") : isEditing ? "Update" : "Create"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default SubCategoriesComponent;
