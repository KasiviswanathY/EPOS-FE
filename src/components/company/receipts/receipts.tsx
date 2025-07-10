"use client";
import { useState } from "react";

export default function ReceiptsComponent() {
  const [companyInfo, setCompanyInfo] = useState({
    name: "",
    displayName: "",
    taxNumber: "",
    email: "",
    website: "",
    refundDays: "7",
    receiptMessage: "Thank you for shopping with us",
    fontSize: "12.0",
    qrUrl: "",
    qrDescription: "",
    guid: "e.g., system-generated-guid",
  });

  const [dropdowns, setDropdowns] = useState({
    orderDescription: "Product Description",
    itemDisplay: "Product Description",
    barcodeType: "Code 128 - Compatible with iOS and Android scanners",
  });

  const [toggles, setToggles] = useState({
    taxBreakdown: true,
    emailPrompt: false,
    customerBalance: true,
    customerAddress: false,
    showNotes: false,
    groupPromotions: true,
    groupOrderItems: true,
    useProductName: true,
    showBarcodes: true,
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setCompanyInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggle = (key: string) => {
    setToggles((prev) => ({ ...prev, [key]: !prev[key as keyof typeof prev] }));
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="card">
          <div className="card-header fw-bold">Receipt Settings</div>

          <div className="card-body">
            <form>
              {[
                ["Company Name", "name"],
                ["Company Display Name", "displayName"],
                ["Tax Number", "taxNumber"],
                ["Email Address", "email"],
                ["Website Address", "website"],
              ].map(([label, field]) => (
                <div className="row align-items-center mb-3" key={field}>
                  <label className="col-sm-3 col-form-label text-end">{label}</label>
                  <div className="col-sm-6">
                    <input
                      type="text"
                      className="form-control"
                      name={field}
                      value={companyInfo[field as keyof typeof companyInfo]}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              ))}
              <div className="row align-items-center mb-3">
                <label className="col-sm-3 col-form-label text-end">Refund Days</label>
                <div className="col-sm-6">
                  <input
                    type="number"
                    className="form-control"
                    name="refundDays"
                    value={companyInfo.refundDays}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="row align-items-center mb-3">
                <label className="col-sm-3 col-form-label text-end">Receipt Message</label>
                <div className="col-sm-6">
                  <input
                    type="text"
                    className="form-control"
                    name="receiptMessage"
                    value={companyInfo.receiptMessage}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="row mb-4">
                <div className="offset-sm-3 col-sm-9">
                  {[
                    ["taxBreakdown", "Show Tax Breakdown"],
                    ["emailPrompt", "New Email Receipt UI prompt after transaction"],
                    ["customerBalance", "Show Customer Balance"],
                    ["customerAddress", "Print customer address on cut out transactions"],
                    ["showNotes", "Show item notes and multiple choice products on receipt"],
                    ["groupPromotions", "Group items and promotions on receipt"],
                    ["groupOrderItems", "Group items on order prints"],
                    ["useProductName", "Use product name rather than description on receipts"],
                    ["showBarcodes", "Show barcodes on transaction receipts"],
                  ].map(([key, label]) => (
                    <div className="form-check mb-3" key={key}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={toggles[key as keyof typeof toggles]}
                        onChange={() => handleToggle(key)}
                        id={key}
                      />
                      <label className="form-check-label" htmlFor={key}>
                        {label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="row align-items-center mb-3">
                <label className="col-sm-3 col-form-label text-end">
                  Show Product Name or Product Description on Order Tickets
                </label>
                <div className="col-sm-6">
                  <select
                    className="form-select"
                    value={dropdowns.orderDescription}
                    onChange={(e) => setDropdowns({ ...dropdowns, orderDescription: e.target.value })}
                  >
                    <option>Product Description</option>
                    <option>Product Name</option>
                  </select>
                </div>
              </div>
              <div className="row align-items-center mb-3">
                <label className="col-sm-3 col-form-label text-end">Set custom font size</label>
                <div className="col-sm-6">
                  <input
                    type="text"
                    className="form-control"
                    name="fontSize"
                    value={companyInfo.fontSize}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="row align-items-center mb-3">
                <label className="col-sm-3 col-form-label text-end">Barcode Type</label>
                <div className="col-sm-6">
                  <select
                    className="form-select"
                    value={dropdowns.barcodeType}
                    onChange={(e) => setDropdowns({ ...dropdowns, barcodeType: e.target.value })}
                  >
                    <option>Code 128 - Compatible with iOS and Android scanners</option>
                    <option>QR Code</option>
                    <option>EAN-13</option>
                  </select>
                </div>
              </div>
              <div className="row align-items-center mb-4">
                <label className="col-sm-3 col-form-label text-end">Company Logo</label>
                <div className="col-sm-6">
                  <div className="border border-dashed p-4 text-center bg-light">
                    <i className="ti ti-photo text-muted" style={{ fontSize: "2rem" }}></i>
                    <p className="mb-1 mt-2">Drop your file here or click to upload</p>
                    <small className="text-muted">PNG/JPG only, max 200x200px</small>
                  </div>
                </div>
              </div>
              <div className="row align-items-center mb-3">
                <label className="col-sm-3 col-form-label text-end">QR Code URL or Link</label>
                <div className="col-sm-6">
                  <input
                    type="text"
                    className="form-control"
                    name="qrUrl"
                    value={companyInfo.qrUrl}
                    onChange={handleChange}
                    placeholder="https://example.com/review"
                  />
                </div>
              </div>
              <div className="row align-items-center mb-3">
                <label className="col-sm-3 col-form-label text-end">QR Code Description</label>
                <div className="col-sm-6">
                  <input
                    type="text"
                    className="form-control"
                    name="qrDescription"
                    value={companyInfo.qrDescription}
                    onChange={handleChange}
                    placeholder="Please scan here and leave us a review"
                  />
                </div>
              </div>
              <div className="row align-items-center mb-3">
                <label className="col-sm-3 col-form-label text-end">GUID (Support Only)</label>
                <div className="col-sm-6 pt-1">
                  <span className="text-muted">{companyInfo.guid}</span>
                </div>
              </div>
            </form>
          </div>
          <div className="card-footer text-end">
            <button className="btn btn-success">
              <i className="ti ti-device-floppy me-1"></i> SAVE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
