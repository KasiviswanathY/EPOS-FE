import { NextRequest, NextResponse } from "next/server";
// import { axiosInstanceServer } from "@/lib/axios/axiosInstanceServer";
import { AxiosError } from "axios";
import axiosInstanceServer from "../axiosInstanceServer";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const response = await axiosInstanceServer.get(`/stock?${searchParams}`);
    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const numericFields = ['quantity', 'minStockLevel', 'maxStockLevel', 'reorderLevel'];
    for (const field of numericFields) {
      if (body[field] !== undefined) {
        body[field] = parseFloat(body[field]) || 0;
      }
    }
    const response = await axiosInstanceServer.post("/stock", body);
    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    const axiosError = error as AxiosError;
    return NextResponse.json(
      { error: axiosError.response?.data || "Internal Server Error" },
      { status: axiosError.response?.status || 500 }
    );
  }
}