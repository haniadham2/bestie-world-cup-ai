import type { Metadata, Viewport } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bestie — Your AI Bestie for the World Cup",
  description:
    "Bestie helps first-time World Cup viewers enjoy every match without feeling confused or left out.",
};

export const viewport: Viewport = {
  themeColor: "#FFF9F4",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={nunito.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
