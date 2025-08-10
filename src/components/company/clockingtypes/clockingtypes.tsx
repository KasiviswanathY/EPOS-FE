"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import {
  createClocking,
  getClockingTypes,
  updateClockingType,
  deleteClockingType,
} from "@/lib/redux/actions/createClockingType";

export default function ClockingTypes() {
  const dispatch = useDispatch<AppDispatch>();
  const { clockingTypes, loading, error } = useSelector(
    (state: RootState) => state.app
  );

  const token =
    typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

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
    if (token) {
      dispatch(getClockingTypes({ token }));
    }
  }, [dispatch, token]);

  const handleAdd = () => {
    if (!newName.trim()) return;
    const payload = {
      name: newName,
      payMultiplier: parseInt(newMultiplier, 10),
    };
    dispatch(createClocking({ token, payload }))
      .unwrap()
      .then(() => {
        setNewName("");
        setNewMultiplier("");
        dispatch(getClockingTypes({ token }));
      })
      .catch((err) => {
        console.error("Error adding clocking type:", err);
      });
  };

  const handleEditClick = (item: any) => {
    setSelectedId(item.id);
    setEditName(item.name);
    setEditMultiplier(item.payMultiplier.toString());
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    if (!selectedId) return;
    const payload = {
      name: editName,
      payMultiplier: parseInt(editMultiplier, 10),
    };
    dispatch(updateClockingType({ id: selectedId, token, payload }))
      .unwrap()
      .then(() => {
        setShowEditModal(false);
        dispatch(getClockingTypes({ token }));
      })
      .catch((err) => console.error("Error updating:", err));
  };

  const handleDeleteClick = (id: string) => {
    setSelectedId(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (!selectedId) return;
    dispatch(deleteClockingType({ id: selectedId, token }))
      .unwrap()
      .then(() => {
        setShowDeleteModal(false);
        dispatch(getClockingTypes({ token }));
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
            {error && <p className="text-danger p-3">{error}</p>}
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
                {filtered.map((item, index) => (
                  <tr key={index}>
                    <td className="text-center align-middle">{item.name}</td>
                    <td className="text-center align-middle">
                      {parseFloat(item.payMultiplier).toFixed(2)}
                    </td>
                    <td className="text-end align-middle">
                      <div className="d-flex justify-content-end gap-2">
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => handleEditClick(item)}
                        >
                          EDIT
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDeleteClick(item.id)}
                        >
                          X
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {loading && <p className="p-3">Loading...</p>}
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
                >
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleSaveEdit}>
                  Save
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
                >
                  Cancel
                </button>
                <button
                  className="btn btn-danger"
                  onClick={handleConfirmDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
