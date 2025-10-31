"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";

import { Product } from "@/core/interfaces/Products";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { getAllCateogry } from "@/lib/redux/actions/categoryActions";
import { getAllBrands } from "@/lib/redux/actions/brandAction";

import { getAllTaxRates, TaxRate } from "@/lib/redux/actions/taxratesAction";
import {
  createproducts,
} from "@/lib/redux/actions/productsAction";
import { Brands } from "@/core/interfaces/Brands";
import { Cateogry } from "@/core/interfaces/Cateogry";

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

  // Add state for image upload
  const [productImages, setProductImages] = useState<
    Array<{
      file: File;
      preview: string;
      isPrimary: boolean;
      altText: string;
      sortOrder: number;
    }>
  >([]);
  const [uploading, setUploading] = useState(false);

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

  // Handle image selection and preview
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    
    // Check if we've reached the maximum number of images
    if (productImages.length >= 5) {
      setErrorMessage("Maximum of 5 images allowed. Please remove an image before adding more.");
      return;
    }
    
    const file = files[0];
    const reader = new FileReader();
    
    reader.onloadend = () => {
      // Add the new image to the array, making it primary if it's the first one
      setProductImages((prev) => {
        const isPrimary = prev.length === 0;
        return [
          ...prev,
          {
            file,
            preview: reader.result as string,
            isPrimary,
            altText: "",
            sortOrder: prev.length,
          },
        ];
      });
    };

    reader.readAsDataURL(file);

    // Reset the input value so the same file can be selected again
    event.target.value = "";
  };  // Set an image as primary
  const setPrimaryImage = (index: number) => {
    setProductImages((prev) =>
      prev.map((img, i) => ({
        ...img,
        isPrimary: i === index,
      }))
    );
  };

  // Remove an image from the array
  const removeImage = (index: number) => {
    setProductImages((prev) => {
      const newImages = prev.filter((_, i) => i !== index);

      // If we removed the primary image and there are other images,
      // make the first one primary
      if (prev[index].isPrimary && newImages.length > 0) {
        newImages[0].isPrimary = true;
      }

      // Update sort orders
      return newImages.map((img, i) => ({
        ...img,
        sortOrder: i,
      }));
    });
  };

  // Update alt text for an image
  const updateAltText = (index: number, text: string) => {
    setProductImages((prev) =>
      prev.map((img, i) => (i === index ? { ...img, altText: text } : img))
    );
  };

  const onSubmit = async (data: Product) => {
    // Clear previous messages
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      // Prepare the product data
      const productData: Partial<Product> = {
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

      // If we have images, prepare them for upload
      if (productImages.length > 0) {
        setUploading(true);
        
        // Extract the image files, primary status, and alt text
        const imageFiles = productImages.map(img => img.file);
        const isPrimaryImages = productImages.map(img => img.isPrimary);
        const imageAltTexts = productImages.map(img => img.altText);
        
        try {
          // Create product with images
          await dispatch(
            createproducts({
              productData,
              imageFiles,
              isPrimaryImages,
              imageAltTexts
            })
          ).unwrap();
          
          setSuccessMessage("Product created successfully!");
          reset(); // Reset the form
          setProductImages([]); // Clear images

          // Clear success message after 5 seconds
          setTimeout(() => {
            setSuccessMessage(null);
          }, 5000);
        } catch (error) {
          console.error("Error creating product:", error);
          setErrorMessage("Failed to create product with images. Please try again.");
        } finally {
          setUploading(false);
        }
      } else {
        // Create product without images
        await dispatch(createproducts({ productData }))
          .unwrap()
          .then(() => {
            setSuccessMessage("Product created successfully!");
            reset(); // Reset the form

            // Clear success message after 5 seconds
            setTimeout(() => {
              setSuccessMessage(null);
            }, 5000);
          })
          .catch((err: Error) => {
            console.error("Failed to create product:", err);
            setErrorMessage(
              err.message || "Failed to create product. Please try again."
            );
          });
      }
    } catch (error: unknown) {
      console.error("Error in form submission:", error);
      setErrorMessage(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    }
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
                <label>
                  Product Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  {...register("name", { required: true })}
                />
                {errors.name && (
                  <small className="text-danger">
                    Product name is required
                  </small>
                )}
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

            {/* Image Upload */}
            <div className="col-lg-12 col-sm-12">
              <div className="form-group">
                <label>Product Images (Up to 5 images)</label>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={handleImageChange}
                  disabled={productImages.length >= 5}
                />
                <small className="text-muted">
                  You can add up to 5 images. Select one image at a time. Mark one image as primary.
                </small>

                {productImages.length > 0 && (
                  <div className="mt-3">
                    <div className="d-flex flex-wrap gap-3">
                      {productImages.map((img, index) => (
                        <div
                          key={index}
                          className="position-relative border rounded p-2"
                          style={{ width: "200px" }}
                        >
                          <div className="position-absolute top-0 end-0 badge bg-light text-dark p-2">
                            {index + 1} / {productImages.length}
                          </div>
                          
                          <Image
                            src={img.preview}
                            alt={`Product preview ${index + 1}`}
                            width={200}
                            height={150}
                            style={{ objectFit: "contain" }}
                            className={`mb-2 ${
                              img.isPrimary ? "border border-primary" : ""
                            }`}
                          />

                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control form-control-sm"
                              placeholder="Alt text"
                              value={img.altText}
                              onChange={(e) =>
                                updateAltText(index, e.target.value)
                              }
                            />
                          </div>

                          <div className="d-flex justify-content-between mt-2">
                            <button
                              type="button"
                              className={`btn btn-sm ${
                                img.isPrimary
                                  ? "btn-primary"
                                  : "btn-outline-primary"
                              }`}
                              onClick={() => setPrimaryImage(index)}
                              disabled={img.isPrimary}
                            >
                              {img.isPrimary ? "Primary" : "Set Primary"}
                            </button>

                            <button
                              type="button"
                              className="btn btn-sm btn-danger"
                              onClick={() => removeImage(index)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {productImages.length >= 5 && (
                      <div className="alert alert-info mt-2">
                        Maximum number of images reached (5).
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Dropdowns */}
            <div className="col-lg-6 col-sm-12">
              <div className="form-group">
                <label>
                  Category <span className="text-danger">*</span>
                </label>
                <select
                  className="form-control"
                  {...register("categoryId", {
                    required: "Category is required",
                  })}
                >
                  <option value="">Select Category</option>
                  {categories?.map((cat: Cateogry) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                {errors.categoryId && (
                  <small className="text-danger">
                    {errors.categoryId.message}
                  </small>
                )}
              </div>
            </div>

            <div className="col-lg-6 col-sm-12">
              <div className="form-group">
                <label>
                  Brand <span className="text-danger">*</span>
                </label>
                <select
                  className="form-control"
                  {...register("brandId", { required: "Brand is required" })}
                >
                  <option value="">Select Brand</option>
                  {brands?.map((brand: Brands) => (
                    <option key={brand.id} value={brand.id}>
                      {brand.name}
                    </option>
                  ))}
                </select>
                {errors.brandId && (
                  <small className="text-danger">
                    {errors.brandId.message}
                  </small>
                )}
              </div>
            </div>

            <div className="col-lg-6 col-sm-12">
              <div className="form-group">
                <label>
                  Tax Rate <span className="text-danger">*</span>
                </label>
                <select
                  className="form-control"
                  {...register("taxRateId", {
                    required: "Tax rate is required",
                  })}
                >
                  <option value="">Select Tax Rate</option>
                  {taxRates?.map((tax: TaxRate) => (
                    <option key={tax.id} value={tax.id}>
                      {tax.name} ({tax.percentage}%)
                    </option>
                  ))}
                </select>
                {errors.taxRateId && (
                  <small className="text-danger">
                    {errors.taxRateId.message}
                  </small>
                )}
              </div>
            </div>

            {/* Pricing */}
            <div className="col-lg-6 col-sm-12">
              <div className="form-group">
                <label>
                  Cost Price <span className="text-danger">*</span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  {...register("costPrice", {
                    required: "Cost price is required",
                    valueAsNumber: true,
                    min: {
                      value: 0,
                      message: "Cost price must be a positive number",
                    },
                  })}
                />
                {errors.costPrice && (
                  <small className="text-danger">
                    {errors.costPrice.message}
                  </small>
                )}
              </div>
            </div>

            <div className="col-lg-6 col-sm-12">
              <div className="form-group">
                <label>
                  Sale Price <span className="text-danger">*</span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  {...register("salePrice", {
                    required: "Sale price is required",
                    valueAsNumber: true,
                    min: {
                      value: 0,
                      message: "Sale price must be a positive number",
                    },
                  })}
                />
                {errors.salePrice && (
                  <small className="text-danger">
                    {errors.salePrice.message}
                  </small>
                )}
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
                <label>
                  Unit Of Sale <span className="text-danger">*</span>
                </label>
                <select
                  className="form-control"
                  defaultValue="each"
                  {...register("unitOfSale", {
                    required: "Unit of sale is required",
                  })}
                >
                  <option value="">Select unit of sale</option>
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
                {errors.unitOfSale && (
                  <small className="text-danger">
                    {errors.unitOfSale.message}
                  </small>
                )}
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
                disabled={productLoading || uploading}
              >
                {productLoading || uploading ? "Saving..." : "Save Product"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
