"use client";
import { useState } from "react";

export default function CompanySettings() {
  const [companyName, setCompanyName] = useState("");
  const [taxNumber, setTaxNumber] = useState("");
  const [currency, setCurrency] = useState("Dollar ($)");
  const [language, setLanguage] = useState("English (US)");

  const [settings, setSettings] = useState({
    updateCostPrice: true,
    captureConsent: false,
    eraseCustomer: false,
    skipInitialReports: true,
    showIncExc: true,
    startupInstructions: true,
  });

  const guid = "1234-5678-ABCD-EFGH";
  const devices = 1;
  const locations = 1;

  const handleCheckbox = (key: string) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev],
    }));
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="card">
          <div className="card-header fw-bold">
            Company: <span className="text-muted">{companyName}</span>
          </div>

          <div className="card-body">
            <h5 className="mb-4">Company Information</h5>
            <form>

              
              <div className="row align-items-center mb-3">
                <label className="col-sm-3 col-form-label text-end">Company Name</label>
                <div className="col-sm-6">
                  <input
                    type="text"
                    className="form-control"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </div>
              </div>

              
              <div className="row align-items-center mb-3">
                <label className="col-sm-3 col-form-label text-end">Tax Number</label>
                <div className="col-sm-6">
                  <input
                    type="text"
                    className="form-control"
                    value={taxNumber}
                    onChange={(e) => setTaxNumber(e.target.value)}
                  />
                </div>
              </div>

              
              <div className="row align-items-center mb-3">
                <label className="col-sm-3 col-form-label text-end">Custom Currency</label>
                <div className="col-sm-6">
                  <select className="form-select" value={currency} onChange={(e) => setCurrency(e.target.value)}>
                    <option>Dollar ($)</option>
                    <option>Euro (€)</option>
                    <option>Pound (£)</option>
                  </select>
                </div>
              </div>

             
              <div className="row align-items-center mb-4">
                <label className="col-sm-3 col-form-label text-end">UI Language</label>
                <div className="col-sm-6">
                  <select className="form-select" value={language} onChange={(e) => setLanguage(e.target.value)}>
                    <option>English (US)</option>
                    <option>English (UK)</option>
                    <option>French</option>
                    <option>German</option>
                  </select>
                </div>
              </div>

             
              <div className="row mb-4">
                <div className="offset-sm-3 col-sm-9">
                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="updateCostPrice"
                      checked={settings.updateCostPrice}
                      onChange={() => handleCheckbox("updateCostPrice")}
                    />
                    <label className="form-check-label" htmlFor="updateCostPrice">
                      Update Cost Price of Products when Master Product Cost Prices are updated
                    </label>
                  </div>

                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="captureConsent"
                      checked={settings.captureConsent}
                      onChange={() => handleCheckbox("captureConsent")}
                    />
                    <label className="form-check-label" htmlFor="captureConsent">
                      Show fields to capture explicit consent at customer signup
                    </label>
                  </div>

                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="eraseCustomer"
                      checked={settings.eraseCustomer}
                      onChange={() => handleCheckbox("eraseCustomer")}
                    />
                    <label className="form-check-label" htmlFor="eraseCustomer">
                      Erase customer personal information on delete customer <strong>WARNING! This data cannot be recovered</strong>
                    </label>
                  </div>

                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="skipInitialReports"
                      checked={settings.skipInitialReports}
                      onChange={() => handleCheckbox("skipInitialReports")}
                    />
                    <label className="form-check-label" htmlFor="skipInitialReports">
                      Do not run reports on initial page load
                    </label>
                  </div>

                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="showIncExc"
                      checked={settings.showIncExc}
                      onChange={() => handleCheckbox("showIncExc")}
                    />
                    <label className="form-check-label" htmlFor="showIncExc">
                      Show Inc/Exc Tax Option
                    </label>
                  </div>

                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="startupInstructions"
                      checked={settings.startupInstructions}
                      onChange={() => handleCheckbox("startupInstructions")}
                    />
                    <label className="form-check-label" htmlFor="startupInstructions">
                      Show instructions on startup (Dashboard)
                    </label>
                  </div>
                </div>
              </div>

              
              <div className="row align-items-center mb-3">
                <label className="col-sm-3 col-form-label text-end">Maximum Number of Devices</label>
                <div className="col-sm-6 pt-1">
                  <span>{devices}</span>
                </div>
              </div>

            
              <div className="row align-items-center mb-3">
                <label className="col-sm-3 col-form-label text-end">Max Number of Locations</label>
                <div className="col-sm-6 pt-1">
                  <span>{locations}</span>
                </div>
              </div>

              <div className="row align-items-center mb-3">
                <label className="col-sm-3 col-form-label text-end">GUID</label>
                <div className="col-sm-6 pt-1">
                  <span className="text-muted">{guid}</span>
                </div>
              </div>
            </form>
          </div>
          <div className="card-footer d-flex justify-content-between">
            <button className="btn btn-danger">CANCEL</button>
            <button className="btn btn-success">SAVE</button>
          </div>
        </div>
      </div>
    </div>
  );
}
