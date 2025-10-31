import { NextResponse } from "next/server";
import axiosInstanceServer from "../../axiosInstanceServer";
import { AxiosError } from "axios";

export async function GET() {
  try {
    const response = await axiosInstanceServer.get("/users/me");

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(
      "Get current user error:",
      axiosError.response?.data || axiosError.message
    );
    return NextResponse.json(
      { error: axiosError.response?.data || "Internal Server Error" },
      { status: axiosError.response?.status || 500 }
    );
  }
}
