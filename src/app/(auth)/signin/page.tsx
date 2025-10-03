"use client";

import Link from "next/link";
import { useState } from "react";
import { all_routes } from "../../../data/all_routes";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../lib/redux/store";
import { getCurrentUser } from "../../../lib/redux/actions/userActions";
import axios from "axios";

type LoginFormInputs = {
  email: string;
  password: string;
};

export default function Login() {
  const route = all_routes;
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit } = useForm<LoginFormInputs>();

  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("/api/login", data);

      if (response.status === 200) {
        try {
          await dispatch(getCurrentUser()).unwrap();
        } catch (userError) {
          console.error("Failed to fetch current user:", userError);
        }

        window.location.href = "/index";
        return;
      }

      if (response.status !== 200) {
        setError(response.data.message || "Login failed");
      }
    } catch (err: Error | unknown) {
      console.error("Login error:", err);
      setError((err as Error).message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-wrapper">
      <div className="account-content">
        <div className="login-wrapper bg-img">
          <div className="login-content authent-content">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="login-userset">
                <div className="login-logo logo-normal">
                  <img src="assets/img/logo.png" alt="img" />
                </div>
                <Link href={route.dashboard} className="login-logo logo-white">
                  <img src="assets/img/logo-white.png" alt="Img" />
                </Link>
                <div className="login-userheading">
                  <h3>Sign In</h3>
                  <h4 className="fs-16">
                    Access the Dreamspos panel using your email and passcode.
                  </h4>
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Email <span className="text-danger">*</span>
                  </label>
                  <div className="input-group">
                    <input
                      type="email"
                      className="form-control border-end-0"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                          message: "Enter a valid email address",
                        },
                      })}
                    />
                    <span className="input-group-text border-start-0">
                      <i className="ti ti-mail" />
                    </span>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Password <span className="text-danger">*</span>
                  </label>
                  <div className="pass-group">
                    <input
                      type={isPasswordVisible ? "text" : "password"}
                      className="pass-input form-control"
                      {...register("password", {
                        required: "Password is required",
                      })}
                    />
                    <span
                      className={`text-gray-9 ti toggle-password ${
                        isPasswordVisible ? "ti-eye" : "ti-eye-off"
                      }`}
                      onClick={togglePasswordVisibility}
                    />
                  </div>
                </div>

                {error && <p className="text-danger">{error}</p>}

                <div className="form-login">
                  <button
                    type="submit"
                    className="btn btn-login"
                    disabled={loading}
                  >
                    {loading ? "Signing In..." : "Sign In"}
                  </button>
                </div>

                <div className="signinform">
                  <h4>
                    New on our platform?
                    <Link href={route.register} className="hover-a">
                      {" "}
                      Create an account
                    </Link>
                  </h4>
                </div>

                <div className="form-setlogin or-text">
                  <h4>OR</h4>
                </div>

                {/* Social Buttons can stay the same */}
                <div className="mt-2">
                  <div className="d-flex align-items-center justify-content-center flex-wrap">
                    {/* ... social links */}
                  </div>
                </div>

                <div className="my-4 d-flex justify-content-center align-items-center copyright-text">
                  <p>Copyright © 2025 DreamsPOS</p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
