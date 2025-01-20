import { NextResponse } from "next/server";
import { REGISTRATION_INVITE_TOKEN_COOKIE } from "@/constants/cookies";
import { setCookie } from "@/utils/cookies/cookies.server";
import RegistrationInviteModel from "@/models/RegistrationInviteModel";

const INVALID_TOKEN = "Invalid token";
const ERROR_SETTING_TOKEN = "Error setting registration invite token cookie:";
const ERROR_500 = "Failed to set cookie";

export async function POST(request: Request) {
  try {
    const { token } = await request.json();
    const registrationInviteModel = new RegistrationInviteModel();

    if (
      !token ||
      typeof token !== "string" ||
      !registrationInviteModel.validateToken(token)
    ) {
      return new NextResponse(INVALID_TOKEN, { status: 400 });
    }

    await setCookie(REGISTRATION_INVITE_TOKEN_COOKIE, token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 3600,
    });

    const response = new NextResponse(null, { status: 200 });
    return response;
  } catch (error) {
    console.error(ERROR_SETTING_TOKEN, error);
    return new NextResponse(ERROR_500, { status: 500 });
  }
}
