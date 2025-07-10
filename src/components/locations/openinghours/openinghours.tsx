"use client";

import { useState } from "react";

const locations = ["Main Location", "Branch A", "Warehouse"];
const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const initialData = [
  { location: "Main Location", day: "Sunday", open: "08:00", close: "20:00" },
  { location: "Main Location", day: "Monday", open: "06:00", close: "21:00" },
  { location: "Main Location", day: "Tuesday", open: "06:00", close: "21:00" },
  { location: "Main Location", day: "Wednesday", open: "06:00", close: "21:00" },
];

export default function OpeningHoursPage() {
  const [form, setForm] = useState({
    location: "",
    day: "All Days",
    open: "",
    close: "",
  });
  const [data, setData] = useState(initialData);
  const [filterLocation, setFilterLocation] = useState("");
  const [filterDay, setFilterDay] = useState("Show All");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    if (form.day === "All Days") {
      const entries = daysOfWeek.map((day) => ({
        location: form.location,
        day,
        open: form.open,
        close: form.close,
      }));
      setData([...data, ...entries]);
    } else {
      setData([...data, form]);
    }
    setForm({ location: "", day: "All Days", open: "", close: "" });
  };

  const filteredData = data.filter(
    (entry) =>
      (filterLocation ? entry.location === filterLocation : true) &&
      (filterDay !== "Show All" ? entry.day === filterDay : true)
  );

  return (
    <div className="page-wrapper">
      <div className="content">
        <h4 className="fw-bold mb-4">Opening Hours</h4>
        <div className="card mb-4">
          <div className="card-header fw-semibold">Add Opening Hours</div>
          <div className="card-body row g-3">
            <div className="col-md-6">
              <label className="form-label">Location</label>
              <select className="form-select" name="location" value={form.location} onChange={handleChange}>
                <option value="">Select Location</option>
                {locations.map((loc, i) => (
                  <option key={i} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">Day Of Week</label>
              <select className="form-select" name="day" value={form.day} onChange={handleChange}>
                <option>All Days</option>
                {daysOfWeek.map((day, i) => (
                  <option key={i} value={day}>
                    {day}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">Open Time</label>
              <input
                type="time"
                className="form-control"
                name="open"
                value={form.open}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Close Time</label>
              <input
                type="time"
                className="form-control"
                name="close"
                value={form.close}
                onChange={handleChange}
              />
            </div>
            <div className="col-12 text-end">
              <button className="btn btn-success" onClick={handleAdd}>
                Add
              </button>
            </div>
          </div>
        </div>
        <div className="card mb-3">
          <div className="card-header fw-semibold">Filter Opening Hours</div>
          <div className="card-body row g-3">
            <div className="col-md-6">
              <label className="form-label">Filter by Location</label>
              <select
                className="form-select"
                value={filterLocation}
                onChange={(e) => setFilterLocation(e.target.value)}
              >
                <option value="">All Locations</option>
                {locations.map((loc, i) => (
                  <option key={i} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">Filter by Day of the Week</label>
              <select
                className="form-select"
                value={filterDay}
                onChange={(e) => setFilterDay(e.target.value)}
              >
                <option>Show All</option>
                {daysOfWeek.map((day, i) => (
                  <option key={i}>{day}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-body table-responsive">
            <table className="table table-bordered align-middle">
              <thead>
            <tr>
           <th>Location</th>
          <th>Day of Week</th>
         <th>Opening Hours</th>
        <th className="text-end" style={{ width: "100px" }}></th>
        </tr>
       </thead>
      <tbody>
        {filteredData.map((entry, i) => (
        <tr key={i}>
      <td>{entry.location}</td>
      <td>{entry.day}</td>
      <td>{entry.open} - {entry.close}</td>
      <td className="text-end">
        <button className="btn btn-outline-primary btn-sm">EDIT</button>
      </td>
    </tr>
  ))}
</tbody>
</table>
</div>
</div>
</div>
</div>
  );
}
