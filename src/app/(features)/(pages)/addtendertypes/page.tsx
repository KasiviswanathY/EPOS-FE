"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddTenderType() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    description: "",
    tillOrder: "",
    classification: "",
    buttonColor: "",
    otherTenders: false,
  });

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const classifications = [
    "Other", "Cash", "Card", "Credit Card", "Debit Card", "Points",
    "Credit", "Promotion", "Account", "Crypto", "ACH", "Wire", "Check", "Epos Now Standalone"
  ];

  const colors = [
    "#ffffff", "#c0c0c0", "#808080", "#000000", "#ff0000", "#800000",
    "#ffff00", "#808000", "#00ff00", "#008000", "#00ffff", "#008080",
    "#0000ff", "#000080", "#ff00ff", "#800080"
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleColorSelect = (color: string) => {
    setForm({ ...form, buttonColor: color });
  };

  const handleCancel = () => {
    router.push("/tender-types");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted", form);
    router.push("/tender-types");
  };

  const handleClassificationSelect = (option: string) => {
    setForm({ ...form, classification: option });
    setDropdownOpen(false);
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <h4 className="fw-bold mb-4">Tender Type</h4>
        <form onSubmit={handleSubmit} className="card p-4">
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <input
              type="text"
              name="description"
              value={form.description}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Button color</label>
            <div className="d-flex flex-wrap gap-2">
              {colors.map((color, idx) => (
                <div
                  key={idx}
                  onClick={() => handleColorSelect(color)}
                  style={{
                    width: 24,
                    height: 24,
                    backgroundColor: color,
                    borderRadius: "50%",
                    border: form.buttonColor === color ? "2px solid #000" : "1px solid #ccc",
                    cursor: "pointer",
                  }}
                  title={color}
                />
              ))}
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Till order</label>
            <input
              type="text"
              name="tillOrder"
              value={form.tillOrder}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="mb-3 position-relative">
            <label className="form-label">Classification</label>
            <button
              type="button"
              className="form-control text-start d-flex justify-content-between align-items-center"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {form.classification || "Select Classification"}
              <i className={`bi ${dropdownOpen ? "bi-chevron-up" : "bi-chevron-down"}`}></i>
            </button>

            {dropdownOpen && (
              <ul className="dropdown-menu show w-100 mt-1" style={{ position: "absolute" }}>
                {classifications.map((option, i) => (
                  <li key={i}>
                    <button
                      type="button"
                      className="dropdown-item"
                      onClick={() => handleClassificationSelect(option)}
                    >
                      {option}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              id="otherTenders"
              name="otherTenders"
              checked={form.otherTenders ?? false}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="otherTenders">Other tenders</label>
          </div>
          <div className="d-flex justify-content-start mt-3">
            <button type="button" className="btn btn-danger me-2" onClick={handleCancel}>
              CANCEL
            </button>
            <button type="submit" className="btn btn-success">
              SAVE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
