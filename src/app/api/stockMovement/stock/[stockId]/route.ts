import { NextRequest, NextResponse } from "next/server";
import axiosInstanceServer from "../../../axiosInstanceServer";
import { AxiosError } from "axios";
import { apiRoutes } from "@/lib/redux/constants/api_routes";

interface RouteParams {
  params: Promise<{ stockId: string }>;
}

// GET stock movements by stock ID
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { stockId } = await params;

    const response = await axiosInstanceServer.get(
      `${apiRoutes.stockMovements}/stock/${stockId}`
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
