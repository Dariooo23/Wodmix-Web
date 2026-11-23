import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

/**
 * Content Security Policy.
 *
 * Strona jest w pełni statyczna (SSG), więc nie używamy nonce'ów — wymagałyby
 * renderowania dynamicznego przy każdym żądaniu. Next.js wstrzykuje inline
 * skrypty hydratacji, dlatego `script-src` zawiera 'unsafe-inline'; pozostałe
 * dyrektywy blokują ładowanie skryptów i ramek z obcych domen, wtyczki,
 * podmianę <base> oraz osadzanie strony w ramkach (clickjacking).
 * 'unsafe-eval' jest potrzebne wyłącznie w trybie dev (React DevTools / HMR).
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  // Vercel Web Analytics w produkcji ładuje skrypt z tej samej domeny
  // (/_vercel/insights); w trybie dev — wersję debug z va.vercel-scripts.com.
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval' https://va.vercel-scripts.com" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  `connect-src 'self'${isDev ? " ws: wss:" : ""}`,
  // Osadzone mapy Google na stronie /oddzialy.
  "frame-src https://www.google.com https://maps.google.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "manifest-src 'self'",
  "worker-src 'self' blob:",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  // Wymusza HTTPS przez 2 lata. includeSubDomains / preload świadomie pominięte,
  // dopóki nie wiadomo, czy wszystkie subdomeny docelowej domeny mają HTTPS.
  { key: "Strict-Transport-Security", value: "max-age=63072000" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Starsze przeglądarki nie znają `frame-ancestors`.
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  // Nie ujawniaj technologii serwera w nagłówku `X-Powered-By`.
  poweredByHeader: false,
  images: {
    // Optymalizator obrazów obsługuje tylko lokalne pliki bez query stringów —
    // ogranicza możliwość zapychania cache'u losowymi wariantami URL.
    localPatterns: [{ pathname: "/**", search: "" }],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
