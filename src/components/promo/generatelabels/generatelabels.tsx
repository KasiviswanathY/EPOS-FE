"use client";
import { useState } from "react";

export default function GenerateLabels() {
  const [search, setSearch] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [supplier, setSupplier] = useState("");
  const [preset, setPreset] = useState("Barcode");
  const [details, setDetails] = useState<string[]>(["Price (Inc. Tax)", "Brand", "Barcode"]);
  const [printer, setPrinter] = useState("");

  const handleCheckboxChange = (label: string) => {
    setDetails((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  return (
    <div className="page-wrapper">
      <div className="content">

        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="fw-bold mb-0">Generate Labels</h4>
        </div>
        <div className="card mb-4">
          <div className="card-body">
            <p>To print a label, select the product by either scanning the barcode or typing the name and searching for the product, and amend the quantities.</p>
            <p>You have various options to generate labels. You can search for the product and enter a quantity, or use dropdowns to generate labels by Location, Category, Brand or Supplier. <strong>Only</strong> products with stock levels attached will show when a location is selected.</p>
            <p><strong>Click "Generate Labels"</strong> when all products have been added.</p>
            <p>Label printing requires a thermal label printer or A4 format with Avery 5160. Select proper printer type and set margins to 0 if needed.</p>
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Search for Product by Name or Barcode:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter product name or barcode"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="mb-4 d-flex align-items-center">
          <label className="form-label me-3 mb-0">Quantity to Print:</label>
          <button className="btn btn-outline-secondary me-2" onClick={() => setQuantity((prev) => Math.max(prev - 1, 0))}>-</button>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            className="form-control w-auto me-2"
            style={{ width: "80px" }}
          />
          <button className="btn btn-outline-secondary" onClick={() => setQuantity((prev) => prev + 1)}>+</button>
        </div>

        <hr />
        <div className="text-center mb-3"><strong>OR</strong></div>
        <div className="mb-3">
          <label className="form-label">For all Stock at</label>
          <select className="form-select" value={location} onChange={(e) => setLocation(e.target.value)}>
            <option value="">Select Location</option>
            <option value="Main Store">Main Store</option>
            <option value="Outlet">Outlet</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">For all Products of (Category)</label>
          <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select Category</option>
            <option value="Beverages">Beverages</option>
            <option value="Snacks">Snacks</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">For all Products of (Brand)</label>
          <select className="form-select" value={brand} onChange={(e) => setBrand(e.target.value)}>
            <option value="">Select Brand</option>
            <option value="Coca Cola">Coca Cola</option>
            <option value="Pepsi">Pepsi</option>
          </select>
        </div>
        <div className="mb-4">
           <label className="form-label">For all Products of (Supplier)</label>
          <select className="form-select" value={supplier} onChange={(e) => setSupplier(e.target.value)}>
         <option value="">Select Supplier</option>
        <option value="Local">Local</option>
        <option value="International">International</option>
        </select>
       </div>
<div className="card p-3 mb-3">
  <p className="mb-0">
    Use the options below to stylise your labels using the presets or a your own custom definition. Options selected for custom labels are remembered and will be available each time you return to this page. You can preview your labels before you generate and print them using the 'preview' button below.
  </p>
</div>
<div className="text-end mb-4">
  <button className="btn btn-primary">INSERT</button>
</div>
<div className="card mb-3">
<div className="card-body">
<label className="form-label mb-2 fw-bold">Preset</label>
<div className="form-check">
{["Shelf Edge", "Barcode", "Butterfly", "Custom"].map((option) => (
<div className="form-check form-check-inline" key={option}>
<input
         className="form-check-input"
         type="radio"
         name="preset"
         checked={preset === option}
        onChange={() => setPreset(option)}
        />
<label className="form-check-label">{option}</label>
</div>
 ))}
</div>
</div>
 </div>
        <div className="card mb-4">
          <div className="card-body">
            <label className="form-label fw-bold">Details to Print</label>
            <div className="row">
              {[
                "Name", "Price (Inc. Tax)", "Description", "Price (Ex. Tax)",
                "Category", "RRP", "Brand", "Units", "Barcode",
                "Promotion", "Order Code", "Custom Font Size", "Custom Text"
              ].map((label) => (
                <div className="col-md-3" key={label}>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={details.includes(label)}
                      onChange={() => handleCheckboxChange(label)}
                    />
                    <label className="form-check-label">{label}</label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="row align-items-end mb-4">
          <div className="col-md-10 d-flex align-items-end">
            <div className="w-100">
              <label className="form-label me-3 mb-0">Printer:</label>
              <select
                className="form-select"
                style={{ height: 40 }}
                value={printer}
                onChange={(e) => setPrinter(e.target.value)}
              >
                <option value="">* Select Printer Type</option>
                <option value="A4 Printer">A4 Printer</option>
                <option value="Barcode Printer">Barcode Printer</option>
              </select>
            </div>
          </div>
          <div className="col-md-2 d-flex align-items-end justify-content-end">
            <button className="btn btn-info text-white w-100" style={{ height: 40 }}>PREVIEW</button>
          </div>
        </div>
        <div className="card mb-3">
          <div className="card-body">
            <table className="table table-bordered mb-0">
              <thead>
                <tr>
                  <th>PRODUCT</th>
                  <th>QUANTITY TO ADD</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={2}>Scan or look up an item using the search box above</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="text-end">
          <button className="btn btn-success" style={{ height: 40 }}>GENERATE LABELS</button>
        </div>
      </div>
    </div>
  );
}
