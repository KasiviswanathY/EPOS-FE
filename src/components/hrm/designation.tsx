"use client";
import { getRoles } from '@/lib/redux/actions/createRoles'
import { AppDispatch, RootState } from '@/lib/redux/store'
import Link from 'next/link'
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux'



export default function DesignationComponent (){

const dispatch = useDispatch<AppDispatch>();
  const {roles, loading } = useSelector((state: RootState) => state.app);
 const token =
    typeof window !== "undefined" ? localStorage.getItem("authToken") : null; 
  // Fetch roles when token is available
  useEffect(() => {
    if (token) {
      dispatch(getRoles({ token }));
    }
  }, [token, dispatch]);

  // Collect all unique permissions from the roles
  const allPermissions = useMemo(() => {
    const perms = new Set<string>();
    roles.forEach((role) => {
      role.permissions?.forEach((perm: string) => perms.add(perm));
    });
    return Array.from(perms).sort();
  }, [roles]);

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
      className="btn btn-success flex items-center gap-1">Add Roles</Link></div>
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
              {roles.map((role) => (
                <tr key={role.id}>
                  <td>{role.name}</td>
                  <td>{role.description}</td>
                  {allPermissions.map((perm) => (
                    <td key={perm}>
                      <input
                        type="checkbox"
                        checked={role.permissions.includes(perm)}
                        readOnly
                      />
                    </td>
                  ))}
                  <td>
                    <button className="btn btn-outline-warning btn-sm fw-bold">
                      EDIT
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
<div className="d-flex justify-content-start mt-4" >
 <Link href="/employees-grid"className="btn btn-success flex items-center gap-1" ><span className="text-lg leading-none" ></span>Edit Staff</Link>
</div>
</div>
</div>
</>
)
}