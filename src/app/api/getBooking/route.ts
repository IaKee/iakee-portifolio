import { NextResponse } from "next/server"

export async function GET() {
  try {
    const calendlyUrl = process.env.booking_API_URL

    if (!calendlyUrl) {
      throw new Error("booking endpoint not defined")
    }

    return NextResponse.redirect(calendlyUrl)
  } catch (error) {
    console.error("Error redirecting to booking page:", error)
    return NextResponse.json(
      { error: "Failed to redirect to booking page" },
      { status: 500 }
    )
  }
}
