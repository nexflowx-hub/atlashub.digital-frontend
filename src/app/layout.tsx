import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AtlasHub Digital – Building Digital Commerce Infrastructure",
  description:
    "AtlasHub Digital Ltd develops SaaS platforms, AI-powered applications, workflow automation, marketplace integrations and digital commerce solutions for businesses worldwide.",
  keywords: [
    "AtlasHub Digital",
    "digital commerce",
    "SaaS development",
    "AI solutions",
    "workflow automation",
    "marketplace integration",
    "e-commerce infrastructure",
    "UK technology company",
    "payment infrastructure",
    "cloud solutions",
  ],
  authors: [{ name: "AtlasHub Digital Ltd" }],
  creator: "AtlasHub Digital Ltd",
  publisher: "AtlasHub Digital Ltd",
  metadataBase: new URL("https://atlashub.digital"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "AtlasHub Digital – Building Digital Commerce Infrastructure",
    description:
      "SaaS platforms, AI-powered applications, workflow automation, and digital commerce solutions for businesses worldwide.",
    url: "https://atlashub.digital",
    siteName: "AtlasHub Digital",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AtlasHub Digital – Building Digital Commerce Infrastructure",
    description:
      "SaaS platforms, AI-powered applications, workflow automation, and digital commerce solutions.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "AtlasHub Digital Ltd",
  legalName: "AtlasHub Digital Ltd",
  url: "https://atlashub.digital",
  logo: "https://atlashub.digital/logo.svg",
  description:
    "AtlasHub Digital Ltd develops SaaS platforms, AI-powered applications, workflow automation, marketplace integrations and digital commerce solutions for businesses worldwide.",
  foundedDate: "2024",
  funder: {
    "@type": "Organization",
    name: "AtlasHub Digital Ltd",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "71–75 Shelton Street",
    addressLocality: "London",
    addressRegion: "Covent Garden",
    postalCode: "WC2H 9JQ",
    addressCountry: "GB",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+44-7451-245014",
    contactType: "customer service",
    email: "support@atlashub.digital",
    availableLanguage: ["English", "Portuguese", "Spanish", "French", "German"],
  },
  sameAs: ["https://t.me/AtlasHubDigital"],
  taxID: "17379237",
  numberOfEmployees: {
    "@type": "QuantitativeValue",
    minValue: 1,
    maxValue: 10,
  },
  knowsAbout: [
    "Digital Commerce",
    "SaaS Development",
    "AI Solutions",
    "Workflow Automation",
    "Marketplace Infrastructure",
    "Payment Processing",
    "Cloud Solutions",
  ],
  areaServed: {
    "@type": "GeoCircle",
    geoMidpoint: { "@type": "GeoCoordinates", latitude: 51.5115, longitude: -0.1257 },
    geoRadius: "1000000",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
