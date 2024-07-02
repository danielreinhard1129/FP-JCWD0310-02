'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';

const defaultTheme = () => {
  const localTheme = localStorage.getItem('theme');
  if (!localTheme) {
    localStorage.setItem('theme', 'light');
  }

  return localTheme ? localTheme : 'light';
};

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const theme = defaultTheme();
  return (
    <NextThemesProvider forcedTheme={theme} enableSystem={false} {...props}>
      {children}
    </NextThemesProvider>
  );
}
