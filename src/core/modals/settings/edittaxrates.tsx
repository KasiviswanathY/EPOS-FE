"use client";

import { TaxRate, updateTaxRate } from "@/lib/redux/actions/taxratesAction";
import { AppDispatch } from "@/lib/redux/store";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

interface EditTaxRatesProps {
  taxToEdit: TaxRate | null;
  onClose: () => void;
  onEditSuccess: () => void; // parent will refetch
}

export default function EditTaxRates({
  taxToEdit,
  onClose,
  onEditSuccess,
}: EditTaxRatesProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [name, setName] = useState("");
  const [percentage, setPercentage] = useState<string | number>("");
  const [error, setError] = useState<string | null>(null);

  // Populate modal when opening
  useEffect(() => {
    if (taxToEdit) {
      setName(taxToEdit.name);
      setPercentage(taxToEdit.percentage);
      setError(null);
    }
  }, [taxToEdit]);

  const handleUpdateTax = async () => {
    if (!taxToEdit) return;
    if (!name.trim() || percentage === "") {
      setError("Both fields are required.");
      return;
    }

    setError(null);

    try {
      await dispatch(
        updateTaxRate({
          id: taxToEdit.id,
          // FIX: send directly { name, percentage } not wrapped in { data: ... }
          data: {
            name,
            percentage: parseFloat(String(percentage)),
          },
        })
      ).unwrap();

      onEditSuccess(); // parent should call getAllTaxRates()
      onClose();
    } catch (err: any) {
      console.error("Update failed", err);
      setError(
        err?.message || "Failed to update tax rate. The name may already exist."
      );
    }
  };

  if (!taxToEdit) return null;

  return (
    <div
      className="modal fade show d-block"
      style={{ background: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Tax Rate</h5>
            <button type="button" className="btn-close" onClick={onClose} />
          </div>
          <div className="modal-body">
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="mb-3">
              <label className="form-label">
                Name <span>*</span>
              </label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-0">
              <label className="form-label">
                Tax Rate % <span>*</span>
              </label>
              <input
                type="number"
                className="form-control"
                value={percentage}
                onChange={(e) => setPercentage(e.target.value)}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary me-2"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleUpdateTax}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
