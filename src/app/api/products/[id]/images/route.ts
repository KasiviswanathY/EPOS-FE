import { NextRequest, NextResponse } from "next/server";
import axiosInstanceServer from "../../../axiosInstanceServer";
import { AxiosError } from "axios";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET product images
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    const response = await axiosInstanceServer.get(`/products/${id}/images`);

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(
      "Get product images error:",
      axiosError.response?.data || axiosError.message
    );
    return NextResponse.json(
      { error: axiosError.response?.data || "Internal Server Error" },
      { status: axiosError.response?.status || 500 }
    );
  }
}

// POST a new image to a product
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    // Parse form data from the request
    const formData = await request.formData();

    // Get the image file
    const imageFile = formData.get("image") as File | null;

    if (!imageFile) {
      return NextResponse.json(
        { error: "No image file provided" },
        { status: 400 }
      );
    }

    // Create a new form data to send to the backend
    const backendFormData = new FormData();

    // Get the image buffer
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Add the image file
    backendFormData.append(
      "image",
      new File([buffer], imageFile.name, { type: imageFile.type })
    );

    // Add metadata
    backendFormData.append("contentType", imageFile.type);
    backendFormData.append("fileName", imageFile.name);
    backendFormData.append("fileSize", imageFile.size.toString());

    // Add optional fields
    const isPrimary = formData.get("isPrimary");
    if (isPrimary !== null) {
      backendFormData.append("isPrimary", isPrimary as string);
    }

    const altText = formData.get("altText");
    if (altText !== null) {
      backendFormData.append("altText", altText as string);
    }

    const sortOrder = formData.get("sortOrder");
    if (sortOrder !== null) {
      backendFormData.append("sortOrder", sortOrder as string);
    }

    // Send to backend API
    const response = await axiosInstanceServer.post(
      `/products/${id}/images`,
      backendFormData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(
      "Upload product image error:",
      axiosError.response?.data || axiosError.message
    );
    return NextResponse.json(
      { error: axiosError.response?.data || "Internal Server Error" },
      { status: axiosError.response?.status || 500 }
    );
  }
}

// DELETE a product image
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const imageId = searchParams.get("imageId");

    if (!imageId) {
      return NextResponse.json(
        { error: "Image ID is required" },
        { status: 400 }
      );
    }

    const response = await axiosInstanceServer.delete(
      `/products/${id}/images/${imageId}`
    );

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(
      "Delete product image error:",
      axiosError.response?.data || axiosError.message
    );
    return NextResponse.json(
      { error: axiosError.response?.data || "Internal Server Error" },
      { status: axiosError.response?.status || 500 }
    );
  }
}
