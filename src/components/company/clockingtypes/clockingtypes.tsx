"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import {
  createClockingType,
  getAllClockingTypes,
  updateClockingType,
  deleteClockingType,
} from "@/lib/redux/actions/clockingTypesActions";
import { ClockingType } from "@/core/interfaces/ClockingType";
import { getErrorMessage } from "@/core/utils";

export default function ClockingTypes() {
  const dispatch = useDispatch<AppDispatch>();
  const { clockingTypes, loading, error } = useSelector(
    (state: RootState) => state.clockingTypes
  );

  const [newName, setNewName] = useState("");
  const [newMultiplier, setNewMultiplier] = useState("");
  const [search, setSearch] = useState("");

  // Edit modal state
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editMultiplier, setEditMultiplier] = useState("");

  // Delete modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Load clocking types on page load
  useEffect(() => {
    dispatch(getAllClockingTypes());
  }, [dispatch]);

  const handleAdd = () => {
    if (!newName.trim()) return;
    const payload: Partial<ClockingType> = {
      name: newName,
      payMultiplier: parseInt(newMultiplier, 10),
      isActive: true,
    };
    dispatch(createClockingType(payload))
      .unwrap()
      .then(() => {
        setNewName("");
        setNewMultiplier("");
        dispatch(getAllClockingTypes());
      })
      .catch((err) => {
        console.error("Error adding clocking type:", err);
      });
  };

  const handleEditClick = (item: ClockingType) => {
    setSelectedId(item.id);
    setEditName(item.name);
    setEditMultiplier((item.payMultiplier || 0).toString());
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    if (!selectedId) return;
    const data: Partial<ClockingType> = {
      name: editName,
      payMultiplier: parseInt(editMultiplier, 10),
    };
    dispatch(updateClockingType({ id: selectedId, data }))
      .unwrap()
      .then(() => {
        setShowEditModal(false);
        dispatch(getAllClockingTypes());
      })
      .catch((err) => console.error("Error updating:", err));
  };

  const handleDeleteClick = (id: string) => {
    setSelectedId(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (!selectedId) return;
    dispatch(deleteClockingType(selectedId))
      .unwrap()
      .then(() => {
        setShowDeleteModal(false);
        dispatch(getAllClockingTypes());
      })
      .catch((err) => console.error("Error deleting:", err));
  };

  const filtered = (clockingTypes || []).filter((ct) =>
    ct.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page-wrapper">
      <div className="content">
        {/* Add Clocking Type Form */}
        <div className="card mb-4">
          <div className="card-header fw-semibold">Clocking Types</div>
          <div className="card-body">
            {error && (
              <div className="alert alert-danger" role="alert">
                <strong>Error:</strong> {getErrorMessage(error)}
              </div>
            )}
            <h6 className="mb-3">Add Clocking Type</h6>
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
              <label className="col-sm-2 col-form-label text-end">
                Pay Multiplier:
              </label>
              <div className="col-sm-6">
                <input
                  type="number"
                  step="1"
                  min="0"
                  className="form-control"
                  value={newMultiplier}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (/^\d*$/.test(val)) {
                      setNewMultiplier(val);
                    }
                  }}
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

        {/* Search */}
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
                  <th className="text-center" style={{ width: "40%" }}>
                    Name
                  </th>
                  <th className="text-center" style={{ width: "40%" }}>
                    Pay Multiplier
                  </th>
                  <th className="text-end" style={{ width: "20%" }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={3} className="text-center p-4">
                      <div
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                      >
                        <span className="visually-hidden">Loading...</span>
                      </div>
                      Loading clocking types...
                    </td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="text-center p-4 text-muted">
                      {clockingTypes.length === 0
                        ? "No clocking types found. Add one above."
                        : "No clocking types match your search."}
                    </td>
                  </tr>
                ) : (
                  filtered.map((item, index) => (
                    <tr key={item.id || index}>
                      <td className="text-center align-middle">{item.name}</td>
                      <td className="text-center align-middle">
                        {item.payMultiplier
                          ? parseFloat(item.payMultiplier.toString()).toFixed(2)
                          : "0.00"}
                      </td>
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
                <h5 className="modal-title">Edit Clocking Type</h5>
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
                  <label>Pay Multiplier</label>
                  <input
                    type="number"
                    className="form-control"
                    value={editMultiplier}
                    onChange={(e) => setEditMultiplier(e.target.value)}
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
                Are you sure you want to delete this clocking type?
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
