import { NextResponse } from "next/server";

type RequestBody = {
  token: string;
};

type RecaptchaResponse = {
  success: boolean;
  score?: number;
  action?: string;
  challenge_ts?: string;
  hostname?: string;
  'error-codes'?: string[];
};

export async function POST(request: Request) {
  const data: RequestBody = await request.json();
  const { token } = data;
  const secret = process.env.RECAPTCHA_SECRET_KEY;

  if (!token) {
    return NextResponse.json(
      { message: "Token not found" },
      { status: 405 }
    );
  }

  if (!secret) {
    return NextResponse.json(
      { message: "Server misconfiguration" },
      { status: 500 }
    );
  }

  try {
    const formData = new URLSearchParams();
    formData.append('secret', secret);
    formData.append('response', token);

    const verifyUrl = 'https://www.google.com/recaptcha/api/siteverify';
    const response = await fetch(verifyUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    });

    const res: RecaptchaResponse = await response.json();

    if (res.success) {
      return NextResponse.json(
        { message: "Token verified", score: res.score },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { 
          message: "Failed to verify token",
          errorCodes: res['error-codes'] 
        },
        { status: 405 }
      );
    }
  } catch (error) {
    console.error('Recaptcha error:', error);
    return NextResponse.json(
      { message: "Internal server error!" },
      { status: 500 }
    );
  }
}