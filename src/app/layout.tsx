"use client";

import { useState, useEffect } from "react";
import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "@/app/css/app.css";
import { Titlebar } from "@/app/components/titlebar";
import { useProfileStore } from "./packages/zustand/profile";
//import { RI } from "@/app/core";

const Bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const accountId = useProfileStore((state) => state.accountId);
  const displayName = useProfileStore((state) => state.displayName);
  const validSession = !!(accountId && displayName);

  const [authStatus, setAuthStatus] = useState<"pending" | "valid" | "invalid">(
    "pending"
  );

  // useEffect(() => {
  //   const runtime = new RI();
  //   runtime.init().then((status) => {
  //     setAuthStatus(status);
  //   });
  // }, []);

  if (authStatus === "pending") {
    return (
      <html lang="en">
        <body
          className={`${Bricolage.variable} antialiased w-screen h-screen flex items-center justify-center`}
        ></body>
      </html>
    );
  }

  if (authStatus === "invalid") return null;

  return (
    <html lang="en">
      <body className={`${Bricolage.variable} antialiased w-screen h-screen`}>
        <Titlebar loggedIn={validSession} />
        {children}
      </body>
    </html>
  );
}
