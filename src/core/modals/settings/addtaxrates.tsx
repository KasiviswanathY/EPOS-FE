"use client";

import { createTaxRate, NewTaxRatePayload } from "@/lib/redux/actions/taxratesAction";
import { AppDispatch } from "@/lib/redux/store";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

interface AddTaxRatesProps {
  onAddSuccess: () => void;
}

export default function AddTaxRates({ onAddSuccess }: AddTaxRatesProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [name, setName] = useState("");
  const [percentage, setPercentage] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleAddTax = async () => {
    if (!name.trim() || percentage === "") {
      setError("Please fill in all fields.");
      return;
    }
    setError(null);

    const payload: NewTaxRatePayload = {
      name,
      percentage: parseFloat(percentage),
    };

    try {
      await dispatch(createTaxRate(payload)).unwrap();
      onAddSuccess(); // This refreshes the list in the parent component
      // Manually find and click the close button to dismiss the modal
      document.getElementById('add-tax-close-button')?.click();
      // Reset form
      setName("");
      setPercentage("");
    } catch (err: any) {
      const errorMessage = err.error?.error || "An unknown error occurred.";
      if (errorMessage.includes("Unique constraint failed")) {
        setError(`A tax rate named "${name}" already exists.`);
      } else {
        setError("Failed to add tax rate. Please try again.");
      }
    }
  };

  return (
    <div className="modal fade" id="add-tax">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add New Tax Rate</h5>
            <button
              id="add-tax-close-button"
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="mb-3">
              <label className="form-label">Name<span> *</span></label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-0">
              <label className="form-label">Tax Rate %<span> *</span></label>
              <input
                type="number"
                className="form-control"
                value={percentage}
                onChange={(e) => setPercentage(e.target.value)}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary me-2" data-bs-dismiss="modal">
              Cancel
            </button>
            <button type="button" className="btn btn-primary" onClick={handleAddTax}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}