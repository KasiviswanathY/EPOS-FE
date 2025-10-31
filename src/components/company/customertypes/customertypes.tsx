"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { createCustomerType, deleteCustomerType, getAllCustomerTypes, updateCustomerType } from "@/lib/redux/actions/customertypesAction";
import { CustomerType } from "@/core/interfaces/CustomerType";
import { getErrorMessage } from "@/core/utils";


export default function CustomerTypes() {
  const dispatch = useDispatch<AppDispatch>();
  const { customerTypes, loading, error } = useSelector(
    (state: RootState) => state.customerTypes
  );

  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newDiscount, setNewDiscount] = useState("");
  const [search, setSearch] = useState("");

  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editDiscount, setEditDiscount] = useState("");

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Load customer types on mount
  useEffect(() => {
    dispatch(getAllCustomerTypes());
  }, [dispatch]);

  // Add new customer type
  const handleAdd = () => {
    if (!newName.trim()) return;
    const payload: Partial<CustomerType> = {
      name: newName,
      description: newDescription,
      discount: parseFloat(newDiscount) || 0,
      isActive: true,
    };

    dispatch(createCustomerType(payload))
      .unwrap()
      .then(() => {
        setNewName("");
        setNewDescription("");
        setNewDiscount("");
        dispatch(getAllCustomerTypes());
      })
      .catch((err) => console.error("Error adding customer type:", err));
  };

  // Edit
  const handleEditClick = (item: CustomerType) => {
    setSelectedId(item.id);
    setEditName(item.name);
    setEditDescription(item.description || "");
    setEditDiscount(item.discount?.toString() || "0");
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    if (!selectedId) return;
    const data: Partial<CustomerType> = {
      name: editName,
      description: editDescription,
      discount: parseFloat(editDiscount) || 0,
    };

    dispatch(updateCustomerType({ id: selectedId, data }))
      .unwrap()
      .then(() => {
        setShowEditModal(false);
        dispatch(getAllCustomerTypes());
      })
      .catch((err) => console.error("Error updating:", err));
  };

  // Delete
  const handleDeleteClick = (id: string) => {
    setSelectedId(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (!selectedId) return;
    dispatch(deleteCustomerType(selectedId))
      .unwrap()
      .then(() => {
        setShowDeleteModal(false);
        dispatch(getAllCustomerTypes());
      })
      .catch((err) => console.error("Error deleting:", err));
  };

  const filtered = (customerTypes || []).filter((ct) =>
    ct.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="card mb-4">
          <div className="card-header fw-semibold">Customer Types</div>
          <div className="card-body">
            {error && (
              <div className="alert alert-danger" role="alert">
                <strong>Error:</strong> {getErrorMessage(error)}
              </div>
            )}
            <h6 className="mb-3">Add Customer Type</h6>

            <div className="row mb-3 align-items-center">
              <label className="col-sm-2 col-form-label text-end">Name:</label>
              <div className="col-sm-6">
                <input
                  type="text"
                  className="form-control"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
              </div>
            </div>

            <div className="row mb-3 align-items-center">
              <label className="col-sm-2 col-form-label text-end">Description:</label>
              <div className="col-sm-6">
                <input
                  type="text"
                  className="form-control"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                />
              </div>
            </div>

            <div className="row mb-3 align-items-center">
              <label className="col-sm-2 col-form-label text-end">Discount (%):</label>
              <div className="col-sm-6">
                <input
                  type="number"
                  className="form-control"
                  value={newDiscount}
                  onChange={(e) => setNewDiscount(e.target.value)}
                />
              </div>
            </div>

            <div className="text-end">
              <button
                className="btn btn-success"
                onClick={handleAdd}
                disabled={loading}
              >
                {loading ? "Adding..." : "ADD"}
              </button>
            </div>
          </div>
        </div>

        {/* Search Filter */}
        <div className="card mb-3">
          <div className="card-body d-flex align-items-center gap-2">
            <input
              type="text"
              placeholder="Filter by Name"
              className="form-control"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <div className="card">
          <div className="card-body p-0">
            <table className="table mb-0">
              <thead className="table-light">
                <tr>
                  <th className="text-center" style={{ width: "30%" }}>Name</th>
                  <th className="text-center" style={{ width: "40%" }}>Description</th>
                  <th className="text-center" style={{ width: "20%" }}>Discount (%)</th>
                  <th className="text-end" style={{ width: "10%" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={4} className="text-center p-4">
                      <div
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                      >
                        <span className="visually-hidden">Loading...</span>
                      </div>
                      Loading customer types...
                    </td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center p-4 text-muted">
                      {customerTypes.length === 0
                        ? "No customer types found. Add one above."
                        : "No results match your search."}
                    </td>
                  </tr>
                ) : (
                  filtered.map((item, index) => (
                    <tr key={item.id || index}>
                      <td className="text-center align-middle">{item.name}</td>
                      <td className="text-center align-middle">{item.description}</td>
                      <td className="text-center align-middle">{item.discount}%</td>
                      <td className="text-end align-middle">
                        <div className="d-flex justify-content-end gap-2">
                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => handleEditClick(item)}
                            disabled={loading}
                          >
                            EDIT
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDeleteClick(item.id)}
                            disabled={loading}
                          >
                            X
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="modal show d-block" tabIndex={-1}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Customer Type</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowEditModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label>Name</label>
                  <input
                    className="form-control"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label>Description</label>
                  <input
                    className="form-control"
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label>Discount (%)</label>
                  <input
                    type="number"
                    className="form-control"
                    value={editDiscount}
                    onChange={(e) => setEditDiscount(e.target.value)}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowEditModal(false)}
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handleSaveEdit}
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="modal show d-block" tabIndex={-1}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowDeleteModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                Are you sure you want to delete this customer type?
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowDeleteModal(false)}
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-danger"
                  onClick={handleConfirmDelete}
                  disabled={loading}
                >
                  {loading ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
