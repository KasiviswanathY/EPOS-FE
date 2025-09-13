"use client";
import Table from "@/core/common/pagination/datatable";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import {
  getAllproducts,
  deleteproducts,
  updateproducts,
} from "@/lib/redux/actions/productsAction";
import { Product } from "@/core/interfaces/Products";

export default function ProductListComponent() {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading } = useSelector((state: RootState) => state.products);

  const [isModalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Product>>({});

  useEffect(() => {
    dispatch(getAllproducts());
  }, [dispatch]);

  const openModal = (product: Product) => {
    setFormData({
      ...product,
      manufactureDate: product.manufactureDate ?? undefined,
      expiryDate: product.expiryDate ?? undefined,
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setFormData({});
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const parsedValue = type === "checkbox" ? checked : value;
    setFormData({ ...formData, [name]: parsedValue });
  };

  const handleSubmit = () => {
    if (!formData.id) return;

    const payload: Partial<Product> = {
      ...formData,
      manufactureDate: formData.manufactureDate ?? undefined,
      expiryDate: formData.expiryDate ?? undefined,
    };

    dispatch(updateproducts({ id: formData.id, data: payload }));
    closeModal();
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteproducts(id));
    }
  };

  const columns = [
    { title: "Name", dataIndex: "name" },
    { title: "Category", dataIndex: "categoryId" },
    { title: "Manufacturer", dataIndex: "manufacturer" },
    {
      title: "Cost Price",
      dataIndex: "costPrice",
      render: (val: number) => `$${val ?? 0}`,
    },
    {
      title: "Sale Price",
      dataIndex: "salePrice",
      render: (val: number) => `$${val ?? 0}`,
    },
    {
      title: "Expiry Date",
      dataIndex: "expiryDate",
      render: (val: string) =>
        val ? new Date(val).toLocaleDateString() : "N/A",
    },
    {
      title: "Button Color",
      dataIndex: "buttonColor",
      render: (val: string) =>
        val ? (
          <span className="d-flex align-items-center">
            <span
              className="dot me-1"
              style={{ backgroundColor: val, width: 12, height: 12 }}
            />
            {val}
          </span>
        ) : (
          "None"
        ),
    },
    {
      title: "Actions",
      dataIndex: "action",
      render: (_: any, record: Product) => (
        <div className="dropdown text-end">
          <a href="#" className="btn btn-sm btn-icon" data-bs-toggle="dropdown">
            <i className="ti ti-dots-vertical"></i>
          </a>
          <ul className="dropdown-menu dropdown-menu-end">
            <li>
              <button className="dropdown-item" onClick={() => openModal(record)}>
                Edit
              </button>
            </li>
            <li>
              <button
                className="dropdown-item text-danger"
                onClick={() => handleDelete(record.id)}
              >
                Delete
              </button>
            </li>
          </ul>
        </div>
      ),
    },
  ];

  return (
    <div className="page-wrapper" style={{ background: "#f8fafc", minHeight: "100vh" }}>
      <div
        className="content"
        style={{
          borderRadius: 16,
          boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
          background: "#fff",
          marginTop: 32,
          padding: 32,
        }}
      >
        <h4 className="fw-bold mb-3" style={{ color: "#1a237e" }}>
          Product List
        </h4>

        {loading ? (
          <div className="text-center py-5">Loading products...</div>
        ) : (
          <div
            className="card table-list-card"
            style={{
              borderRadius: 12,
              boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
            }}
          >
            <div className="card-body">
              <div className="table-responsive">
                <Table columns={columns} dataSource={products} />
              </div>
            </div>
          </div>
        )}

       {/* Update Modal */}
{isModalOpen && (
  <div
    className="modal fade show"
    style={{
      display: "block",
      backgroundColor: "rgba(0,0,0,0.5)",
    }}
  >
    <div className="modal-dialog modal-lg">
      <div className="modal-content p-3">
        <div className="modal-header">
          <h5 className="modal-title">Edit Product</h5>
          <button type="button" className="btn-close" onClick={closeModal}></button>
        </div>
        <div className="modal-body">
          {/* Each field has a clear label */}
          <div className="mb-3">
            <label className="form-label fw-bold">Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={formData.name || ""}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Description</label>
            <input
              type="text"
              name="description"
              className="form-control"
              value={formData.description || ""}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Cost Price</label>
            <input
              type="number"
              name="costPrice"
              className="form-control"
              value={formData.costPrice ?? 0}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Sale Price</label>
            <input
              type="number"
              name="salePrice"
              className="form-control"
              value={formData.salePrice ?? 0}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Manufacturer</label>
            <input
              type="text"
              name="manufacturer"
              className="form-control"
              value={formData.manufacturer || ""}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Manufacture Date</label>
            <input
              type="date"
              name="manufactureDate"
              className="form-control"
              value={
                formData.manufactureDate
                  ? formData.manufactureDate.split("T")[0]
                  : ""
              }
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Expiry Date</label>
            <input
              type="date"
              name="expiryDate"
              className="form-control"
              value={
                formData.expiryDate ? formData.expiryDate.split("T")[0] : ""
              }
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Button Color</label>
            <input
              type="text"
              name="buttonColor"
              className="form-control"
              value={formData.buttonColor || ""}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Category ID</label>
            <input
              type="text"
              name="categoryId"
              className="form-control"
              value={formData.categoryId || ""}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Brand ID</label>
            <input
              type="text"
              name="brandId"
              className="form-control"
              value={formData.brandId || ""}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Tax Rate ID</label>
            <input
              type="text"
              name="taxRateId"
              className="form-control"
              value={formData.taxRateId || ""}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={closeModal}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleSubmit}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  </div>
)}

      </div>
    </div>
  );
}
