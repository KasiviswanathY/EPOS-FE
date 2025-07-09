// pages/stock-movement-reasons.tsx
import React from "react";
import Link from "next/link";
const stockMovementReasons = [
  "External Branch Movement",
  "Internal Movement",
  "Returns",
  "New Stock",
  "Excess Stock",
  "Wastage",
  "Shrinkage",
  "Missing Stock",
  "Stock Take",
  "New Product",
];

export default function StockMovementReasons() {
  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="fw-bold mb-0">Stock Movement Reasons</h4>
      <Link href="/addstockmovementreasons" className="btn btn-primary">ADD STOCK MOVEMENT REASONS</Link>
        </div>
        <div className="card">
          <div className="card-body p-0">
            <table className="table mb-0">
              <thead className="table-light">
                <tr>
                  <th className="text-start" style={{ width: "80%" }}>Description</th>
                  <th className="text-end" style={{ width: "20%" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {stockMovementReasons.map((reason, index) => (
                  <tr key={index}>
                    <td className="text-start">{reason}</td>
                    <td className="text-end">
                      <div className="d-flex justify-content-end gap-2">
                        <button className="btn btn-sm btn-outline-primary">EDIT</button>
                        <button className="btn btn-sm btn-outline-danger">X</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
