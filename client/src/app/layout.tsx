import type { Metadata } from 'next';
import localFont from 'next/font/local';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min';

import { Cherry_Bomb_One } from 'next/font/google';
import './globals.css';
import ShowCaseNavbar from './ShowCaseNavbar/page';
import StoreProvider from './redux';
import { GoogleOAuthProvider } from '@react-oauth/google';
// import useAuth from '@/u/tils/useAuth';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const cherryBomb = Cherry_Bomb_One({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-cherry-bomb',
});

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // useAuth();
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${cherryBomb.variable} antialiased`}
      >
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ''}>
          <StoreProvider>
            <ShowCaseNavbar />
            {children}
          </StoreProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
