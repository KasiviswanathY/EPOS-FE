"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import Select from "react-select";
import { ArrowLeft } from "feather-icons-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { getRoles } from "@/lib/redux/actions/createRoles";
import { getLocations } from "@/lib/redux/actions/createLocation";
import { createstaff } from "@/lib/redux/actions/createStaff";


export default function EditStaff() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const { roles, Locations, token, loadingCreate, success } = useSelector(
    (state: RootState) => state.app
  );

  const [form, setForm] = useState({
    name: "",
    mainLocation: null as any,
    role: null as any,
    passcode: "",
    swipeLogin: "",
    hourlyRate: "",
    availableForAllLocations: false,
  });

  // === Fetch roles & locations on mount ===
  useEffect(() => {
    if (token) {
      dispatch(getRoles({ token }));
      dispatch(getLocations({ token }));
    }
  }, [dispatch, token]);

  // === Handle submit ===
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.role || !form.mainLocation) {
      alert("Please select Role and Main Location");
      return;
    }

    const payload = {
      name: form.name,
      status: "ACTIVE",
      availableForAllLocations: form.availableForAllLocations,
      passcode: form.passcode,
      swipeLogin: form.swipeLogin,
      hourlyRate: Number(form.hourlyRate) || 0,
      isDeleted: false,
      roleId: form.role.value, // backend expects roleId
      mainLocationId: form.mainLocation.value, // backend expects mainLocationId
    };

    await dispatch(createstaff({ payload, token }));

    router.push("/employees-grid");
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header d-flex align-items-center justify-content-between">
          <div>
            <h4>Edit a Member of Staff</h4>
            <h6 className="text-muted">Add staff details</h6>
          </div>

          <div className="page-btn">
            <Link href="/employees-grid" className="btn btn-secondary">
              <ArrowLeft className="me-2" />
              Back to List
            </Link>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="card border">
            <div className="card-header bg-light fw-semibold">Staff</div>

            <div className="card-body">
              {/* Name */}
              <div className="mb-3 row align-items-center">
                <label className="col-sm-3 col-form-label">Name</label>
                <div className="col-sm-9">
                  <input
                    className="form-control"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </div>
              </div>

              {/* Main Location */}
              <div className="mb-3 row align-items-center">
                <label className="col-sm-3 col-form-label">Main Location</label>
                <div className="col-sm-9">
                  <Select
                    options={Locations.map((loc) => ({
                      value: loc.id,
                      label: loc.name,
                    }))}
                    value={form.mainLocation}
                    placeholder="Select location..."
                    onChange={(v) => setForm({ ...form, mainLocation: v })}
                  />
                </div>
              </div>

              {/* Available for All Locations */}
              <div className="mb-3 row">
                <label className="col-sm-3 col-form-label">
                  Available for All Locations
                </label>
                <div className="col-sm-9 d-flex align-items-center">
                  <input
                    type="checkbox"
                    className="form-check-input me-2"
                    checked={form.availableForAllLocations}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        availableForAllLocations: e.target.checked,
                      })
                    }
                  />
                </div>
              </div>

              {/* Role */}
              <div className="mb-3 row align-items-center">
                <label className="col-sm-3 col-form-label">Role</label>
                <div className="col-sm-9">
                  <Select
                    options={roles.map((r) => ({
                      value: r.id,
                      label: r.name,
                    }))}
                    value={form.role}
                    placeholder="Select role..."
                    onChange={(v) => setForm({ ...form, role: v })}
                  />
                  <small className="text-muted">
                    Staff must have a role with Till access to show on Till
                  </small>
                </div>
              </div>

              {/* Passcode */}
              <div className="mb-3 row align-items-center">
                <label className="col-sm-3 col-form-label">Passcode</label>
                <div className="col-sm-9">
                  <input
                    className="form-control"
                    value={form.passcode}
                    onChange={(e) =>
                      setForm({ ...form, passcode: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Swipe Login */}
              <div className="mb-3 row align-items-center">
                <label className="col-sm-3 col-form-label">Swipe Login</label>
                <div className="col-sm-9">
                  <input
                    className="form-control"
                    value={form.swipeLogin}
                    onChange={(e) =>
                      setForm({ ...form, swipeLogin: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Hourly Rate */}
              <div className="mb-3 row align-items-center">
                <label className="col-sm-3 col-form-label">Hourly Rate</label>
                <div className="col-sm-9">
                  <input
                    type="number"
                    step="0.01"
                    className="form-control"
                    value={form.hourlyRate}
                    onChange={(e) =>
                      setForm({ ...form, hourlyRate: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="text-end mt-4">
            <Link href="/employees-grid" className="btn btn-secondary me-2">
              Cancel
            </Link>
            <button
              className="btn btn-primary"
              type="submit"
              disabled={loadingCreate}
            >
              {loadingCreate ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
