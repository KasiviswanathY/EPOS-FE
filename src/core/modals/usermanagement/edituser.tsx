"use client";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { updateUser, getAllUsers } from "@/lib/redux/actions/userActions";
import { User, UserPermissionType, Status } from "@/core/interfaces/User";
import { PERMISSION_OPTIONS } from "@/core/constants/permissionOptions";

interface EditUserProps {
  user: User | null;
}

const EditUser: React.FC<EditUserProps> = ({ user }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { success } = useSelector((state: RootState) => state.users);

  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    status: "ACTIVE" as Status,
    permissions: [] as UserPermissionType[],
  });

  const [selectedPermissions, setSelectedPermissions] = useState<
    UserPermissionType[]
  >([]);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error" | "warning";
  } | null>(null);

  useEffect(() => {
    if (user) {
      setFormValues({
        username: user.username || "",
        email: user.email || "",
        password: "",
        confirmPassword: "",
        status: user.status || "ACTIVE",
        permissions: user.permissions || [],
      });

      // Set selected permissions for the multi-select
      setSelectedPermissions(user.permissions || []);
    }
  }, [user]);

  // ✅ Handle modal close after success
  useEffect(() => {
    // Handle success/error feedback here if needed
  }, [success, dispatch]);

  const showMessage = (text: string, type: "success" | "error" | "warning") => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleInputChange = (field: string, value: unknown) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!user?.id) return;

    if (
      formValues.password &&
      formValues.password !== formValues.confirmPassword
    ) {
      showMessage("Passwords do not match", "error");
      return;
    }

    const updatedData = {
      username: formValues.username,
      email: formValues.email,
      status: formValues.status,
      permissions: selectedPermissions,
      ...(formValues.password && { password: formValues.password }),
    };

    try {
      await dispatch(updateUser({ id: user.id, data: updatedData })).unwrap();
      showMessage("User updated successfully!", "success");
      dispatch(getAllUsers());

      const closeBtn = document.querySelector(
        "#edit-units .close"
      ) as HTMLElement;
      closeBtn?.click();
    } catch {
      showMessage("Failed to update user. Please try again.", "error");
    }
  };

  return (
    <div className="modal fade" id="edit-units">
      <div className="modal-dialog modal-dialog-centered custom-modal-two">
        <div className="modal-content">
          <div className="page-wrapper-new p-0">
            <div className="content">
              <div className="modal-header border-0 custom-modal-header">
                <div className="page-title">
                  <h4>Edit User</h4>
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

                <form>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="input-blocks">
                        <label>User Name</label>
                        <input
                          type="text"
                          className="form-control"
                          value={formValues.username}
                          onChange={(e) =>
                            handleInputChange("username", e.target.value)
                          }
                        />
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="input-blocks">
                        <label>Email</label>
                        <input
                          type="email"
                          className="form-control"
                          value={formValues.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                        />
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="input-blocks">
                        <label>Password</label>
                        <div className="pass-group">
                          <input
                            type={showPassword ? "text" : "password"}
                            className="pass-input form-control"
                            value={formValues.password}
                            onChange={(e) =>
                              handleInputChange("password", e.target.value)
                            }
                            placeholder="Leave blank to keep current password"
                          />
                          <span
                            className={`ti toggle-password ${
                              showPassword ? "ti-eye" : "ti-eye-off"
                            }`}
                            onClick={() => setShowPassword(!showPassword)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="input-blocks">
                        <label>Confirm Password</label>
                        <div className="pass-group">
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            className="pass-input form-control"
                            value={formValues.confirmPassword}
                            onChange={(e) =>
                              handleInputChange(
                                "confirmPassword",
                                e.target.value
                              )
                            }
                            placeholder="Leave blank to keep current password"
                          />
                          <span
                            className={`ti toggle-password ${
                              showConfirmPassword ? "ti-eye" : "ti-eye-off"
                            }`}
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="input-blocks">
                        <label>Status</label>
                        <select
                          className="form-control"
                          value={formValues.status}
                          onChange={(e) =>
                            handleInputChange(
                              "status",
                              e.target.value as Status
                            )
                          }
                        >
                          <option value="ACTIVE">Active</option>
                          <option value="INACTIVE">Inactive</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="input-blocks">
                        <label>Permissions</label>
                        <Select
                          classNamePrefix="react-select"
                          isMulti
                          options={PERMISSION_OPTIONS}
                          value={PERMISSION_OPTIONS.filter((opt) =>
                            selectedPermissions.includes(
                              opt.value as UserPermissionType
                            )
                          )}
                          onChange={(selected) =>
                            setSelectedPermissions(
                              selected
                                ? selected.map(
                                    (opt) => opt.value as UserPermissionType
                                  )
                                : []
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="modal-footer-btn">
                    <button
                      type="button"
                      className="btn btn-cancel me-2"
                      data-bs-dismiss="modal"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="btn btn-submit"
                      onClick={handleSubmit}
                    >
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
  );
};

export default EditUser;
