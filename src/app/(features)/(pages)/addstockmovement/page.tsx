"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { getAllstocks } from "@/lib/redux/actions/stockActions";
import { getAllStaff } from "@/lib/redux/actions/staffActions";
import {
  createBulkStockMovements,
  CreateStockMovementPayload,
} from "@/lib/redux/actions/stockMovementActions";
import { clearStockMovementState } from "@/lib/redux/slices/stockMovementSlice";
import { Stock } from "@/core/interfaces/Stock";
import { StockMovementType } from "@/core/interfaces/StockMovement";
import { Staff } from "@/core/interfaces/Staff";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AddStockMovement() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const { stockRecords } = useSelector((state: RootState) => state.stock);

  const { staff } = useSelector((state: RootState) => state.staff);

  const {
    loading: movementLoading,
    error: movementError,
    success: movementSuccess,
  } = useSelector((state: RootState) => state.stockMovement);

  // Form state
  const [movementType, setMovementType] =
    useState<StockMovementType>("INITIAL_STOCK");
  const [reason, setReason] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [reference, setReference] = useState("");
  const [staffId, setStaffId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [movementItems, setMovementItems] = useState<
    Array<{
      stock: Stock;
      quantity: number;
    }>
  >([]);
  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  // Fetch all stocks and staff on mount
  useEffect(() => {
    dispatch(getAllstocks());
    dispatch(getAllStaff());
  }, [dispatch]);

  // Handle success and error states
  useEffect(() => {
    if (movementSuccess) {
      console.log("Stock movement creation successful");
      setSuccessAlert(true);
      setAlertMessage("Stock movements created successfully!");
      setMovementItems([]);

      // Automatically navigate back after success
      const timer = setTimeout(() => {
        router.push("/stockmovements");
      }, 2000);

      return () => clearTimeout(timer);
    }

    if (movementError) {
      console.error("Stock movement error:", movementError);
      setErrorAlert(true);
      setAlertMessage(
        movementError || "An error occurred while creating stock movements"
      );
    }

    // Clear alerts after 5 seconds
    const timer = setTimeout(() => {
      if (movementSuccess || movementError) {
        dispatch(clearStockMovementState());
        setSuccessAlert(false);
        setErrorAlert(false);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [movementSuccess, movementError, dispatch, router]);

  // Filter stocks based on search term
  const filteredStocks = stockRecords.filter(
    (stock: Stock) =>
      stock.product?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.product?.id?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addStockItem = () => {
    if (!selectedStock) return;

    // Validate quantity
    if (quantity <= 0) {
      setErrorAlert(true);
      setAlertMessage("Quantity must be greater than zero");
      setTimeout(() => setErrorAlert(false), 3000);
      return;
    }

    // Check if item already exists in movement items
    const existingItemIndex = movementItems.findIndex(
      (item) => item.stock.id === selectedStock.id
    );

    if (existingItemIndex >= 0) {
      // Update existing item
      const updatedItems = [...movementItems];
      updatedItems[existingItemIndex].quantity += quantity;
      setMovementItems(updatedItems);
    } else {
      // Add new item
      setMovementItems([
        ...movementItems,
        {
          stock: selectedStock,
          quantity,
        },
      ]);
    }

    // Reset selection
    setSelectedStock(null);
    setSearchTerm("");
    setQuantity(1);
  };

  const removeStockItem = (stockId: string) => {
    setMovementItems(movementItems.filter((item) => item.stock.id !== stockId));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSuccessAlert(false);
    setErrorAlert(false);

    if (movementItems.length === 0) {
      setErrorAlert(true);
      setAlertMessage("Please add at least one stock item");
      setTimeout(() => setErrorAlert(false), 3000);
      return;
    }

    // Additional validation for negative quantities or zero quantities
    const invalidItems = movementItems.filter((item) => item.quantity <= 0);
    if (invalidItems.length > 0) {
      setErrorAlert(true);
      setAlertMessage("All items must have a quantity greater than zero");
      setTimeout(() => setErrorAlert(false), 3000);
      return;
    }

    try {
      // Create stock movement payloads
      const movements: CreateStockMovementPayload[] = movementItems.map(
        (item) => {
          return {
            stockId: item.stock.id,
            type: movementType,
            quantity: item.quantity,
            previousQuantity: item.stock.quantity,
            reason: reason || `${movementType} for ${item.stock.product?.name}`,
            reference,
            processedByStaffId: staffId || undefined,
          };
        }
      );

      console.log(
        "Dispatching createBulkStockMovements with payload:",
        movements
      );

      // Dispatch bulk create action
      await dispatch(createBulkStockMovements(movements)).unwrap();

      // Success is handled in the useEffect
    } catch (error) {
      console.error("Error creating stock movements:", error);
      setErrorAlert(true);
      setAlertMessage(
        typeof error === "string" ? error : "Failed to create stock movements"
      );
    }
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header d-flex justify-content-between align-items-center">
          <h4>Add Stock Movement</h4>
        </div>

        {/* Alerts */}
        {successAlert && (
          <div
            className="alert alert-success alert-dismissible fade show"
            role="alert"
          >
            {alertMessage}
            <button
              type="button"
              className="btn-close"
              onClick={() => setSuccessAlert(false)}
            ></button>
          </div>
        )}

        {errorAlert && (
          <div
            className="alert alert-danger alert-dismissible fade show"
            role="alert"
          >
            {alertMessage}
            <button
              type="button"
              className="btn-close"
              onClick={() => setErrorAlert(false)}
            ></button>
          </div>
        )}

        <div className="card mb-4">
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Movement Type</label>
                <select
                  className="form-select form-select-sm"
                  value={movementType}
                  onChange={(e) =>
                    setMovementType(e.target.value as StockMovementType)
                  }
                >
                  <option value="INITIAL_STOCK">Initial Stock</option>
                  <option value="PURCHASE">Purchase</option>
                  <option value="SALE">Sale</option>
                  <option value="ADJUSTMENT">Adjustment</option>
                  <option value="RETURN">Return</option>
                  <option value="TRANSFER_IN">Transfer In</option>
                  <option value="TRANSFER_OUT">Transfer Out</option>
                  <option value="DAMAGED">Damaged</option>
                  <option value="EXPIRED">Expired</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">Staff member</label>
                <select
                  className="form-select form-select-sm"
                  value={staffId}
                  onChange={(e) => setStaffId(e.target.value)}
                >
                  <option value="">Select Staff</option>
                  {staff?.map((staffMember: Staff) => (
                    <option key={staffMember.id} value={staffMember.id}>
                      {staffMember.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">Reason</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Enter reason for stock movement (optional)"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Reference (Optional)</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Reference number or description"
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="card mb-4">
          <div className="card-body">
            <label className="form-label">
              Search for a stock item using the search box below
            </label>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Search by product name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                className="btn btn-sm btn-primary"
                type="button"
                disabled={!selectedStock}
                onClick={addStockItem}
              >
                Add Item
              </button>
            </div>

            {searchTerm && filteredStocks.length > 0 && !selectedStock && (
              <div
                className="list-group mb-3"
                style={{ maxHeight: "200px", overflowY: "auto" }}
              >
                {filteredStocks.map((stock: Stock) => (
                  <button
                    key={stock.id}
                    type="button"
                    className="list-group-item list-group-item-action"
                    onClick={() => {
                      setSelectedStock(stock);
                      setSearchTerm(stock.product?.name || "");
                    }}
                  >
                    {stock.product?.name} - {stock.location?.name} (Current Qty:{" "}
                    {stock.quantity})
                  </button>
                ))}
              </div>
            )}

            {selectedStock && (
              <div className="selected-item alert alert-info mb-3">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong>Selected Item:</strong>{" "}
                    {selectedStock.product?.name} -{" "}
                    {selectedStock.location?.name}
                    <div className="small">
                      Current Quantity: {selectedStock.quantity}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => {
                      setSelectedStock(null);
                      setSearchTerm("");
                    }}
                  ></button>
                </div>
              </div>
            )}

            <label className="form-label">
              Quantity to{" "}
              {["PURCHASE", "RETURN", "INITIAL_STOCK", "TRANSFER_IN"].includes(
                movementType
              )
                ? "add"
                : "remove"}
              :
            </label>
            <div className="d-flex align-items-center mb-3">
              <button
                type="button"
                className="btn btn-sm btn-primary"
                onClick={() => setQuantity((q) => Math.max(q - 1, 1))}
              >
                -
              </button>
              <input
                type="number"
                className="form-control mx-2 text-center"
                value={quantity}
                style={{ width: "100px" }}
                onChange={(e) =>
                  setQuantity(Math.max(1, Number(e.target.value)))
                }
                min="1"
              />
              <button
                type="button"
                className="btn btn-sm btn-primary"
                onClick={() => setQuantity((q) => q + 1)}
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div className="card mb-4">
          <div className="card-header">
            <h5 className="card-title mb-0">Stock Movement Items</h5>
          </div>
          <div className="table-responsive">
            <table className="table table-bordered table-sm mb-0">
              <thead>
                <tr>
                  <th>PRODUCT</th>
                  <th>LOCATION</th>
                  <th>CURRENT QTY</th>
                  <th>MOVEMENT QTY</th>
                  <th>NEW QTY</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {movementItems.length > 0 ? (
                  movementItems.map((item) => {
                    let newQuantity = item.stock.quantity;

                    // Calculate new quantity based on movement type
                    switch (movementType) {
                      case "PURCHASE":
                      case "RETURN":
                      case "INITIAL_STOCK":
                      case "TRANSFER_IN":
                        newQuantity = item.stock.quantity + item.quantity;
                        break;
                      case "SALE":
                      case "DAMAGED":
                      case "EXPIRED":
                      case "TRANSFER_OUT":
                        newQuantity = item.stock.quantity - item.quantity;
                        break;
                      case "ADJUSTMENT":
                        // For adjustment, the quantity field represents the absolute new quantity
                        newQuantity = item.quantity;
                        break;
                    }

                    return (
                      <tr key={item.stock.id}>
                        <td>{item.stock.product?.name}</td>
                        <td>{item.stock.location?.name}</td>
                        <td>{item.stock.quantity}</td>
                        <td>{item.quantity}</td>
                        <td>{newQuantity}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => removeStockItem(item.stock.id)}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center text-muted">
                      No items added to this stock movement
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="d-flex justify-content-between mb-5">
          <Link href="/stockmovements" className="btn btn-secondary">
            Cancel
          </Link>
          <button
            type="button"
            className="btn btn-success"
            onClick={handleSubmit}
            disabled={movementLoading}
          >
            {movementLoading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Processing...
              </>
            ) : (
              "Create Stock Movement"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
