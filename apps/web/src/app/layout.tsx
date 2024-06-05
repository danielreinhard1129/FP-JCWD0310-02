import type { Metadata } from 'next';
import './globals.css';
import StoreProvider from '@/providers/storeProvider';

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
    <StoreProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </StoreProvider>
  );
}
