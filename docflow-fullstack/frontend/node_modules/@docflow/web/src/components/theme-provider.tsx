import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Theme = "light" | "dark" | "system";

type Ctx = { theme: Theme; setTheme: (t: Theme) => void };
const ThemeContext = createContext<Ctx>({ theme: "system", setTheme: () => {} });

function systemPrefersDark(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
}

function resolveTheme(theme: Theme): "light" | "dark" {
  if (theme === "system") return systemPrefersDark() ? "dark" : "light";
  return theme;
}

export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;   // "light" | "dark" | "system"
  storageKey?: string;    // chave para persistir no localStorage
  enableSystem?: boolean; // se false, "system" vira o defaultTheme resolvido
  // atributo "attribute" existe no next-themes; aqui é ignorado, mas aceito por compat
  attribute?: "class";
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "docflow-theme",
  enableSystem = true,
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const stored = localStorage.getItem(storageKey) as Theme | null;
      if (stored) return stored;
    } catch {}
    return defaultTheme;
  });

  // aplica/remover classes na <html>
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, theme);
    } catch {}

    const root = document.documentElement;
    root.classList.remove("light", "dark");

    // se sistema estiver desabilitado, "system" resolve para tema atual do SO e fixa a classe
    const effective = enableSystem ? resolveTheme(theme) : (theme === "system" ? resolveTheme("system") : theme);
    root.classList.add(effective);
  }, [theme, storageKey, enableSystem]);

  // acompanha mudança do SO quando theme === "system"
  useEffect(() => {
    if (!enableSystem || theme !== "system") return;

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      const root = document.documentElement;
      root.classList.remove("light", "dark");
      root.classList.add(mq.matches ? "dark" : "light");
    };

    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, [theme, enableSystem]);

  const value = useMemo(() => ({ theme, setTheme }), [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);
