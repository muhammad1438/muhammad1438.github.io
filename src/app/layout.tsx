import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const fraunces = Fraunces({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "900"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dr. Muhammad Fahad Arshad — Experimental & Computational Catalysis",
  description:
    "Experimental & Computational Catalysis Researcher specialising in heterogeneous catalysis, DFT, MD, and AI/ML for hydrogen production and CO₂ valorisation. 11 publications · h-index 10 · 191 citations.",
  openGraph: {
    title: "Dr. Muhammad Fahad Arshad — Experimental & Computational Catalysis Researcher",
    description: "Heterogeneous catalysis, DFT, MD, and AI/ML for hydrogen production and CO₂ valorisation. 11 publications · h-index 10 · 191 citations.",
    url: "https://muhammad1438.github.io",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
      style={{ scrollBehavior: "smooth" }}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-background text-foreground selection:bg-accent-primary/20 selection:text-accent-primary font-sans antialiased overflow-x-hidden">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
