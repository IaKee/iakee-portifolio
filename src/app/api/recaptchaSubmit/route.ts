import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request, response: Response) {
  const data = await request.json();
  const { token } = data;
  const secret: string | undefined = process.env.RECAPTCHA_SECRET_KEY;

  if (!token) {
    return new Response(
      JSON.stringify(
        { message: "Token not found" }), 
        { status: 405 }
    );
  }

  
  try {
    const res = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`, )
  
    if (res.data.success) {
      return new Response(
        JSON.stringify( 
          { message: "Token verified" }),
          { status: 200 }
      )
    } else {
      return new Response( 
        JSON.stringify( 
          { message: "Failed to verify token" }),
          { status: 405 }
      )
    }
  }
  catch (error) {
    return new Response(
      JSON.stringify( 
        { message: "Internal server error!" }),
        { status: 500 }) 
  }
}