import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import React, { Suspense } from "react";
import { Toaster } from "@/components/ui/sonner";
import ToastContainer from "@/components/ToastContainer";
import { currentUser } from "@/lib/services/auth.service";
import { Providers } from "@/components/providers/Providers";
import { Player } from "@/components/Player/Player";
import { Sidebar } from "@/components/Sidebar";
import { LogoutButton } from "@/components/LogoutButton";
import { ProfileButton } from "@/components/ProfileButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SearchInput } from "@/components/Navbar/SearchInput";
import { Navbar } from "./(browse)/_components/Navbar";
import { Main } from "./(browse)/_components/Main";
import { redirect } from "next/navigation";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Musichub - Web Player: Music for everyone",
  description:
    "Musichub is a digital music service that gives you access to millions of songs.",
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
          <div>{children}</div>
          {profile && <ToastContainer profile={profile} />}
          <Toaster closeButton />
        </Providers>
      </body>
    </html>
  );
}
