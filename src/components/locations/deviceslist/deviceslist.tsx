"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { getAllLocations } from "@/lib/redux/actions/locationsActions";
import {
  getAllDevices,
  deleteDevice,
  updateDevice,
} from "@/lib/redux/actions/devicesAction";
import { Devices } from "@/core/interfaces/Devices";

export default function DevicesListComponent() {
  const dispatch = useDispatch<AppDispatch>();
  const { devices, loading } = useSelector((state: RootState) => state.devices);
  const { locations } = useSelector((state: RootState) => state.locations);

  const [selectedLocation, setSelectedLocation] = useState<string>("");

  // Edit modal
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<Devices | null>(null);
  const [editForm, setEditForm] = useState<Partial<Devices>>({});

  useEffect(() => {
    dispatch(getAllDevices());
    dispatch(getAllLocations());
  }, [dispatch]);

  // Filter devices
  const filteredDevices =
    selectedLocation && selectedLocation !== "All"
      ? devices.filter((d: Devices) => d.locationId === selectedLocation)
      : devices;

  // Get readable location name
  const getLocationName = (locationId: string) => {
    const loc = locations.find((l: any) => l.id === locationId);
    return loc ? loc.name : "Unknown";
  };

  // Handle Delete
  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this device?")) {
      await dispatch(deleteDevice(id));
      dispatch(getAllDevices());
    }
  };

  // Handle Edit
  const handleEditClick = (device: Devices) => {
    setSelectedDevice(device);
    setEditForm({
      name: device.name,
      description: device.description,
      type: device.type,
      locationId: device.locationId,
      enabled: device.enabled,
      priceMode: device.priceMode,
      autoClose: device.autoClose,
    });
    setShowEditModal(true);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    if (target instanceof HTMLInputElement && target.type === "checkbox") {
      const { name, checked } = target;
      setEditForm((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      const { name, value } = target;
      setEditForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSaveEdit = async () => {
    if (!selectedDevice) return;

    await dispatch(
      updateDevice({
        id: selectedDevice.id,
        data: editForm,
      })
    )
      .unwrap()
      .then(() => {
        setShowEditModal(false);
        setSelectedDevice(null);
        dispatch(getAllDevices());
      })
      .catch((err) => console.error("Error updating device:", err));
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="fw-bold mb-0">Devices</h4>
          <div>
            <Link href="/addlocationlist" className="btn btn-outline-primary me-2">
              Add Location
            </Link>
            <Link href="/add-devices" className="btn btn-primary">
              Add Device
            </Link>
          </div>
        </div>

        {/* Location Filter */}
        <div className="mb-4">
          <label className="form-label fw-semibold">Choose a Location:</label>
          <select
            className="form-select"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
          >
            <option value="All">All Locations</option>
            {locations.map((loc: any) => (
              <option key={loc.id} value={loc.id}>
                {loc.name}
              </option>
            ))}
          </select>
        </div>

        {/* Table */}
        <div className="card">
          <div className="card-body table-responsive">
            <table className="table table-bordered align-middle">
              <thead>
                <tr>
                  <th>Name ⬍</th>
                  <th>Description ⬍</th>
                  <th>Type ⬍</th>
                  <th>Location ⬍</th>
                  <th>Enabled ⬍</th>
                  <th>Price Mode ⬍</th>
                  <th>Auto Close ⬍</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={8} className="text-center p-4">
                      <div
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                      ></div>
                      Loading devices...
                    </td>
                  </tr>
                ) : filteredDevices.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center p-4 text-muted">
                      No devices found.
                    </td>
                  </tr>
                ) : (
                  filteredDevices.map((device: Devices, idx: number) => (
                    <tr key={idx}>
                      <td>{device.name}</td>
                      <td>{device.description}</td>
                      <td>{device.type}</td>
                      <td>{getLocationName(device.locationId)}</td>
                      <td>
                        <input type="checkbox" checked={device.enabled} readOnly />
                      </td>
                      <td>{device.priceMode}</td>
                      <td>
                        <input
                          type="checkbox"
                          checked={device.autoClose}
                          readOnly
                        />
                      </td>
                      <td>
                        <div className="d-flex justify-content-end gap-2">
                          <button
                            className="btn btn-outline-secondary btn-sm"
                            onClick={() => handleEditClick(device)}
                          >
                            EDIT
                          </button>
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => handleDelete(device.id)}
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
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Edit Device</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowEditModal(false)}
                  ></button>
                </div>

                <div className="modal-body">
                  {/* Form fields */}
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      name="name"
                      className="form-control"
                      value={editForm.name || ""}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <input
                      name="description"
                      className="form-control"
                      value={editForm.description || ""}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Type</label>
                    <input
                      name="type"
                      className="form-control"
                      value={editForm.type || ""}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Location</label>
                    <select
                      name="locationId"
                      className="form-select"
                      value={editForm.locationId || ""}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Location</option>
                      {locations.map((loc: any) => (
                        <option key={loc.id} value={loc.id}>
                          {loc.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Price Mode</label>
                    <input
                      name="priceMode"
                      className="form-control"
                      value={editForm.priceMode || ""}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-check mb-2">
                    <input
                      name="enabled"
                      type="checkbox"
                      className="form-check-input me-2"
                      checked={!!editForm.enabled}
                      onChange={handleInputChange}
                    />
                    <label className="form-check-label">Enabled</label>
                  </div>

                  <div className="form-check mb-3">
                    <input
                      name="autoClose"
                      type="checkbox"
                      className="form-check-input me-2"
                      checked={!!editForm.autoClose}
                      onChange={handleInputChange}
                    />
                    <label className="form-check-label">Auto Close</label>
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                    onClick={() => setShowEditModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={handleSaveEdit}
                    disabled={loading}
                  >
                    {loading ? "Saving..." : "Save Changes"}
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
