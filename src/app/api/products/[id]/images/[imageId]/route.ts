import { NextRequest, NextResponse } from "next/server";
import axiosInstanceServer from "../../../../axiosInstanceServer";
import { AxiosError } from "axios";

interface RouteParams {
  params: Promise<{ id: string; imageId: string }>;
}

// GET a specific product image
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id, imageId } = await params;

    // Make a request to the backend to get the image
    console.log(`Fetching image from backend: products/${id}/images/${imageId}`);
    const response = await axiosInstanceServer.get(
      `/products/${id}/images/${imageId}`,
      {
        responseType: "arraybuffer", // Important for binary responses
      }
    );

    // Get content type from the response
    const contentType = response.headers["content-type"] || "image/jpeg";

    // Return the image as binary data
    return new Response(response.data, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400", // Cache for 24 hours
      },
    });
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(
      "Get product image error:",
      axiosError.response?.data || axiosError.message
    );
    return NextResponse.json(
      { error: axiosError.response?.data || "Internal Server Error" },
      { status: axiosError.response?.status || 500 }
    );
  }
}
