import { NextRequest, NextResponse } from "next/server";
import axiosInstanceServer from "../axiosInstanceServer";
import { AxiosError } from "axios";

// CREATE Company
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const response = await axiosInstanceServer.post("/stock", body);

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(
      "Company stocks error:",
      axiosError.response?.data || axiosError.message
    );
    return NextResponse.json(
      { error: axiosError.response?.data || "Internal Server Error" },
      { status: axiosError.response?.status || 500 }
    );
  }
}

// GET Companies
export async function GET() {
  try {
    const response = await axiosInstanceServer.get("/stock");

    console.log("response", response);

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(
      "Get stocks error:",
      axiosError.response?.data || axiosError.message
    );
    return NextResponse.json(
      { error: axiosError.response?.data || "Internal Server Error" },
      { status: axiosError.response?.status || 500 }
    );
  }
}
