"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AddRolePage() {
  const router = useRouter();

  /* ───── form state ───── */
  const [form, setForm] = useState({
    name: "",
    description: "",
    tillAccess: false,
  });

  const update = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent, next = false) => {
    e.preventDefault();

    // TODO: POST to your API
    // await fetch("/api/roles", { method: "POST", body: JSON.stringify(form) });

    if (next) {
      // clear inputs to add another
      setForm({ name: "", description: "", tillAccess: false });
    } else {
      router.push("/designation"); 
    }
  };

  return (
    <div className="page-wrapper">
      <div className="content">

        {/* ───────── Page title ───────── */}
        <h4 className="text-xl font-semibold mb-4">Roles</h4>

        {/* ───────── Card ───────── */}
        <form onSubmit={(e) => handleSubmit(e, false)}>
          <div className="card border">
            <div className="card-header bg-light fw-semibold">Add New Role</div>

            <div className="card-body">

              {/* Name */}
              <div className="mb-3 row">
                <label className="col-sm-2 col-form-label text-end">Name</label>
                <div className="col-sm-10">
                  <input
                    name="name"
                    value={form.name}
                    onChange={update}
                    className="form-control"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="mb-3 row">
                <label className="col-sm-2 col-form-label text-end">Description</label>
                <div className="col-sm-10">
                  <input
                    name="description"
                    value={form.description}
                    onChange={update}
                    className="form-control"
                  />
                </div>
              </div>

              {/* Permissions – Till access */}
              <div className="mb-4 row">
                <label className="col-sm-2 col-form-label text-end">Permissions</label>
                <div className="col-sm-10">
                  <div className="d-flex align-items-center gap-2">
                    <input
                      type="checkbox"
                      checked={form.tillAccess}
                      onChange={(e) =>
                        setForm({ ...form, tillAccess: e.target.checked })
                      }
                    />
                    <span className="small">
                      Allow Till Access (check to view more permissions)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* ───────── Footer ───────── */}
            {/* ─────── Card footer (replace the old one) ─────── */}
<div className="d-flex justify-content-end gap-2 mt-3">
    <button className="btn btn-danger">Cancel</button>
    <button className="btn btn-success">Add Another</button>
    <button className="btn btn-success">Add</button>
</div>


          </div>
        </form>
      </div>
    </div>
  );
}
