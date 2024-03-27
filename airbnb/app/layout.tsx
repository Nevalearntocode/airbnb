import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/providers/theme-provider';
import Navbar from '@/components/navbar';
import ModalProvider from '@/components/providers/modal-provider';
import ToastProvider from '@/components/providers/toast-provider';
import { InitialProfile } from '@/lib/initial-profile';

const font = Nunito({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Airbnb',
  description: 'Airbnb clone for learning',
  icons: {
    icon: '/images/air-logo.png',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const profile = await InitialProfile();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={font.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          <Navbar profile={profile} />
          <ModalProvider />
          <ToastProvider />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
