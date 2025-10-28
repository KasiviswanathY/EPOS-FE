import { NextRequest, NextResponse } from "next/server";
import axiosInstanceServer from "../axiosInstanceServer";
import { AxiosError } from "axios";

// CREATE
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const response = await axiosInstanceServer.post("/opening-hours", body);
    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    const axiosError = error as AxiosError;
    return NextResponse.json(
      { error: axiosError.response?.data || "Internal Server Error" },
      { status: axiosError.response?.status || 500 }
    );
  }
}

// GET ALL
export async function GET() {
  try {
    const response = await axiosInstanceServer.get("/opening-hours");
    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    const axiosError = error as AxiosError;
    return NextResponse.json(
      { error: axiosError.response?.data || "Internal Server Error" },
      { status: axiosError.response?.status || 500 }
    );
  }
}
