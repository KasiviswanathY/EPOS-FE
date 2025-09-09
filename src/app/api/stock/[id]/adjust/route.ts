import { NextRequest, NextResponse } from "next/server";
import { AxiosError } from "axios";
import axiosInstanceServer from "@/app/api/axiosInstanceServer";
// import axiosInstanceServer from "../axiosInstanceServer";

// ✅ CREATE a new stock record
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Ensure numeric fields are parsed correctly
    const numericFields = ["quantity", "minStockLevel", "maxStockLevel", "reorderLevel"];
    for (const field of numericFields) {
      if (body[field] !== undefined) {
        body[field] = parseFloat(body[field]) || 0;
      }
    }

    const response = await axiosInstanceServer.post("/stock", body);

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error("Create stock error:", axiosError.response?.data || axiosError.message);

    return NextResponse.json(
      { error: axiosError.response?.data || "Internal Server Error" },
      { status: axiosError.response?.status || 500 }
    );
  }
}
