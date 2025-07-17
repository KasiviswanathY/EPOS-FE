"use client";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

const CLOCK_TYPES = [
  "No Type",
  "Absent",
  "Annual Leave",
  "Overtime",
  "Sick Pay",
] as const;

export default function AddHours() {
  const router = useRouter();

  const [form, setForm] = useState({
    staff: "Carolyn",
    location: "Main Outlet",
    clockInDate: new Date().toISOString().substring(0, 10),
    clockInTime: "",
    clockOutDate: new Date().toISOString().substring(0, 10),
    clockOutTime: "",
    notes: "",
    clockType: "No Type",
  });

  const handleChange = (key: keyof typeof form, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const resetForm = () =>
    setForm({
      staff: "Carolyn",
      location: "Main Outlet",
      clockInDate: new Date().toISOString().substring(0, 10),
      clockInTime: "",
      clockOutDate: new Date().toISOString().substring(0, 10),
      clockOutTime: "",
      notes: "",
      clockType: "No Type",
    });

  const toIso = (d: string, t: string) =>
    t ? new Date(`${d}T${t}`).toISOString() : null;

  const save = async (e?: FormEvent) => {
    e?.preventDefault();
    const payload = {
      staff: form.staff,
      location: form.location,
      clockIn: toIso(form.clockInDate, form.clockInTime),
      clockOut: toIso(form.clockOutDate, form.clockOutTime),
      notes: form.notes,
      clockType: form.clockType,
    };
  };

  const handleAdd = async (e: FormEvent) => {
    await save(e);
    router.push("/hours");
  };

  const handleAddAnother = async (e: FormEvent) => {
    await save(e);
    resetForm();
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <h4 className="fw-bold mb-3">
          Add Hours{" "}
          <small className="ms-2 text-info">
          </small>
        </h4>

        <div className="alert alert-secondary d-flex justify-content-between">
          <span>
            <strong>Guide</strong> — Use the form on this page to enter the
            details of the new hours and click <em>“Add”</em> when finished.
          </span>
          <button
            type="button"
            className="btn-close"
            onClick={(e) => (e.currentTarget.parentElement!.style.display = "none")}
          />
        </div>

        <div className="card border-1 mb-4">
          <div className="card-header fw-semibold py-2">Hours</div>

          <form className="card-body" onSubmit={handleAdd}>
            <div className="row g-4">
              <div className="col-12 col-lg-6">
                <label className="form-label">Staff Name:</label>
                <select
                  className="form-select"
                  value={form.staff}
                  onChange={(e) => handleChange("staff", e.target.value)}
                >
                  <option>Carolyn</option>
                  <option>Felisha</option>
                  <option>John</option>
                </select>
              </div>

              <div className="col-12 col-lg-6">
                <label className="form-label">Location:</label>
                <select
                  className="form-select"
                  value={form.location}
                  onChange={(e) => handleChange("location", e.target.value)}
                >
                  <option>Main Outlet</option>
                  <option>Warehouse</option>
                </select>
              </div>

              <div className="col-12 col-lg-6 d-flex flex-column">
                <label className="form-label">Clocking in date/time:</label>
                <div className="row g-2">
                  <div className="col">
                    <input
                      type="date"
                      className="form-control"
                      value={form.clockInDate}
                      onChange={(e) => handleChange("clockInDate", e.target.value)}
                    />
                  </div>
                  <div className="col">
                    <input
                      type="time"
                      className="form-control"
                      placeholder="hh:mm (24hr)"
                      value={form.clockInTime}
                      onChange={(e) => handleChange("clockInTime", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="col-12 col-lg-6 d-flex flex-column">
                <label className="form-label">To Date:</label>
                <div className="row g-2">
                  <div className="col">
                    <input
                      type="date"
                      className="form-control"
                      value={form.clockOutDate}
                      onChange={(e) => handleChange("clockOutDate", e.target.value)}
                    />
                  </div>
                  <div className="col">
                    <input
                      type="time"
                      className="form-control"
                      placeholder="hh:mm (24hr)"
                      value={form.clockOutTime}
                      onChange={(e) => handleChange("clockOutTime", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="col-12">
                <label className="form-label">Notes:</label>
                <textarea
                  className="form-control"
                  rows={3}
                  value={form.notes}
                  onChange={(e) => handleChange("notes", e.target.value)}
                />
              </div>
              <div className="col-12">
                <label className="form-label">Clocking Type:</label>
                <div className="dropdown w-100">
                  <button
                    type="button"
                    className="form-select text-start dropdown-toggle"
                    data-bs-toggle="dropdown"
                    data-bs-display="static"
                    aria-expanded="false"
                  >
                    {form.clockType}
                  </button>
                  <ul className="dropdown-menu w-100">
                    {CLOCK_TYPES.map((type) => (
                      <li key={type}>
                        <button
                          type="button"
                          className={`dropdown-item${
                            form.clockType === type ? " active" : ""
                          }`}
                          onClick={() => handleChange("clockType", type)}
                        >
                          {type}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-between mt-4">
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => router.push("/hours")}
              >
                CANCEL
              </button>

              <div>
                <button
                  type="button"
                  className="btn btn-success me-2"
                  onClick={handleAddAnother}
                >
                  ADD ANOTHER
                </button>
                <button type="submit" className="btn btn-success">
                  ADD
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
