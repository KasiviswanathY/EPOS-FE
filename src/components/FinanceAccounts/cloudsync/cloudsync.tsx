"use client";
import { useState } from "react";

export default function CloudSyncScheduling() {
 
  const locations = ["Head Office", "Downtown", "Warehouse"]; 
  const [filtered, setFiltered] = useState(locations);

  const [selected, setSelected] = useState("");
  const [syncAll, setSyncAll] = useState(false);

  const today = new Date().toISOString().slice(0, 10);
  const now = new Date().toISOString().slice(11, 16);

  const [date, setDate] = useState(today);
  const [time, setTime] = useState(now);
  const [syncNow, setSyncNow] = useState(false);

  const handleSearch = (val: string) => {
    setFiltered(locations.filter((l) => l.toLowerCase().includes(val.toLowerCase())));
  };

  const handleSubmit = () => {
    const payload = {
      location: syncAll ? "ALL" : selected,
      date: syncNow ? today : date,
      time: syncNow ? now : time,
    };
    alert(JSON.stringify(payload, null, 2)); 
  };

 
  return (
    <div className="page-wrapper">
      <div className="content">
    <div className="container-fluid py-4">
      <h4 className="fw-bold mb-4">
        CloudSync Scheduling </h4>
      <div className="card mb-4">
        <div className="card-header fw-semibold"> On this page you can schedule a Cloud Sync on a location or company level to ensure all changes
          made in Back Office are synced across all chosen locations. You can choose to force this sync
          straight away by ticking the <em>Sync Immediately</em> checkbox or alternatively choose a date
          and time you wish to schedule the sync.</div>
       
      </div>
      <div className="card">
        <div className="card-body">
          <div className="mb-4">
            <label className="form-label d-block fw-semibold">Location:</label>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Start typing to search all locations..."
              onChange={(e) => handleSearch(e.target.value)}
            />
            <select
              className="form-select"
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
            >
              <option value="">Select a location...</option>
              {filtered.map((l) => (
                <option key={l}>{l}</option>
              ))}
            </select>
            <div className="form-check mt-2">
              <input
                type="checkbox"
                className="form-check-input"
                checked={syncAll}
                onChange={(e) => setSyncAll(e.target.checked)}
              />
              <label className="form-check-label">Sync All Locations</label>
            </div>
          </div>
          <div className="mb-4">
            <label className="form-label d-block fw-semibold">Date / Time:</label>
            <div className="d-flex gap-2">
              <input
                type="date"
                className="form-control"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                disabled={syncNow}
              />
              <input
                type="time"
                className="form-control"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                disabled={syncNow}
              />
            </div>
            <div className="form-check mt-2">
              <input
                type="checkbox"
                className="form-check-input"
                checked={syncNow}
                onChange={(e) => setSyncNow(e.target.checked)}
              />
              <label className="form-check-label">Sync Immediately</label>
            </div>
          </div>
          <div className="text-end">
            <button onClick={handleSubmit} className="btn btn-success px-4">
              SCHEDULE SYNC
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
}
