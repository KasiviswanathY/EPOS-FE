"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function AddRolePage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    description: "",
    tillAccess: false,
  });

  const update = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent, next = false) => {
    e.preventDefault();

    // TODO: POST to your API
    // await fetch("/api/roles", { method: "POST", body: JSON.stringify(form) });

    if (next) {
      // clear inputs to add another
      setForm({ name: "", description: "", tillAccess: false });
    } else {
      router.push("/designation"); 
    }
export default function AddStaffPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    mainLocation: "",
    showAllLocations: false,
    role: "",
    passcode: "",
    swipeLogin: "",
    hourlyRate: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
   router.push("/staff");           
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <h4 className="text-xl font-semibold mb-4">Roles</h4>
        <form onSubmit={(e) => handleSubmit(e, false)}>
          <div className="card border">
            <div className="card-header bg-light fw-semibold">Add New Role</div>

            <div className="card-body">

              {/* Name */}
              <div className="mb-3 row">
                <label className="col-sm-2 col-form-label text-end">Name</label>
                <div className="col-sm-10">
                  <input
                    name="name"
                    value={form.name}
                    onChange={update}
        <h4 className="text-xl font-semibold mb-4">Create a Member of Staff</h4>
        <form onSubmit={handleSubmit}>
          <div className="card border">
            <div className="card-header bg-light fw-semibold">Staff</div>

            <div className="card-body">
              <div className="mb-3 row">
                <label className="col-sm-3 col-form-label">Name</label>
                <div className="col-sm-9">
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-2 col-form-label text-end">Description</label>
                <div className="col-sm-10">
                  <input
                    name="description"
                    value={form.description}
                    onChange={update}
              <div className="mb-3 row">
                <label className="col-sm-3 col-form-label">Main Location</label>
                <div className="col-sm-9">
                  <select
                    name="mainLocation"
                    value={form.mainLocation}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="">No Location</option>
                    <option value="warehouse">Warehouse</option>
                    <option value="frontdesk">Front Desk</option>
                  </select>
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-3 col-form-label">
                  Show Staff at all Locations
                </label>
                <div className="col-sm-9 d-flex align-items-center">
                  <input
                    type="checkbox"
                    className="form-check-input me-2"
                    checked={form.showAllLocations}
                    onChange={(e) =>
                      setForm({ ...form, showAllLocations: e.target.checked })
                    }
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-3 col-form-label">Role</label>
                <div className="col-sm-9">
                  <select
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="">Select Role</option>
                    <option value="Manager">Manager</option>
                    <option value="Cashier">Cashier</option>
                  </select>
                  <small className="text-muted">
                    Staff must have Role with Till access to show on Till
                  </small>
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-3 col-form-label">Passcode</label>
                <div className="col-sm-9">
                  <input
                    name="passcode"
                    value={form.passcode}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                  </div>
              <div className="mb-4 row">
                <label className="col-sm-2 col-form-label text-end">Permissions</label>
                <div className="col-sm-10">
                  <div className="d-flex align-items-center gap-2">
                    <input
                      type="checkbox"
                      checked={form.tillAccess}
                      onChange={(e) =>
                        setForm({ ...form, tillAccess: e.target.checked })
                      }
                    />
                    <span className="small">
                      Allow Till Access (check to view more permissions)
                    </span>
                  </div>
                </div>
              </div>
                    </div>
<div className="d-flex justify-content-end gap-2 mt-3">
    <button className="btn btn-danger">Cancel</button>
    <button className="btn btn-success">Add Another</button>
    <button className="btn btn-success">Add</button>
</div>

              <div className="mb-3 row">
                <label className="col-sm-3 col-form-label">Swipe Login</label>
                <div className="col-sm-9">
                  <input
                    name="swipeLogin"
                    value={form.swipeLogin}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-3 col-form-label">Hourly Rate</label>
                <div className="col-sm-9">
                  <input
                    name="hourlyRate"
                    value={form.hourlyRate}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 d-flex gap-2">
            <Link href="/employees-grid" className="btn btn-danger">
              Cancel
            </Link>
            <button type="submit" className="btn btn-success">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
