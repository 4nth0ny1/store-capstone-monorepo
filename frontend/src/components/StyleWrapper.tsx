import type { ReactNode, CSSProperties } from "react";

type StyleWrapperProps = {
  children: ReactNode;
};

const themes = {
  red: {
    "--primary": "#cc0000",
    "--bg": "#f8f8f9",
    "--text": "#1a1a1a",
  },
  blue: {
    "--primary": "#004990",
    "--bg": "#f4f7fb",
    "--text": "#0f172a",
  },
  dark: {
    "--primary": "#32cd32",
    "--bg": "#111111",
    "--text": "#ffffff",
  },
} as const;

type ThemeName = keyof typeof themes;

const CURRENT_THEME: ThemeName = "dark";

export default function StyleWrapper({ children }: StyleWrapperProps) {
  const themeVars = themes[CURRENT_THEME] as CSSProperties;

  return (
    <div
      style={themeVars}
      className="min-h-screen bg-[var(--bg)] text-[var(--text)] py-8 px-62"
    >
      {children}
    </div>
  );
}
