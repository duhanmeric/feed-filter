import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/templates/Header";
import Footer from "@/components/templates/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Feed Filter",
    description: "Filter your remove feed file with multiple filters",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.className} flex h-full flex-col`}>
                <Header />
                {children}
                <Footer />

                <Toaster />
            </body>
        </html>
    );
}
