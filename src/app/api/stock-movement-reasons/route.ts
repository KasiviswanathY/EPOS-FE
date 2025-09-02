import { NextRequest, NextResponse } from "next/server";
import { AxiosError } from "axios";
import axiosInstanceServer from "../axiosInstanceServer";

// GET all reasons
export async function GET() {
  try {
    const response = await axiosInstanceServer.get("/stock-movement-reasons");
    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// CREATE a new reason
export async function POST(request: NextRequest) {
  try {
    const body = await request.json(); // { reason: "..." }
    const response = await axiosInstanceServer.post("/stock-movement-reasons", body);
    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    const axiosError = error as AxiosError;
    return NextResponse.json(
      { error: axiosError.response?.data || "Internal Server Error" },
      { status: axiosError.response?.status || 500 }
    );
  }
}
