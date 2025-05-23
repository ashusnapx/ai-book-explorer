import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Providers } from "./providers";
import { CopilotKit } from "@copilotkit/react-core";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Book Explorer",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className='h-full' suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative h-full`}
      >
        <CopilotKit publicApiKey='ck_pub_90575086645b02f455d71396674fb4ca'>
          <main className='relative flex flex-col min-h-screen'>
            <Navbar />
            <div className='flex-1 flex-grow'>
              <Providers>
                {children}
                <Toaster richColors position='top-center' />
              </Providers>
            </div>
          </main>
        </CopilotKit>
      </body>
    </html>
  );
}
