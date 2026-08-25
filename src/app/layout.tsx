import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { LanguageProvider } from "@/context/LanguageContext";
import Script from "next/script";
import { GlobalHeader } from "@/components/GlobalHeader";
import { AppWrapper } from "@/components/AppWrapper";

export const metadata: Metadata = {
  title: "Farmer & Procurement App",
  description: "Phase 1 Web App for Farmers and Procurement Officers",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#15803d" />
        <link rel="apple-touch-icon" href="/icon.png" />
      </head>
      <body className="min-h-full flex flex-col bg-[#121212] text-gray-200 selection:bg-green-500/30">
        <LanguageProvider>
          <GlobalHeader />
          <AppWrapper>
            {children}
          </AppWrapper>
          <footer className="bg-[#1a1a1a] border-t border-gray-800 text-gray-400 py-6 text-center text-sm z-10 relative">
            <p>&copy; {new Date().getFullYear()} Kisan Setu Portal. All rights reserved.</p>
          </footer>
          <Script id="register-sw" strategy="afterInteractive">
            {`
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(
                    function(registration) {
                      console.log('ServiceWorker registration successful');
                    },
                    function(err) {
                      console.log('ServiceWorker registration failed: ', err);
                    }
                  );
                });
              }
            `}
          </Script>
        </LanguageProvider>
      </body>
    </html>
  );
}
