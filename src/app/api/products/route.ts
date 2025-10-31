import { NextRequest, NextResponse } from "next/server";
import axiosInstanceServer from "../axiosInstanceServer";
import { AxiosError } from "axios";

// CREATE Company
export async function POST(request: NextRequest) {
  try {
    // Check content type to determine how to handle the request
    const contentType = request.headers.get('content-type') || '';
    
    let requestData;
    
    // Handle multipart/form-data
    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      
      // Create a new FormData to send to the backend
      const backendFormData = new FormData();
      
      // Get product data from JSON string
      const productDataStr = formData.get('productData') as string;
      if (productDataStr) {
        const productData = JSON.parse(productDataStr);
        
        // Add product data fields to the backend FormData
        Object.entries(productData).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            backendFormData.append(key, String(value));
          }
        });
      }
      
      // Process images
      const images = formData.getAll('images') as File[];
      const isPrimaryImages = formData.getAll('isPrimaryImage') as string[];
      const imageAltTexts = formData.getAll('imageAltText') as string[];
      
      // Add images and their metadata to backend FormData
      images.forEach((image, index) => {
        backendFormData.append('images', image);
        
        if (isPrimaryImages[index]) {
          backendFormData.append('isPrimaryImage', isPrimaryImages[index]);
        }
        
        if (imageAltTexts[index]) {
          backendFormData.append('imageAltText', imageAltTexts[index]);
        }
      });
      
      requestData = backendFormData;
    } else {
      // Handle JSON request
      requestData = await request.json();
    }

    const response = await axiosInstanceServer.post("/products", requestData, {
      headers: contentType.includes('multipart/form-data') 
        ? { 'Content-Type': 'multipart/form-data' }
        : { 'Content-Type': 'application/json' }
    });

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(
      "Company products error:",
      axiosError.response?.data || axiosError.message
    );
    return NextResponse.json(
      { error: axiosError.response?.data || "Internal Server Error" },
      { status: axiosError.response?.status || 500 }
    );
  }
}

// GET Companies
export async function GET() {
  try {
    const response = await axiosInstanceServer.get("/products");

    console.log("response", response);

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(
      "Get products error:",
      axiosError.response?.data || axiosError.message
    );
    return NextResponse.json(
      { error: axiosError.response?.data || "Internal Server Error" },
      { status: axiosError.response?.status || 500 }
    );
  }
}
