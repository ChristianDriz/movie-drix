import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/layout/Navbar/Navbar";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Movie Search",
    description: "Created by CJ Drix",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`
                    ${geistSans.variable} 
                    ${geistMono.variable} 
                    antialiased relative flex flex-col min-h-screen`
                }
            >
                <header className="sticky top-0 z-20 ">
                    <Navbar/>
                </header>
                <main className="flex-1 flex">
                    {children}
                </main>
            </body>
        </html>
    );
}
