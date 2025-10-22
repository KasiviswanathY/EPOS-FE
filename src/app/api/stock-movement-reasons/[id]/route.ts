import { NextRequest, NextResponse } from "next/server";
import axiosInstanceServer from "../../axiosInstanceServer";
import { AxiosError } from "axios";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET Stock Movement Reason by ID
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const response = await axiosInstanceServer.get(`/stock-movement-reasons/${id}`);
    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(
      "Get stock movement reason error:",
      axiosError.response?.data || axiosError.message
    );
    return NextResponse.json(
      { error: axiosError.response?.data || "Internal Server Error" },
      { status: axiosError.response?.status || 500 }
    );
  }
}

// UPDATE Stock Movement Reason by ID
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();
    const response = await axiosInstanceServer.put(`/stock-movement-reasons/${id}`, body);
    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(
      "Update stock movement reason error:",
      axiosError.response?.data || axiosError.message
    );
    return NextResponse.json(
      { error: axiosError.response?.data || "Internal Server Error" },
      { status: axiosError.response?.status || 500 }
    );
  }
}

// DELETE Stock Movement Reason by ID
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const response = await axiosInstanceServer.delete(`/stock-movement-reasons/${id}`);
    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(
      "Delete stock movement reason error:",
      axiosError.response?.data || axiosError.message
    );
    return NextResponse.json(
      { error: axiosError.response?.data || "Internal Server Error" },
      { status: axiosError.response?.status || 500 }
    );
  }
}
