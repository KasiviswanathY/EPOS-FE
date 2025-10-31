import { NextRequest, NextResponse } from "next/server";
import axiosInstanceServer from "@/app/api/axiosInstanceServer";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const companyId = searchParams.get("companyId");

    let url = "/company-receipts";
    if (companyId) {
      url += `/company/${companyId}`;
    }

    const response = await axiosInstanceServer.get(url);

    const data = Array.isArray(response.data)
      ? response.data[0]
      : response.data;

    return NextResponse.json(data);
  } catch (error: unknown) {
    const err = error as {
      response?: { data?: unknown; status?: number };
     
    };
  
    return NextResponse.json(
      { error: err.response?.data || "Failed to fetch receipts" },
      { status: err.response?.status || 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const response = await axiosInstanceServer.post("/company-receipts", body);
    return NextResponse.json(response.data);
  } catch (error: unknown) {
    const err = error as {
      response?: { data?: unknown; status?: number };
      message?: string;
    };
    console.error("API Route Error:", err.response?.data || err.message);
    return NextResponse.json(
      { error: err.response?.data || "Failed to create receipt" },
      { status: err.response?.status || 500 }
    );
  }
}
