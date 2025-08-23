// Example usage of the new clocking types actions
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { useForm } from "react-hook-form";
import { ClockingType } from "@/core/interfaces/ClockingType";
import {
  createClockingType,
  getAllClockingTypes,
  updateClockingType,
  deleteClockingType,
} from "@/lib/redux/actions";

export default function ClockingTypesExample() {
  const dispatch = useDispatch<AppDispatch>();
  const clockingTypes = useSelector((state: RootState) => state.clockingTypes);
  const [editingId, setEditingId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ClockingType>();

  // Load clocking types on mount
  useEffect(() => {
    dispatch(getAllClockingTypes());
  }, [dispatch]);

  const onSubmit = (data: ClockingType) => {
    if (editingId) {
      dispatch(updateClockingType({ id: editingId, data })).then(() => {
        setEditingId(null);
        reset();
      });
    } else {
      dispatch(createClockingType(data)).then(() => {
        reset();
      });
    }
  };

  const handleEdit = (clockingType: ClockingType) => {
    setEditingId(clockingType.id);
    setValue("name", clockingType.name);
    setValue("description", clockingType.description || "");
    setValue("isActive", clockingType.isActive);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this clocking type?")) {
      dispatch(deleteClockingType(id));
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    reset();
  };

  return (
    <div className="container">
      <h2>Clocking Types Management</h2>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
        <div className="row">
          <div className="col-md-4">
            <input
              {...register("name", { required: "Name is required" })}
              className="form-control"
              placeholder="Clocking Type Name"
            />
            {errors.name && (
              <small className="text-danger">{errors.name.message}</small>
            )}
          </div>
          <div className="col-md-4">
            <input
              {...register("description")}
              className="form-control"
              placeholder="Description (optional)"
            />
          </div>
          <div className="col-md-2">
            <div className="form-check">
              <input
                {...register("isActive")}
                type="checkbox"
                className="form-check-input"
                id="isActive"
              />
              <label className="form-check-label" htmlFor="isActive">
                Active
              </label>
            </div>
          </div>
          <div className="col-md-2">
            <button type="submit" className="btn btn-primary">
              {editingId ? "Update" : "Create"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={handleCancel}
                className="btn btn-secondary ms-2"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </form>

      {/* Loading/Error States */}
      {clockingTypes.loading && <div>Loading...</div>}
      {clockingTypes.error && (
        <div className="alert alert-danger">{clockingTypes.error}</div>
      )}

      {/* Clocking Types List */}
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {clockingTypes.clockingTypes.map((clockingType) => (
              <tr key={clockingType.id}>
                <td>{clockingType.name}</td>
                <td>{clockingType.description || "N/A"}</td>
                <td>
                  <span
                    className={`badge ${
                      clockingType.isActive ? "bg-success" : "bg-secondary"
                    }`}
                  >
                    {clockingType.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => handleEdit(clockingType)}
                    className="btn btn-sm btn-outline-primary me-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(clockingType.id)}
                    className="btn btn-sm btn-outline-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
