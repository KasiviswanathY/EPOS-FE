import { NextRequest, NextResponse } from "next/server";
import { AxiosError } from "axios";
import axiosInstanceServer from "../axiosInstanceServer";

// GET all tax rates
export async function GET(request: NextRequest) {
  try {
    // Forward query params for pagination if they exist
    const { searchParams } = new URL(request.url);
    const response = await axiosInstanceServer.get(`/tax-rates?${searchParams}`);
    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    const axiosError = error as AxiosError;
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// CREATE a new tax rate
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // The client should send the percentage as a number, so no conversion is needed here.
    const response = await axiosInstanceServer.post("/tax-rates", body);
    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    const axiosError = error as AxiosError;
    return NextResponse.json(
      { error: axiosError.response?.data || "Internal Server Error" },
      { status: axiosError.response?.status || 500 }
    );
  }
}