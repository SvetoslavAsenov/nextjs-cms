import {
  getCookieValuesByKeys,
  setCookies,
} from "@/utils/cookies/cookies.client";
import { THEME_NAME_COOKIE, THEME_MODE_COOKIE } from "@/constants/cookies";
import { getValidThemeAndMode } from "./theme";
import { supportedThemes, defaultMode, supportedModes } from "@/config/themes";

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

  // Set the theme and mode classes on the root HTML element
  const root = document.documentElement;

  // Remove previous theme and mode classes if any
  root.classList.remove(...supportedThemes, ...supportedModes);

  // Add the new theme and mode classes
  root.classList.add(theme);

  // Handle mode class
  if (mode !== defaultMode) {
    root.classList.add(mode);
  }
};
