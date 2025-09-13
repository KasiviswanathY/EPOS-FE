"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { Product } from "@/core/interfaces/Products";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { getAllCateogry } from "@/lib/redux/actions/categoryActions";
import { getAllBrands } from "@/lib/redux/actions/brandAction";

import { getAllTaxRates } from "@/lib/redux/actions/taxratesAction";
import { createproducts } from "@/lib/redux/actions/productsAction";

export default function AddProduct() {
  const dispatch = useDispatch<AppDispatch>();

  // redux state
  const { categories, loading: categoryLoading } = useSelector(
    (state: RootState) => state.categories
  );
  const { brands, loading: brandLoading } = useSelector(
    (state: RootState) => state.brand
  );
  const { taxRates, loading: taxRateLoading } = useSelector(
    (state: RootState) => state.taxrates
  );
  const { loading: productLoading } = useSelector(
    (state: RootState) => state.products
  );

  // Add state for success message
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Product>();

  // fetch dropdown data
  useEffect(() => {
    dispatch(getAllCateogry());
    dispatch(getAllBrands());
    dispatch(getAllTaxRates());
  }, [dispatch]);

  const onSubmit = (data: Product) => {
    // Clear previous messages
    setSuccessMessage(null);
    setErrorMessage(null);

    const payload: Product = {
      ...data,
      costPrice: Number(data.costPrice),
      salePrice: Number(data.salePrice),
      rrp: Number(data.rrp || 0),
      rating: Number(data.rating || 0),
      warranty: Number(data.warranty || 0),
      // Ensure orderQuantityLimit is never null or undefined
      orderQuantityLimit: Number(data.orderQuantityLimit || 100),
      volumeOfSale: Number(data.volumeOfSale || 1),
      // Fix for date fields - send null when empty
      manufactureDate:
        data.manufactureDate && data.manufactureDate.trim() !== ""
          ? new Date(data.manufactureDate).toISOString()
          : null,
      expiryDate:
        data.expiryDate && data.expiryDate.trim() !== ""
          ? new Date(data.expiryDate).toISOString()
          : null,
    };

    dispatch(createproducts(payload))
      .unwrap()
      .then(() => {
        setSuccessMessage("Product created successfully!");
        reset(); // Reset the form

        // Clear success message after 5 seconds
        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000);
      })
      .catch((err) => {
        console.error("Failed to create product:", err);
        setErrorMessage(
          err.message || "Failed to create product. Please try again."
        );
      });
  };

  // ✅ Show full-page loader if dropdowns are still fetching
  if (categoryLoading || brandLoading || taxRateLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <div className="content container-fluid">
        <div className="page-header">
          <div className="row">
            <div className="col">
              <h3 className="page-title">Create Product</h3>
            </div>
          </div>
        </div>

        {/* Success and Error Messages */}
        {successMessage && (
          <div
            className="alert alert-success alert-dismissible fade show"
            role="alert"
          >
            <strong>Success!</strong> {successMessage}
            <button
              type="button"
              className="btn-close"
              onClick={() => setSuccessMessage(null)}
              aria-label="Close"
            ></button>
          </div>
        )}

        {errorMessage && (
          <div
            className="alert alert-danger alert-dismissible fade show"
            role="alert"
          >
            <strong>Error!</strong> {errorMessage}
            <button
              type="button"
              className="btn-close"
              onClick={() => setErrorMessage(null)}
              aria-label="Close"
            ></button>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            {/* Basic Fields */}
            <div className="col-lg-6 col-sm-12">
              <div className="form-group">
                <label>Product Name</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("name", { required: true })}
                />
                {errors.name && <small className="text-danger">Required</small>}
              </div>
            </div>

            <div className="col-lg-12 col-sm-12">
              <div className="form-group">
                <label>Description</label>
                <textarea
                  className="form-control"
                  {...register("description")}
                />
              </div>
            </div>

            {/* Dropdowns */}
            <div className="col-lg-6 col-sm-12">
              <div className="form-group">
                <label>Category</label>
                <select
                  className="form-control"
                  {...register("categoryId", { required: true })}
                >
                  <option value="">Select Category</option>
                  {categories?.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                {errors.categoryId && (
                  <small className="text-danger">Required</small>
                )}
              </div>
            </div>

            <div className="col-lg-6 col-sm-12">
              <div className="form-group">
                <label>Brand</label>
                <select
                  className="form-control"
                  {...register("brandId", { required: true })}
                >
                  <option value="">Select Brand</option>
                  {brands?.map((brand) => (
                    <option key={brand.id} value={brand.id}>
                      {brand.name}
                    </option>
                  ))}
                </select>
                {errors.brandId && (
                  <small className="text-danger">Required</small>
                )}
              </div>
            </div>

            <div className="col-lg-6 col-sm-12">
              <div className="form-group">
                <label>Tax Rate</label>
                <select
                  className="form-control"
                  {...register("taxRateId", { required: true })}
                >
                  <option value="">Select Tax Rate</option>
                  {taxRates?.map((tax) => (
                    <option key={tax.id} value={tax.id}>
                      {tax.name} ({tax.percentage}%)
                    </option>
                  ))}
                </select>
                {errors.taxRateId && (
                  <small className="text-danger">Required</small>
                )}
              </div>
            </div>

            {/* Pricing */}
            <div className="col-lg-6 col-sm-12">
              <div className="form-group">
                <label>Cost Price</label>
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  {...register("costPrice", {
                    required: true,
                    valueAsNumber: true,
                  })}
                />
              </div>
            </div>

            <div className="col-lg-6 col-sm-12">
              <div className="form-group">
                <label>Sale Price</label>
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  {...register("salePrice", {
                    required: true,
                    valueAsNumber: true,
                  })}
                />
              </div>
            </div>

            <div className="col-lg-6 col-sm-12">
              <div className="form-group">
                <label>RRP</label>
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  {...register("rrp", { valueAsNumber: true })}
                />
              </div>
            </div>

            {/* Other Fields */}
            <div className="col-lg-6 col-sm-12">
              <div className="form-group">
                <label>Unit Of Sale</label>
                <select
                  className="form-control"
                  defaultValue="each"
                  {...register("unitOfSale")}
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
            </div>

            <div className="col-lg-6 col-sm-12">
              <div className="form-group">
                <label>Rating</label>
                <input
                  type="number"
                  className="form-control"
                  {...register("rating", { valueAsNumber: true })}
                />
              </div>
            </div>

            <div className="col-lg-6 col-sm-12">
              <div className="form-group">
                <label>Warranty (months)</label>
                <input
                  type="number"
                  className="form-control"
                  {...register("warranty", { valueAsNumber: true })}
                />
              </div>
            </div>

            <div className="col-lg-6 col-sm-12">
              <div className="form-group">
                <label>Manufacturer</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("manufacturer")}
                />
              </div>
            </div>

            <div className="col-lg-6 col-sm-12">
              <div className="form-group">
                <label>Manufacture Date</label>
                <input
                  type="date"
                  className="form-control"
                  {...register("manufactureDate", {
                    validate: (value) =>
                      !value ||
                      value.trim() === "" ||
                      new Date(value).toString() !== "Invalid Date" ||
                      "Invalid date format",
                  })}
                />
                {errors.manufactureDate && (
                  <small className="text-danger">
                    {errors.manufactureDate.message}
                  </small>
                )}
              </div>
            </div>

            <div className="col-lg-6 col-sm-12">
              <div className="form-group">
                <label>Expiry Date</label>
                <input
                  type="date"
                  className="form-control"
                  {...register("expiryDate", {
                    validate: (value) =>
                      !value ||
                      value.trim() === "" ||
                      new Date(value).toString() !== "Invalid Date" ||
                      "Invalid date format",
                  })}
                />
                {errors.expiryDate && (
                  <small className="text-danger">
                    {errors.expiryDate.message}
                  </small>
                )}
              </div>
            </div>

            <div className="col-lg-6 col-sm-12">
              <div className="form-group">
                <label>POS Order</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("posOrder")}
                />
              </div>
            </div>

            <div className="col-lg-6 col-sm-12">
              <div className="form-group">
                <label>Button Color</label>
                <input
                  type="color"
                  className="form-control"
                  defaultValue="#0000ff"
                  {...register("buttonColor")}
                />
              </div>
            </div>

            <div className="col-lg-6 col-sm-12">
              <div className="form-group">
                <label>Order Quantity Limit</label>
                <input
                  type="number"
                  min="1"
                  defaultValue="100"
                  className="form-control"
                  {...register("orderQuantityLimit", {
                    valueAsNumber: true,
                    required: "Order Quantity Limit is required",
                    min: { value: 1, message: "Minimum value is 1" },
                  })}
                />
                {errors.orderQuantityLimit && (
                  <small className="text-danger">
                    {errors.orderQuantityLimit.message}
                  </small>
                )}
              </div>
            </div>

            <div className="col-lg-6 col-sm-12">
              <div className="form-group">
                <label>Volume of Sale</label>
                <input
                  type="number"
                  step="0.1"
                  defaultValue="1.0"
                  className="form-control"
                  {...register("volumeOfSale", { valueAsNumber: true })}
                />
              </div>
            </div>

            {/* Checkboxes */}
            <div className="col-lg-12 col-sm-12">
              <div className="form-group form-check">
                <input
                  type="checkbox"
                  defaultChecked={true}
                  {...register("sellOnPos")}
                />
                <label className="ml-2">Sell On POS</label>
              </div>
              <div className="form-group form-check">
                <input
                  type="checkbox"
                  defaultChecked={true}
                  {...register("sellOnTill")}
                />
                <label className="ml-2">Sell On Till</label>
              </div>
              <div className="form-group form-check">
                <input
                  type="checkbox"
                  defaultChecked={false}
                  {...register("variablePrice")}
                />
                <label className="ml-2">Variable Price</label>
              </div>
              <div className="form-group form-check">
                <input
                  type="checkbox"
                  defaultChecked={false}
                  {...register("taxExempt")}
                />
                <label className="ml-2">Tax Exempt</label>
              </div>
              <div className="form-group form-check">
                <input
                  type="checkbox"
                  defaultChecked={false}
                  {...register("scannableOnly")}
                />
                <label className="ml-2">Scannable Only</label>
              </div>
            </div>

            {/* Submit */}
            <div className="col-lg-12">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={productLoading}
              >
                {productLoading ? "Saving..." : "Save Product"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
