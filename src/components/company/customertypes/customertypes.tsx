'use client';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";

import CommonDeleteModal from "@/core/common/modal/commonDeleteModal";
import { createCustomerType, CustomerType, deleteCustomerType, getAllCustomerTypes, NewCustomerTypePayload, updateCustomerType } from "@/lib/redux/actions/customertypesAction";

export default function CustomerTypesComponent() {
  const dispatch = useDispatch<AppDispatch>();
  const { customerTypes, loading } = useSelector(
    (state: RootState) => state.customertypes
  );

  // === State for Modals and Forms ===
  const [typeToEdit, setTypeToEdit] = useState<CustomerType | null>(null);
  const [typeToDelete, setTypeToDelete] = useState<CustomerType | null>(null);

  // State for the "Add New" form
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newDiscount, setNewDiscount] = useState("");
  const [addError, setAddError] = useState<string | null>(null);

  // State for the "Edit" form
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editDiscount, setEditDiscount] = useState<string | number>("");
  const [editError, setEditError] = useState<string | null>(null);

  // === Data Fetching ===
  useEffect(() => {
    dispatch(getAllCustomerTypes());
  }, [dispatch]);

  const refetchData = () => {
    dispatch(getAllCustomerTypes());
  };

  // === Event Handlers ===
  const handleDeleteConfirm = () => {
    if (typeToDelete) {
      dispatch(deleteCustomerType(typeToDelete.id));
      setTypeToDelete(null);
    }
  };
  
  // Handler for opening the edit modal
  const handleEditClick = (customerType: CustomerType) => {
    setTypeToEdit(customerType);
    setEditName(customerType.name);
    setEditDescription(customerType.description);
    setEditDiscount(customerType.discount);
    setEditError(null);
  };
  
  // Handler for saving a new type
  const handleSaveNew = async () => {
    if (!newName.trim()) { setAddError("Name is required."); return; }
    setAddError(null);
    const payload: NewCustomerTypePayload = { 
      name: newName, 
      description: newDescription, 
      discount: parseFloat(newDiscount) || 0 
    };
    try {
      await dispatch(createCustomerType(payload)).unwrap();
      refetchData();
      document.getElementById('add-customer-type-close')?.click(); // Close bootstrap modal
      // Reset form
      setNewName(""); setNewDescription(""); setNewDiscount("");
    } catch (err) { 
      setAddError("Failed to add type. The name may already exist."); 
    }
  };
  
  // Handler for updating an existing type
  const handleUpdate = async () => {
    if (!typeToEdit) return;
    if (!editName.trim()) { setEditError("Name is required."); return; }
    setEditError(null);
    try {
      await dispatch(updateCustomerType({
        id: typeToEdit.id,
        data: { name: editName, description: editDescription, discount: parseFloat(String(editDiscount)) || 0 },
      })).unwrap();
      refetchData();
      setTypeToEdit(null); // Close modal
    } catch (err) { 
      setEditError("Failed to update type. The name may already exist."); 
    }
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="fw-bold mb-0">Customer Types</h4>
          <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#add-customer-type">
            ADD CUSTOMER TYPE
          </button>
        </div>
        <div className="card">
          <div className="card-body p-0">
            <table className="table mb-0">
              <thead className="table-light">
                <tr>
                  <th>Name</th><th>Description</th><th>Discount (%)</th><th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading && (<tr><td colSpan={4} className="text-center">Loading...</td></tr>)}
                {!loading && customerTypes.map((type) => (
                  <tr key={type.id}>
                    <td>{type.name}</td>
                    <td>{type.description}</td>
                    <td>{type.discount}</td>
                    <td className="text-end">
                      <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleEditClick(type)}>EDIT</button>
                      <button className="btn btn-sm btn-outline-danger" data-bs-toggle="modal" data-bs-target="#delete-modal" onClick={() => setTypeToDelete(type)}>X</button>
                    </td>
                  </tr>
                ))}
                {!loading && customerTypes.length === 0 && (<tr><td colSpan={4} className="text-center">No customer types found.</td></tr>)}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ============== MODALS ============== */}

      {/* Add Modal */}
      <div className="modal fade" id="add-customer-type">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header"><h5 className="modal-title">Add Customer Type</h5><button id="add-customer-type-close" type="button" className="btn-close" data-bs-dismiss="modal" /></div>
            <div className="modal-body">
              {addError && <div className="alert alert-danger">{addError}</div>}
              <div className="mb-3"><label className="form-label">Name</label><input type="text" className="form-control" value={newName} onChange={(e) => setNewName(e.target.value)} /></div>
              <div className="mb-3"><label className="form-label">Description</label><input type="text" className="form-control" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} /></div>
              <div className="mb-3"><label className="form-label">Discount (%)</label><input type="number" className="form-control" value={newDiscount} onChange={(e) => setNewDiscount(e.target.value)} /></div>
            </div>
            <div className="modal-footer"><button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button><button type="button" className="btn btn-primary" onClick={handleSaveNew}>Save</button></div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {typeToEdit && (
        <div className="modal fade show d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header"><h5 className="modal-title">Edit Customer Type</h5><button type="button" className="btn-close" onClick={() => setTypeToEdit(null)} /></div>
              <div className="modal-body">
                {editError && <div className="alert alert-danger">{editError}</div>}
                <div className="mb-3"><label className="form-label">Name</label><input type="text" className="form-control" value={editName} onChange={(e) => setEditName(e.target.value)} /></div>
                <div className="mb-3"><label className="form-label">Description</label><input type="text" className="form-control" value={editDescription} onChange={(e) => setEditDescription(e.target.value)} /></div>
                <div className="mb-3"><label className="form-label">Discount (%)</label><input type="number" className="form-control" value={editDiscount} onChange={(e) => setEditDiscount(e.target.value)} /></div>
              </div>
              <div className="modal-footer"><button type="button" className="btn btn-secondary" onClick={() => setTypeToEdit(null)}>Cancel</button><button type="button" className="btn btn-primary" onClick={handleUpdate}>Save Changes</button></div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      <CommonDeleteModal
        title="Delete Customer Type"
        description={`Are you sure you want to delete "${typeToDelete?.name}"?`}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}