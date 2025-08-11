"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { useForm } from "react-hook-form";
import {
  deleteLocation,
  getLocations,
  updateLocation,
} from "@/lib/redux/actions/createLocation";
import router from "next/router";

export default function LocationsListComponent() {
  const dispatch = useDispatch<AppDispatch>();
  const { Locations = [], loading, token, company } = useSelector(
    (state: RootState) => state.app
  );

  const [filter, setFilter] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<any>(null);

  const { register, handleSubmit, reset } = useForm();



  

  // Fetch locations on mount
  useEffect(() => {
    if (token) {
      dispatch(getLocations({ token }));
    }
  }, [ token, dispatch]);

  // Filtered locations for search
  const filteredData = Locations.filter((item: any) =>
    filter.trim() === ""
      ? true
      : item.name?.toLowerCase().includes(filter.toLowerCase()) ||
        item.description?.toLowerCase().includes(filter.toLowerCase())
  );

  // Edit
  const handleEditClick = (loc: any) => {
    setSelectedLocation(loc);
    reset(loc);
    setEditModalOpen(true);
  };

  const handleUpdate = async (data: any) => {
    if (!token || !selectedLocation?.id) return;
    await dispatch(
      updateLocation({ id: selectedLocation.id, payload: data, token })
    );
    setEditModalOpen(false);
  };

  // Delete
  const handleDeleteClick = (loc: any) => {
    setSelectedLocation(loc);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!token || !selectedLocation?.id) return;
    await dispatch(deleteLocation({ id: selectedLocation.id, token }));
    setDeleteModalOpen(false);
    
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header d-flex justify-content-between align-items-center">
          <h4 className="fw-bold">Locations</h4>
          <div>
            <Link href="/addlocationlist" className="btn btn-primary me-2">
              Add Location
            </Link>
            <Link href="/show-devices" className="btn btn-secondary">
              Show Devices
            </Link>
          </div>
        </div>

        {/* Filter */}
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Filter by Name or Description"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>

        {/* Table */}
        <div className="card">
          <div className="card-body table-responsive">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Address</th>
                    <th>Email Address</th>
                    <th style={{ width: "200px" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.length > 0 ? (
                    filteredData.map((item: any) => (
                      <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.description}</td>
                        <td>
                          {item.address}, {item.city}, {item.country},{" "}
                          {item.pincode}
                        </td>
                        <td>{item.email}</td>
                        <td>
                          <button
                            className="btn btn-primary me-2"
                            onClick={() => handleEditClick(item)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDeleteClick(item)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="text-center">
                        No locations found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}

            {/* Pagination info */}
            <div className="d-flex justify-content-between align-items-center mt-3">
              <div>
                <select className="form-select w-auto">
                  <option>10 items per page</option>
                  <option>25 items per page</option>
                  <option>50 items per page</option>
                </select>
              </div>
              <div>
                {filteredData.length} of {Locations.length} Locations
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {/* Edit Modal */}
{editModalOpen && (
  <div className="modal show fade d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
    <div className="modal-dialog">
      <form
        onSubmit={handleSubmit((data) => {
          if (!token || !selectedLocation?.id) return;
          // Merge unchanged fields from selectedLocation
         const allowedPayload = {
  name: data.name,
  address: data.address,
  city: data.city,
  country: data.country,
  pincode: data.pincode,
  description: data.description,
  status: data.status,
  email: data.email,
  phone: data.phone,
  language: data.language,
  timeZone: data.timeZone,
  companyId: data.companyId
};
          dispatch(updateLocation({
            id: selectedLocation.id,
            payload: allowedPayload,
            token
          }));
          setEditModalOpen(false);
          router.push("/locationslist");

        })}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5>Edit Location</h5>
            <button type="button" className="btn-close" onClick={() => setEditModalOpen(false)} />
          </div>
          <div className="modal-body">
            <input {...register("name")} placeholder="Name" className="form-control mb-2" />
            <input {...register("description")} placeholder="Description" className="form-control mb-2" />
            <input {...register("address")} placeholder="Address" className="form-control mb-2" />
            <input {...register("city")} placeholder="City" className="form-control mb-2" />
            <input {...register("country")} placeholder="Country" className="form-control mb-2" />
            <input {...register("pincode")} placeholder="Pincode" className="form-control mb-2" />
            <input {...register("email")} placeholder="Email" className="form-control mb-2" />
            <input {...register("phone")} placeholder="Phone" className="form-control mb-2" />
            <input {...register("language")} placeholder="Language" className="form-control mb-2" />
            <input {...register("timeZone")} placeholder="Time Zone" className="form-control mb-2" />
            <input {...register("companyId")} placeholder="Company ID" className="form-control mb-2" />
            <select {...register("status")} className="form-select mb-2">
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
            </select>
          </div>
          <div className="modal-footer">
            <button type="submit" className="btn btn-primary">Update</button>
            <button type="button" className="btn btn-secondary" onClick={() => setEditModalOpen(false)}>Cancel</button>
          </div>
        </div>
      </form>
    </div>
  </div>
)}

      {/* Delete Modal */}
      {deleteModalOpen && (
        <div
          className="modal show fade d-block"
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5>Confirm Delete</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setDeleteModalOpen(false)}
                />
              </div>
              <div className="modal-body">
                Are you sure you want to delete{" "}
                <b>{selectedLocation?.name}</b>?
              </div>
              <div className="modal-footer">
                <button onClick={confirmDelete} className="btn btn-danger">
                  Yes, Delete
                </button>
                <button
                  onClick={() => setDeleteModalOpen(false)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
