import { NextRequest } from "next/server";
import setLocaleMiddleware from "./middlewares/setLocaleMiddleware";

export async function middleware(request: NextRequest) {
  return setLocaleMiddleware(request);
}
