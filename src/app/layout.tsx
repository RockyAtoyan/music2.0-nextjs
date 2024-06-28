import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import React from "react";
import { Navbar } from "@/app/(browse)/_components/Navbar";
import { Toaster } from "@/components/ui/sonner";
import ToastContainer from "@/components/ToastContainer";
import { currentUser } from "@/lib/services/auth.service";
import { Providers } from "@/components/providers/Providers";
import { Player } from "@/components/Player/Player";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await currentUser();

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="grid grid-rows-[70px+1fr] text-primary h-screen">
            <Navbar user={profile} />
            <main className="bg-background flex h-full overflow-hidden">
              {children}
            </main>
          </div>
          <Player />
          {profile && <ToastContainer profile={profile} />}
          <Toaster closeButton />
        </Providers>
      </body>
    </html>
  );
}
