import { NextRequest, NextResponse } from 'next/server';
import axiosInstanceServer from '@/app/api/axiosInstanceServer';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const response = await axiosInstanceServer.get(`/company-receipts/${resolvedParams.id}`);
    return NextResponse.json(response.data);
  } catch (error: unknown) {
    const err = error as { response?: { data?: unknown; status?: number }; message?: string };
    console.error('API Route Error:', err.response?.data || err.message);
    return NextResponse.json(
      { error: err.response?.data || 'Failed to fetch receipt' },
      { status: err.response?.status || 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const body = await request.json();
    const response = await axiosInstanceServer.patch(`/company-receipts/${resolvedParams.id}`, body);
    return NextResponse.json(response.data);
  } catch (error: unknown) {
    const err = error as { response?: { data?: unknown; status?: number }; message?: string };
    console.error('API Route Error:', err.response?.data || err.message);
    return NextResponse.json(
      { error: err.response?.data || 'Failed to update receipt' },
      { status: err.response?.status || 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const response = await axiosInstanceServer.delete(`/company-receipts/${resolvedParams.id}`);
    return NextResponse.json(response.data);
  } catch (error: unknown) {
    const err = error as { response?: { data?: unknown; status?: number }; message?: string };
    console.error('API Route Error:', err.response?.data || err.message);
    return NextResponse.json(
      { error: err.response?.data || 'Failed to delete receipt' },
      { status: err.response?.status || 500 }
    );
  }
}
