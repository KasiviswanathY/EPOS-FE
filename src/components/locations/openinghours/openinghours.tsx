"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";

import { getAllLocations } from "@/lib/redux/actions/locationsActions";
import { OpeningHour } from "@/core/interfaces/OpeningHours";
import { createOpeningHour, deleteOpeningHour, getAllOpeningHours, updateOpeningHour } from "@/lib/redux/actions/openinghoursAction";

export default function OpeningHoursPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { openingHours, loading } = useSelector(
    (state: RootState) => state.openinghours
  );
  const { locations } = useSelector((state: RootState) => state.locations);

  const [form, setForm] = useState<Partial<OpeningHour>>({
    day: "",
    openTime: "",
    closeTime: "",
    locationId: "",
  });

  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(getAllOpeningHours());
    dispatch(getAllLocations());
  }, [dispatch]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = async () => {
    if (!form.day || !form.locationId) return;
    await dispatch(createOpeningHour(form));
    setForm({ day: "", openTime: "", closeTime: "", locationId: "" });
    dispatch(getAllOpeningHours());
  };

  const handleEditClick = (item: OpeningHour) => {
    setSelectedId(item.id);
    setForm(item);
    setShowEditModal(true);
  };

  const handleSaveEdit = async () => {
    if (!selectedId) return;
    await dispatch(updateOpeningHour({ id: selectedId, data: form }));
    setShowEditModal(false);
    dispatch(getAllOpeningHours());
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this?")) {
      await dispatch(deleteOpeningHour(id));
      dispatch(getAllOpeningHours());
    }
  };

  const getLocationName = (id: string) => {
    const loc = locations.find((l: any) => l.id === id);
    return loc ? loc.name : "Unknown";
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <h4 className="fw-bold mb-3">Opening Hours</h4>

        {/* Add Form */}
        <div className="card mb-4">
          <div className="card-header fw-semibold">Add Opening Hour</div>
          <div className="card-body row g-3">
            <div className="col-md-3">
              <input
                name="day"
                className="form-control"
                placeholder="Day (e.g. Monday)"
                value={form.day}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-2">
              <input
                name="openTime"
                type="time"
                className="form-control"
                value={form.openTime}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-2">
              <input
                name="closeTime"
                type="time"
                className="form-control"
                value={form.closeTime}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <select
                name="locationId"
                className="form-select"
                value={form.locationId}
                onChange={handleChange}
              >
                <option value="">Select Location</option>
                {locations.map((loc: any) => (
                  <option key={loc.id} value={loc.id}>
                    {loc.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-2 text-end">
              <button className="btn btn-success w-100" onClick={handleAdd}>
                Add
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="card">
          <div className="card-body p-0">
            <table className="table mb-0">
              <thead className="table-light">
                <tr>
                  <th>Day</th>
                  <th>Open</th>
                  <th>Close</th>
                  <th>Location</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} className="text-center p-4">
                      Loading...
                    </td>
                  </tr>
                ) : openingHours.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center p-4 text-muted">
                      No opening hours found.
                    </td>
                  </tr>
                ) : (
                  openingHours.map((item) => (
                    <tr key={item.id}>
                      <td>{item.day}</td>
                      <td>{item.openTime}</td>
                      <td>{item.closeTime}</td>
                      <td>{getLocationName(item.locationId)}</td>
                      <td className="text-end">
                        <div className="d-flex justify-content-end gap-2">
                          <button
                            className="btn btn-outline-secondary btn-sm"
                            onClick={() => handleEditClick(item)}
                          >
                            EDIT
                          </button>
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => handleDelete(item.id)}
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

        {/* Edit Modal */}
        {showEditModal && (
          <div className="modal show d-block" tabIndex={-1}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Edit Opening Hour</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowEditModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label>Day</label>
                    <input
                      name="day"
                      className="form-control"
                      value={form.day || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label>Open Time</label>
                    <input
                      name="openTime"
                      type="time"
                      className="form-control"
                      value={form.openTime || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label>Close Time</label>
                    <input
                      name="closeTime"
                      type="time"
                      className="form-control"
                      value={form.closeTime || ""}
                      onChange={handleChange}
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
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
