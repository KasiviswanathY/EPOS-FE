import { NextRequest, NextResponse } from "next/server";
import axiosInstanceServer from "../axiosInstanceServer";
import { AxiosError } from "axios";
import { apiRoutes } from "@/lib/redux/constants/api_routes";

// CREATE stock movement
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const response = await axiosInstanceServer.post(
      `${apiRoutes.stockMovements}`,
      body
    );

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(
      "Stock movement creation error:",
      axiosError.response?.data || axiosError.message
    );
    return NextResponse.json(
      { error: axiosError.response?.data || "Failed to create stock movement" },
      { status: axiosError.response?.status || 500 }
    );
  }
}

// GET all stock movements
export async function GET() {
  try {
    const response = await axiosInstanceServer.get(
      `${apiRoutes.stockMovements}`
    );

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(
      "Get stock movements error:",
      axiosError.response?.data || axiosError.message
    );
    return NextResponse.json(
      { error: axiosError.response?.data || "Failed to fetch stock movements" },
      { status: axiosError.response?.status || 500 }
    );
  }
}
