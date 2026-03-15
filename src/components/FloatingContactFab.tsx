"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { FiMail, FiPhone, FiX } from "react-icons/fi";

export const FloatingContactFab = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const miniFabClass =
    "h-11 w-11 rounded-full border border-brand-blue-light/60 bg-brand-blue text-white shadow-[0_10px_24px_rgba(0,63,115,0.32)] transform-gpu transition-[transform,background-color,border-color,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:scale-[1.05] hover:bg-brand-blue-light hover:border-brand-blue-light hover:shadow-[0_14px_30px_rgba(0,63,115,0.4)] active:translate-y-0 active:scale-100 inline-flex items-center justify-center";

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed right-4 bottom-4 z-[70] md:right-6 md:bottom-6"
    >
      <div className="relative flex flex-col items-end gap-2">
        <div
          className={`flex flex-col items-end gap-2 transition-all duration-200 ${
            isOpen
              ? "translate-y-0 opacity-100 pointer-events-auto"
              : "translate-y-2 opacity-0 pointer-events-none"
          }`}
        >
          <a
            href="tel:+48888858998"
            className={miniFabClass}
            aria-label="Zadzwoń"
            title="Zadzwoń"
            onClick={() => setIsOpen(false)}
          >
            <FiPhone className="h-5 w-5" aria-hidden="true" />
          </a>
          <a
            href="mailto:wodmix@wp.pl"
            className={miniFabClass}
            aria-label="Wyślij maila"
            title="Wyślij maila"
            onClick={() => setIsOpen(false)}
          >
            <FiMail className="h-5 w-5" aria-hidden="true" />
          </a>
        </div>

        <button
          type="button"
          aria-expanded={isOpen}
          aria-label={isOpen ? "Zamknij kontakt" : "Otwórz kontakt"}
          onClick={() => setIsOpen((prev) => !prev)}
          className={`h-18 w-18 rounded-full border border-brand-blue-light/60 bg-brand-blue text-white text-2xl shadow-[0_14px_32px_rgba(0,63,115,0.35)] transform-gpu transition-[transform,background-color,border-color,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:scale-[1.05] hover:bg-brand-blue-light hover:border-brand-blue-light hover:shadow-[0_18px_36px_rgba(0,63,115,0.42)] active:translate-y-0 active:scale-100 ${
            isOpen ? "" : "animate-[fabPulse_2.4s_ease-in-out_infinite]"
          }`}
        >
          {isOpen ? (
            <FiX className="mx-auto h-6 w-6" aria-hidden="true" />
          ) : (
            <FiPhone className="mx-auto h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </div>
    </div>
  );
};
