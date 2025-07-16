"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddSupplierPage() {
  const router = useRouter();

  const [supplier, setSupplier] = useState({
    name: "",
    description: "",
    type: "",
    address1: "",
    address2: "",
    town: "",
    state: "",
    zip: "",
    contact1: "",
    contact2: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSupplier((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log("Submitted supplier:", supplier);
    router.push("/suppliers");
  };

  const handleAddAnother = () => {
    console.log("Add Another Supplier:", supplier);
    setSupplier({
      name: "",
      description: "",
      type: "",
      address1: "",
      address2: "",
      town: "",
      state: "",
      zip: "",
      contact1: "",
      contact2: "",
      email: "",
    });
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header d-flex justify-content-between align-items-center">
          <h4> Add a Supplier </h4>
        </div>
      <div className="card">
        <div className="card-body">
          <form>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Name</label>
                <input type="text" name="name" className="form-control" value={supplier.name} onChange={handleChange} />
              </div>
              <div className="col-md-6">
                <label className="form-label">Description</label>
                <input type="text" name="description" className="form-control" value={supplier.description} onChange={handleChange} />
              </div>
              <div className="col-md-6">
                <label className="form-label">Type</label>
                <input type="text" name="type" className="form-control" value={supplier.type} onChange={handleChange} />
              </div>
              <div className="col-md-6" />
              <div className="col-md-6">
                <label className="form-label">Address Line 1</label>
                <input type="text" name="address1" className="form-control" value={supplier.address1} onChange={handleChange} />
              </div>
              <div className="col-md-6">
                <label className="form-label">Address Line 2</label>
                <input type="text" name="address2" className="form-control" value={supplier.address2} onChange={handleChange} />
              </div>
              <div className="col-md-4">
                <label className="form-label">Town</label>
                <input type="text" name="town" className="form-control" value={supplier.town} onChange={handleChange} />
              </div>
              <div className="col-md-4">
                <label className="form-label">State</label>
                <input type="text" name="state" className="form-control" value={supplier.state} onChange={handleChange} />
              </div>
              <div className="col-md-4">
                <label className="form-label">Zip Code</label>
                <input type="text" name="zip" className="form-control" value={supplier.zip} onChange={handleChange} />
              </div>
              <div className="col-md-6">
                <label className="form-label">Contact Number</label>
                <input type="text" name="contact1" className="form-control" value={supplier.contact1} onChange={handleChange} />
              </div>
              <div className="col-md-6">
                <label className="form-label">Contact Number 2</label>
                <input type="text" name="contact2" className="form-control" value={supplier.contact2} onChange={handleChange} />
              </div>
              <div className="col-md-12">
                <label className="form-label">Email Address</label>
                <input type="email" name="email" className="form-control" value={supplier.email} onChange={handleChange} />
              </div>
            </div>
          </form>
        </div>

        <div className="card-footer d-flex justify-content-between">
          <button className="btn btn-danger" onClick={() => router.push("/suppliers")}>CANCEL</button>
          <div>
            <button className="btn btn-success me-2" onClick={handleAddAnother}>ADD ANOTHER</button>
            <button className="btn btn-success" onClick={handleSubmit}>ADD</button>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
