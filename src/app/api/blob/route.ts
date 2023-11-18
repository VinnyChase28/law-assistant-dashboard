import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get("filename");

  // Check if filename is null
  if (filename === null) {
    // Handle the error, e.g., return an error response
    return new NextResponse("Filename is required", { status: 400 });
  }

  // Check if request.body is null
  if (request.body === null) {
    // Handle the error, e.g., return an error response
    return new NextResponse("Request body is required", { status: 400 });
  }

  // Proceed with the operation since request.body is not null
  const blob = await put(filename, request.body, {
    access: "public",
  });

  return NextResponse.json(blob);
}
