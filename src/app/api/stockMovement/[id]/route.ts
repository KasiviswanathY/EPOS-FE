import { NextRequest, NextResponse } from "next/server";
import axiosInstanceServer from "../../axiosInstanceServer";
import { AxiosError } from "axios";
import { apiRoutes } from "@/lib/redux/constants/api_routes";

interface RouteParams {
  params: Promise<{ id: string }>;
}
// GET a specific stock movement by ID
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    const response = await axiosInstanceServer.get(
      `${apiRoutes.stockMovements}/${id}`
    );

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(
      "Get stock movement error:",
      axiosError.response?.data || axiosError.message
    );
    return NextResponse.json(
      { error: axiosError.response?.data || "Failed to fetch stock movement" },
      { status: axiosError.response?.status || 500 }
    );
  }
}

// UPDATE a stock movement
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();

    const response = await axiosInstanceServer.put(
      `${apiRoutes.stockMovements}/${id}`,
      body
    );

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(
      "Update stock movement error:",
      axiosError.response?.data || axiosError.message
    );
    return NextResponse.json(
      { error: axiosError.response?.data || "Failed to update stock movement" },
      { status: axiosError.response?.status || 500 }
    );
  }
}

// DELETE a stock movement
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    const response = await axiosInstanceServer.delete(
      `${apiRoutes.stockMovements}/${id}`
    );

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(
      "Delete stock movement error:",
      axiosError.response?.data || axiosError.message
    );
    return NextResponse.json(
      { error: axiosError.response?.data || "Failed to delete stock movement" },
      { status: axiosError.response?.status || 500 }
    );
  }
}
