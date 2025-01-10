import type { Themes } from "@/types/theme";

export const supportedThemes = ["theme1", "theme2"] as const;
export const defaultTheme = supportedThemes[0];
export const supportedModes = ["light", "dark"] as const;
export const defaultMode = supportedModes[0];

export const themes: Themes = {
  theme1: {
    light: {
      background: { variable: "--background", value: "0 0% 100%" },
      foreground: { variable: "--foreground", value: "240 10% 3.9%" },
      card: { variable: "--card", value: "0 0% 100%" },
      cardForeground: { variable: "--card-foreground", value: "240 10% 3.9%" },
      popover: { variable: "--popover", value: "0 0% 100%" },
      popoverForeground: {
        variable: "--popover-foreground",
        value: "240 10% 3.9%",
      },
      primary: { variable: "--primary", value: "346.8 77.2% 49.8%" },
      primaryForeground: {
        variable: "--primary-foreground",
        value: "355.7 100% 97.3%",
      },
      secondary: { variable: "--secondary", value: "240 4.8% 95.9%" },
      secondaryForeground: {
        variable: "--secondary-foreground",
        value: "240 5.9% 10%",
      },
      muted: { variable: "--muted", value: "240 4.8% 95.9%" },
      mutedForeground: {
        variable: "--muted-foreground",
        value: "240 3.8% 46.1%",
      },
      accent: { variable: "--accent", value: "240 4.8% 95.9%" },
      accentForeground: {
        variable: "--accent-foreground",
        value: "240 5.9% 10%",
      },
      destructive: { variable: "--destructive", value: "0 84.2% 60.2%" },
      destructiveForeground: {
        variable: "--destructive-foreground",
        value: "0 0% 98%",
      },
      border: { variable: "--border", value: "240 5.9% 90%" },
      input: { variable: "--input", value: "240 5.9% 90%" },
      ring: { variable: "--ring", value: "346.8 77.2% 49.8%" },
      radius: { variable: "--radius", value: "0.3rem" },
      chart1: { variable: "--chart-1", value: "12 76% 61%" },
      chart2: { variable: "--chart-2", value: "173 58% 39%" },
      chart3: { variable: "--chart-3", value: "197 37% 24%" },
      chart4: { variable: "--chart-4", value: "43 74% 66%" },
      chart5: { variable: "--chart-5", value: "27 87% 67%" },
    },
    dark: {
      background: { variable: "--background", value: "20 14.3% 4.1%" },
      foreground: { variable: "--foreground", value: "0 0% 95%" },
      card: { variable: "--card", value: "24 9.8% 10%" },
      cardForeground: { variable: "--card-foreground", value: "0 0% 95%" },
      popover: { variable: "--popover", value: "0 0% 9%" },
      popoverForeground: {
        variable: "--popover-foreground",
        value: "0 0% 95%",
      },
      primary: { variable: "--primary", value: "346.8 77.2% 49.8%" },
      primaryForeground: {
        variable: "--primary-foreground",
        value: "355.7 100% 97.3%",
      },
      secondary: { variable: "--secondary", value: "240 3.7% 15.9%" },
      secondaryForeground: {
        variable: "--secondary-foreground",
        value: "0 0% 98%",
      },
      muted: { variable: "--muted", value: "0 0% 15%" },
      mutedForeground: {
        variable: "--muted-foreground",
        value: "240 5% 64.9%",
      },
      accent: { variable: "--accent", value: "12 6.5% 15.1%" },
      accentForeground: { variable: "--accent-foreground", value: "0 0% 98%" },
      destructive: { variable: "--destructive", value: "0 62.8% 30.6%" },
      destructiveForeground: {
        variable: "--destructive-foreground",
        value: "0 85.7% 97.3%",
      },
      border: { variable: "--border", value: "240 3.7% 15.9%" },
      input: { variable: "--input", value: "240 3.7% 15.9%" },
      ring: { variable: "--ring", value: "346.8 77.2% 49.8%" },
      chart1: { variable: "--chart-1", value: "220 70% 50%" },
      chart2: { variable: "--chart-2", value: "160 60% 45%" },
      chart3: { variable: "--chart-3", value: "30 80% 55%" },
      chart4: { variable: "--chart-4", value: "280 65% 60%" },
      chart5: { variable: "--chart-5", value: "340 75% 55%" },
    },
  },
  theme2: {
    light: {
      background: { variable: "--background", value: "0 0% 100%" },
      foreground: { variable: "--foreground", value: "240 10% 3.9%" },
      card: { variable: "--card", value: "0 0% 100%" },
      cardForeground: { variable: "--card-foreground", value: "240 10% 3.9%" },
      popover: { variable: "--popover", value: "0 0% 100%" },
      popoverForeground: {
        variable: "--popover-foreground",
        value: "240 10% 3.9%",
      },
      primary: { variable: "--primary", value: "240 5.9% 10%" },
      primaryForeground: {
        variable: "--primary-foreground",
        value: "0 0% 98%",
      },
      secondary: { variable: "--secondary", value: "240 4.8% 95.9%" },
      secondaryForeground: {
        variable: "--secondary-foreground",
        value: "240 5.9% 10%",
      },
      muted: { variable: "--muted", value: "240 4.8% 95.9%" },
      mutedForeground: {
        variable: "--muted-foreground",
        value: "240 3.8% 46.1%",
      },
      accent: { variable: "--accent", value: "240 4.8% 95.9%" },
      accentForeground: {
        variable: "--accent-foreground",
        value: "240 5.9% 10%",
      },
      destructive: { variable: "--destructive", value: "0 84.2% 60.2%" },
      destructiveForeground: {
        variable: "--destructive-foreground",
        value: "0 0% 98%",
      },
      border: { variable: "--border", value: "240 5.9% 90%" },
      input: { variable: "--input", value: "240 5.9% 90%" },
      ring: { variable: "--ring", value: "240 5.9% 10%" },
      radius: { variable: "--radius", value: "0.3rem" },
      chart1: { variable: "--chart-1", value: "12 76% 61%" },
      chart2: { variable: "--chart-2", value: "173 58% 39%" },
      chart3: { variable: "--chart-3", value: "197 37% 24%" },
      chart4: { variable: "--chart-4", value: "43 74% 66%" },
      chart5: { variable: "--chart-5", value: "27 87% 67%" },
    },
    dark: {
      background: { variable: "--background", value: "240 10% 3.9%" },
      foreground: { variable: "--foreground", value: "0 0% 98%" },
      card: { variable: "--card", value: "240 10% 3.9%" },
      cardForeground: { variable: "--card-foreground", value: "0 0% 98%" },
      popover: { variable: "--popover", value: "240 10% 3.9%" },
      popoverForeground: {
        variable: "--popover-foreground",
        value: "0 0% 98%",
      },
      primary: { variable: "--primary", value: "0 0% 98%" },
      primaryForeground: {
        variable: "--primary-foreground",
        value: "240 5.9% 10%",
      },
      secondary: { variable: "--secondary", value: "240 3.7% 15.9%" },
      secondaryForeground: {
        variable: "--secondary-foreground",
        value: "0 0% 98%",
      },
      muted: { variable: "--muted", value: "240 3.7% 15.9%" },
      mutedForeground: {
        variable: "--muted-foreground",
        value: "240 5% 64.9%",
      },
      accent: { variable: "--accent", value: "240 3.7% 15.9%" },
      accentForeground: { variable: "--accent-foreground", value: "0 0% 98%" },
      destructive: { variable: "--destructive", value: "0 62.8% 30.6%" },
      destructiveForeground: {
        variable: "--destructive-foreground",
        value: "0 0% 98%",
      },
      border: { variable: "--border", value: "240 3.7% 15.9%" },
      input: { variable: "--input", value: "240 3.7% 15.9%" },
      ring: { variable: "--ring", value: "240 4.9% 83.9%" },
      chart1: { variable: "--chart-1", value: "220 70% 50%" },
      chart2: { variable: "--chart-2", value: "160 60% 45%" },
      chart3: { variable: "--chart-3", value: "30 80% 55%" },
      chart4: { variable: "--chart-4", value: "280 65% 60%" },
      chart5: { variable: "--chart-5", value: "340 75% 55%" },
    },
  },
};
