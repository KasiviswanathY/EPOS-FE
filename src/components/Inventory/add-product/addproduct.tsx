"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { Product } from "@/core/interfaces/Products";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { getAllCateogry } from "@/lib/redux/actions/categoryActions";
import { getAllBrands } from "@/lib/redux/actions/brandAction";
import { createproducts } from "@/lib/redux/actions/productsAction";
import { getAllTaxRates } from "@/lib/redux/actions/taxratesAction";

export default function AddProduct() {
  const dispatch = useDispatch<AppDispatch>();

  // redux state
  const { categories, loading: categoryLoading } = useSelector((state: RootState) => state.categories);
  const { brands, loading: brandLoading } = useSelector((state: RootState) => state.brand);
  const { taxRates, loading: taxRateLoading } = useSelector((state: RootState) => state.taxrates);
  const { loading: productLoading, error } = useSelector((state: RootState) => state.products);

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
    const payload: Product = {
      ...data,
      costPrice: Number(data.costPrice),
      salePrice: Number(data.salePrice),
      rrp: Number(data.rrp),
      rating: Number(data.rating),
      warranty: Number(data.warranty),
      orderQuantityLimit: Number(data.orderQuantityLimit),
      volumeOfSale: Number(data.volumeOfSale),
      manufactureDate: data.manufactureDate ? new Date(data.manufactureDate).toISOString() : "",
      expiryDate: data.expiryDate ? new Date(data.expiryDate).toISOString() : "",
    };

    dispatch(createproducts(payload));
    reset();
  };

  // ✅ Show full-page loader if dropdowns are still fetching
  if (categoryLoading || brandLoading || taxRateLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
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
                  {categories?.map((cat: any) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                {errors.categoryId && <small className="text-danger">Required</small>}
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
                  {brands?.map((brand: any) => (
                    <option key={brand.id} value={brand.id}>
                      {brand.name}
                    </option>
                  ))}
                </select>
                {errors.brandId && <small className="text-danger">Required</small>}
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
                  {taxRates?.map((tax: any) => (
                    <option key={tax.id} value={tax.id}>
                      {tax.name} ({tax.rate}%)
                    </option>
                  ))}
                </select>
                {errors.taxRateId && <small className="text-danger">Required</small>}
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
                  {...register("costPrice", { required: true, valueAsNumber: true })}
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
                  {...register("salePrice", { required: true, valueAsNumber: true })}
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
                <input type="text" className="form-control" {...register("unitOfSale")} />
              </div>
            </div>

            <div className="col-lg-6 col-sm-12">
              <div className="form-group">
                <label>Rating</label>
                <input type="number" className="form-control" {...register("rating", { valueAsNumber: true })} />
              </div>
            </div>

            <div className="col-lg-6 col-sm-12">
              <div className="form-group">
                <label>Warranty (months)</label>
                <input type="number" className="form-control" {...register("warranty", { valueAsNumber: true })} />
              </div>
            </div>

            <div className="col-lg-6 col-sm-12">
              <div className="form-group">
                <label>Manufacturer</label>
                <input type="text" className="form-control" {...register("manufacturer")} />
              </div>
            </div>

            <div className="col-lg-6 col-sm-12">
              <div className="form-group">
                <label>Manufacture Date</label>
                <input type="date" className="form-control" {...register("manufactureDate")} />
              </div>
            </div>

            <div className="col-lg-6 col-sm-12">
              <div className="form-group">
                <label>Expiry Date</label>
                <input type="date" className="form-control" {...register("expiryDate")} />
              </div>
            </div>

            <div className="col-lg-6 col-sm-12">
              <div className="form-group">
                <label>POS Order</label>
                <input type="text" className="form-control" {...register("posOrder")} />
              </div>
            </div>

            <div className="col-lg-6 col-sm-12">
              <div className="form-group">
                <label>Button Color</label>
                <input type="color" className="form-control" {...register("buttonColor")} />
              </div>
            </div>

            <div className="col-lg-6 col-sm-12">
              <div className="form-group">
                <label>Order Quantity Limit</label>
                <input type="number" className="form-control" {...register("orderQuantityLimit", { valueAsNumber: true })} />
              </div>
            </div>

            <div className="col-lg-6 col-sm-12">
              <div className="form-group">
                <label>Volume of Sale</label>
                <input type="number" className="form-control" {...register("volumeOfSale", { valueAsNumber: true })} />
              </div>
            </div>

            {/* Checkboxes */}
            <div className="col-lg-12 col-sm-12">
              <div className="form-group form-check">
                <input type="checkbox" {...register("sellOnPos")} />
                <label className="ml-2">Sell On POS</label>
              </div>
              <div className="form-group form-check">
                <input type="checkbox" {...register("sellOnTill")} />
                <label className="ml-2">Sell On Till</label>
              </div>
              <div className="form-group form-check">
                <input type="checkbox" {...register("variablePrice")} />
                <label className="ml-2">Variable Price</label>
              </div>
              <div className="form-group form-check">
                <input type="checkbox" {...register("taxExempt")} />
                <label className="ml-2">Tax Exempt</label>
              </div>
              <div className="form-group form-check">
                <input type="checkbox" {...register("scannableOnly")} />
                <label className="ml-2">Scannable Only</label>
              </div>
            </div>

            {/* Submit */}
            <div className="col-lg-12">
              <button type="submit" className="btn btn-primary" disabled={productLoading}>
                {productLoading ? "Saving..." : "Save Product"}
              </button>
              {error && <p className="text-danger mt-2">{error}</p>}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
