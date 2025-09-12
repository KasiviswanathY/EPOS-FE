import { NextRequest, NextResponse } from "next/server";
import { AxiosError } from "axios";
import axiosInstanceServer from "../../axiosInstanceServer";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// ✅ GET Stock by ID
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    const response = await axiosInstanceServer.get(`/stock/${id}`);

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(
      "Get stock error:",
      axiosError.response?.data || axiosError.message
    );

    return NextResponse.json(
      { error: axiosError.response?.data || "Internal Server Error" },
      { status: axiosError.response?.status || 500 }
    );
  }
}

// ✅ UPDATE Stock by ID (PATCH)
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();

    const response = await axiosInstanceServer.patch(`/stock/${id}`, body);

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(
      "Update stock error:",
      axiosError.response?.data || axiosError.message
    );

    return NextResponse.json(
      { error: axiosError.response?.data || "Internal Server Error" },
      { status: axiosError.response?.status || 500 }
    );
  }
}

// ✅ DELETE Stock by ID
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    const response = await axiosInstanceServer.delete(`/stock/${id}`);

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(
      "Delete stock error:",
      axiosError.response?.data || axiosError.message
    );

    return NextResponse.json(
      { error: axiosError.response?.data || "Internal Server Error" },
      { status: axiosError.response?.status || 500 }
    );
  }
}
