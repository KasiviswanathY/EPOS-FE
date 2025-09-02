
import { NextRequest, NextResponse } from "next/server";
// import { axiosInstanceServer } from "@/lib/axios/axiosInstanceServer";
import { AxiosError } from "axios";
import axiosInstanceServer from "../../axiosInstanceServer";

// UPDATE a customer type by ID
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    // Add server-side validation for the discount field inside the nested data object
    if (body.data?.discount !== undefined && typeof body.data.discount !== "number") {
      body.data.discount = parseFloat(body.data.discount) || 0;
    }
    const response = await axiosInstanceServer.patch(`/customer-types/${id}`, body);
    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    const axiosError = error as AxiosError;
    return NextResponse.json(
      { error: axiosError.response?.data || "Internal Server Error" },
      { status: axiosError.response?.status || 500 }
    );
  }
}

// DELETE a customer type by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const response = await axiosInstanceServer.delete(`/customer-types/${id}`);
    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}