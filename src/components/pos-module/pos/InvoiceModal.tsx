"use client";

import React from "react";
import { Modal, Button } from "react-bootstrap";
import { Order } from "@/core/interfaces/Order";

interface InvoiceModalProps {
  show: boolean;
  onClose: () => void;
  order: Order;
  receipt?: any; // ✅ Passed directly from Orders.tsx
}

const InvoiceModal: React.FC<InvoiceModalProps> = ({ show, onClose, order, receipt }) => {
  if (!show || !order) return null;

  return (
    <Modal show={show} onHide={onClose} size="lg" centered>
      {/* Header */}
      <Modal.Header closeButton>
        <Modal.Title>Invoice Details</Modal.Title>
      </Modal.Header>

      {/* Body */}
      <Modal.Body>
        {!receipt ? (
          <div className="text-center text-danger fw-semibold">
            ⚠️ Company receipt details not available.
          </div>
        ) : (
          <div className="p-3">
            {/* ===== Header Section ===== */}
            <header className="d-flex justify-content-between border-bottom pb-3 mb-3">
              <div>
                <h4 className="fw-bold mb-1">{receipt.displayName || "Company Receipt"}</h4>
                <p className="mb-0">{receipt.companyName}</p>
                {receipt.taxNumber && <p className="mb-0">Tax No: {receipt.taxNumber}</p>}
                {receipt.email && <p className="mb-0">Email: {receipt.email}</p>}
                {receipt.website && <p className="mb-0">Website: {receipt.website}</p>}
              </div>
              <div className="text-end">
                <h5 className="fw-bold">Invoice #{order.orderNumber}</h5>
                <p>Date: {new Date(order.orderDate).toLocaleDateString()}</p>
                <p>Status: {order.status}</p>
              </div>
            </header>

            {/* ===== Order Items Section ===== */}
            <section>
              <h5 className="fw-semibold mb-2">Order Items</h5>
              <table className="table table-bordered table-sm">
                <thead className="table-light">
                  <tr>
                    <th>Product</th>
                    <th className="text-end">Qty</th>
                    <th className="text-end">Unit Price</th>
                    <th className="text-end">Tax</th>
                    <th className="text-end">Discount</th>
                    <th className="text-end">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.orderItems?.map((item) => (
                    <tr key={item.id}>
                      <td>{item.product?.name || "N/A"}</td>
                      <td className="text-end">{item.quantity}</td>
                      <td className="text-end">{item.unitPrice.toFixed(2)}</td>
                      <td className="text-end">{(item.taxAmount ?? 0).toFixed(2)}</td>
                      <td className="text-end">{(item.discountAmount ?? 0).toFixed(2)}</td>
                      <td className="text-end">{item.totalPrice.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            {/* ===== Totals Section ===== */}
            <section className="mt-4 text-end">
              <p>Subtotal: {order.subTotal.toFixed(2)}</p>
              <p>Tax: {order.taxAmount.toFixed(2)}</p>
              <p>Discount: -{order.discountAmount.toFixed(2)}</p>
              <h5 className="fw-bold">Final Amount: {order.finalAmount.toFixed(2)}</h5>
              <p className="text-muted mt-1">
                Payment Method: {order.paymentMethod} | Status: {order.paymentStatus}
              </p>
            </section>

            {/* ===== Footer Section ===== */}
            <footer className="mt-4 border-top pt-3 text-center text-muted">
              {receipt.message && <p>{receipt.message}</p>}
              {receipt.qrCodeDescription && (
                <p className="text-secondary small mt-1">{receipt.qrCodeDescription}</p>
              )}
            </footer>
          </div>
        )}
      </Modal.Body>

      {/* Footer */}
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={() => window.print()}>
          <i className="ti ti-printer me-2" />
          Print
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default InvoiceModal;
