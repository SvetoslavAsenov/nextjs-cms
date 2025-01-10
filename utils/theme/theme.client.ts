import {
  getCookieValuesByKeys,
  setCookies,
} from "@/utils/cookies/cookies.client";
import { THEME_NAME_COOKIE, THEME_MODE_COOKIE } from "@/constants/cookies";
import { getValidThemeAndMode } from "./theme";

import type { SupportedTheme, SupportedMode } from "@/types/theme";

export const getCurrentThemeAndMode = () => {
  const { [THEME_NAME_COOKIE]: themeName, [THEME_MODE_COOKIE]: themeMode } =
    getCookieValuesByKeys([THEME_NAME_COOKIE, THEME_MODE_COOKIE]);

  return getValidThemeAndMode(themeName ?? "", themeMode ?? "");
};

export const setThemeAndMode = (theme: SupportedTheme, mode: SupportedMode) => {
  setCookies([
    [THEME_NAME_COOKIE, theme],
    [THEME_MODE_COOKIE, mode],
  ]);
};
