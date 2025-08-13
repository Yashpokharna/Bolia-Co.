import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter, Manrope } from "next/font/google";
import { useState, useEffect } from 'react';
import CAFirmLoadingScreen from '@/components/CAFirmLoadingScreen';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export default function App({ Component, pageProps }: AppProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main className={`${inter.variable} ${manrope.variable} font-sans`}>
      {isLoading && (
        <CAFirmLoadingScreen
          logo="/images/hero-bg.png" // Put your logo in public/images/
          firmName="BOLIA & CO."
          tagline="Chartered Accountants & Business Advisors"
          onLoadingComplete={() => setIsLoading(false)}
          duration={3000}
        />
      )}
      
      {!isLoading && <Component {...pageProps} />}
    </main>
  );
}