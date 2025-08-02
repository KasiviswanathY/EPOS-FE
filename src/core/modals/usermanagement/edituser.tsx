"use client";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/redux/store";
import { patchUser } from "@/lib/redux/actions/updateAction";

const roleOptions = [
  { value: "Choose", label: "Choose" },
  { value: "Manager", label: "Manager" },
  { value: "Admin", label: "Admin" },
];

interface EditUserProps {
  user: any;
}



const EditUser: React.FC<EditUserProps> = ({ user }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [formValues, setFormValues] = useState({
    username: "",
    phone: "",
    email: "",
    role: "",
    password: "",
    confirmPassword: "",
    description: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmPassword] = useState(false);

  useEffect(() => {
    if (user) {
      setFormValues({
        username: user.username || "",
        phone: user.phone || "",
        email: user.email || "",
        role: user.role || "",
        password: "",
        confirmPassword: "",
        description: user.description || "",
      });
    }
  }, [user]);

  const handleInputChange = (field: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!user?.id) return;

    if (formValues.password && formValues.password !== formValues.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const updatedData = {
      username: formValues.username,
      phone: formValues.phone,
      email: formValues.email,
      role: formValues.role,
      description: formValues.description,
      ...(formValues.password ? { password: formValues.password } : {}),
    };

    dispatch(patchUser({ id: user.id, updatedData }))
      .unwrap()
      .then(() => {
        const closeBtn = document.querySelector('[data-bs-dismiss="modal"]') as HTMLElement;
        closeBtn?.click();
      })
      .catch((error: string) => {
        alert("Failed to update user: " + error);
      });
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
                <form>
                  <div className="row">
                    {/* Avatar UI skipped here, focus on form fields */}
                    <div className="col-lg-6">
                      <div className="input-blocks">
                        <label>User Name</label>
                        <input
                          type="text"
                          className="form-control"
                          value={formValues.username}
                          onChange={(e) => handleInputChange("username", e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="input-blocks">
                        <label>Phone</label>
                        <input
                          type="text"
                          className="form-control"
                          value={formValues.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
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
                          onChange={(e) => handleInputChange("email", e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="input-blocks">
                        <label>Role</label>
                        <Select
                          classNamePrefix="react-select"
                          options={roleOptions}
                          value={roleOptions.find((opt) => opt.value === formValues.role)}
                          onChange={(option) =>
                            handleInputChange("role", option?.value || "")
                          }
                          placeholder="Choose Role"
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
                            onChange={(e) => handleInputChange("password", e.target.value)}
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
                            onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                          />
                          <span
                            className={`ti toggle-password ${
                              showConfirmPassword ? "ti-eye" : "ti-eye-off"
                            }`}
                            onClick={() => setConfirmPassword(!showConfirmPassword)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="input-blocks">
                        <label>Descriptions</label>
                        <textarea
                          className="form-control"
                          value={formValues.description}
                          onChange={(e) => handleInputChange("description", e.target.value)}
                        />
                        <p>Maximum 600 Characters</p>
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
