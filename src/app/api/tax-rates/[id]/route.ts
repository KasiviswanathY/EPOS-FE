import { NextRequest, NextResponse } from "next/server";

import { AxiosError } from "axios";
import axiosInstanceServer from "../../axiosInstanceServer";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// UPDATE a tax rate
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Optional: Add server-side validation for percentage if needed
    if (body.data?.percentage) {
      body.data.percentage = parseFloat(body.data.percentage);
    }

    const response = await axiosInstanceServer.patch(`/tax-rates/${id}`, body);
    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    const axiosError = error as AxiosError;
    return NextResponse.json(
      { error: axiosError.response?.data || "Internal Server Error" },
      { status: axiosError.response?.status || 500 }
    );
  }
}


// DELETE a tax rate
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const response = await axiosInstanceServer.delete(`/tax-rates/${id}`);
    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    const axiosError = error as AxiosError;
    return NextResponse.json(
      { error: axiosError.response?.data || "Internal Server Error" },
      { status: 500 }
    );
  }
}