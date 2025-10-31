"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { useRouter } from "next/navigation";

import axios from "axios";
import { useForm } from "react-hook-form";
import { getAllCompanies } from "@/lib/redux/actions/companiesActions";
import { createLocation } from "@/lib/redux/actions/locationsActions";

interface Country {
  name: string;
  iso2: string;
}

interface State {
  name: string;
}

interface LocationFormValues {
  name: string;
  description: string;
  companyId: string;
  country: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  region: string;
  zipCode: string;
  email?: string;
  phone?: string;
  language: string;
  timezone: string;
}

export default function AddLocationPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { company, companies } = useSelector(
    (state: RootState) => state.company
  );

  const [countries, setCountries] = useState<Country[]>([]);
  const [states, setStates] = useState<State[]>([]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<LocationFormValues>({
    defaultValues: {
      companyId: company?.id || "",
      language: "English (US)",
      timezone: "Default",
    },
  });

  const selectedCountry = watch("country");

  useEffect(() => {
    dispatch(getAllCompanies()).catch((error) => {
      console.error("Error fetching companies:", error);
    });
  }, []);

  useEffect(() => {
    async function fetchCountries() {
      try {
        const res = await axios.get(
          "https://countriesnow.space/api/v0.1/countries/positions"
        );
        if (res.data?.data) {
          const countryList = res.data.data.map(
            (c: { name: string; iso2: string }) => ({
              name: c.name,
              iso2: c.iso2,
            })
          );
          setCountries(countryList);
          if (countryList.length > 0) {
            setValue("country", countryList[0].name);
          }
        }
      } catch (err) {
        console.error("Error fetching countries:", err);
      }
    }
    fetchCountries();
  }, [setValue]);

  // Fetch states when country changes
  useEffect(() => {
    async function fetchStates() {
      if (!selectedCountry) return;
      try {
        const res = await axios.post(
          "https://countriesnow.space/api/v0.1/countries/states",
          { country: selectedCountry }
        );
        if (res.data?.data?.states) {
          setStates(res.data.data.states);
          if (res.data.data.states.length > 0) {
            setValue("region", res.data.data.states[0].name);
          }
        }
      } catch (err) {
        console.error("Error fetching states:", err);
      }
    }
    fetchStates();
  }, [selectedCountry, setValue]);

  const onSubmit = async (data: LocationFormValues) => {
    if (!data.companyId) {
      alert("Please select a company.");
      return;
    }

    const payload = {
      name: data.name,
      address: `${data.addressLine1} ${data.addressLine2 || ""}`.trim(),
      city: data.city,
      country: data.country,
      pincode: data.zipCode,
      description: data.description,
      status: "ACTIVE" as const,
      email: data.email || "",
      phone: data.phone || "",
      language: data.language,
      timeZone: data.timezone,
      companyId: data.companyId,
    };

    try {
      await dispatch(createLocation(payload)).unwrap();
      router.push("/locationslist");
    } catch (err) {
      console.error("Error creating location:", err);
      alert("Failed to create location. Please try again.");
    }
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="fw-bold">Add Location</h4>
          <div>
            <Link href="/locationslist" className="btn btn-light me-2">
              Cancel
            </Link>
            <button className="btn btn-dark" onClick={handleSubmit(onSubmit)}>
              Save
            </button>
          </div>
        </div>

        {/* Info Banner */}
        <div className="alert alert-primary d-flex justify-content-between align-items-center">
          <div>
            <strong>Add a billable location</strong>
            <br />
            You&apos;ve reached your limit of 1 of 1 billable locations. Contact
            support to add more.
          </div>
          <div>
            <button className="btn btn-link">Dismiss</button>
            <button className="btn btn-link">Support</button>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Company Selection */}
          <div className="card mb-4">
            <div className="card-header fw-bold">Company Information</div>
            <div className="card-body">
              <div className="col-md-6">
                <label className="form-label">Select Company *</label>
                <select
                  className="form-select"
                  {...register("companyId", {
                    required: "Please select a company",
                  })}
                >
                  <option value="">Select a company...</option>
                  {!companies.length && <option value="">Loading...</option>}
                  {companies.map((comp) => (
                    <option key={comp.id} value={comp.id}>
                      {comp.name}
                    </option>
                  ))}
                </select>
                {errors.companyId && (
                  <small className="text-danger">
                    {errors.companyId.message}
                  </small>
                )}
              </div>
            </div>
          </div>

          {/* Address Section */}
          <div className="card mb-4">
            <div className="card-header fw-bold">Address</div>
            <div className="card-body row g-3">
              <div className="col-md-6">
                <label className="form-label">Name *</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && (
                  <small className="text-danger">{errors.name.message}</small>
                )}
              </div>
              <div className="col-md-6">
                <label className="form-label">Description</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("description")}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Country *</label>
                <select
                  className="form-select"
                  {...register("country", { required: true })}
                >
                  {countries.map((c) => (
                    <option key={c.iso2} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">Address Line 1 *</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("addressLine1", {
                    required: "Address is required",
                  })}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Address Line 2</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("addressLine2")}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">City *</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("city", { required: "City is required" })}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">County / Region *</label>
                <select
                  className="form-select"
                  {...register("region", { required: true })}
                >
                  {states.map((s, idx) => (
                    <option key={idx} value={s.name}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label">Postcode / Zip Code *</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("zipCode", { required: "Zip code is required" })}
                />
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="card mb-4">
            <div className="card-header fw-bold">Contact Information</div>
            <div className="card-body row g-3">
              <div className="col-md-6">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  {...register("email")}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Phone Number</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("phone")}
                  placeholder="+91"
                />
              </div>
            </div>
          </div>

          {/* Locale Section */}
          <div className="card mb-4">
            <div className="card-header fw-bold">Locale</div>
            <div className="card-body row g-3">
              <div className="col-md-6">
                <label className="form-label">Language</label>
                <select className="form-select" {...register("language")}>
                  <option>English (US)</option>
                  <option>English (UK)</option>
                  <option>Hindi</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">Time Zone</label>
                <select className="form-select" {...register("timezone")}>
                  <option>Default</option>
                  <option>Asia/Kolkata</option>
                  <option>America/New_York</option>
                </select>
              </div>
            </div>
          </div>

          {/* Bottom Save Buttons */}
          <div className="d-flex justify-content-end mb-5">
            <Link href="/locationslist" className="btn btn-light me-2">
              Cancel
            </Link>
            <button type="submit" className="btn btn-dark">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
