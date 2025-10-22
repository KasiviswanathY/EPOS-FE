"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { useRouter } from "next/navigation";
import { getAllLocations } from "@/lib/redux/actions/locationsActions";
import { Devices } from "@/core/interfaces/Devices";
import { createDevice } from "@/lib/redux/actions/devicesAction";

export default function AddDevice() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { locations } = useSelector((state: RootState) => state.locations);
  const { loading, error } = useSelector((state: RootState) => state.devices);

  const [formData, setFormData] = useState<Partial<Devices>>({
    name: "",
    description: "",
    type: "",
    locationId: "",
    enabled: true,
    priceMode: "",
    autoClose: false,
  });

  useEffect(() => {
    dispatch(getAllLocations());
  }, [dispatch]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    const { name, value, type } = target;
    const checked = (target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(createDevice(formData)).unwrap();
      router.push("/deviceslist");
    } catch (err) {
      console.error("Error adding device:", err);
    }
  };

  const handleCancel = () => {
    router.push("/deviceslist");
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <h4 className="fw-bold mb-3">Add Device</h4>

        <div className="card">
          <div className="card-header fw-semibold">Device Information</div>
          <div className="card-body">
            {error && (
              <div className="alert alert-danger">
                <strong>Error:</strong> {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Device Name */}
              <div className="row mb-3">
                <label className="col-md-3 col-form-label">Name:</label>
                <div className="col-md-9">
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Description */}
              <div className="row mb-3">
                <label className="col-md-3 col-form-label">Description:</label>
                <div className="col-md-9">
                  <input
                    type="text"
                    className="form-control"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Type */}
              <div className="row mb-3">
                <label className="col-md-3 col-form-label">Type:</label>
                <div className="col-md-9">
                  <input
                    type="text"
                    className="form-control"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Location Dropdown */}
              <div className="row mb-3">
                <label className="col-md-3 col-form-label">Location:</label>
                <div className="col-md-9">
                  <select
                    name="locationId"
                    className="form-select"
                    value={formData.locationId}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a location</option>
                    {locations?.map((loc) => (
                      <option key={loc.id} value={loc.id}>
                        {loc.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Price Mode */}
              <div className="row mb-3">
                <label className="col-md-3 col-form-label">Price Mode:</label>
                <div className="col-md-9">
                  <input
                    type="text"
                    className="form-control"
                    name="priceMode"
                    value={formData.priceMode}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Enabled Toggle */}
              <div className="row mb-3">
                <label className="col-md-3 col-form-label">Enabled:</label>
                <div className="col-md-9 d-flex align-items-center">
                  <input
                    type="checkbox"
                    className="form-check-input me-2"
                    name="enabled"
                    checked={formData.enabled}
                    onChange={handleChange}
                  />
                  <span>{formData.enabled ? "Yes" : "No"}</span>
                </div>
              </div>

              {/* Auto Close */}
              <div className="row mb-3">
                <label className="col-md-3 col-form-label">Auto Close:</label>
                <div className="col-md-9 d-flex align-items-center">
                  <input
                    type="checkbox"
                    className="form-check-input me-2"
                    name="autoClose"
                    checked={formData.autoClose}
                    onChange={handleChange}
                  />
                  <span>{formData.autoClose ? "Yes" : "No"}</span>
                </div>
              </div>

              {/* Buttons */}
              <div className="d-flex justify-content-between mt-4">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleCancel}
                  disabled={loading}
                >
                  BACK
                </button>
                <button
                  type="submit"
                  className="btn btn-success"
                  disabled={loading}
                >
                  {loading ? "ADDING..." : "ADD DEVICE"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
