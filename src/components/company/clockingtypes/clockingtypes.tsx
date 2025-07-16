"use client";
import React, { useState } from "react";

export default function ClockingTypes() {
  const [clockingTypes, setClockingTypes] = useState([
    { name: "Overtime", multiplier: "1.50" },
    { name: "Annual Leave", multiplier: "0.00" },
    { name: "Sick Pay", multiplier: "0.00" },
    { name: "Absent", multiplier: "0.00" },
  ]);

  const [newName, setNewName] = useState("");
  const [newMultiplier, setNewMultiplier] = useState("");
  const [search, setSearch] = useState("");

  const handleAdd = () => {
    if (!newName.trim()) return;
    setClockingTypes([...clockingTypes, { name: newName, multiplier: newMultiplier || "0.00" }]);
    setNewName("");
    setNewMultiplier("");
  };

  const handleDelete = (index: number) => {
    const updated = [...clockingTypes];
    updated.splice(index, 1);
    setClockingTypes(updated);
  };

  const filtered = clockingTypes.filter((ct) =>
    ct.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page-wrapper">
      <div className="content">

        <div className="card mb-4">
          <div className="card-header fw-semibold">Clocking Types</div>

          <div className="card-body">

            <h6 className="mb-3">Add Clocking Type</h6>

            <div className="row mb-3 align-items-center">
              <label className="col-sm-2 col-form-label text-end">Name:</label>
              <div className="col-sm-6">
                <input
                  type="text"
                  className="form-control"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
              </div>
            </div>

            <div className="row mb-3 align-items-center">
              <label className="col-sm-2 col-form-label text-end">Pay Multiplier:</label>
              <div className="col-sm-6">
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  value={newMultiplier}
                  onChange={(e) => setNewMultiplier(e.target.value)}
                />
              </div>
            </div>

            <div className="text-end">
              <button className="btn btn-success" onClick={handleAdd}>ADD</button>
            </div>

          </div>
        </div>
        <div className="card mb-3">
          <div className="card-body d-flex align-items-center gap-2">
            <input
              type="text"
              placeholder="Filter by Name"
              className="form-control"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="btn btn-primary">SEARCH</button>
          </div>
        </div>
        <div className="card">
          <div className="card-body p-0">
            <table className="table mb-0">
              <thead className="table-light">
                <tr>
                  <th className="text-center" style={{ width: "40%" }}>Name</th>
                  <th className="text-center" style={{ width: "40%" }}>Pay Multiplier</th>
                  <th className="text-end" style={{ width: "20%" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item, index) => (
                  <tr key={index}>
                    <td className="text-center align-middle">{item.name}</td>
                    <td className="text-center align-middle">{parseFloat(item.multiplier).toFixed(2)}</td>
                    <td className="text-end align-middle">
                      <div className="d-flex justify-content-end gap-2">
                        <button className="btn btn-sm btn-outline-primary">EDIT</button>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(index)}>X</button>
                      </div>
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
