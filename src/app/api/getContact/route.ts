import { NextResponse } from "next/server"

export async function GET() {
  try {
    const res = await fetch(
      process.env.contact_API_URL!, 
      {
        method: "POST",
      }
    )

    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`)
    }

    const data = await res.json()
    return NextResponse.json(data)
  } 
  catch (error) {
    console.error("Error processing contact info:", error)
    return NextResponse.json(
      { error: "Failed to fetch contact info" }, 
      { status: 500 }
    )
  }
}
