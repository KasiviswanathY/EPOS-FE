import { NextRequest, NextResponse } from "next/server";
import axiosInstanceServer from "../axiosInstanceServer";
import { apiRoutes } from "@/lib/redux/constants/api_routes";
import { AxiosError } from "axios";



///create user
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const response = await axiosInstanceServer.post(apiRoutes.users, body);

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(
      "Company creation error:",
      axiosError.response?.data || axiosError.message
    );
    return NextResponse.json(
      { error: axiosError.response?.data || "Internal Server Error" },
      { status: axiosError.response?.status || 500 }
    );
  }
}


////getall users

export async function GET() {
  try {
    const response = await axiosInstanceServer.get(apiRoutes.users);

    console.log("response", response);

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(
      "Get companies error:",
      axiosError.response?.data || axiosError.message
    );
    return NextResponse.json(
      { error: axiosError.response?.data || "Internal Server Error" },
      { status: axiosError.response?.status || 500 }
    );
  }
}