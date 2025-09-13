"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import {
  getStockMovements,
  StockMovementFilters,
} from "@/lib/redux/actions/stockMovementActions";
import { StockMovementType } from "@/core/interfaces/StockMovement";
import moment from "moment";
import { Spinner } from "react-bootstrap";

export default function StockMovements() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    stockMovements: movements,
    loading,
    error,
    pagination,
  } = useSelector((state: RootState) => state.stockMovement);

  const [filters, setFilters] = useState<StockMovementFilters>({
    page: 1,
    limit: 10,
    startDate: moment().subtract(30, "days").format("YYYY-MM-DD"),
    endDate: moment().format("YYYY-MM-DD"),
  });
  const [searchBarcode, setSearchBarcode] = useState("");

  useEffect(() => {
    dispatch(getStockMovements(filters));
  }, [dispatch, filters]);

  const handleFilterChange = (
    field: keyof StockMovementFilters,
    value: string | number | undefined
  ) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && (!pagination || newPage <= pagination.totalPages)) {
      setFilters((prev) => ({
        ...prev,
        page: newPage,
      }));
    }
  };

  const handleBarcodeSearch = () => {
    if (searchBarcode.trim()) {
      setFilters((prev) => ({
        ...prev,
        page: 1, // Reset to first page when searching
        stockId: searchBarcode.trim(),
      }));
    } else {
      const { stockId, ...restFilters } = filters;
      setFilters(restFilters as StockMovementFilters);
    }
  };

  const getTypeLabel = (type: StockMovementType) => {
    switch (type) {
      case "INITIAL_STOCK":
        return <span className="badge bg-primary">Initial Stock</span>;
      case "PURCHASE":
        return <span className="badge bg-success">Purchase</span>;
      case "SALE":
        return <span className="badge bg-warning">Sale</span>;
      case "ADJUSTMENT":
        return <span className="badge bg-info">Adjustment</span>;
      case "RETURN":
        return <span className="badge bg-secondary">Return</span>;
      case "TRANSFER_IN":
        return <span className="badge bg-success">Transfer In</span>;
      case "TRANSFER_OUT":
        return <span className="badge bg-danger">Transfer Out</span>;
      case "DAMAGED":
        return <span className="badge bg-danger">Damaged</span>;
      case "EXPIRED":
        return <span className="badge bg-danger">Expired</span>;
      default:
        return <span className="badge bg-secondary">{type}</span>;
    }
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header d-flex justify-content-between align-items-center flex-wrap">
          <div>
            <h4>Stock Movements</h4>
          </div>
          <Link href="/addstockmovement" className="btn btn-sm btn-primary">
            ADD STOCK MOVEMENT
          </Link>
        </div>
        <div className="row mb-3">
          <div className="col-md-3">
            <label className="form-label">From Date</label>
            <input
              type="date"
              className="form-control"
              value={filters.startDate || ""}
              onChange={(e) => handleFilterChange("startDate", e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">To Date</label>
            <input
              type="date"
              className="form-control"
              value={filters.endDate || ""}
              onChange={(e) => handleFilterChange("endDate", e.target.value)}
            />
          </div>
        </div>
        <div className="card mb-4">
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-4">
                <label className="form-label">Filter by Movement Type</label>
                <select
                  className="form-select"
                  value={filters.type || ""}
                  onChange={(e) =>
                    handleFilterChange("type", e.target.value || undefined)
                  }
                >
                  <option value="">All Types</option>
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
              <div className="col-md-4">
                <label className="form-label">Sort By</label>
                <select
                  className="form-select"
                  value={filters.sortBy || ""}
                  onChange={(e) =>
                    handleFilterChange("sortBy", e.target.value || undefined)
                  }
                >
                  <option value="">Default (Date)</option>
                  <option value="createdAt">Date</option>
                  <option value="quantity">Quantity</option>
                  <option value="type">Movement Type</option>
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label">Sort Direction</label>
                <select
                  className="form-select"
                  value={filters.sortDirection || "desc"}
                  onChange={(e) =>
                    handleFilterChange(
                      "sortDirection",
                      e.target.value as "asc" | "desc"
                    )
                  }
                >
                  <option value="desc">Newest First</option>
                  <option value="asc">Oldest First</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="card mb-3">
          <div className="card-body">
            <label className="form-label">Search by Stock ID or Barcode</label>
            <div className="d-flex">
              <input
                type="text"
                className="form-control"
                placeholder="Enter stock ID or scan barcode"
                value={searchBarcode}
                onChange={(e) => setSearchBarcode(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleBarcodeSearch()}
              />
              <button
                className="btn btn-primary ms-2"
                onClick={handleBarcodeSearch}
              >
                SEARCH
              </button>
            </div>
          </div>
        </div>

        {/* Stock Movements Table */}
        <div className="card mb-4">
          <div className="card-body">
            {loading ? (
              <div className="text-center p-4">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            ) : error ? (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            ) : movements && movements.length > 0 ? (
              <>
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Product</th>
                        <th>Type</th>
                        <th>Previous Qty</th>
                        <th>Quantity</th>
                        <th>New Qty</th>
                        <th>Reason</th>
                        <th>Reference</th>
                        <th>Processed By</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {movements.map((movement) => (
                        <tr key={movement.id}>
                          <td>
                            {new Date(movement.createdAt).toLocaleString()}
                          </td>
                          <td>
                            {movement.stock?.product?.name || "Unknown Product"}
                            <br />
                            <small className="text-muted">
                              {movement.stockId}
                            </small>
                          </td>
                          <td>{getTypeLabel(movement.type)}</td>
                          <td>{movement.previousQuantity}</td>
                          <td>
                            {movement.type === "ADJUSTMENT"
                              ? movement.quantity
                              : movement.type === "SALE" ||
                                movement.type === "DAMAGED" ||
                                movement.type === "EXPIRED" ||
                                movement.type === "TRANSFER_OUT"
                              ? `-${movement.quantity}`
                              : `+${movement.quantity}`}
                          </td>
                          <td>{movement.newQuantity}</td>
                          <td>{movement.reason || "-"}</td>
                          <td>{movement.reference || "-"}</td>
                          <td>
                            {movement.processedByStaff?.name ||
                              movement.processedByUser?.name ||
                              "-"}
                          </td>
                          <td>
                            <div className="dropdown dropdown-action">
                              <a
                                href="#"
                                className="action-icon dropdown-toggle"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                <i className="fa fa-ellipsis-v"></i>
                              </a>
                              <div className="dropdown-menu dropdown-menu-end">
                                <Link
                                  className="dropdown-item"
                                  href={`/stockmovement/${movement.id}`}
                                >
                                  <i className="fa fa-eye m-r-5"></i> View
                                </Link>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {pagination && pagination.totalPages > 1 && (
                  <div className="d-flex justify-content-between align-items-center mt-4">
                    <div>
                      Showing {movements.length} of {pagination.total} entries
                    </div>
                    <nav aria-label="Stock movement pagination">
                      <ul className="pagination">
                        <li
                          className={`page-item ${
                            pagination.page <= 1 ? "disabled" : ""
                          }`}
                        >
                          <button
                            className="page-link"
                            onClick={() =>
                              handlePageChange(pagination.page - 1)
                            }
                            disabled={pagination.page <= 1}
                          >
                            Previous
                          </button>
                        </li>

                        {Array.from(
                          { length: pagination.totalPages },
                          (_, i) => i + 1
                        )
                          .filter(
                            (page) =>
                              page === 1 ||
                              page === pagination.totalPages ||
                              Math.abs(page - pagination.page) <= 1
                          )
                          .map((page, index, array) => {
                            // Add ellipsis
                            if (index > 0 && array[index - 1] !== page - 1) {
                              return (
                                <li
                                  key={`ellipsis-${page}`}
                                  className="page-item disabled"
                                >
                                  <span className="page-link">...</span>
                                </li>
                              );
                            }

                            return (
                              <li
                                key={page}
                                className={`page-item ${
                                  pagination.page === page ? "active" : ""
                                }`}
                              >
                                <button
                                  className="page-link"
                                  onClick={() => handlePageChange(page)}
                                >
                                  {page}
                                </button>
                              </li>
                            );
                          })}

                        <li
                          className={`page-item ${
                            pagination.page >= pagination.totalPages
                              ? "disabled"
                              : ""
                          }`}
                        >
                          <button
                            className="page-link"
                            onClick={() =>
                              handlePageChange(pagination.page + 1)
                            }
                            disabled={pagination.page >= pagination.totalPages}
                          >
                            Next
                          </button>
                        </li>
                      </ul>
                    </nav>
                  </div>
                )}
              </>
            ) : (
              <p className="text-muted m-0">
                No stock movements were found matching the criteria you have
                selected.
              </p>
            )}
          </div>
        </div>

        <div className="d-flex flex-wrap gap-2 mb-5">
          <button
            className="btn btn-sm text-white"
            style={{ backgroundColor: "#fd7e14" }}
          >
            EXPORT TO .CSV
          </button>
          <button
            className="btn btn-sm text-white"
            style={{ backgroundColor: "#fd7e14" }}
          >
            EXPORT TO WORD
          </button>
          <button
            className="btn btn-sm text-white"
            style={{ backgroundColor: "#fd7e14" }}
          >
            EXPORT TO EXCEL
          </button>
          <button
            className="btn btn-sm text-white"
            style={{ backgroundColor: "#fd7e14" }}
          >
            PRINT
          </button>
        </div>
        <div className="card mb-4">
          <div className="card-body">
            <p className="text-muted m-0">
              No stock movements were found matching the criteria you have
              selected.
            </p>
          </div>
        </div>
        <div className="d-flex flex-wrap gap-2 mb-5">
          <button
            className="btn btn-sm text-white"
            style={{ backgroundColor: "#fd7e14" }}
          >
            EXPORT TO .CSV
          </button>
          <button
            className="btn btn-sm text-white"
            style={{ backgroundColor: "#fd7e14" }}
          >
            EXPORT TO WORD
          </button>
          <button
            className="btn btn-sm text-white"
            style={{ backgroundColor: "#fd7e14" }}
          >
            EXPORT TO EXCEL
          </button>
          <button
            className="btn btn-sm text-white"
            style={{ backgroundColor: "#fd7e14" }}
          >
            PRINT
          </button>
        </div>
      </div>
    </div>
  );
}
