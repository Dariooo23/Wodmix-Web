import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Strona główna | Wodmix",
  description:
    "Poznaj firme Wodmix i obszary specjalizacji: instalacje sanitarne, pompy ciepla i prace ziemne.",
};

export default function Home() {
  return (
    <main className="bg-white">
      <section className="relative h-[calc(100svh-5rem)] flex items-center justify-center overflow-hidden bg-white">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 text-brand-blue-dark">
            Wodmix
          </h1>
          <p className="text-lg md:text-xl font-medium text-brand-blue-dark/70 max-w-2xl mx-auto mb-10 [text-wrap:balance]">
            Lokalna firma z wieloletnim doświadczeniem.
          </p>
        </div>
      </section>
    </main>
  );
}
