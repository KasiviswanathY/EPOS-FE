import { NextRequest, NextResponse } from "next/server";
import axiosInstanceServer from "../../axiosInstanceServer";
import { AxiosError } from "axios";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// ================== GET Refund Reason by ID ==================
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    const response = await axiosInstanceServer.get(`/refund-reasons/${id}`);

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(
      "Get refund reason error:",
      axiosError.response?.data || axiosError.message
    );
    return NextResponse.json(
      { error: axiosError.response?.data || "Internal Server Error" },
      { status: axiosError.response?.status || 500 }
    );
  }
}

// ================== UPDATE Refund Reason by ID ==================
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();

    // ✅ Ensure returnToStock is boolean if present
    if (body.returnToStock !== undefined) {
      body.returnToStock = Boolean(body.returnToStock);
    }

    // ✅ Send body directly (no `data` wrapper)
    const response = await axiosInstanceServer.patch(
      `/refund-reasons/${id}`,
      body
    );

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(
      "Update refund reason error:",
      axiosError.response?.data || axiosError.message
    );
    return NextResponse.json(
      { error: axiosError.response?.data || "Internal Server Error" },
      { status: axiosError.response?.status || 500 }
    );
  }
}

// ================== DELETE Refund Reason by ID ==================
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    const response = await axiosInstanceServer.delete(`/refund-reasons/${id}`);

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(
      "Delete refund reason error:",
      axiosError.response?.data || axiosError.message
    );
    return NextResponse.json(
      { error: axiosError.response?.data || "Internal Server Error" },
      { status: axiosError.response?.status || 500 }
    );
  }
}
