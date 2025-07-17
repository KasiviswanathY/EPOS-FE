"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function InvoicePage() {
  const router = useRouter();

  const [invoice, setInvoice] = useState({
    invoiceNumber: "",
    date: "10/7/2025",
    senderAddress: "",
    taxNumber: "",
    customerName: "Mr Kennedy",
    customerAddress: "",
    invoiceInfo: "",
    showTenderHistory: true,
    showCreditHistory: true,
    showDateRange: false,
    orderStatus: "All",
    transactions: "All",
    itemsToShow: 120,
    showItemName: true,
    showItemDesc: true,
    showDiscounts: true,
    showRefunds: true,
    showTime: true,
    notes: "",
  });

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="card">
          <div className="card-body">
            <h5 className="fw-bold mb-4">Customer Invoice</h5>

            <div className="mb-3">
              <textarea className="form-control" placeholder="Add Invoice Number Here" />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Date:</label>
              <input className="form-control" value={invoice.date} readOnly />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Select Sender Address:</label>
              <select className="form-select">
                <option>* Select Address</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Tax Number:</label>
              <input type="text" className="form-control" />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Invoice Number:</label>
              <input type="text" className="form-control" value="8" readOnly />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Customer Name and Organisation:</label>
              <textarea className="form-control" value={invoice.customerName} readOnly />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Customer Address:</label>
              <textarea className="form-control" placeholder="Add Customers Address Here" />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Invoice Information:</label>
              <textarea className="form-control" placeholder="Invoice information" />
            </div>
            <div className="mb-3 d-flex flex-wrap align-items-center gap-3">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" checked />
                <label className="form-check-label">Inc. Tax</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" checked />
                <label className="form-check-label">Check to show Tender History</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" checked />
                <label className="form-check-label">Check to show Credit History</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" />
                <label className="form-check-label">Check to show date range</label>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label fw-semibold">Order Status:</label>
                <select className="form-select">
                  <option>All</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">Transactions:</label>
                <select className="form-select">
                  <option>All</option>
                </select>
              </div>
            </div>

           <div className="mt-4 d-flex justify-content-between">
  <button className="btn btn-danger" onClick={() => router.back()}> BACK</button>
  <button className="btn btn-primary">SEARCH</button>
</div>

          </div>
        </div>
        <div className="card mt-4">
          <div className="card-body">
            <h6 className="fw-bold mb-3">Items Purchased Options:</h6>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="checkbox" checked />
              <label className="form-check-label">Show Item Name</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="checkbox" checked />
              <label className="form-check-label">Show Item Description</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="checkbox" checked />
              <label className="form-check-label">Show Discounts</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="checkbox" checked />
              <label className="form-check-label">Show Refunds</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="checkbox" checked />
              <label className="form-check-label">Show Transaction Time</label>
            </div>
          </div>
        </div>
        <div className="card mt-4">
          <div className="card-body">
            <h6 className="fw-bold">Items Purchased</h6>
            <h6 className="fw-bold mt-4">Tender History</h6>
            <p>No Non-Credit tenders have been made for the dates you have selected.</p>

            <h6 className="fw-bold mt-4">Credit History</h6>
            <p>No Credit items have been made for the dates you have selected.</p>
          </div>
        </div>
        <div className="card mt-4">
          <div className="card-body">
            <div className="bg-light p-3 mb-3">
              <p>Account Balance : $0.00</p>
              <p>Credit Limit : $0.00</p>
              <p>Sign Up Date : 10/11/2017</p>
            </div>
            <div className="mb-3">
              <label className="form-label fw-semibold">Notes</label>
              <textarea className="form-control" rows={3}></textarea>
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">No Saved Messages Created</label>
              <textarea className="form-control" rows={3}></textarea>
            </div>

            <div className="d-flex justify-content-between align-items-center">
              <button className="btn btn-primary">SAVE MESSAGE TEXT</button>
              <div>
                <select className="form-select d-inline-block w-auto me-2">
                  <option>NEW MESSAGE</option>
                </select>
                <button className="btn btn-primary me-2">EMAIL</button>
                <button className="btn btn-primary">PRINT</button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <button className="btn btn-danger" onClick={() => router.back()}>
            BACK
          </button>
        </div>
      </div>
    </div>
  );
}
