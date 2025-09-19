import { NextRequest, NextResponse } from "next/server";
import axiosInstanceServer from "../../axiosInstanceServer";
import { AxiosError } from "axios";

/**
 * @openapi
 * /products/upload-image:
 *   post:
 *     summary: Upload a product image
 *     tags:
 *       - Products
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - image
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Product image file
 *               isPrimaryImage:
 *                 type: boolean
 *                 description: Whether this is the primary product image
 *               imageAltText:
 *                 type: string
 *                 description: Alternative text for the image
 *               productId:
 *                 type: string
 *                 description: Product ID (only required for adding image to existing product)
 *               sortOrder:
 *                 type: number
 *                 description: Order to display images in (lower numbers first)
 *     responses:
 *       201:
 *         description: Image uploaded successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */

// Helper function to handle form data parsing
async function parseFormData(req: NextRequest) {
  const formData = await req.formData();
  const image = formData.get("image") as File | null;
  const productId = formData.get("productId") as string | null;
  const isPrimaryImage = formData.get("isPrimaryImage") === "true" || formData.get("isPrimary") === "true";
  const imageAltText = formData.get("imageAltText") as string || formData.get("altText") as string || "";
  const sortOrder = parseInt((formData.get("sortOrder") as string) || "0", 10);

  if (!image) {
    throw new Error("No image file provided");
  }

  return {
    image,
    productId,
    isPrimaryImage,
    imageAltText,
    sortOrder,
  };
}

export async function POST(request: NextRequest) {
  try {
    const { image, productId, isPrimaryImage, imageAltText, sortOrder } =
      await parseFormData(request);

    // Get the image buffer
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create a FormData object to send to the backend
    const formData = new FormData();

    // Create a new file from the buffer with the original filename
    const imageFile = new File([buffer], image.name, { type: image.type });
    formData.append("image", imageFile);
    formData.append("contentType", image.type);
    formData.append("fileName", image.name);
    formData.append("fileSize", image.size.toString());
    formData.append("isPrimaryImage", isPrimaryImage.toString());
    formData.append("imageAltText", imageAltText);
    formData.append("sortOrder", sortOrder.toString());

    // Determine the endpoint based on whether a productId is provided
    const endpoint = productId
      ? `/products/${productId}/images`
      : "/products/upload-image";

    // Send the image to the backend API
    const response = await axiosInstanceServer.post(endpoint, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(
      "Upload product image error:",
      axiosError.response?.data || axiosError.message
    );

    return NextResponse.json(
      { error: axiosError.response?.data || "Failed to upload image" },
      { status: axiosError.response?.status || 500 }
    );
  }
}
