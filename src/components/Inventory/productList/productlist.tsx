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
  const { products, loading } = useSelector(
    (state: RootState) => state.products
  );

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement; // Cast to HTMLInputElement to access 'checked'
    const checked = (e.target as HTMLInputElement).checked;

    let parsedValue: string | number | boolean;

    if (type === "checkbox") {
      parsedValue = checked;
    } else if (type === "number") {
      // Convert numeric fields to numbers
      parsedValue = value === "" ? 0 : parseFloat(value) || 0;
    } else if (
      name === "costPrice" ||
      name === "salePrice" ||
      name === "rrp" ||
      name === "rating"
    ) {
      // Ensure these specific fields are always numbers
      parsedValue = value === "" ? 0 : parseFloat(value) || 0;
    } else if (name === "volumeOfSale") {
      // Ensure volumeOfSale is always a number with default 1.0
      parsedValue = value === "" ? 1.0 : parseFloat(value) || 1.0;
    } else if (name === "warranty") {
      // Integer fields
      parsedValue = value === "" ? 0 : parseInt(value) || 0;
    } else if (name === "orderQuantityLimit") {
      // Integer fields with default 100
      parsedValue = value === "" ? 100 : parseInt(value) || 100;
    } else {
      parsedValue = value;
    }

    setFormData({ ...formData, [name]: parsedValue });
  };

  const handleSubmit = () => {
    if (!formData.id) return;

    const payload: Partial<Product> = {
      ...formData,
      // Ensure numeric fields are properly converted
      costPrice:
        typeof formData.costPrice === "string"
          ? parseFloat(formData.costPrice) || 0
          : formData.costPrice || 0,
      salePrice:
        typeof formData.salePrice === "string"
          ? parseFloat(formData.salePrice) || 0
          : formData.salePrice || 0,
      rrp:
        typeof formData.rrp === "string"
          ? parseFloat(formData.rrp) || 0
          : formData.rrp,
      volumeOfSale:
        typeof formData.volumeOfSale === "string"
          ? parseFloat(formData.volumeOfSale) || 1.0
          : formData.volumeOfSale || 1.0,
      rating:
        typeof formData.rating === "string"
          ? parseFloat(formData.rating) || 0
          : formData.rating,
      warranty:
        typeof formData.warranty === "string"
          ? parseInt(formData.warranty) || 0
          : formData.warranty,
      orderQuantityLimit:
        typeof formData.orderQuantityLimit === "string"
          ? parseInt(formData.orderQuantityLimit) || 100
          : formData.orderQuantityLimit || 100,
      manufactureDate: formData.manufactureDate ?? undefined,
      expiryDate: formData.expiryDate ?? undefined,
      // Ensure boolean fields are properly handled
      sellOnPos: formData.sellOnPos ?? true,
      sellOnTill: formData.sellOnTill ?? true,
      variablePrice: formData.variablePrice ?? false,
      taxExempt: formData.taxExempt ?? false,
      scannableOnly: formData.scannableOnly ?? false,
    };

    dispatch(updateproducts({ id: formData.id, data: payload }))
      .unwrap()
      .then(() => {
        // Refresh the product list after successful update
        dispatch(getAllproducts());
        // Show success notification
        alert("Product updated successfully!");
        closeModal();
      })
      .catch((error) => {
        console.error("Failed to update product:", error);
        alert(`Failed to update product: ${error.message || "Unknown error"}`);
      });
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteproducts(id))
        .unwrap()
        .then(() => {
          // Refresh the product list after successful deletion
          dispatch(getAllproducts());
          alert("Product deleted successfully!");
        })
        .catch((error) => {
          console.error("Failed to delete product:", error);
          alert(
            `Failed to delete product: ${error.message || "Unknown error"}`
          );
        });
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
      render: (_: unknown, record: Product) => (
        <div className="dropdown text-end">
          <a href="#" className="btn btn-sm btn-icon" data-bs-toggle="dropdown">
            <i className="ti ti-dots-vertical"></i>
          </a>
          <ul className="dropdown-menu dropdown-menu-end">
            <li>
              <button
                className="dropdown-item"
                onClick={() => openModal(record)}
              >
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
    <div
      className="page-wrapper"
      style={{ background: "#f8fafc", minHeight: "100vh" }}
    >
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
                  <button
                    type="button"
                    className="btn-close"
                    onClick={closeModal}
                  ></button>
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
                      step="0.01"
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
                      step="0.01"
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
                    <label className="form-label fw-bold">
                      Manufacture Date
                    </label>
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
                        formData.expiryDate
                          ? formData.expiryDate.split("T")[0]
                          : ""
                      }
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Button Color</label>
                    <input
                      type="color"
                      name="buttonColor"
                      className="form-control"
                      value={formData.buttonColor || "#0000ff"}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Unit Of Sale</label>
                    <select
                      name="unitOfSale"
                      className="form-control"
                      value={formData.unitOfSale || "each"}
                      onChange={handleChange}
                    >
                      <option value="cards">Cards</option>
                      <option value="each">Each</option>
                      <option value="kg">Kilogram (kg)</option>
                      <option value="litre">Litre</option>
                      <option value="packet">Packet</option>
                      <option value="cl">Centiliter (cl)</option>
                      <option value="cm">Centimeter (cm)</option>
                      <option value="cup">Cup</option>
                      <option value="ft">Foot (ft)</option>
                      <option value="g">Gram (g)</option>
                      <option value="gal">Gallon (gal)</option>
                      <option value="halfPint">Half Pint</option>
                      <option value="in">Inch (in)</option>
                      <option value="l">Liter (l)</option>
                      <option value="lb">Pound (lb)</option>
                      <option value="ml">Milliliter (ml)</option>
                      <option value="m">Meter (m)</option>
                      <option value="oz">Ounce (oz)</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">
                      Order Quantity Limit
                    </label>
                    <input
                      type="number"
                      min="1"
                      name="orderQuantityLimit"
                      className="form-control"
                      value={formData.orderQuantityLimit ?? 100}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Volume of Sale</label>
                    <input
                      type="number"
                      step="0.1"
                      name="volumeOfSale"
                      className="form-control"
                      value={formData.volumeOfSale ?? 1.0}
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

                  {/* Boolean Fields */}
                  <div className="mb-3">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="sellOnPos"
                        name="sellOnPos"
                        checked={formData.sellOnPos ?? true}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="sellOnPos">
                        Sell On POS
                      </label>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="sellOnTill"
                        name="sellOnTill"
                        checked={formData.sellOnTill ?? true}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="sellOnTill">
                        Sell On Till
                      </label>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="variablePrice"
                        name="variablePrice"
                        checked={formData.variablePrice ?? false}
                        onChange={handleChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="variablePrice"
                      >
                        Variable Price
                      </label>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="taxExempt"
                        name="taxExempt"
                        checked={formData.taxExempt ?? false}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="taxExempt">
                        Tax Exempt
                      </label>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="scannableOnly"
                        name="scannableOnly"
                        checked={formData.scannableOnly ?? false}
                        onChange={handleChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="scannableOnly"
                      >
                        Scannable Only
                      </label>
                    </div>
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
