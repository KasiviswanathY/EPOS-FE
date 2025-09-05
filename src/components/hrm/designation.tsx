"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  deleteRole,
  getAllRoles,
  updateRole,
} from "@/lib/redux/actions/rolesActions";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { Role, Staff_Role_Permissions } from "@/core/interfaces/Role";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

export default function DesignationComponent() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { roles = [], loading } = useSelector(
    (state: RootState) => state.roles
  );

  // --- Edit modal state ---
  const [modalOpen, setModalOpen] = useState(false);
  const [editRoleId, setEditRoleId] = useState<string | number | null>(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editPermissions, setEditPermissions] = useState<
    Staff_Role_Permissions[]
  >([]);
  const [saving, setSaving] = useState(false);

  // --- Delete modal state ---
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedRoleForDelete, setSelectedRoleForDelete] =
    useState<Role | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Fetch roles on mount
  useEffect(() => {
    dispatch(getAllRoles());
  }, [dispatch]);

  // Collect all unique permissions to render columns and checkboxes
  const allPermissions = useMemo(() => {
    const perms = new Set<Staff_Role_Permissions>();
    (roles || []).forEach((role: Role) => {
      (role.permissions || []).forEach((p: Staff_Role_Permissions) =>
        perms.add(p)
      );
    });
    return Array.from(perms).sort();
  }, [roles]);

  // --- Edit handlers ---
  const handleEditClick = (role: Role) => {
    setEditRoleId(role.id);
    setEditName(role.name ?? "");
    setEditDescription(role.description ?? "");
    setEditPermissions(
      Array.isArray(role.permissions) ? [...role.permissions] : []
    );
    setModalOpen(true);
  };

  const handlePermissionToggle = (perm: Staff_Role_Permissions) => {
    setEditPermissions((prev) =>
      prev.includes(perm) ? prev.filter((p) => p !== perm) : [...prev, perm]
    );
  };

  const handleSave = async () => {
    if (!editRoleId) return;
    setSaving(true);
    try {
      const data = {
        name: editName,
        description: editDescription,
        permissions: editPermissions,
      };

      await dispatch(updateRole({ id: editRoleId.toString(), data }));
      await dispatch(getAllRoles());
      setModalOpen(false);

      router.push("/designation");
    } catch (err) {
      console.error("Update failed", err);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteClick = (role: Role) => {
    setSelectedRoleForDelete(role);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedRoleForDelete) return;
    setDeleting(true);
    try {
      await dispatch(deleteRole(selectedRoleForDelete.id));
      await dispatch(getAllRoles());
      setDeleteModalOpen(false);
      setSelectedRoleForDelete(null);
      // navigate back to designation (optional)
      router.push("/designation");
    } catch (err) {
      console.error("Delete failed", err);
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return <p className="p-3">Loading roles...</p>;
  }

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="add-item d-flex">
              <div className="page-title">
                <h3>Roles</h3>
              </div>
            </div>
            <div className="d-flex justify-content-end mb-3">
              <Link
                href="addstaff"
                className="btn btn-success flex items-center gap-1"
              >
                Add Roles
              </Link>
            </div>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table
              className="table table-bordered align-middle text-center"
              style={{ minWidth: "1200px" }}
            >
              <thead className="bg-light">
                <tr>
                  <th>Role Name</th>
                  <th>Role Description</th>
                  {allPermissions.map((perm) => (
                    <th key={perm}>{perm.replace(/_/g, " ")}</th>
                  ))}
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {roles.map((role: Role) => (
                  <tr key={role.id}>
                    <td>{role.name}</td>
                    <td>{role.description}</td>

                    {allPermissions.map((perm) => (
                      <td key={perm}>
                        <input
                          type="checkbox"
                          checked={Boolean(
                            role.permissions && role.permissions.includes(perm)
                          )}
                          readOnly
                        />
                      </td>
                    ))}

                    <td className="d-flex gap-2 justify-content-center">
                      <button
                        className="btn btn-outline-warning btn-sm fw-bold"
                        onClick={() => handleEditClick(role)}
                      >
                        EDIT
                      </button>

                      <button
                        className="btn btn-outline-danger btn-sm fw-bold"
                        onClick={() => handleDeleteClick(role)}
                      >
                        DELETE
                      </button>
                    </td>
                  </tr>
                ))}

                {roles.length === 0 && (
                  <tr>
                    <td colSpan={allPermissions.length + 3}>No roles found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="d-flex justify-content-start mt-4">
            <Link
              href="/employees-grid"
              className="btn btn-success flex items-center gap-1"
            >
              <span className="text-lg leading-none"></span>Edit Staff
            </Link>
          </div>
        </div>
      </div>

      {/* ===== Edit Modal (Update) ===== */}
      {modalOpen && (
        <div
          className="modal show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Role</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setModalOpen(false)}
                ></button>
              </div>

              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Role Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Permissions</label>
                  <div className="row">
                    {allPermissions.map((perm) => (
                      <div key={perm} className="col-4">
                        <div className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id={`perm-edit-${perm}`}
                            checked={editPermissions.includes(perm)}
                            onChange={() => handlePermissionToggle(perm)}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`perm-edit-${perm}`}
                          >
                            {perm.replace(/_/g, " ")}
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handleSave}
                  disabled={saving}
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== Delete Confirmation Modal ===== */}
      {deleteModalOpen && selectedRoleForDelete && (
        <div
          className="modal-backdrop"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1050,
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 8,
              padding: 20,
              maxWidth: 480,
              width: "95%",
            }}
          >
            <h5>Confirm Delete</h5>
            <p>
              Are you sure you want to delete the role{" "}
              <strong>{selectedRoleForDelete.name}</strong>?
            </p>
            <div className="d-flex justify-content-end gap-2 mt-3">
              <button
                className="btn btn-secondary"
                onClick={() => setDeleteModalOpen(false)}
                disabled={deleting}
              >
                Cancel
              </button>
              <button
                className="btn btn-danger"
                onClick={confirmDelete}
                disabled={deleting}
              >
                {deleting ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
