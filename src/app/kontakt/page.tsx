import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
	title: "Kontakt",
	description:
		"Skontaktuj się z Wodmix: Pacanów, Łubnice, Powiat Busko-Zdrój i województwo świętokrzyskie. Telefon, e-mail i szybki kontakt online.",
	keywords: [
		"kontakt Wodmix",
		"Pacanów",
		"Łubnice",
		"Powiat Busko-Zdrój",
		"Świętokrzyskie",
	],
};

export default function ContactPage() {
	redirect("/oddzialy");
}
