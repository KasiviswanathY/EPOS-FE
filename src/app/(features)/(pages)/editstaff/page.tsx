"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { DatePicker } from "antd";
import Select from "react-select";
import { ArrowLeft } from "feather-icons-react";
async function getStaff(id: string) {
  // TODO: call your API here
  return {
    name: "Jagrut",
    mainLocation: "🏷️  Sample Location",
    additionalLocations: [],
    showAllLocations: false,
    role: "Manager",
    passcode: "****",
    swipeLogin: "",
    hourlyRate: "",
  };
}
const locations = [
  { value: "l1", label: "Sample Location" },
  { value: "l2", label: "Warehouse" },
];
const roles = [
  { value: "Manager", label: "Manager" },
  { value: "Cashier", label: "Cashier" },
];

export default function EditStaff() {
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: "",
    mainLocation: null as any,
    additionalLocations: [] as any[],
    showAllLocations: false,
    role: null as any,
    passcode: "",
    swipeLogin: "",
    hourlyRate: "",
  });
  useEffect(() => {
    (async () => {
      const data = await getStaff(params.id);
      setForm({
        name: data.name,
        mainLocation: locations.find((l) => l.label === data.mainLocation),
        additionalLocations: [],
        showAllLocations: data.showAllLocations,
        role: roles.find((r) => r.value === data.role),
        passcode: data.passcode,
        swipeLogin: data.swipeLogin,
        hourlyRate: data.hourlyRate,
      });
      setLoading(false);
    })();
  }, [params.id]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
   
    router.push("/employees-grid"); // back to list
  };

  if (loading) return <div className="p-6">Loading…</div>;

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
              <div className="mb-3 row align-items-center">
                <label className="col-sm-3 col-form-label">Name</label>
                <div className="col-sm-9">
                  <input
                    className="form-control"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
              </div>
              <div className="mb-3 row align-items-center">
                <label className="col-sm-3 col-form-label">Main Location</label>
                <div className="col-sm-9">
                  <Select
                    options={locations}
                    value={form.mainLocation}
                    placeholder="Select..."
                    onChange={(v) => setForm({ ...form, mainLocation: v })}
                  />
                </div>
              </div>
              <div className="mb-3 row align-items-center">
                <label className="col-sm-3 col-form-label">Additional Locations</label>
                <div className="col-sm-9">
                  <Select
                    isMulti
                    options={locations}
                    value={form.additionalLocations}
                    placeholder="Select location(s)"
                    onChange={(v) =>
                      setForm({ ...form, additionalLocations: v as any[] })
                    }
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-3 col-form-label">Show Staff at all Locations</label>
                <div className="col-sm-9 d-flex align-items-center">
                  <input
                    type="checkbox"
                    className="form-check-input me-2"
                    checked={form.showAllLocations}
                    onChange={(e) =>
                      setForm({ ...form, showAllLocations: e.target.checked })
                    }
                  />
                </div>
              </div>
              <div className="mb-3 row align-items-center">
                <label className="col-sm-3 col-form-label">Role</label>
                <div className="col-sm-9">
                  <Select
                    options={roles}
                    value={form.role}
                    placeholder="Select..."
                    onChange={(v) => setForm({ ...form, role: v })}
                  />
                  <small className="text-muted">
                    Staff must have Role with Till access to show on Till
                  </small>
                </div>
              </div>
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
              <div className="mb-3 row align-items-center">
                <label className="col-sm-3 col-form-label">Hourly Rate</label>
                <div className="col-sm-9">
                  <input
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
            <Link href="/employees-grid
            " className="btn btn-secondary me-2">
              Cancel
            </Link>
            <button className="btn btn-primary" type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
