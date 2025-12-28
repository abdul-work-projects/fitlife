import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "FitLife Quiz - Your Personalized Fitness Journey",
  description:
    "Take our personalized fitness quiz and get a custom workout and nutrition plan tailored to your goals, lifestyle, and preferences.",
  keywords: ["fitness", "workout", "nutrition", "weight loss", "muscle building", "health"],
  openGraph: {
    title: "FitLife Quiz - Your Personalized Fitness Journey",
    description: "Get a custom workout and nutrition plan tailored to your goals.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}
