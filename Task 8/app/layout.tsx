import type { Metadata } from "next";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { NextAuthSessionProvider } from "@/components/providers/NextAuthProvider";
import { NextAuthProvider } from "@/contexts/NextAuthContext";
import { ReactQueryProvider } from "@/components/providers/ReactQueryProvider";
import { ToastersProvider } from "@/components/providers/ToastersProvider";

export const metadata: Metadata = {
  title: "AuthApp",
  description: "Experience seamless user authentication",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NextAuthSessionProvider>
          <ReactQueryProvider>
            <NextAuthProvider>
              <TooltipProvider>
                {children}
                <ToastersProvider />
              </TooltipProvider>
            </NextAuthProvider>
          </ReactQueryProvider>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
