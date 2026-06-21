import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";

const sansFont = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const monoFont = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "kajlam.github.io",
  description: "Interactive portfolio of Manish Kajla, a Mathematics & Statistics student at IIT Kanpur and SPO Overall Placement Coordinator. Specializing in machine learning, quantitative finance, and premium interactive web architectures.",
  keywords: ["Manish Kajla", "IIT Kanpur", "SPO Placement Coordinator", "Creative Developer", "Machine Learning", "Quantitative Finance", "Nothing OS Aesthetic", "Portfolio"],
  authors: [{ name: "Manish Kajla" }],
  icons: "/kkk.jpg",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sansFont.variable} ${monoFont.variable} dark`}
      style={{ backgroundColor: '#000000' }}
    >
      <body className="bg-black text-zinc-100 antialiased selection:bg-zinc-800 selection:text-white">
        <SmoothScroll>
          <CustomCursor />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
