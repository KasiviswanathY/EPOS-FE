"use client";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { createCompany, getCompany } from "@/lib/redux/actions/createCompany";
import { useEffect, useState } from "react";
import { updateCompany } from "@/lib/redux/actions/createCompany";
import router from "next/router";
import { all_routes } from "@/data/all_routes";
import { useRouter } from 'next/navigation';

export default function CompanySettings() {
  const dispatch = useDispatch<AppDispatch>();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const company = useSelector((state: RootState) => state.app.company);
  const [companyId, setCompanyId] = useState<string | null>(null);
  const [devices] = useState(1);
  const [locations] = useState(1);
  const guid = "1234-5678-ABCD-EFGH";
  const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

  // Load company data on mount
  useEffect(() => {
    if (token) {
      dispatch(getCompany({ token })).then((res: any) => {
        if (res?.payload) {
          setCompanyId(res.payload.id);
          Object.keys(res.payload).forEach((key) => {
            if (res.payload[key] !== null && res.payload[key] !== undefined) {
              setValue(key as any, res.payload[key]);
            }
          });
        }
      });
    }
  }, [dispatch, token, setValue]);

  const onSubmit = (data: any) => {
    if (!token) {
      alert("Token not found!");
      return;
    }
   

    const payload = {
      name: data.name,
      taxNumber: data.taxNumber,
      customCurrency: data.customCurrency,
      language: data.language,
      updateCostPriceOnMasterUpdate: data.updateCostPriceOnMasterUpdate || false,
      explicitConsent: data.explicitConsent || false,
      eraseCustomerData: data.eraseCustomerData || false,
      runReportsOnPageLoad: data.runReportsOnPageLoad || false,
      showIncExTaxOption: data.showIncExTaxOption || false,
      maxNoOfDevices: devices,
      maxNoOfLocations: locations,
      showInstructionsOnStartup: data.showInstructionsOnStartup || false,
    };

    if (companyId) {
      dispatch(updateCompany({ id: companyId, payload, token }));
    } else {
      dispatch(createCompany({ payload, token })).then((res: any) => {
        if (res?.payload?.id) setCompanyId(res.payload.id);
      });
    }
  };

const router = useRouter();

const handleCancel = () => {
  router.push('/index'); // Navigate to index or any route
};
 return (
    <div className="page-wrapper">
      <div className="content">
        <div className="card">
          <div className="card-header fw-bold">Company Settings</div>
          <div className="card-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Text Fields */}
              {[
                { label: "Company Name", name: "name" },
                // { label: "email", name: "email" },
                // { label: "Website", name: "website" },
                // { label: "Display Name", name: "displayName" },
                // { label: "Description", name: "description" },
                { label: "Tax Number", name: "taxNumber" },
              ].map((field) => (
                <div className="row align-items-center mb-3" key={field.name}>
                  <label className="col-sm-3 col-form-label text-end">{field.label}</label>
                  <div className="col-sm-6">
                    <input
                      {...register(field.name, { required: field.name !== "description" && field.name !== "taxNumber" })}
                      className="form-control"
                      type="text"
                    />
                    {errors[field.name] && (
                      <small className="text-danger">This field is required</small>
                    )}
                  </div>
                </div>
              ))}

              {/* Currency */}
              <div className="row align-items-center mb-3">
                <label className="col-sm-3 col-form-label text-end">Custom Currency</label>
                <div className="col-sm-6">
                  <select className="form-select" {...register("customCurrency", { required: true })}>
                    <option value="Dollar ($)">Dollar ($)</option>
                    <option value="Euro (€)">Euro (€)</option>
                    <option value="Pound (£)">Pound (£)</option>
                  </select>
                </div>
              </div>

              {/* Language */}
              <div className="row align-items-center mb-3">
                <label className="col-sm-3 col-form-label text-end">Language</label>
                <div className="col-sm-6">
                  <select className="form-select" {...register("language", { required: true })}>
                    <option value="en">English (US)</option>
                    <option value="en-uk">English (UK)</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                  </select>
                </div>
              </div>

              {/* Checkboxes */}
              {[
                { name: "updateCostPriceOnMasterUpdate", label: "Update cost price on master update" },
                { name: "explicitConsent", label: "Capture explicit consent on signup" },
                { name: "eraseCustomerData", label: "Erase customer data on delete" },
                { name: "runReportsOnPageLoad", label: "Run reports on page load" },
                { name: "showIncExTaxOption", label: "Show inclusive/exclusive tax option" },
                { name: "showInstructionsOnStartup", label: "Show instructions on startup" },
              ].map((checkbox) => (
                <div className="row mb-2" key={checkbox.name}>
                  <div className="offset-sm-3 col-sm-9">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        {...register(checkbox.name)}
                      />
                      <label className="form-check-label">{checkbox.label}</label>
                    </div>
                  </div>
                </div>
              ))}

              {/* Readonly Fields */}
              <div className="row align-items-center mb-3">
                <label className="col-sm-3 col-form-label text-end">Max Devices</label>
                <div className="col-sm-6 pt-1"><span>{devices}</span></div>
              </div>

              <div className="row align-items-center mb-3">
                <label className="col-sm-3 col-form-label text-end">Max Locations</label>
                <div className="col-sm-6 pt-1"><span>{locations}</span></div>
              </div>

              <div className="row align-items-center mb-3">
                <label className="col-sm-3 col-form-label text-end">GUID</label>
                <div className="col-sm-6 pt-1"><span className="text-muted">{guid}</span></div>
              </div>

              {/* Buttons */}
              <div className="card-footer d-flex justify-content-between">
                <button
                 type="button"
                 className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                 onClick={handleCancel}
               >
                 Cancel
               </button>

                <button type="submit" className="btn btn-success">SAVE</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}