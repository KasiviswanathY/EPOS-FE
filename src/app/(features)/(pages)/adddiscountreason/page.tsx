"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createDiscountReason } from "@/lib/redux/actions/discountReasonsActions";
import { AppDispatch } from "@/lib/redux/store";

export default function AddDiscountReason() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const [reason, setReason] = useState("");
  const [defaultValue, setDefaultValue] = useState(""); // State holds the raw string from input

  const handleCancel = () => {
    router.push("/discount-reasons");
  };

  const handleAdd = async () => {
    if (!reason || !defaultValue) {
      alert("Please fill in both fields.");
      return;
    }
    const newData = { reason, defaultValue: Number(defaultValue) };
    await dispatch(createDiscountReason(newData)).unwrap();
    router.push("/discount-reasons");
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="card">
          <div className="card-header fw-bold">Add a Discount Reason</div>
          <div className="card-body">
            <div className="row mb-3 align-items-center">
              <label className="col-sm-3 col-form-label text-end">Reason</label>
              <div className="col-sm-6">
                <input
                  type="text"
                  className="form-control"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="e.g., Holiday Sale"
                />
              </div>
            </div>
            <div className="row mb-4 align-items-center">
              <label className="col-sm-3 col-form-label text-end">
                Default Value
              </label>
              <div className="col-sm-6">
                <input
                  type="number" 
                  className="form-control"
                  value={defaultValue}
                  onChange={(e) => setDefaultValue(e.target.value)}
                  placeholder="e.g., 15"
                />
              </div>
            </div>
            <div className="d-flex justify-content-end">
              <button
                className="btn btn-secondary me-2"
                onClick={handleCancel}
              >
                CANCEL
              </button>
              <button className="btn btn-primary" onClick={handleAdd}>
                ADD REASON
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}