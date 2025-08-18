import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import emailjs from '@emailjs/nodejs'

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json()

    const response = await emailjs.send(
      process.env.EMAIL_SERVICE_KEY!,
      process.env.EMAIL_TEMPLATE_KEY!,
      {
        from_name: name,
        from_email: email,
        subject,
        message,
      },
      {
        publicKey: process.env.EMAIL_API_KEY!
      }
    )

    return NextResponse.json({ success: true, response })
  } catch (error) {
    console.error("Error ocurred while processing email:", error)
    return NextResponse.json({ error: 'Could not send email:' }, { status: 500 })
  }
}

