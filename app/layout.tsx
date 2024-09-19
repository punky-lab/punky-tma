import type { PropsWithChildren } from 'react';
import type { Metadata } from 'next';
import { Root } from '@/components/Root/Root';
import 'normalize.css/normalize.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'Punky App TG',
  description: 'Telegram endpoint of punky app',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
    <body>
      <Root>
        {children}
      </Root>
    </body>
    </html>
  );
}
