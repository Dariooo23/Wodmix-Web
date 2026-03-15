import type { Metadata } from "next";
import { storesData } from "@/data/services";
import { StoreLocator } from "@/components/StoreLocator";

export const metadata: Metadata = {
  title: "Oddziały",
  description: "Znajdź i skontaktuj się z wybranym oddziałem Wodmix.",
};

export default function BranchesPage() {
  return (
    <main className="bg-white">
      <section
        id="oddzialy"
        className="container mx-auto px-4 md:px-8 py-3 md:py-4"
      >
        <div className="text-center mb-3 md:mb-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-brand-blue">
            Nasze oddziały
          </h1>
          <p className="text-brand-blue-dark mt-2 max-w-2xl mx-auto">
            Znajdź i skontaktuj się z wybranym sklepem Wodmix.
          </p>
        </div>

        <StoreLocator stores={storesData} />
      </section>
    </main>
  );
}
