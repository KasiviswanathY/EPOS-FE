import { NextRequest, NextResponse } from "next/server";
import axiosInstanceServer from "../../axiosInstanceServer";
import { AxiosError } from "axios";
import { apiRoutes } from "@/lib/redux/constants/api_routes";

// POST bulk stock movements
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const response = await axiosInstanceServer.post(
      `${apiRoutes.stockMovements}/bulk`,
      body
    );

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(
      "Bulk stock movements creation error:",
      axiosError.response?.data || axiosError.message
    );
    return NextResponse.json(
      { error: axiosError.response?.data || "Failed to create bulk stock movements" },
      { status: axiosError.response?.status || 500 }
    );
  }
}