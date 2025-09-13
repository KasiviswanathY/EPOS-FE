"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import Select from "react-select";
import { getAllproducts } from "@/lib/redux/actions/productsAction";
import { getAllLocations } from "@/lib/redux/actions";
import { createStock, updateStock } from "@/lib/redux/actions/stockActions";
import { NewStockPayload, Stock } from "@/core/interfaces/Stock";
import { Product } from "@/core/interfaces/Products";
import { Location } from "@/core/interfaces/Location";

// Define option types for select dropdowns
interface SelectOption {
  value: string;
  label: string;
}

interface AddStockModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  stock?: Stock | undefined | null;
}

export default function AddStockModal({
  isOpen,
  onClose,
  onSuccess,
  stock,
}: AddStockModalProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { products } = useSelector((state: RootState) => state.products);
  const { locations } = useSelector((state: RootState) => state.locations);

  // form state
  const [productId, setProductId] = useState<string>("");
  const [locationId, setLocationId] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);
  const [minStockLevel, setMinStockLevel] = useState<number>(0);
  const [maxStockLevel, setMaxStockLevel] = useState<number | undefined>(
    undefined
  );
  const [reorderLevel, setReorderLevel] = useState<number>(0);
  const [isLowStock, setIsLowStock] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // load products & locations on open
  useEffect(() => {
    if (isOpen) {
      dispatch(getAllproducts());
      dispatch(getAllLocations());
    }
  }, [isOpen, dispatch]);

  // populate form when editing, or reset when adding
  useEffect(() => {
    if (stock) {
      setProductId(stock.product?.id || "");
      setLocationId(stock.location?.id || "");
      setQuantity(stock.quantity ?? 0);
      setMinStockLevel(stock.minStockLevel ?? 0);
      setMaxStockLevel(stock.maxStockLevel);
      setReorderLevel(stock.reorderLevel ?? 0);
      setIsLowStock(stock.isLowStock ?? false);
      setError(null);
      setSuccessMessage(null);
    } else if (isOpen) {
      // reset for create
      setProductId("");
      setLocationId("");
      setQuantity(0);
      setMinStockLevel(0);
      setMaxStockLevel(undefined);
      setReorderLevel(0);
      setIsLowStock(false);
      setError(null);
      setSuccessMessage(null);
    }
  }, [stock, isOpen]);

  const resetAndClose = () => {
    setProductId("");
    setLocationId("");
    setQuantity(0);
    setMinStockLevel(0);
    setMaxStockLevel(undefined);
    setReorderLevel(0);
    setIsLowStock(false);
    setError(null);
    setSuccessMessage(null);
    setSaving(false);
    onClose();
  };

  const handleSave = async () => {
    setError(null);

    if (stock) {
      // EDIT mode -> only allowed fields
      const payload = {
        minStockLevel: Number(minStockLevel),
        maxStockLevel:
          maxStockLevel !== undefined ? Number(maxStockLevel) : undefined,
        reorderLevel: Number(reorderLevel),
        // Remove isLowStock as it's not allowed to be updated directly
      };

      setSaving(true);
      try {
        await dispatch(
          updateStock({
            id: stock.id,
            data: payload,
          })
        );
        setSuccessMessage("Stock updated successfully!");
        // Call onSuccess to refresh the parent component
        onSuccess();

        // Add a short delay before closing the modal to show the success message
        setTimeout(() => {
          resetAndClose();
        }, 1500);
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to update stock";
        setError(errorMessage);
        setSaving(false);
      }
      return;
    }

    // CREATE mode -> require product & location & quantity
    if (!productId) {
      setError("Please select a Product.");
      return;
    }
    if (!locationId) {
      setError("Please select a Location.");
      return;
    }
    if (quantity === null || quantity === undefined || isNaN(quantity)) {
      setError("Please enter a valid Quantity.");
      return;
    }

    const newPayload: NewStockPayload = {
      productId,
      locationId,
      quantity,
      minStockLevel,
      maxStockLevel,
      reorderLevel,
      isLowStock,
    };

    setSaving(true);
    try {
      await dispatch(createStock(newPayload));
      setSuccessMessage("Stock created successfully!");
      // Call onSuccess to refresh the parent component
      onSuccess();

      // Add a short delay before closing the modal to show the success message
      setTimeout(() => {
        resetAndClose();
      }, 1500);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to create stock";
      setError(errorMessage);
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal fade show d-block"
      style={{ background: "rgba(0,0,0,0.5)" }}
      tabIndex={-1}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          {/* Header */}
          <div className="modal-header">
            <h5 className="modal-title">
              {stock ? "Edit Stock" : "Add New Stock"}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={resetAndClose}
            ></button>
          </div>

          {/* Body */}
          <div className="modal-body">
            {error && (
              <div
                className="alert alert-danger alert-dismissible fade show"
                role="alert"
              >
                <strong>Error!</strong> {error}
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setError(null)}
                  aria-label="Close"
                ></button>
              </div>
            )}

            {successMessage && (
              <div
                className="alert alert-success alert-dismissible fade show"
                role="alert"
              >
                <strong>Success!</strong> {successMessage}
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSuccessMessage(null)}
                  aria-label="Close"
                ></button>
              </div>
            )}

            <div className="row">
              {/* Product */}
              <div className="col-lg-12 mb-3">
                <label className="form-label">
                  Product{" "}
                  {stock ? (
                    <span className="text-muted">(read-only)</span>
                  ) : (
                    <span className="text-danger">*</span>
                  )}
                </label>

                {stock ? (
                  <input
                    className="form-control"
                    value={stock.product?.name || ""}
                    disabled
                  />
                ) : (
                  <Select
                    classNamePrefix="react-select"
                    options={
                      Array.isArray(products)
                        ? products.map((p: Product) => ({
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
                              products?.find((p: Product) => p.id === productId)
                                ?.name || "",
                          }
                        : null
                    }
                    onChange={(opt: SelectOption | null) =>
                      setProductId(opt?.value || "")
                    }
                    placeholder="Select Product"
                  />
                )}
              </div>

              {/* Location */}
              <div className="col-lg-12 mb-3">
                <label className="form-label">
                  Location{" "}
                  {stock ? (
                    <span className="text-muted">(read-only)</span>
                  ) : (
                    <span className="text-danger">*</span>
                  )}
                </label>

                {stock ? (
                  <input
                    className="form-control"
                    value={stock.location?.name || ""}
                    disabled
                  />
                ) : (
                  <Select
                    classNamePrefix="react-select"
                    options={
                      Array.isArray(locations)
                        ? locations.map((l: Location) => ({
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
                              locations?.find(
                                (l: Location) => l.id === locationId
                              )?.name || "",
                          }
                        : null
                    }
                    onChange={(opt: SelectOption | null) =>
                      setLocationId(opt?.value || "")
                    }
                    placeholder="Select Location"
                  />
                )}
              </div>

              {/* Quantity */}
              <div className="col-lg-12 mb-3">
                <label className="form-label">
                  Quantity{" "}
                  {stock ? (
                    <span className="text-muted">(read-only)</span>
                  ) : (
                    <span className="text-danger">*</span>
                  )}
                </label>
                {stock ? (
                  <input
                    className="form-control"
                    value={stock.quantity ?? 0}
                    disabled
                  />
                ) : (
                  <input
                    type="number"
                    className="form-control"
                    value={quantity || ""}
                    onChange={(e) => {
                      const value =
                        e.target.value === ""
                          ? 0
                          : parseInt(e.target.value, 10);
                      setQuantity(value);
                    }}
                    min={0}
                  />
                )}
              </div>

              {/* Editable levels (always editable in create; editable in edit mode) */}
              <div className="col-lg-4 mb-3">
                <label className="form-label">Min Stock Level</label>
                <input
                  type="number"
                  className="form-control"
                  value={minStockLevel || ""}
                  onChange={(e) => {
                    const value =
                      e.target.value === "" ? 0 : parseInt(e.target.value, 10);
                    setMinStockLevel(value);
                  }}
                  min={0}
                />
              </div>
              <div className="col-lg-4 mb-3">
                <label className="form-label">Max Stock Level</label>
                <input
                  type="number"
                  className="form-control"
                  value={maxStockLevel !== undefined ? maxStockLevel : ""}
                  onChange={(e) => {
                    const val = e.target.value.trim();
                    setMaxStockLevel(
                      val === "" ? undefined : parseInt(val, 10)
                    );
                  }}
                  min={0}
                  placeholder="Optional"
                />
              </div>
              <div className="col-lg-4 mb-3">
                <label className="form-label">Reorder Level</label>
                <input
                  type="number"
                  className="form-control"
                  value={reorderLevel || ""}
                  onChange={(e) => {
                    const value =
                      e.target.value === "" ? 0 : parseInt(e.target.value, 10);
                    setReorderLevel(value);
                  }}
                  min={0}
                />
              </div>

              {/* Low Stock Status */}
              <div className="col-lg-12 mb-3">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="isLowStock"
                    checked={isLowStock}
                    onChange={(e) => setIsLowStock(e.target.checked)}
                    disabled={!!stock} /* Disable in edit mode */
                  />
                  <label className="form-check-label" htmlFor="isLowStock">
                    Mark as Low Stock
                    {stock && (
                      <span className="text-muted ms-2 small">
                        (Read-only in edit mode. This is calculated automatically based on stock levels.)
                      </span>
                    )}
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={resetAndClose}
              disabled={saving}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSave}
              disabled={saving}
            >
              {saving
                ? stock
                  ? "Updating..."
                  : "Creating..."
                : stock
                ? "Update"
                : "Create"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
