import type { Metadata } from "next";
import { HomeScrollJump } from "@/components/HomeScrollJump";

export const metadata: Metadata = {
  title: "Strona główna | Wodmix",
  description:
    "Poznaj firme Wodmix i obszary specjalizacji: instalacje sanitarne, pompy ciepla i prace ziemne.",
};

// TODO: Uzupełnij daty i opisy prawdziwą historią firmy
const historyMilestones = [
  {
    year: "2012",
    title: "Wydarzenie 1",
    description: "Opis wydarzenia 1.",
    placeholderLabel: "Zdjęcie: otwarcie oddziału Pacanów",
  },
  {
    year: "2014",
    title: "Wydarzenie 2",
    description: "Opis wydarzenia 2.",
    placeholderLabel: "Zdjęcie: instalacje CO/CWU",
  },
  {
    year: "2016",
    title: "Wydarzenie 3",
    description: "Opis wydarzenia 3.",
    placeholderLabel: "Zdjęcie: koparkoładowarka w akcji",
  },
  {
    year: "2021",
    title: "Wydarzenie 4",
    description: "Opis wydarzenia 4.",
    placeholderLabel: "Zdjęcie: montaż pompy ciepła",
  },
  {
    year: "2023",
    title: "Wydarzenie 5",
    description: "Opis wydarzenia 5.",
    placeholderLabel: "Zdjęcie: Program Czyste Powietrze",
  },
  {
    year: "2025",
    title: "Wydarzenie 6",
    description: "Opis wydarzenia 6.",
    placeholderLabel: "Zdjęcie: otwarcie oddziału Łubnice",
  },
  {
    year: "2026",
    title: "Wydarzenie 7",
    description: "Opis wydarzenia 7.",
    placeholderLabel: "Zdjęcie: obecna działalność",
  },
];

export default function Home() {
  return (
    <main className="bg-white">
      <HomeScrollJump
        targetIds={historyMilestones.map(
          (milestone) => `historia-${milestone.year}`,
        )}
        offset={256}
      />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative h-[calc(100svh-5rem)] flex items-center justify-center overflow-hidden bg-white">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <p className="text-brand-blue font-semibold tracking-widest uppercase text-xs mb-4">
            Od lat w Twojej okolicy
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 text-brand-blue-dark">
            Wodmix
          </h1>
          <p className="text-lg md:text-xl font-medium text-brand-blue-dark/70 max-w-2xl mx-auto mb-10 [text-wrap:balance]">
            Lokalna firma z wieloletnim doświadczeniem w instalacjach
            sanitarnych, pompach ciepła i pracach ziemnych.
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-brand-blue/30 animate-bounce pointer-events-none select-none">
          <span className="text-[10px] tracking-widest uppercase">Przewiń</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </section>

      {/* ── HISTORIA ─────────────────────────────────────── */}
      <section
        id="historia-firmy"
        className="container mx-auto px-4 md:px-8 py-20"
      >
        <div className="text-center mb-16">
          <p className="text-brand-blue font-semibold tracking-widest uppercase text-xs mb-3">
            Skąd jesteśmy
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-brand-blue-dark">
            Nasza historia
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative max-w-5xl mx-auto pb-10">
          {/* Central vertical spine */}
          <div className="absolute left-4 top-0 bottom-0 w-1 bg-brand-blue/20 rounded-full md:left-1/2 md:-translate-x-px" />

          <div className="flex flex-col gap-0">
            {historyMilestones.map((milestone, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={milestone.year}
                  id={`historia-${milestone.year}`}
                  className="relative"
                >
                  {/* Year badge centered on the spine */}
                  <div className="absolute left-4 -translate-x-1/2 top-0 z-10 md:left-1/2">
                    <div className="bg-brand-blue text-white text-xs font-extrabold px-3 py-1.5 rounded-full shadow-md whitespace-nowrap">
                      {milestone.year}
                    </div>
                  </div>

                  {/* Content row */}
                  <div
                    className={`grid grid-cols-1 pt-10 pb-14 gap-6 pl-12 md:pl-0 md:grid-cols-2 md:gap-0 md:items-center`}
                  >
                    {/* Photo placeholder */}
                    <div
                      className={`${isEven ? "md:order-1 md:pr-16" : "md:order-2 md:pl-16"}`}
                    >
                      <div className="rounded-2xl overflow-hidden shadow-sm aspect-[4/3] bg-brand-blue/6 border-2 border-dashed border-brand-blue/20 flex flex-col items-center justify-center gap-2 text-brand-blue/40">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-10 w-10"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 3h18M3 21h18"
                          />
                        </svg>
                        <span className="text-xs font-medium text-center px-4">
                          {milestone.placeholderLabel}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <div
                      className={`${isEven ? "md:order-2 md:pl-16" : "md:order-1 md:pr-16"}`}
                    >
                      <h3 className="text-2xl font-extrabold text-brand-blue-dark mb-3">
                        {milestone.title}
                      </h3>
                      <p className="text-brand-blue-dark/70 leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* End dot */}
          <div className="absolute bottom-0 left-4 -translate-x-1/2 w-4 h-4 rounded-full bg-brand-blue/30 border-4 border-white shadow md:left-1/2" />
        </div>
      </section>
    </main>
  );
}
