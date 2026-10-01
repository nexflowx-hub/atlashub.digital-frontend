import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AtlasHub Digital | The Augmented Enterprise',
  description: 'AtlasHub builds intelligent systems, software, automation and digital infrastructure that connect people, technology and operations.',
  keywords: ['AtlasHub','Augmented Enterprise','intelligent systems','AI agents','business automation','custom software','FinTech','systems integration'],
  metadataBase: new URL('https://atlashub.digital'),
  alternates: { canonical: '/' },
  openGraph: {
    title: 'AtlasHub Digital | The Augmented Enterprise',
    description: 'People, intelligent systems, software and automation working as one.',
    url: 'https://atlashub.digital',
    siteName: 'AtlasHub Digital',
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: 'AtlasHub Digital | The Augmented Enterprise', description: 'People, intelligent systems, software and automation working as one.' },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { width: 'device-width', initialScale: 1, maximumScale: 5, themeColor: '#01040b' };

const jsonLd = {
  '@context':'https://schema.org', '@type':'Organization', name:'AtlasHub Digital Ltd', url:'https://atlashub.digital',
  description:'Technology company building intelligent systems, digital platforms, automation and operational infrastructure.',
  sameAs:['https://atlashub.si']
};

export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
  return <html lang="en" className="dark"><head><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(jsonLd)}} /></head><body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body></html>;
}
