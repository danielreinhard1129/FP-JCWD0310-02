import type { Metadata } from 'next';
import './globals.css';
import StoreProvider from '@/providers/storeProvider';
import { ThemeProvider } from '@/providers/themeProvider';
import { GoogleOAuthProvider } from '@react-oauth/google';

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
        <GoogleOAuthProvider clientId="1011550293386-qsguse89qv5jkntlvvpojpes18a53ma6.apps.googleusercontent.com">
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
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
