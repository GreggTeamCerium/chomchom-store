import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/components/CartProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Chom Chom Store | Pre-Loved Designer Fashion",
  description:
    "Shop pre-loved designer women's clothing at amazing prices. Lilly Pulitzer, Kate Spade, Tory Burch and more. New with tags and gently used fashion.",
  keywords: [
    "women's clothing",
    "pre-owned",
    "Lilly Pulitzer",
    "designer resale",
    "consignment",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased bg-white`}>
        <CartProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
