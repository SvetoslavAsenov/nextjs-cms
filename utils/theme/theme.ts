import {
  supportedThemes,
  defaultTheme,
  supportedModes,
  defaultMode,
} from "../../config/themes";

import type { SupportedTheme, SupportedMode } from "@/types/theme";

const validateTheme = (theme: string): boolean => {
  return supportedThemes.includes(theme as SupportedTheme);
};

const validateMode = (mode: string): boolean => {
  return supportedModes.includes(mode as SupportedMode);
};

export const getValidThemeAndMode = (
  theme: string,
  mode: string
): { theme: SupportedTheme; mode: SupportedMode } => {
  const validTheme = validateTheme(theme)
    ? (theme as SupportedTheme)
    : defaultTheme;

  const validMode = validateMode(mode) ? (mode as SupportedMode) : defaultMode;

  return { theme: validTheme, mode: validMode };
};
