"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { useRouter } from "next/navigation";
import { getAllRoles } from "@/lib/redux/actions/rolesActions";
import { getAllLocations } from "@/lib/redux/actions/locationsActions";
import { createStaff } from "@/lib/redux/actions/staffActions";
import { StaffStatus } from "@/core/interfaces/Staff";

const AddStaff = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { roles } = useSelector((state: RootState) => state.roles);
  const { locations } = useSelector((state: RootState) => state.locations);
  const { loading, error, success } = useSelector((state: RootState) => state.staff);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      roleId: "",
      mainLocationId: "",
      availableForAllLocations: false,
      status: StaffStatus.ACTIVE,
      hourlyRate: "",
      swipeLogin: "",
      passcode: "",
    },
  });

  // ✅ Load roles and locations
  useEffect(() => {
    dispatch(getAllRoles());
    dispatch(getAllLocations());
  }, [dispatch]);

  // ✅ Reset form on success
  useEffect(() => {
    if (success) {
      router.push("/employees-grid");
    }
  }, [success, router]);

  // ✅ Submit handler
  const onSubmit = async (data: any) => {
    // Convert hourlyRate to number
    const payload = {
      ...data,
      hourlyRate: data.hourlyRate ? Number(data.hourlyRate) : 0,
      status: data.status as StaffStatus,
    };

    await dispatch(createStaff(payload));
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <h4 className="page-title mb-4">Add Staff</h4>

        <form onSubmit={handleSubmit(onSubmit)} className="card p-4 shadow-sm rounded-lg">

          {/* Name */}
          <div className="form-group mb-3">
            <label>Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="form-control"
            />
            {errors.name && <small className="text-danger">{errors.name.message}</small>}
          </div>

          {/* Role */}
          <div className="form-group mb-3">
            <label>Role</label>
            <select
              {...register("roleId", { required: "Role is required" })}
              className="form-select"
            >
              <option value="">Select Role</option>
              {roles?.map((role: any) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
            {errors.roleId && <small className="text-danger">{errors.roleId.message}</small>}
          </div>

          {/* Main Location */}
          <div className="form-group mb-3">
            <label>Main Location</label>
            <select
              {...register("mainLocationId", { required: "Main location is required" })}
              className="form-select"
            >
              <option value="">Select Location</option>
              {locations?.map((loc: any) => (
                <option key={loc.id} value={loc.id}>
                  {loc.name}
                </option>
              ))}
            </select>
            {errors.mainLocationId && (
              <small className="text-danger">{errors.mainLocationId.message}</small>
            )}
          </div>

          {/* Available for All Locations */}
          <div className="form-check mb-3">
            <input
              type="checkbox"
              {...register("availableForAllLocations")}
              className="form-check-input"
              id="availableForAllLocations"
            />
            <label htmlFor="availableForAllLocations" className="form-check-label">
              Available for all locations
            </label>
          </div>

          {/* Hourly Rate */}
          <div className="form-group mb-3">
            <label>Hourly Rate</label>
            <input
              type="number"
              step="0.01"
              {...register("hourlyRate")}
              className="form-control"
            />
          </div>

          {/* Swipe Login */}
          <div className="form-group mb-3">
            <label>Swipe Login</label>
            <input type="text" {...register("swipeLogin")} className="form-control" />
          </div>

          {/* Passcode */}
          <div className="form-group mb-3">
            <label>Passcode</label>
            <input type="password" {...register("passcode")} className="form-control" />
          </div>

          {/* Status */}
          <div className="form-group mb-3">
            <label>Status</label>
            <select {...register("status")} className="form-select">
              <option value={StaffStatus.ACTIVE}>Active</option>
              <option value={StaffStatus.INACTIVE}>Inactive</option>
            </select>
          </div>

          {/* Submit */}
          <button type="submit" className="btn btn-primary">
            {loading ? "Creating..." : "Create Staff"}
          </button>

          {/* Error */}
          {error && <p className="text-danger mt-3">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default AddStaff;
