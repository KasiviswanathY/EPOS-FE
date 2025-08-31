"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";

import { Brands } from "@/core/interfaces/Brands";
import CommonFooter from "@/core/common/footer/commonFooter";
import CommonDeleteModal from "@/core/common/modal/commonDeleteModal";
import {
  createBrand,
  deleteBrand,
  getAllBrands,
  updateBrand,
} from "@/lib/redux/actions/brandAction";

export default function BrandListComponent() {
  const dispatch = useDispatch<AppDispatch>();
  const { brands, loading } = useSelector((state: RootState) => state.brand);

  const [filter, setFilter] = useState("");
  const [form, setForm] = useState<Partial<Brands>>({
    name: "",
    description: "",
    Status: "",
    productOrderCode: "",
    articleCode: "",
  });
  const [editingBrand, setEditingBrand] = useState<Brands | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Load brands on mount
  useEffect(() => {
    dispatch(getAllBrands());
  }, [dispatch]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddBrand = () => {
    dispatch(createBrand(form));
    setForm({
      name: "",
      description: "",
      Status: "",
      productOrderCode: "",
      articleCode: "",
    });
  };

  const handleEditBrand = () => {
    if (editingBrand) {
      dispatch(updateBrand({ id: editingBrand.id, data: form }));
      setEditingBrand(null);
      setForm({
        name: "",
        description: "",
        Status: "",
        productOrderCode: "",
        articleCode: "",
      });
    }
  };

  const handleDeleteBrand = () => {
    if (deleteId) {
      dispatch(deleteBrand(deleteId));
      setDeleteId(null);
    }
  };

  // ✅ brands is already an array
  const brandArray = brands ?? [];

  const filteredBrands = brandArray.filter(
    (b) =>
      b.name.toLowerCase().includes(filter.toLowerCase()) ||
      b.description?.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header d-flex justify-content-between align-items-center">
            <div className="page-title">
              <h4 className="fw-bold">Brands</h4>
            </div>
            <div className="page-btn">
              <button
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#add-brand"
              >
                <i className="ti ti-circle-plus me-1"></i> Add Brand
              </button>
            </div>
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Filter by Brand or Description"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
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
                      <th>Status</th>
                      <th>Product Order Code</th>
                      <th>Article Code</th>
                      <th style={{ width: "150px" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBrands.map((item) => (
                      <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.description}</td>
                        <td>{item.Status}</td>
                        <td>{item.productOrderCode}</td>
                        <td>{item.articleCode}</td>
                        <td>
                          <button
                            className="btn btn-outline-primary btn-sm me-2"
                            data-bs-toggle="modal"
                            data-bs-target="#edit-brand"
                            onClick={() => {
                              setEditingBrand(item);
                              setForm(item);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-outline-danger btn-sm"
                            data-bs-toggle="modal"
                            data-bs-target="#delete-modal"
                            onClick={() => setDeleteId(item.id)}
                          >
                            X
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
        <CommonFooter />
      </div>

      {/* Add Brand Modal */}
      <div className="modal fade" id="add-brand">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Add Brand</h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Brand Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Status</label>
                <input
                  type="text"
                  name="Status"
                  value={form.Status}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Product Order Code</label>
                <input
                  type="text"
                  name="productOrderCode"
                  value={form.productOrderCode}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Article Code</label>
                <input
                  type="text"
                  name="articleCode"
                  value={form.articleCode}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">
                Cancel
              </button>
              <button
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={handleAddBrand}
              >
                Add Brand
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Brand Modal */}
      <div className="modal fade" id="edit-brand">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Brand</h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Brand Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Status</label>
                <input
                  type="text"
                  name="Status"
                  value={form.Status}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Product Order Code</label>
                <input
                  type="text"
                  name="productOrderCode"
                  value={form.productOrderCode}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Article Code</label>
                <input
                  type="text"
                  name="articleCode"
                  value={form.articleCode}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">
                Cancel
              </button>
              <button
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={handleEditBrand}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      <CommonDeleteModal onConfirm={handleDeleteBrand} />
    </div>
  );
}
