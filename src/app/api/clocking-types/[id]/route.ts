import { NextRequest, NextResponse } from "next/server";
import axiosInstanceServer from "../../axiosInstanceServer";
import { AxiosError } from "axios";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET Clocking Type by ID
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    const response = await axiosInstanceServer.get(`/clocking-types/${id}`);

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(
      "Get clocking type error:",
      axiosError.response?.data || axiosError.message
    );
    return NextResponse.json(
      { error: axiosError.response?.data || "Internal Server Error" },
      { status: axiosError.response?.status || 500 }
    );
  }
}

// UPDATE Clocking Type by ID
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();

    const response = await axiosInstanceServer.patch(`/clocking-types/${id}`, body);

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(
      "Update clocking type error:",
      axiosError.response?.data || axiosError.message
    );
    return NextResponse.json(
      { error: axiosError.response?.data || "Internal Server Error" },
      { status: axiosError.response?.status || 500 }
    );
  }
}

// DELETE Clocking Type by ID
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    const response = await axiosInstanceServer.delete(`/clocking-types/${id}`);

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(
      "Delete clocking type error:",
      axiosError.response?.data || axiosError.message
    );
    return NextResponse.json(
      { error: axiosError.response?.data || "Internal Server Error" },
      { status: axiosError.response?.status || 500 }
    );
  }
}
