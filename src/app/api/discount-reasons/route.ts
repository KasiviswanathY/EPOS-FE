import { NextRequest, NextResponse } from "next/server";
import axiosInstanceServer from "../axiosInstanceServer";
import { AxiosError } from "axios";
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (
      body.defaultValue !== undefined &&
      typeof body.defaultValue !== "number"
    ) {
      const parsedValue = parseFloat(body.defaultValue);
      body.defaultValue = isNaN(parsedValue) ? null : parsedValue;
    }
    const response = await axiosInstanceServer.post(
      "/discount-reasons",
      body
    );
    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(
      "Discount reason creation error:",
      axiosError.response?.data || axiosError.message
    );
    return NextResponse.json(
      { error: axiosError.response?.data || "Internal Server Error" },
      { status: axiosError.response?.status || 500 }
    );
  }
}

export async function GET() {
  try {
    const response = await axiosInstanceServer.get("/discount-reasons");

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(
      "Get discount reasons error:",
      axiosError.response?.data || axiosError.message
    );
    return NextResponse.json(
      { error: axiosError.response?.data || "Internal Server Error" },
      { status: axiosError.response?.status || 500 }
    );
  }
}