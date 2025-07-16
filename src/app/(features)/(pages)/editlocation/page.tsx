"use client";

import Link from "next/link";
import { useState } from "react";

export default function EditLocationPage() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    country: "United States",
    addressLine1: "",
    addressLine2: "",
    city: "",
    region: "Alabama",
    zipCode: "",
    email: "",
    phone: "",
    language: "English (US)",
    timezone: "Default",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="fw-bold">Edit Location</h4>
          <div>
            <Link href="/locationslist" className="btn btn-light me-2">
              Cancel
            </Link>
            <button className="btn btn-dark me-2">Edit To Sellers</button>

            <button className="btn btn-dark">Save</button>
          </div>
        </div>
        
        <div className="card mb-4">
          <div className="card-header fw-bold">Address</div>
          <div className="card-body row g-3">
            <div className="col-md-6">
              <label className="form-label">Name *</label>
              <input type="text" name="name" className="form-control" onChange={handleChange} />
            </div>
            <div className="col-md-6">
              <label className="form-label">Description</label>
              <input type="text" name="description" className="form-control" onChange={handleChange} />
            </div>
            <div className="col-md-6">
              <label className="form-label">Country *</label>
              <select name="country" className="form-select" onChange={handleChange} value={formData.country}>
                <option>United States</option>
                <option>India</option>
                <option>UK</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">Address Line 1 *</label>
              <input type="text" name="addressLine1" className="form-control" onChange={handleChange} />
            </div>
            <div className="col-md-6">
              <label className="form-label">Address Line 2</label>
              <input type="text" name="addressLine2" className="form-control" onChange={handleChange} />
            </div>
            <div className="col-md-4">
              <label className="form-label">City *</label>
              <input type="text" name="city" className="form-control" onChange={handleChange} />
            </div>
            <div className="col-md-4">
              <label className="form-label">County / Region *</label>
              <select name="region" className="form-select" onChange={handleChange} value={formData.region}>
                <option>Alabama</option>
                <option>California</option>
                <option>Karnataka</option>
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label">Postcode / Zip Code *</label>
              <input type="text" name="zipCode" className="form-control" onChange={handleChange} />
            </div>
          </div>
        </div>
        <div className="card mb-4">
          <div className="card-header fw-bold">Contact Information</div>
          <div className="card-body row g-3">
            <div className="col-md-6">
              <label className="form-label">Email Address</label>
              <input type="email" name="email" className="form-control" onChange={handleChange} />
            </div>
            <div className="col-md-6">
              <label className="form-label">Phone Number</label>
              <input type="text" name="phone" className="form-control" onChange={handleChange} placeholder="+91" />
            </div>
          </div>
        </div>
        <div className="card mb-4">
          <div className="card-header fw-bold">Locale</div>
          <div className="card-body row g-3">
            <div className="col-md-6">
              <label className="form-label">Language</label>
              <select name="language" className="form-select" onChange={handleChange} value={formData.language}>
                <option>English (US)</option>
                <option>English (UK)</option>
                <option>Hindi</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">Time Zone</label>
              <select name="timezone" className="form-select" onChange={handleChange} value={formData.timezone}>
                <option>Default</option>
                <option>Asia/Kolkata</option>
                <option>America/New_York</option>
              </select>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-end mb-5">
          <Link href="/locationslist" className="btn btn-light me-2">
            Cancel
          </Link>
          
         <button className="btn btn-dark me-2">Edit To Sellers</button>
        <button className="btn btn-dark">Save</button>
        </div>
      </div>
    </div>
  );
}
