import React from 'react';
import type { Metadata, Viewport } from 'next';
import '@/shared/styles/reset.css';
import '@/shared/styles/globals.css';

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: '입주사관리',
  description: '부평 우림라이온스밸리 입주사관리',
  manifest: '/manifest.json',
  icons: {
    icon: [
      { type: 'image/png', sizes: '192x192', url: '/favicon/android-icon-192x192.png' },
      { type: 'image/png', sizes: '32x32', url: '/favicon/favicon-32x32.png' },
      { type: 'image/png', sizes: '96x96', url: '/favicon/favicon-96x96.png' },
      { type: 'image/png', sizes: '16x16', url: '/favicon/favicon-16x16.png' },
    ],
    apple: [
      { sizes: '57x57', url: '/favicon/apple-icon-57x57.png' },
      { sizes: '60x60', url: '/favicon/apple-icon-60x60.png' },
      { sizes: '72x72', url: '/favicon/apple-icon-72x72.png' },
      { sizes: '76x76', url: '/favicon/apple-icon-76x76.png' },
      { sizes: '114x114', url: '/favicon/apple-icon-114x114.png' },
      { sizes: '120x120', url: '/favicon/apple-icon-120x120.png' },
      { sizes: '144x144', url: '/favicon/apple-icon-144x144.png' },
      { sizes: '152x152', url: '/favicon/apple-icon-152x152.png' },
      { sizes: '180x180', url: '/favicon/apple-icon-180x180.png' },
    ],
  },
  other: {
    'msapplication-TileColor': '#ffffff',
    'msapplication-TileImage': '/favicon/ms-icon-144x144.png',
  },
};

export default function RootLayout({ children }: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        {children}
      </body>
    </html>
  );
}
