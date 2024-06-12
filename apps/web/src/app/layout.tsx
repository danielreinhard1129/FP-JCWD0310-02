import type { Metadata } from 'next';
import './globals.css';
import StoreProvider from '@/providers/storeProvider';
import { ThemeProvider } from '@/providers/themeProvider';

export const metadata: Metadata = {
  title: 'FINPRO',
  description: 'FINPRO',
};

export default function BaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
