import { supportedThemes } from "@/config/themes";

export type SupportedTheme = (typeof supportedThemes)[number];

export type Themes = {
  [key in SupportedTheme]: Theme;
};

type cssVariable =
  | "--background"
  | "--foreground"
  | "--card"
  | "--card-foreground"
  | "--popover"
  | "--popover-foreground"
  | "--primary"
  | "--primary-foreground"
  | "--secondary"
  | "--secondary-foreground"
  | "--muted"
  | "--muted-foreground"
  | "--accent"
  | "--accent-foreground"
  | "--destructive"
  | "--destructive-foreground"
  | "--border"
  | "--input"
  | "--ring"
  | "--radius"
  | "--chart-1"
  | "--chart-2"
  | "--chart-3"
  | "--chart-4"
  | "--chart-5";

type ThemeVariable = {
  variable: cssVariable;
  value: string;
};

type ThemeMode = {
  background: ThemeVariable;
  foreground: ThemeVariable;
  card: ThemeVariable;
  cardForeground: ThemeVariable;
  popover: ThemeVariable;
  popoverForeground: ThemeVariable;
  primary: ThemeVariable;
  primaryForeground: ThemeVariable;
  secondary: ThemeVariable;
  secondaryForeground: ThemeVariable;
  muted: ThemeVariable;
  mutedForeground: ThemeVariable;
  accent: ThemeVariable;
  accentForeground: ThemeVariable;
  destructive: ThemeVariable;
  destructiveForeground: ThemeVariable;
  border: ThemeVariable;
  input: ThemeVariable;
  ring: ThemeVariable;
  radius: ThemeVariable;
  chart1: ThemeVariable;
  chart2: ThemeVariable;
  chart3: ThemeVariable;
  chart4: ThemeVariable;
  chart5: ThemeVariable;
};

type Theme = {
  light: ThemeMode;
  dark: Omit<ThemeMode, "radius">;
};
