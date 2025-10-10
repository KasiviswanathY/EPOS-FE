import { createAsyncThunk } from "@reduxjs/toolkit";

import axios, { AxiosError } from "axios";

import { Product } from "@/core/interfaces/Products";

interface UpdateproductsPayload {
  id: string;
  data: Partial<Product>;
}

interface UploadProductImagePayload {
  image: File;
  productId?: string;
  isPrimaryImage?: boolean;
  imageAltText?: string;
  sortOrder?: number;
}

interface CreateProductPayload {
  productData: Partial<Product>;
  imageFiles?: File[];
  isPrimaryImages?: boolean[];
  imageAltTexts?: string[];
}

export const uploadProductImage = createAsyncThunk(
  "products/uploadImage",
  async (
    {
      image,
      productId,
      isPrimaryImage = false,
      imageAltText = "",
      sortOrder = 0,
    }: UploadProductImagePayload,
    thunkAPI
  ) => {
    try {
      const formData = new FormData();
      formData.append("image", image);

      if (productId) {
        formData.append("productId", productId);
      }

      formData.append("isPrimaryImage", isPrimaryImage.toString());
      formData.append("imageAltText", imageAltText);
      formData.append("sortOrder", sortOrder.toString());

      const response = await axios.post(
        "/api/products/upload-image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return thunkAPI.rejectWithValue(
        axiosError.response?.data || "Failed to upload product image"
      );
    }
  }
);

export const getProductImages = createAsyncThunk(
  "products/getImages",
  async (productId: string, thunkAPI) => {
    try {
      const response = await axios.get(`/api/products/${productId}/images`);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return thunkAPI.rejectWithValue(
        axiosError.response?.data || "Failed to get product images"
      );
    }
  }
);

export const deleteProductImage = createAsyncThunk(
  "products/deleteImage",
  async (
    { productId, imageId }: { productId: string; imageId: string },
    thunkAPI
  ) => {
    try {
      const response = await axios.delete(
        `/api/products/${productId}/images?imageId=${imageId}`
      );
      return { imageId, data: response.data };
    } catch (error) {
      const axiosError = error as AxiosError;
      return thunkAPI.rejectWithValue(
        axiosError.response?.data || "Failed to delete product image"
      );
    }
  }
);

export const createproducts = createAsyncThunk(
  "products/create",
  async ({ productData, imageFiles, isPrimaryImages, imageAltTexts }: CreateProductPayload, thunkAPI) => {
    try {
      // If we have image files, use FormData to send multipart/form-data
      if (imageFiles && imageFiles.length > 0) {
        const formData = new FormData();
        
        // Add product data as a single JSON string field
        formData.append('productData', JSON.stringify(productData));
        
        // Add images
        imageFiles.forEach((file) => {
          formData.append('images', file);
        });
        
        // Add image metadata
        if (isPrimaryImages) {
          isPrimaryImages.forEach((isPrimary) => {
            formData.append('isPrimaryImage', isPrimary.toString());
          });
        }
        
        if (imageAltTexts) {
          imageAltTexts.forEach((altText) => {
            formData.append('imageAltText', altText || '');
          });
        }
        
        const response = await axios.post("/api/products", formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        return response.data;
      } else {
        // If no images, use regular JSON request
        const response = await axios.post("/api/products", productData);
        return response.data;
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      return thunkAPI.rejectWithValue(
        axiosError.response?.data || "Failed to create products"
      );
    }
  }
);

export const getAllproducts = createAsyncThunk(
  "products/getAllproducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/products");

      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to fetch products"
      );
    }
  }
);

export const getproducts = createAsyncThunk(
  "products/getproducts",
  async (productId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/products/${productId}`);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to fetch products"
      );
    }
  }
);

export const updateproducts = createAsyncThunk(
  "products/updateproducts",
  async ({ id, data }: UpdateproductsPayload, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`/api/products/${id}`, data);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to update products"
      );
    }
  }
);

export const deleteproducts = createAsyncThunk(
  "products/deleteproducts",
  async (productId: string, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/api/products/${productId}`);
      return { id: productId, data: response.data };
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to delete products"
      );
    }
  }
);