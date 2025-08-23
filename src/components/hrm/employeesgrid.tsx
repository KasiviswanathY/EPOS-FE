"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import {
  getStaff,
  updateStaff,
  deletStaff,
} from "@/lib/redux/actions/createStaff";
import { Modal, Button, Form } from "react-bootstrap";

export default function EmployeesGridComponent() {
  const dispatch = useDispatch<AppDispatch>();
  const { staff, loading } = useSelector((state: RootState) => state.app);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState<any>(null);

  // Load staff on mount
  useEffect(() => {
    if (token) {
      dispatch(getStaff({ token }));
    }
  }, [dispatch, token]);

  // Delete staff
  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this staff?")) {
      dispatch(deletStaff({ id, token }));
    }
  };

  // Open edit modal
  const handleEdit = (emp: any) => {
    setEditData({ ...emp });
    setShowModal(true);
  };

  // Save update
  const handleUpdate = () => {
    if (editData) {
      const payload = {
        name: editData.name,
        hourlyRate: Number(editData.hourlyRate),
        passcode: editData.passcode,
        swipeLogin: editData.swipeLogin,
        availableForAllLocations: editData.availableForAllLocations,
        roleId: editData.roleId,
        mainLocationId: editData.mainLocationId,
        status: editData.status,
      };
      dispatch(updateStaff({ id: editData.id, payload, token }));
      setShowModal(false);
    }
  };

  // Adjust depending on reducer structure
  const staffList = staff?.data ?? [];

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="card mt-4">
            <div className="card-body">
              <div className="d-flex justify-content-between flex-wrap align-items-center mb-3">
                <input
                  type="search"
                  placeholder="Filter by Name or Role"
                  className="form-control me-2"
                  style={{ maxWidth: "300px" }}
                />
                <Link href="editstaff" className="btn btn-sm btn-success">
                  Add Staff
                </Link>
              </div>

              <div className="table-responsive">
                <table className="table table-striped align-middle text-center">
                  <thead>
                    <tr className="bg-light">
                      <th>Name</th>
                      <th>Status</th>
                      <th>All Locations</th>
                      <th>Passcode</th>
                      <th>Swipe Login</th>
                      <th>Hourly Rate</th>
                      <th>Role ID</th>
                      <th>Main Location ID</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan={9}>Loading...</td>
                      </tr>
                    ) : staffList.length > 0 ? (
                      staffList.map((emp: any) => (
                        <tr key={emp.id}>
                          <td>{emp.name}</td>
                          <td>{emp.status}</td>
                          <td>
                            <input
                              type="checkbox"
                              checked={emp.availableForAllLocations}
                              readOnly
                            />
                          </td>
                          <td>{emp.passcode}</td>
                          <td>{emp.swipeLogin}</td>
                          <td>${emp.hourlyRate}</td>
                          <td>{emp.roleId}</td>
                          <td>{emp.mainLocationId}</td>
                          <td>
                            <button
                              className="btn btn-outline-danger btn-sm me-2"
                              onClick={() => handleDelete(emp.id)}
                            >
                              X
                            </button>
                            <button
                              className="btn btn-outline-primary btn-sm"
                              onClick={() => handleEdit(emp)}
                            >
                              Edit
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={9}>No staff found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <Link href="editstaff" className="btn btn-sm btn-primary">
                Edit Roles
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Staff</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editData && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  value={editData.name}
                  onChange={(e) =>
                    setEditData({ ...editData, name: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Control
                  value={editData.status}
                  onChange={(e) =>
                    setEditData({ ...editData, status: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Passcode</Form.Label>
                <Form.Control
                  value={editData.passcode}
                  onChange={(e) =>
                    setEditData({ ...editData, passcode: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Swipe Login</Form.Label>
                <Form.Control
                  value={editData.swipeLogin}
                  onChange={(e) =>
                    setEditData({ ...editData, swipeLogin: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Hourly Rate</Form.Label>
                <Form.Control
                  type="number"
                  value={editData.hourlyRate}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      hourlyRate: Number(e.target.value),
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="Available for All Locations"
                  checked={editData.availableForAllLocations}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      availableForAllLocations: e.target.checked,
                    })
                  }
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
