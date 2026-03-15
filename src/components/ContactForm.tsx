"use client";

import { useState } from "react";

interface ContactFormData {
  name: string;
  phone: string;
  message: string;
}

const INITIAL_STATE: ContactFormData = {
  name: "",
  phone: "",
  message: "",
};

export const ContactForm = () => {
  const glassButtonClass =
    "border border-brand-blue/30 bg-white/65 text-brand-blue rounded-full font-medium backdrop-blur-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.75),inset_0_-1px_0_rgba(0,63,115,0.12),0_6px_16px_rgba(0,63,115,0.16)] transition-all duration-200 ease-out hover:-translate-y-1 hover:scale-[1.03] hover:bg-white/80 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-1px_0_rgba(0,63,115,0.18),0_10px_22px_rgba(0,63,115,0.22)] active:translate-y-0 active:scale-100 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:scale-100";

  const [formData, setFormData] = useState<ContactFormData>(INITIAL_STATE);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);

  const sanitizedPhone = formData.phone.replace(/\s+/g, "");
  const isPhoneValid = /^\+?\d{9,15}$/.test(sanitizedPhone);
  const isNameValid = formData.name.trim().length >= 3;
  const isMessageValid = formData.message.trim().length >= 10;
  const isFormValid = isPhoneValid && isNameValid && isMessageValid;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setSubmitMessage(null);
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isFormValid) {
      setSubmitMessage("Uzupełnij poprawnie wszystkie pola formularza.");
      return;
    }

    setSubmitMessage(
      "Dziękujemy. Formularz został zapisany lokalnie. W kolejnym kroku można podłączyć wysyłkę przez API.",
    );
    setFormData(INITIAL_STATE);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 max-w-md w-full"
      noValidate
    >
      <label htmlFor="contact-name" className="font-semibold text-brand-blue">
        Imię i nazwisko
      </label>
      <input
        id="contact-name"
        type="text"
        name="name"
        placeholder="np. Jan Kowalski"
        value={formData.name}
        onChange={handleChange}
        className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brand-blue"
        aria-invalid={!isNameValid && formData.name.length > 0}
        required
      />
      {!isNameValid && formData.name.length > 0 && (
        <p className="text-sm text-red-700">Podaj co najmniej 3 znaki.</p>
      )}

      <label htmlFor="contact-phone" className="font-semibold text-brand-blue">
        Numer telefonu
      </label>
      <input
        id="contact-phone"
        type="tel"
        name="phone"
        placeholder="np. +48 888 858 998"
        value={formData.phone}
        onChange={handleChange}
        className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brand-blue"
        aria-invalid={!isPhoneValid && formData.phone.length > 0}
        required
      />
      {!isPhoneValid && formData.phone.length > 0 && (
        <p className="text-sm text-red-700">Wpisz poprawny numer telefonu.</p>
      )}

      <label
        htmlFor="contact-message"
        className="font-semibold text-brand-blue"
      >
        Wiadomość
      </label>
      <textarea
        id="contact-message"
        name="message"
        placeholder="Wiadomość"
        rows={4}
        value={formData.message}
        onChange={handleChange}
        className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brand-blue"
        aria-invalid={!isMessageValid && formData.message.length > 0}
        required
      />
      {!isMessageValid && formData.message.length > 0 && (
        <p className="text-sm text-red-700">
          Wiadomość powinna mieć co najmniej 10 znaków.
        </p>
      )}

      <button
        type="submit"
        className={`${glassButtonClass} px-4 py-2`}
        disabled={!isFormValid}
      >
        Wyślij
      </button>

      {submitMessage && (
        <p
          className="text-sm text-brand-blue-dark"
          role="status"
          aria-live="polite"
        >
          {submitMessage}
        </p>
      )}
    </form>
  );
};
