
import { NextRequest, NextResponse } from "next/server";

import { AxiosError } from "axios";
import axiosInstanceServer from "../../axiosInstanceServer";

// UPDATE a stock movement reason by ID
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json(); // The body is { data: { reason: "..." } }
    
    // ✅ THIS IS THE FIX:
    // We forward the inner 'body.data' object instead of the whole body.
    const response = await axiosInstanceServer.patch(
      `/stock-movement-reasons/${id}`,
      body.data // Send the flat object, e.g., { reason: "..." }
    );

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error("Update stock movement reason error:", axiosError.response?.data);
    return NextResponse.json(
      { error: axiosError.response?.data || "Internal Server Error" },
      { status: axiosError.response?.status || 500 }
    );
  }
}

// DELETE a stock movement reason by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    // This function is correct and remains unchanged.
    const response = await axiosInstanceServer.delete(`/stock-movement-reasons/${id}`);
    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error("Delete stock movement reason error:", axiosError.response?.data);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}