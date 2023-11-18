import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get("filename");

  // Check if filename is null
  if (filename === null) {
    return new NextResponse("Filename is required", { status: 400 });
  }

  if (request.body === null) {
    return new NextResponse("Request body is required", { status: 400 });
  }

  const blob = await put(filename, request.body, {
    access: "public",
  });

  return NextResponse.json(blob);
}
