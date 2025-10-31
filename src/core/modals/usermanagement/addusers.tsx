"use client";

import React, { useEffect, useState } from "react";
import { PlusCircle } from "feather-icons-react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Select from "react-select";
import { AppDispatch, RootState } from "@/lib/redux/store";

import { createUser } from "@/lib/redux/actions/userActions";
import { getAllUsers } from "@/lib/redux/actions/userActions";
import { UserPermissionType, Status } from "@/core/interfaces/User";
import { PERMISSION_OPTIONS } from "@/core/constants/permissionOptions";

const AddUsers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { success, loading } = useSelector((state: RootState) => state.users);

  const [showPassword, setShowPassword] = useState(false);
  const [selectedPermissions, setSelectedPermissions] = useState<
    {
      value: string;
      label: string;
    }[]
  >([]);
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error" | "warning";
  } | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleTogglePassword = () => setShowPassword((prev) => !prev);

  const showMessage = (text: string, type: "success" | "error" | "warning") => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 3000);
  };

  const onSubmit = async (data: any) => {
    if (selectedPermissions.length === 0) {
      showMessage("Please select at least one permission.", "warning");
      return;
    }

    const userPayload = {
      username: data.username,
      password: data.password,
      email: data.email,
      status: data.status || Status.ACTIVE,
      permissions: selectedPermissions.map(
        (p) => p.value as UserPermissionType
      ),
    };

    try {
      await dispatch(createUser(userPayload)).unwrap();
      showMessage("User created successfully!", "success");

      // Refresh users list
      dispatch(getAllUsers());

      // Close modal and reset form
      const closeBtn = document.querySelector(
        "#add-units .close"
      ) as HTMLElement;
      closeBtn?.click();
      reset();
      setSelectedPermissions([]);
    } catch (error) {
      showMessage("Failed to create user. Please try again.", "error");
    }
  };
  useEffect(() => {
    // Effect removed as we now handle success/error in onSubmit
  }, [success, dispatch, reset]);

  return (
    <div>
      <div className="modal fade" id="add-units">
        <div className="modal-dialog modal-dialog-centered custom-modal-two">
          <div className="modal-content">
            <div className="page-wrapper-new p-0">
              <div className="content">
                <div className="modal-header border-0 custom-modal-header">
                  <div className="page-title">
                    <h4>Add User</h4>
                  </div>
                  <button
                    type="button"
                    className="close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body custom-modal-body">
                  {/* Inline Feedback Message */}
                  {message && (
                    <div
                      className={`alert alert-${message.type} mb-3`}
                      role="alert"
                    >
                      {message.text}
                    </div>
                  )}

                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="new-employee-field">
                          <span>Avatar</span>
                          <div className="profile-pic-upload mb-2">
                            <div className="profile-pic">
                              <span>
                                <PlusCircle className="plus-down-add" />
                                Profile Photo
                              </span>
                            </div>
                            <div className="input-blocks mb-0">
                              <div className="image-upload mb-0">
                                <input type="file" />
                                <div className="image-uploads">
                                  <h4>Change Image</h4>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Username */}
                      <div className="col-lg-6">
                        <div className="input-blocks">
                          <label>User Name</label>
                          <input
                            type="text"
                            className="form-control"
                            {...register("username", { required: true })}
                          />
                          {errors.username && (
                            <p className="text-danger">Username is required</p>
                          )}
                        </div>
                      </div>

                      {/* Email */}
                      <div className="col-lg-6">
                        <div className="input-blocks">
                          <label>Email</label>
                          <input
                            type="email"
                            className="form-control"
                            {...register("email", {
                              pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Invalid email address",
                              },
                            })}
                          />
                          {errors.email?.message && (
                            <p className="text-danger">
                              {String(errors.email.message)}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Password */}
                      <div className="col-lg-6">
                        <div className="input-blocks">
                          <label>Password</label>
                          <div className="pass-group">
                            <input
                              type={showPassword ? "text" : "password"}
                              className="pass-input form-control"
                              placeholder="Enter your password"
                              {...register("password", { required: true })}
                            />
                            <span
                              className={`ti toggle-password ${
                                showPassword ? "ti-eye" : "ti-eye-off"
                              }`}
                              onClick={handleTogglePassword}
                            />
                          </div>
                          {errors.password && (
                            <p className="text-danger">Password is required</p>
                          )}
                        </div>
                      </div>

                      {/* Status */}
                      <div className="col-lg-6">
                        <div className="input-blocks">
                          <label>Status</label>
                          <select
                            className="form-control"
                            {...register("status", { required: true })}
                          >
                            <option value="">Select Status</option>
                            <option value="ACTIVE">{Status.ACTIVE}</option>
                            <option value="INACTIVE">{Status.INACTIVE}</option>
                          </select>
                          {errors.status && (
                            <p className="text-danger">Status is required</p>
                          )}
                        </div>
                      </div>

                      {/* Permissions */}
                      <div className="col-lg-12">
                        <div className="input-blocks">
                          <label>Permissions</label>
                          <Select
                            classNamePrefix="react-select"
                            options={PERMISSION_OPTIONS}
                            placeholder="Choose Permissions"
                            value={selectedPermissions}
                            onChange={(selected) =>
                              setSelectedPermissions(selected as any)
                            }
                            isMulti={true}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Submit/Cancel Buttons */}
                    <div className="modal-footer-btn">
                      <button
                        type="button"
                        className="btn btn-cancel me-2"
                        data-bs-dismiss="modal"
                      >
                        Cancel
                      </button>
                      <button type="submit" className="btn btn-submit">
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUsers;
