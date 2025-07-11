"use client";
import { useRouter } from "next/navigation";

export default function AddAdditionalLogin() {
  const router = useRouter();

  const handleCancel = () => {
    router.push("/additional-logins");
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <h4 className="fw-bold mb-3">
          Add Additional Login
        </h4>
        <div className="card mb-3">
          <div className="card-header fw-semibold">Guide</div>
          <div className="card-body small">
            <p className="mb-1">
              Use the form below to create a new additional login. An additional login is used to access your account
              via a different username and password. An additional login <strong>may not</strong> edit key configuration
              information, but is able to perform day‑to‑day tasks and may be restricted to only have access to certain
              areas of the software.
            </p>
            <p className="mb-0">
              Passwords are required to be a minimum of 8 characters in length. UserName / Login Name, E‑mail and Password are required.
              Additional Login names may not contain special characters (only underscores and spaces are allowed) and are case‑sensitive.
            </p>
          </div>
        </div>
        <div className="card">
          <div className="card-header fw-semibold">Account Information</div>
          <div className="card-body">
            <form>
              <div className="row mb-3">
                <label className="col-md-3 col-form-label">UserName / Login Name:</label>
                <div className="col-md-9">
                  <input type="text" className="form-control" required />
                </div>
              </div>

              <div className="row mb-3">
                <label className="col-md-3 col-form-label">E-mail:</label>
                <div className="col-md-9">
                  <input type="email" className="form-control" required />
                </div>
              </div>

              <div className="row mb-3">
                <label className="col-md-3 col-form-label">Password:</label>
                <div className="col-md-9">
                  <input type="password" className="form-control" required minLength={8} />
                </div>
              </div>

              <div className="row mb-4">
                <label className="col-md-3 col-form-label">Confirm Password:</label>
                <div className="col-md-9">
                  <input type="password" className="form-control" required />
                </div>
              </div>
              <div className="row mb-2">
                <div className="offset-md-3 col-md-9">
                  {[
                    "Setup Rights",
                    "Management Rights",
                    "Create Purchase Order",
                    "Edit/Cancel Purchase Order",
                    "Receive Purchase Order",
                    "Product Rights",
                    "Reporting Rights",
                    "Margin Rights",
                    "Till Rights",
                    "Web Integration Rights",
                    "Apps Rights",
                  ].map((label, idx) => (
                    <div className="form-check mb-1" key={idx}>
                      <input className="form-check-input" type="checkbox" defaultChecked />
                      <label className="form-check-label small">
                        {label}: (The login will be able to access all {label.split(" ")[0]} features)
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="d-flex justify-content-between mt-4">
                <button type="button" className="btn btn-danger" onClick={handleCancel}>
                  BACK
                </button>
                <button type="submit" className="btn btn-success">
                  ADD
                </button>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
