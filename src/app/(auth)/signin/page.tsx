"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { loginUser } from "@/lib/redux/slices/authSlice";
import { useRouter } from "next/navigation";
import { all_routes } from "../../../data/all_routes";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
  const route = all_routes;
  const dispatch = useDispatch<AppDispatch>();

  const [email, setEmail] = useState("superadmin@xyz.com"); // Default for testing
  const [password, setPassword] = useState("Test123!");
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const { user, loading, error } = useSelector((state: RootState) => state.auth);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(loginUser({ email, password }));
  };

  useEffect(() => {
    if (user) {
      if (user.role === "admin") {
        router.push(route.newdashboard);
      } else {
        router.push(route.pos2);
      }
    }
  }, [user]);

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
                  <label className="form-label">Email</label>
                  <div className="input-group">
                    <input
                      type="email"
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
                  <label className="form-label">Password</label>
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

                {error && <div className="text-danger mb-2">{error}</div>}

                <div className="form-login">
                  <button type="submit" className="btn btn-login" disabled={loading}>
                    {loading ? "Signing In..." : "Sign In"}
                  </button>
                </div>

                <div className="signinform">
                  <h4>
                    New on our platform?
                    <Link href={route.register} className="hover-a">
                      {" "}Create an account
                    </Link>
                  </h4>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
