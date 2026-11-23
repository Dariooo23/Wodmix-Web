# Wodmix Web

Frontend strony firmy Wodmix zbudowany w Next.js (App Router) i Tailwind CSS.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4

## Uruchomienie lokalne

```bash
npm install
npm run dev
```

Podgląd: http://localhost:3000

## Dostępne strony

- / - strona główna
- /oferta - katalog usług
- /oddzialy - lokalizacje i kontakt do oddziałów
- /o-nas - historia firmy (przewijanie krokowe między etapami)
- /socials - profil na Facebooku
- /kontakt - przekierowanie na /oddzialy

## Struktura projektu

- src/app - routing i strony
- src/components - komponenty UI
- src/data - dane statyczne oferty i oddziałów
- src/types - typy domenowe

## Jakość kodu

```bash
npm run lint
```

## SEO — konfiguracja

Zmienne środowiskowe (Vercel → Settings → Environment Variables):

| Zmienna | Opis |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Adres strony (canonical, sitemap, Open Graph). Domyślnie `https://wodmix.pl`. |
| `GOOGLE_SITE_VERIFICATION` | Kod z Google Search Console (metoda „tag HTML”). |

Jedno źródło prawdy o firmie: `src/lib/site.ts` (nazwa, telefony, e-mail, social media)
oraz `src/data/services.ts` (adresy i godziny otwarcia sklepów). Dane te trafiają
do treści stron, stopki i danych strukturalnych schema.org — muszą być identyczne
z wizytówkami w Profilu Firmy w Google.

Generowane automatycznie: `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest`,
`/opengraph-image` (podgląd linku), favicony z `src/app/`.

Stare adresy z WordPressa (`/pompy-ciepla`, `/sklep` itd.) są przekierowane
w `next.config.ts` (`redirects`).
