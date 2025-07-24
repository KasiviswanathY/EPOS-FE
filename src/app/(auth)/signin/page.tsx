"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { all_routes } from "../../../data/all_routes";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store"; // Adjust path as needed
import { loginUser } from "@/lib/redux/actions/loginAction"; // Your action

export default function Login() {
  const router = useRouter();
  const route = all_routes;
  const dispatch = useDispatch<AppDispatch>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  const { token, loading, error } = useSelector(
    (state: RootState) => state.app // make sure auth is added in reducer
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  useEffect(() => {
    if (token) {
      router.push(route.newdashboard); // Redirect after successful login
    }
  }, [token]);

  return (
    <div className="main-wrapper">
      <div className="account-content">
        <div className="login-wrapper bg-img">
          <div className="login-content authent-content">
            <form onSubmit={handleSubmit}>
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
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-control border-end-0"
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
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pass-input form-control"
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
                  <button type="submit" className="btn btn-login" disabled={loading}>
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
