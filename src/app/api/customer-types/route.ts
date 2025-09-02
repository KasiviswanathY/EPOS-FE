
import { NextRequest, NextResponse } from "next/server";
// import { axiosInstanceServer } from "@/lib/axios/axiosInstanceServer";
import { AxiosError } from "axios";
import axiosInstanceServer from "../axiosInstanceServer";

// GET all customer types
export async function GET(request: NextRequest) {
  try {
    const response = await axiosInstanceServer.get("/customer-types");
    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// CREATE a new customer type
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // Add server-side validation for the discount field
    if (body.discount !== undefined && typeof body.discount !== "number") {
      body.discount = parseFloat(body.discount) || 0;
    }
    const response = await axiosInstanceServer.post("/customer-types", body);
    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    const axiosError = error as AxiosError;
    return NextResponse.json(
      { error: axiosError.response?.data || "Internal Server Error" },
      { status: axiosError.response?.status || 500 }
    );
  }
}