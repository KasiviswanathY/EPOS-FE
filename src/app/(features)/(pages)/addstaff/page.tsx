"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/redux/store";
import { createRole } from "@/lib/redux/actions/createRoles";

export default function AddRolePage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const token =
    typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

  const PERMISSIONS = [
  "BACK_OFFICE",
  "TILL",
  "ADMIN_ACCESS_ON_TILL",
  "TILL_SETTINGS",
  "QUICK_ADD_SETTINGS",
  "CLOCK_IN_CLOCK_OUT_INFO",
  "MANAGER_OVERRIDE",
  "NO_SALES",
  "PETTY_CASH",
  "FLOAT_ADJUSTMENT",
  "STOCK_SEND",
  "STOCK_RECEIVE",
  "STOCK_TAKE",
  "PAYOUTS",
  "HOLD",
  "CLOSE_TILL",
  "BLIND_END_OF_DAY",
  "VOID_ANY_ITEM",
  "DELETE_UNORDERED_ITEMS",
  "CLEAR_TRANSACTION",
  "REMOVE_FROM_TABLE",
  "ITEM_DISCOUNT",
  "ITEM_DISCOUNT_LIMIT",
  "ITEM_DISCOUNT_LIMIT_PERCENTAGE",
  "BASKET_DISCOUNT",
];

   const [form, setForm] = useState({
    name: "",
    description: "",
    permissions: [] as string[],
  });
  // Keep track of the last visited page using localStorage
  const lastVisited =
    typeof window !== "undefined"
      ? localStorage.getItem("lastVisitedPage") || "/"
      : "/";

 
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
 useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const update = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const togglePermission = (perm: string) => {
    setForm((prev) => {
      const selected = prev.permissions.includes(perm)
        ? prev.permissions.filter((p) => p !== perm)
        : [...prev.permissions, perm];
      return { ...prev, permissions: selected };
    });
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      name: form.name,
      description: form.description,
      permissions: form.permissions,
    };
    console.log("token"+token);
     dispatch(createRole({ payload, token }));
    router.push("/designation");
  };

  const handleCancel = () => {
    router.push(lastVisited);
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <h4 className="text-xl font-semibold mb-4">Roles</h4>

        <form onSubmit={handleSubmit}>
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
                <label className="col-sm-2 col-form-label text-end">
                  Description
                </label>
                <div className="col-sm-10">
                  <input
                    name="description"
                    value={form.description}
                    onChange={update}
                    className="form-control"
                  />
                </div>
              </div>

              {/* Permissions */}
               <div className="mb-4 row" ref={dropdownRef}>
                <label className="col-sm-2 col-form-label text-end">
                  Permissions
                </label>
                <div className="col-sm-10">
                  <div className="dropdown" style={{ position: "relative" }}>
                    <button
                      type="button"
                      className="form-control text-start"
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                      {form.permissions.length > 0
                        ? form.permissions.join(", ")
                        : "Select permissions"}
                    </button>

                    {dropdownOpen && (
                      <div
                        className="dropdown-menu show"
                        style={{
                          display: "block",
                          position: "absolute",
                          width: "100%",
                          maxHeight: "250px",
                          overflowY: "auto",
                          padding: "10px",
                          zIndex: 1000,
                        }}
                      >
                        {PERMISSIONS.map((perm) => (
                          <div key={perm} className="form-check">
                            <input
                              type="checkbox"
                              id={perm}
                              className="form-check-input"
                              checked={form.permissions.includes(perm)}
                              onChange={() => togglePermission(perm)}
                            />
                            <label
                              htmlFor={perm}
                              className="form-check-label"
                              style={{ cursor: "pointer" }}
                            >
                              {perm}
                            </label>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* Footer */}
            <div className="d-flex justify-content-end gap-2 mt-3 p-3">
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-success">
                Add
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
