import type { Metadata } from "next";
import localFont from "next/font/local";
import { AuthProvider } from "./context/AuthContext";
import "./globals.css";
import Head from "next/head";  // Import Head component to add head content

const geistSans = localFont({
  src: "../public/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../public/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Reelio",
  description: "The best movie app!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <Head>
      <link rel="preconnect" href="https://image.tmdb.org" />
        
        <link rel="dns-prefetch" href="https://image.tmdb.org" />
      </Head>
      <body className={`${geistSans.variable} ${geistMono.variable} dark:bg-black antialiased`}>
        {/* Wrap the application with AuthProvider */}
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
