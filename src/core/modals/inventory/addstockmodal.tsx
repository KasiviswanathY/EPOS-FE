"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import Select from "react-select";
import { getAllproducts } from "@/lib/redux/actions/productsAction";
import { getAllLocations } from "@/lib/redux/actions";
import { createStock, updateStock } from "@/lib/redux/actions/stockActions";
import { NewStockPayload, Stock } from "@/core/interfaces/Stock";

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
  const [maxStockLevel, setMaxStockLevel] = useState<number>(0);
  const [reorderLevel, setReorderLevel] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
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
      setMaxStockLevel(stock.maxStockLevel ?? 0);
      setReorderLevel(stock.reorderLevel ?? 0);
      setError(null);
    } else if (isOpen) {
      // reset for create
      setProductId("");
      setLocationId("");
      setQuantity(0);
      setMinStockLevel(0);
      setMaxStockLevel(0);
      setReorderLevel(0);
      setError(null);
    }
  }, [stock, isOpen]);

  const resetAndClose = () => {
    setProductId("");
    setLocationId("");
    setQuantity(0);
    setMinStockLevel(0);
    setMaxStockLevel(0);
    setReorderLevel(0);
    setError(null);
    setSaving(false);
    onClose();
  };

  const handleSave = async () => {
    setError(null);

    if (stock) {
      // EDIT mode -> only allowed fields
      const payload = {
        minStockLevel: Number(minStockLevel),
        maxStockLevel: Number(maxStockLevel),
        reorderLevel: Number(reorderLevel),
      };

      setSaving(true);
      try {
        await dispatch(
          updateStock({ id: stock.id, data: payload } as any) as any
        );
        onSuccess();
        resetAndClose();
      } catch (err: any) {
        setError(
          (err && err.message) || (err && err.error) || "Failed to update stock"
        );
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
    };

    setSaving(true);
    try {
      await dispatch(createStock(newPayload) as any);
      onSuccess();
      resetAndClose();
    } catch (err: any) {
      setError(
        (err && err.message) || (err && err.error) || "Failed to create stock"
      );
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
            {error && <div className="alert alert-danger">{error}</div>}

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
                        ? products.map((p: any) => ({
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
                              products?.find((p: any) => p.id === productId)
                                ?.name || "",
                          }
                        : null
                    }
                    onChange={(opt: any) => setProductId(opt?.value || "")}
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
                              locations?.find((l: any) => l.id === locationId)
                                ?.name || "",
                          }
                        : null
                    }
                    onChange={(opt: any) => setLocationId(opt?.value || "")}
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
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
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
                  value={minStockLevel}
                  onChange={(e) => setMinStockLevel(Number(e.target.value))}
                  min={0}
                />
              </div>
              <div className="col-lg-4 mb-3">
                <label className="form-label">Max Stock Level</label>
                <input
                  type="number"
                  className="form-control"
                  value={maxStockLevel}
                  onChange={(e) => setMaxStockLevel(Number(e.target.value))}
                  min={0}
                />
              </div>
              <div className="col-lg-4 mb-3">
                <label className="form-label">Reorder Level</label>
                <input
                  type="number"
                  className="form-control"
                  value={reorderLevel}
                  onChange={(e) => setReorderLevel(Number(e.target.value))}
                  min={0}
                />
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
