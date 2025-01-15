"use server";

import { getValidThemeAndMode } from "./theme";
import { getCookieValuesByKeys, setCookies } from "../cookies/cookies.server";
import { THEME_NAME_COOKIE, THEME_MODE_COOKIE } from "@/constants/cookies";
import type { SupportedTheme, SupportedMode } from "@/types/theme";

export const setThemeAndMode = async (
  theme: SupportedTheme,
  mode: SupportedMode
) => {
  await setCookies([
    [THEME_NAME_COOKIE, theme],
    [THEME_MODE_COOKIE, mode],
  ]);
};

export const getCurrentThemeAndMode = async (): Promise<{
  theme: SupportedTheme;
  mode: SupportedMode;
}> => {
  const {
    [THEME_NAME_COOKIE]: themeCookieVal,
    [THEME_MODE_COOKIE]: modeCookieVal,
  } = await getCookieValuesByKeys([THEME_NAME_COOKIE, THEME_MODE_COOKIE]);

  const { theme, mode } = getValidThemeAndMode(
    themeCookieVal ?? "",
    modeCookieVal ?? ""
  );

  return { theme, mode };
};
