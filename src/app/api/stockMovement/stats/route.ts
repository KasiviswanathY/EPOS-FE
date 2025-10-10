import { NextRequest, NextResponse } from "next/server";
import axiosInstanceServer from "../../axiosInstanceServer";
import { AxiosError } from "axios";
import { apiRoutes } from "@/lib/redux/constants/api_routes";

// GET stock movement statistics
export async function GET(request: NextRequest) {
  try {
    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const stockId = searchParams.get('stockId');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    
    // Build query string
    const params = new URLSearchParams();
    if (stockId) params.append('stockId', stockId);
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    
    const queryString = params.toString();
    const url = queryString
      ? `${apiRoutes.stockMovements}/stats?${queryString}`
      : `${apiRoutes.stockMovements}/stats`;

    const response = await axiosInstanceServer.get(url);

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(
      "Get stock movement statistics error:",
      axiosError.response?.data || axiosError.message
    );
    return NextResponse.json(
      { error: axiosError.response?.data || "Failed to fetch stock movement statistics" },
      { status: axiosError.response?.status || 500 }
    );
  }
}