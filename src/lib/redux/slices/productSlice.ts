// redux/slices/productSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import {
  createproducts,
  getproducts,
  getAllproducts,
  updateproducts,
  deleteproducts,
  uploadProductImage,
  getProductImages,
  deleteProductImage,
} from "../actions/productsAction";
import { Product, ProductImage } from "@/core/interfaces/Products";

interface ProductState {
  products: Product[];
  productImages: Record<string, ProductImage[]>; // keyed by productId
  loading: boolean;
  imageLoading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  productImages: {},
  loading: false,
  imageLoading: false,
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Create Product
    builder.addCase(createproducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createproducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products.push(action.payload as Product); // 👈 tell TS the payload is Product
    });
    builder.addCase(createproducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });

    // Get Products
    builder.addCase(getproducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getproducts.fulfilled, (state, action) => {
      state.loading = false;
      // if backend returns { data: Product[] }
      state.products = action.payload.data as Product[];
    });
    builder.addCase(getproducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Get All Products
    builder.addCase(getAllproducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAllproducts.fulfilled, (state, action) => {
      state.loading = false;

      state.products = Array.isArray(action.payload)
        ? (action.payload as Product[])
        : (action.payload.data as Product[]) || [];
    });
    builder.addCase(getAllproducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Update Product
    builder.addCase(updateproducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateproducts.fulfilled, (state, action) => {
      state.loading = false;
      const updatedProduct = action.payload as Product;
      const index = state.products.findIndex((p) => p.id === updatedProduct.id);
      if (index !== -1) {
        state.products[index] = updatedProduct;
      }
    });
    builder.addCase(updateproducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Delete Product
    builder.addCase(deleteproducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteproducts.fulfilled, (state, action) => {
      state.loading = false;
      const { id } = action.payload as { id: string };
      state.products = state.products.filter((product) => product.id !== id);
    });
    builder.addCase(deleteproducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Upload Product Image
    builder.addCase(uploadProductImage.pending, (state) => {
      state.imageLoading = true;
      state.error = null;
    });
    builder.addCase(uploadProductImage.fulfilled, (state, action) => {
      state.imageLoading = false;
      const { productId, image } = action.payload;

      if (productId && image) {
        // Initialize the images array if it doesn't exist
        if (!state.productImages[productId]) {
          state.productImages[productId] = [];
        }

        // Add the image to the product's images array
        state.productImages[productId].push(image);

        // If the image is set as primary, update the product's main image field
        if (image.isPrimary) {
          const productIndex = state.products.findIndex(
            (p) => p.id === productId
          );
          if (productIndex !== -1) {
            state.products[productIndex].images =
              state.productImages[productId];
          }
        }
      }
    });
    builder.addCase(uploadProductImage.rejected, (state, action) => {
      state.imageLoading = false;
      state.error = action.error.message || "Failed to upload image";
    });

    // Get Product Images
    builder.addCase(getProductImages.pending, (state) => {
      state.imageLoading = true;
      state.error = null;
    });
    builder.addCase(getProductImages.fulfilled, (state, action) => {
      state.imageLoading = false;
      const { productId, images } = action.payload;

      if (productId && Array.isArray(images)) {
        state.productImages[productId] = images;
      }
    });
    builder.addCase(getProductImages.rejected, (state, action) => {
      state.imageLoading = false;
      state.error = action.error.message || "Failed to get product images";
    });

    // Delete Product Image
    builder.addCase(deleteProductImage.pending, (state) => {
      state.imageLoading = true;
      state.error = null;
    });
    builder.addCase(deleteProductImage.fulfilled, (state, action) => {
      state.imageLoading = false;
      const { imageId, data } = action.payload;
      const productId = data?.productId;

      if (productId && imageId && state.productImages[productId]) {
        // Remove the image from the product's images array
        state.productImages[productId] = state.productImages[productId].filter(
          (img) => img.id !== imageId
        );

        // If the deleted image was primary, update the product's main image
        const productIndex = state.products.findIndex(
          (p) => p.id === productId
        );
        if (productIndex !== -1) {
          const hasPrimaryImage = state.productImages[productId].some(
            (img) => img.isPrimary
          );
          if (!hasPrimaryImage) {
            state.products[productIndex].images = undefined;
          } else {
            const primaryImage = state.productImages[productId].find(
              (img) => img.isPrimary
            );
            if (primaryImage) {
              state.products[productIndex].images = [primaryImage];
            }
          }
        }
      }
    });
    builder.addCase(deleteProductImage.rejected, (state, action) => {
      state.imageLoading = false;
      state.error = action.error.message || "Failed to delete image";
    });
  },
});

export default productSlice.reducer;
