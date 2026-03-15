"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { Service } from "@/types";

interface ServiceCatalogProps {
  initialServices: Service[];
}

export const ServiceCatalog = ({ initialServices }: ServiceCatalogProps) => {
  const glassButtonClass =
    "border border-brand-blue/30 bg-white/65 text-brand-blue rounded-full font-bold backdrop-blur-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.75),inset_0_-1px_0_rgba(0,63,115,0.12),0_6px_16px_rgba(0,63,115,0.16)] transition-all duration-200 ease-out hover:-translate-y-1 hover:scale-[1.04] hover:bg-white/80 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-1px_0_rgba(0,63,115,0.18),0_10px_22px_rgba(0,63,115,0.22)] active:translate-y-0 active:scale-100";

  const [visibleItemsCount, setVisibleItemsCount] = useState(8);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(
    initialServices[0]?.id ?? null,
  );

  const listRef = useRef<HTMLDivElement>(null);

  const displayedServices = useMemo(() => initialServices, [initialServices]);

  const infiniteServices = useMemo(() => {
    if (displayedServices.length === 0) {
      return [];
    }

    return Array.from({ length: visibleItemsCount }, (_, index) => {
      const service = displayedServices[index % displayedServices.length];
      return {
        service,
        loopIndex: index,
      };
    });
  }, [displayedServices, visibleItemsCount]);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = 0;
    }
  }, [displayedServices]);

  const selectedServiceOrFallback = useMemo(() => {
    const selected = displayedServices.find(
      (service) => service.id === selectedServiceId,
    );
    return selected ?? displayedServices[0] ?? null;
  }, [displayedServices, selectedServiceId]);

  const getCategoryLabel = (category: Service["category"]) => {
    switch (category) {
      case "INSTALLATION":
        return "Instalacje";
      case "HEAVY_MACHINERY":
        return "Prace ziemne";
      case "CONSULTING":
        return "Doradztwo";
      default:
        return category;
    }
  };

  const getCategoryDetail = (service: Service) => {
    switch (service.category) {
      case "INSTALLATION":
        return service.requiresValuation
          ? "Wymaga wyceny indywidualnej"
          : "Cena ustalana po konsultacji";
      case "HEAVY_MACHINERY":
        return service.pricePerHour
          ? `Od ${service.pricePerHour} zł / godz.`
          : "Cena uzależniona od zakresu";
      case "CONSULTING":
        return `Program: ${service.fundingProgram}`;
      default:
        return "";
    }
  };

  const handleScroll = () => {
    const list = listRef.current;
    if (!list || displayedServices.length === 0) {
      return;
    }

    const scrollBottom = list.scrollTop + list.clientHeight;
    const threshold = list.scrollHeight - 80;

    if (scrollBottom >= threshold) {
      setVisibleItemsCount((prev) => prev + 6);
    }
  };

  return (
    <div className="space-y-8">
      <div className="max-w-2xl mx-auto">
        <div
          ref={listRef}
          onScroll={handleScroll}
          className="h-[24rem] overflow-y-auto overscroll-y-contain touch-pan-y rounded-2xl bg-gray-50 p-3 md:p-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          style={{
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
          }}
        >
          <div className="space-y-2">
            {infiniteServices.map(({ service, loopIndex }) => {
              const isActive = selectedServiceId === service.id;

              return (
                <button
                  key={`${service.id}-${loopIndex}`}
                  type="button"
                  onClick={() => setSelectedServiceId(service.id)}
                  className={`w-full text-left rounded-xl px-4 py-3 border transition-all ${isActive ? "border-brand-blue/35 bg-white/75 text-brand-blue shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-1px_0_rgba(0,63,115,0.12),0_6px_16px_rgba(0,63,115,0.16)]" : "bg-white text-brand-blue hover:bg-brand-blue/5 border-brand-blue/20"}`}
                >
                  <p className="font-bold">{service.title}</p>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {selectedServiceOrFallback && (
        <section className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-7 items-stretch">
          <article className="relative min-h-[17rem] rounded-2xl overflow-hidden shadow-sm border-2 border-dashed border-brand-blue/20 bg-brand-blue/6 flex flex-col items-center justify-center gap-3 text-brand-blue/40 p-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12"
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
            <p className="text-sm font-medium text-center">
              {selectedServiceOrFallback.title}
            </p>
          </article>

          <article className="rounded-2xl border border-brand-blue/10 bg-white shadow-lg p-6 md:p-8">
            <p className="inline-block rounded-full bg-brand-blue/10 text-brand-blue font-semibold px-3 py-1 mb-4">
              {getCategoryLabel(selectedServiceOrFallback.category)}
            </p>
            <h4 className="text-2xl font-extrabold text-brand-blue mb-3">
              Szczegóły oferty
            </h4>
            <p className="text-brand-blue-dark leading-relaxed mb-4">
              {selectedServiceOrFallback.description}
            </p>
            <p className="font-semibold text-brand-blue-dark mb-6">
              {getCategoryDetail(selectedServiceOrFallback)}
            </p>
            <a
              href="tel:+48888858998"
              className={`${glassButtonClass} inline-flex px-5 py-3`}
            >
              Zapytaj o ofertę
            </a>
          </article>
        </section>
      )}

      {displayedServices.length === 0 && (
        <div className="max-w-2xl mx-auto text-center py-8 text-brand-blue-dark">
          Brak ofert.
        </div>
      )}
    </div>
  );
};
