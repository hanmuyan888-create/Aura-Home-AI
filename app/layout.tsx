import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CookieConsentBanner from './components/CookieConsentBanner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AuraHome AI - AI Interior Design in Seconds',
  // ✅ 改动1：优化 description，增加关键词覆盖
  description: 'Transform any room with AuraHome AI. Get professional AI interior design renderings instantly. 100% online, no design skills needed.',
  // ✅ 改动2：新增 keywords 字段，增强 SEO
  keywords: 'AI interior design, room design AI, home decor AI, virtual staging, AI rendering, interior design tool',
  authors: [{ name: 'AuraHome AI' }],
  openGraph: {
    title: 'AuraHome AI - AI Interior Design in Seconds',
    description: 'Transform any room with AuraHome AI. Get professional AI interior design renderings instantly.',
    url: 'https://www.myaurahomeai.com',
    siteName: 'AuraHome AI',
    images: [
      {
        url: 'https://www.myaurahomeai.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AuraHome AI - AI Interior Design',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AuraHome AI - AI Interior Design in Seconds',
    description: 'Transform any room with AuraHome AI. Get professional AI interior design renderings instantly.',
    images: ['https://www.myaurahomeai.com/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* 防闪烁脚本 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme) {
                    document.documentElement.setAttribute('data-theme', theme);
                  } else {
                    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                    document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        {/* Google Analytics */}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        )}
        {/* Sentry 错误监控（可选，如果配置了环境变量则自动启用） */}
        {process.env.NEXT_PUBLIC_SENTRY_DSN && (
          <Script
            src="https://js.sentry-cdn.com/your-sentry-key.min.js"
            strategy="afterInteractive"
            onLoad={() => {
              if (typeof window !== 'undefined' && (window as any).Sentry) {
                (window as any).Sentry.init({
                  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
                  tracesSampleRate: 1.0,
                });
              }
            }}
          />
        )}
      </head>
      <body className={inter.className}>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <CookieConsentBanner />
      </body>
    </html>
  );
}