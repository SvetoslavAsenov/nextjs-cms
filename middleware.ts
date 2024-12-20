import { NextRequest } from "next/server";
import setLocaleMiddleware from "./middlewares/setLocaleMiddleware";
import keepAuthSessionAliveMiddleware from "./middlewares/keepAuthSessionAliveMiddleware";

export async function middleware(request: NextRequest) {
  await keepAuthSessionAliveMiddleware();
  return setLocaleMiddleware(request);
}
