'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function InventoryPage() {
  const router = useRouter();

  const [trackStock, setTrackStock] = useState(true);
  const [emailAlert, setEmailAlert] = useState(false);
  const [stock, setStock] = useState({
    current: 84,
    min: 100,
    max: 300,
    onOrder: 0,
  });

  const handleGoBack = () => {
    // You can also save the data here if needed before redirect
    router.push('/manage-stocks');
  };

  return (
    <div className="page-wrapper">
      <div className="content">
    <div className="container py-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold">HI 5 Disposable Vape - Inventory</h4>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-primary">STOCK BATCHES</button>
          <button className="btn btn-secondary" onClick={handleGoBack}>
            SAVE & GO BACK
          </button>
        </div>
      </div>

      {/* Search Location */}
      <div className="mb-4">
        <label className="form-label">Search Locations</label>
        <input
          type="text"
          className="form-control"
          placeholder="Type a Location..."
        />
      </div>

      {/* Inventory Card */}
      <div className="card">
        <div className="card-header fw-bold">Inventory</div>
        <div className="card-body">
          <p className="text-muted">
            Set your current stock as well as your minimum and maximum stock. You can receive email alerts when products are low in stock and track stock in different locations.
          </p>

          <div className="mb-3">
            <label className="form-label d-flex align-items-center">
              <input
                type="checkbox"
                checked={trackStock}
                onChange={(e) => setTrackStock(e.target.checked)}
                className="form-check-input me-2"
              />
              Do you track stock for this product?
            </label>
            <small className="text-muted ms-4">
              This option turns on the stock taking capabilities Epos Now provides for this product.
            </small>
          </div>

          {/* Stock Inputs */}
          <div className="row">
            <div className="col-md-4 mb-3">
              <label className="form-label">Current</label>
              <input
                type="number"
                className="form-control"
                value={stock.current}
                onChange={(e) =>
                  setStock({ ...stock, current: Number(e.target.value) })
                }
              />
              <small className="text-muted">Stock</small>
            </div>
            <div className="col-md-4 mb-3">
              <label className="form-label">Min</label>
              <input
                type="number"
                className="form-control"
                value={stock.min}
                onChange={(e) =>
                  setStock({ ...stock, min: Number(e.target.value) })
                }
              />
              <small className="text-muted">Stock</small>
            </div>
            <div className="col-md-4 mb-3">
              <label className="form-label">Max</label>
              <input
                type="number"
                className="form-control"
                value={stock.max}
                onChange={(e) =>
                  setStock({ ...stock, max: Number(e.target.value) })
                }
              />
              <small className="text-muted">Stock</small>
            </div>
          </div>

          {/* On Order */}
          <div className="mb-3">
            <label className="form-label">On Order</label>
            <input
              type="number"
              className="form-control"
              value={stock.onOrder}
              onChange={(e) =>
                setStock({ ...stock, onOrder: Number(e.target.value) })
              }
            />
          </div>

          {/* Email Alert */}
          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              checked={emailAlert}
              onChange={() => setEmailAlert(!emailAlert)}
              id="emailAlertCheck"
            />
            <label className="form-check-label" htmlFor="emailAlertCheck">
              Receive email alerts when products are low in stock?
            </label>
          </div>

          {/* Add Location Button */}
          <div className="d-grid">
            <button className="btn btn-outline-primary"> ADD LOCATION</button>
          </div>
        </div>

        {/* Save Button */}
        <div className="card-footer text-end">
          <button className="btn btn-success" onClick={handleGoBack}>
            SAVE
          </button>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
}
