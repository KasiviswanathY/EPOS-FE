"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { useRouter } from "next/navigation";
import { createLocations } from "@/lib/redux/actions/createLocation";

import axios from "axios";
import { useForm } from "react-hook-form";
import { getAllCompanies } from "@/lib/redux/actions/companiesActions";
import { updateCompanyState } from "@/lib/redux/slices/companySlice";
import { Locations } from "@/core/interfaces/Locations";

interface Country {
  name: string;
  iso2: string;
}

interface State {
  name: string;
}

type LocationFormValues = Omit<Locations, "id" | "companyId" | "status" | "address"> & {
  addressLine1: string;
  addressLine2?: string;
  region: string;
  zipCode: string;
};

export default function AddLocationPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const company = useSelector((state: RootState) => state.company.company);

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
      language: "English (US)",
      timeZone: "Default",
    },
  });

  const selectedCountry = watch("country");

  // Ensure company is loaded
  useEffect(() => {
    if (!company) {
      dispatch(getAllCompanies()).then((res) => {
        if (res.payload && res.payload.length > 0) {
          dispatch(updateCompanyState(res.payload[0])); // ✅ store first company
        }
      });
    }
  }, [dispatch, company]);

  // Fetch countries
  useEffect(() => {
    async function fetchCountries() {
      try {
        const res = await axios.get("https://countriesnow.space/api/v0.1/countries/positions");
        if (res.data?.data) {
          const countryList = res.data.data.map((c: any) => ({
            name: c.name,
            iso2: c.iso2,
          }));
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
        const res = await axios.post("https://countriesnow.space/api/v0.1/countries/states", {
          country: selectedCountry,
        });
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
    if (!company) {
      console.error("❌ No company found, cannot assign companyId");
      return;
    }

    const payload: Locations = {
      id: "", // backend will generate
      name: data.name,
      description: data.description,
      address: `${data.addressLine1} ${data.addressLine2 || ""}`.trim(),
      city: data.city,
      country: data.country,
      pincode: data.zipCode,
      status: "ACTIVE",
      email: data.email,
      phone: data.phone,
      language: data.language,
      timeZone: data.timeZone,
      companyId: company.id, // ✅ auto-attached from companySlice
    };

    try {
      await dispatch(createLocations(payload)).unwrap();
      router.push("/locationslist");
    } catch (err) {
      console.error("Error creating location:", err);
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

        <form onSubmit={handleSubmit(onSubmit)}>
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
                {errors.name && <small className="text-danger">{errors.name.message}</small>}
              </div>
              <div className="col-md-6">
                <label className="form-label">Description</label>
                <input type="text" className="form-control" {...register("description")} />
              </div>
              <div className="col-md-6">
                <label className="form-label">Country *</label>
                <select className="form-select" {...register("country", { required: true })}>
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
                  {...register("addressLine1", { required: "Address is required" })}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Address Line 2</label>
                <input type="text" className="form-control" {...register("addressLine2")} />
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
                <select className="form-select" {...register("region", { required: true })}>
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
                <input type="email" className="form-control" {...register("email")} />
              </div>
              <div className="col-md-6">
                <label className="form-label">Phone Number</label>
                <input type="text" className="form-control" {...register("phone")} placeholder="+91" />
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
                <select className="form-select" {...register("timeZone")}>
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
