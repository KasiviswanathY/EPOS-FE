import { NextRequest, NextResponse } from "next/server";
import axiosInstanceServer from "../axiosInstanceServer";
import { AxiosError } from "axios";


// ================== CREATE no-sale Reason ==================

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const response = await axiosInstanceServer.post(
      "/no-sale-reasons",
      body
    );
    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(
      "no-sale reason creation error:",
      axiosError.response?.data || axiosError.message
    );
    return NextResponse.json(
      { error: axiosError.response?.data || "Internal Server Error" },
      { status: axiosError.response?.status || 500 }
    );
  }
}

// ================== GET All no-sale Reasons ==================

export async function GET() {
  try {
    const response = await axiosInstanceServer.get("/no-sale-reasons");

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(
      "Get no-sale reasons error:",
      axiosError.response?.data || axiosError.message
    );
    return NextResponse.json(
      { error: axiosError.response?.data || "Internal Server Error" },
      { status: axiosError.response?.status || 500 }
    );
  }

}

}

