"use client";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/redux/store";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { updateCompanyState } from "@/lib/redux/slices/companySlice";
import { Company } from "@/core/interfaces/Company";
import {
  createCompany,
  getAllCompanies,
  updateCompany,
} from "@/lib/redux/actions/companiesActions";
import { getErrorMessage } from "@/core/utils";

export default function CompanySettings() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Company>();

  const [companies, setCompanies] = useState<Company[]>([]);
  const [companyId, setCompanyId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [isCreating, setIsCreating] = useState(false); // 👈 NEW state for Create flow

  const [devices] = useState(1);
  const [locations] = useState(1);
  const guid = "1234-5678-ABCD-EFGH";
  const router = useRouter();

  // Fetch companies for dropdown only
  useEffect(() => {
    setIsLoading(true);
    dispatch(getAllCompanies())
      .then((res: { payload: any; }) => {
        setCompanies(res.payload || []);
        setError(null);
      })
      .catch((err: string | object | null) => setError(getErrorMessage(err)))
      .finally(() => setIsLoading(false));
  }, [dispatch]);

  // When a company is selected, load its details
  const handleSelectCompany = (id: string) => {
    setCompanyId(id);
    setIsCreating(false); // hide create form if user selects from dropdown
    const selected = companies.find((c) => c.id === id);
    if (selected) {
      dispatch(updateCompanyState(selected));
      reset(selected);
    }
  };

  const onSubmit = (data: Company) => {
    const payload = {
      name: data.name,
      taxNumber: data.taxNumber,
      customCurrency: data.customCurrency,
      language: data.language,
      updateCostPriceOnMasterUpdate:
        data.updateCostPriceOnMasterUpdate || false,
      explicitConsent: data.explicitConsent || false,
      eraseCustomerData: data.eraseCustomerData || false,
      runReportsOnPageLoad: data.runReportsOnPageLoad || false,
      showIncExTaxOption: data.showIncExTaxOption || false,
      maxNoOfDevices: devices,
      maxNoOfLocations: locations,
      showInstructionsOnStartup: data.showInstructionsOnStartup || false,
    };

    setSaving(true);

    if (companyId) {
      // PATCH flow
      dispatch(updateCompany({ id: companyId, data: payload }))
        .unwrap()
        .then(async () => {
          const res = await dispatch(getAllCompanies()).unwrap();
          setCompanies(res);
          const updated = res.find((c: Company) => c.id === companyId);
          if (updated) reset(updated);
        })
        .catch((err: string | object | null) => setError(getErrorMessage(err)))
        .finally(() => setSaving(false));
    } else {
      // POST flow
      dispatch(createCompany(payload))
        .then((res: { payload: Company; }) => {
          if (res?.payload?.id) {
            setCompanies((prev) => [...prev, res.payload]);
            setCompanyId(res.payload.id);
            setIsCreating(false);
            router.refresh?.();
            if (!router.refresh) window.location.reload();
          }
        })
        .finally(() => setSaving(false));
    }
  };

  const handleCancel = () => {
    if (isCreating) {
      setIsCreating(false);
      reset();
    } else {
      router.push("/index");
    }
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="card">
          <div className="card-header fw-bold">Company Settings</div>
          <div className="card-body">
            {isLoading ? (
              <div className="text-center py-4">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-2">Loading companies...</p>
              </div>
            ) : error ? (
              <div className="alert alert-danger">
                <strong>Error:</strong> {error}
              </div>
            ) : (
              <>
                {/* If NO companies exist */}
                {companies.length === 0 && !isCreating && (
                  <div className="text-center py-4">
                    <p>No companies found.</p>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        setIsCreating(true);
                        reset(); // clear form
                      }}
                    >
                      Create Company
                    </button>
                  </div>
                )}

                {/* If companies exist, show dropdown */}
                {companies.length > 0 && !isCreating && (
                  <div className="row align-items-center mb-4">
                    <label className="col-sm-3 col-form-label text-end">
                      Select Company
                    </label>
                    <div className="col-sm-6 d-flex gap-3">
                      <select
                        className="form-select"
                        value={companyId || ""}
                        onChange={(e) => handleSelectCompany(e.target.value)}
                      >
                        <option value="">-- Select a Company --</option>
                        {companies.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => {
                          setCompanyId(null);
                          setIsCreating(true);
                          reset();
                        }}
                      >
                        + Create New
                      </button>
                    </div>
                  </div>
                )}

                {/* Show the form only if creating OR company is selected */}
                {(isCreating || companyId) && (
                  <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Basic Fields */}
                    {(
                      [
                        {
                          label: "Company Name",
                          name: "name" as keyof Company,
                        },
                        {
                          label: "Tax Number",
                          name: "taxNumber" as keyof Company,
                        },
                      ] as const
                    ).map((field) => (
                      <div
                        className="row align-items-center mb-3"
                        key={field.name}
                      >
                        <label className="col-sm-3 col-form-label text-end">
                          {field.label}
                        </label>
                        <div className="col-sm-6">
                          <input
                            {...register(field.name, {
                              required: field.name === "name",
                            })}
                            className="form-control"
                            type="text"
                          />
                          {errors[field.name] && (
                            <small className="text-danger">
                              This field is required
                            </small>
                          )}
                        </div>
                      </div>
                    ))}

                    {/* Currency */}
                    <div className="row align-items-center mb-3">
                      <label className="col-sm-3 col-form-label text-end">
                        Custom Currency
                      </label>
                      <div className="col-sm-6">
                        <select
                          className="form-select"
                          {...register("customCurrency", { required: true })}
                        >
                          <option value="Dollar ($)">Dollar ($)</option>
                          <option value="Euro (€)">Euro (€)</option>
                          <option value="Pound (£)">Pound (£)</option>
                        </select>
                      </div>
                    </div>

                    {/* Language */}
                    <div className="row align-items-center mb-3">
                      <label className="col-sm-3 col-form-label text-end">
                        Language
                      </label>
                      <div className="col-sm-6">
                        <select
                          className="form-select"
                          {...register("language", { required: true })}
                        >
                          <option value="en">English (US)</option>
                          <option value="en-uk">English (UK)</option>
                          <option value="fr">French</option>
                          <option value="de">German</option>
                        </select>
                      </div>
                    </div>

                    {/* Checkboxes */}
                    {(
                      [
                        {
                          name: "updateCostPriceOnMasterUpdate",
                          label: "Update cost price on master update",
                        },
                        {
                          name: "explicitConsent",
                          label: "Capture explicit consent on signup",
                        },
                        {
                          name: "eraseCustomerData",
                          label: "Erase customer data on delete",
                        },
                        {
                          name: "runReportsOnPageLoad",
                          label: "Run reports on page load",
                        },
                        {
                          name: "showIncExTaxOption",
                          label: "Show inclusive/exclusive tax option",
                        },
                        {
                          name: "showInstructionsOnStartup",
                          label: "Show instructions on startup",
                        },
                      ] as const
                    ).map((checkbox) => (
                      <div className="row mb-2" key={checkbox.name}>
                        <div className="offset-sm-3 col-sm-9">
                          <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              {...register(checkbox.name as keyof Company)}
                            />
                            <label className="form-check-label">
                              {checkbox.label}
                            </label>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Readonly Fields */}
                    <div className="row align-items-center mb-3">
                      <label className="col-sm-3 col-form-label text-end">
                        Max Devices
                      </label>
                      <div className="col-sm-6 pt-1">{devices}</div>
                    </div>
                    <div className="row align-items-center mb-3">
                      <label className="col-sm-3 col-form-label text-end">
                        Max Locations
                      </label>
                      <div className="col-sm-6 pt-1">{locations}</div>
                    </div>
                    <div className="row align-items-center mb-3">
                      <label className="col-sm-3 col-form-label text-end">
                        GUID
                      </label>
                      <div className="col-sm-6 pt-1 text-muted">{guid}</div>
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
                      <button
                        type="submit"
                        className="btn btn-success"
                        disabled={saving}
                      >
                        {saving ? (
                          <>
                            <span
                              className="spinner-border spinner-border-sm me-2"
                              role="status"
                            />
                            Saving...
                          </>
                        ) : (
                          "SAVE"
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
