'use client';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { getAllproducts, Products } from "@/lib/redux/actions/productsAction";
import { getAllLocations } from "@/lib/redux/actions";
// import { createStock, NewStockPayload } from "@/lib/redux/actions/stockActions";
import Select from "react-select";
import Link from "next/link";
import { createStock, NewStockPayload } from "@/lib/redux/actions/stockActions";

interface AddStockModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSuccess: () => void;
}

export default function AddStockModal({
  isOpen,
  onClose,
  onAddSuccess,
}: AddStockModalProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { products } = useSelector((state: RootState) => state.products);
  const { locations } = useSelector((state: RootState) => state.locations);

  // --- Form State ---
  const [productId, setProductId] = useState("");
  const [locationId, setLocationId] = useState("");
  const [quantity, setQuantity] = useState<number>(0);
  const [minStockLevel, setMinStockLevel] = useState<number>(0);
  const [maxStockLevel, setMaxStockLevel] = useState<number>(0);
  const [reorderLevel, setReorderLevel] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      dispatch(getAllproducts({ page: 1, pageSize: 1000 }));
      dispatch(getAllLocations());
    }
  }, [isOpen, dispatch]);

  const handleSave = async () => {
    if (!productId || !locationId) {
      setError("Product and Location are required.");
      return;
    }
    setError(null);

    const payload: NewStockPayload = {
      productId,
      locationId,
      quantity,
      minStockLevel,
      maxStockLevel,
      reorderLevel,
    };

    try {
      await dispatch(createStock(payload)).unwrap();
      onAddSuccess();
      onClose();
    } catch (err: any) {
      let errorMessage =
        "An unexpected error occurred. The record may already exist.";
      if (err && typeof err === "object") {
        if (typeof err.error === "string") {
          errorMessage = err.error;
        } else if (typeof err.message === "string") {
          errorMessage = err.message;
        }
      } else if (typeof err === "string") {
        errorMessage = err;
      }
      setError(errorMessage);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal fade show d-block"
      style={{ background: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          {/* Header */}
          <div className="modal-header">
            <div className="page-title">
              <h4>Add New Stock</h4>
            </div>
            <button
              type="button"
              className="close bg-danger text-white fs-16"
              onClick={onClose}
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>

          {/* Body */}
          <div className="modal-body">
            {error && <div className="alert alert-danger">{error}</div>}

            <div className="row">
              <div className="col-lg-6">
                <div className="mb-3">
                  <label className="form-label">
                    Product<span className="text-danger ms-1">*</span>
                  </label>
                  <Select
                    classNamePrefix="react-select"
                    options={
                      Array.isArray(products)
                        ? products.map((p: Products) => ({
                            value: p.id,
                            label: p.name,
                          }))
                        : []
                    }
                    value={
                      productId
                        ? {
                            value: productId,
                            label:
                              products.find((p: Products) => p.id === productId)
                                ?.name || "",
                          }
                        : null
                    }
                    onChange={(option) => setProductId(option?.value || "")}
                    placeholder="Select Product"
                  />
                </div>
              </div>

              <div className="col-lg-6">
                <div className="mb-3">
                  <label className="form-label">
                    Location<span className="text-danger ms-1">*</span>
                  </label>
                  <Select
                    classNamePrefix="react-select"
                    options={
                      Array.isArray(locations)
                        ? locations.map((l: any) => ({
                            value: l.id,
                            label: l.name,
                          }))
                        : []
                    }
                    value={
                      locationId
                        ? {
                            value: locationId,
                            label:
                              locations.find((l: any) => l.id === locationId)
                                ?.name || "",
                          }
                        : null
                    }
                    onChange={(option) => setLocationId(option?.value || "")}
                    placeholder="Select Location"
                  />
                </div>
              </div>

              <div className="col-lg-6">
                <div className="mb-3">
                  <label className="form-label">
                    Quantity<span className="text-danger ms-1">*</span>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                  />
                </div>
              </div>

              <div className="col-lg-6">
                <div className="mb-3">
                  <label className="form-label">Min Stock Level</label>
                  <input
                    type="number"
                    className="form-control"
                    value={minStockLevel}
                    onChange={(e) => setMinStockLevel(Number(e.target.value))}
                  />
                </div>
              </div>

              <div className="col-lg-6">
                <div className="mb-3">
                  <label className="form-label">Max Stock Level</label>
                  <input
                    type="number"
                    className="form-control"
                    value={maxStockLevel}
                    onChange={(e) => setMaxStockLevel(Number(e.target.value))}
                  />
                </div>
              </div>

              <div className="col-lg-6">
                <div className="mb-3">
                  <label className="form-label">Reorder Level</label>
                  <input
                    type="number"
                    className="form-control"
                    value={reorderLevel}
                    onChange={(e) => setReorderLevel(Number(e.target.value))}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="modal-footer">
            <Link
              href="#"
              className="btn me-1 btn-secondary fs-13 fw-medium p-2 px-3 shadow-none"
              onClick={onClose}
            >
              Cancel
            </Link>
            <Link
              href="#"
              className="btn btn-primary fs-13 fw-medium p-2 px-3"
              onClick={handleSave}
            >
              Submit
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
