"use client";

import React, { useMemo, useState, useEffect } from "react";
import { MotionConfig } from "framer-motion";
import {
  Dumbbell,
  HeartPulse,
  Leaf,
  MapPin,
  Phone,
  Clock3,
  ChevronRight,
  Star,
  Instagram,
  Facebook,
  Mail,
  MessageCircle,
  Menu,
  X,
} from "lucide-react";
import Image from "next/image";

// —— CONFIGURABLE BRAND TOKENS ——
const BRAND = {
  name: "Casa Solena",
  logo: "/logonegro.png",
  primary: "#5e544a",
  accent: "#B39D7A",
  light: "#F5F5EB",
  whatsapp:
    "https://wa.me/525554666694?text=Hola%20quiero%20reservar%20una%20clase",
  booking: "https://www.myfitune.io/embed/casa-solena/activities",
  pricing: "https://www.myfitune.io/embed/casa-solena/pricing",
  events: "https://www.myfitune.io/embed/casa-solena/events",
  address:
    "Av. División del Nte. 1044, Narvarte Poniente, Benito Juárez, 03020 Ciudad de México, CDMX",
  maps: "https://maps.google.com/?q=Av.+División+del+Nte.+1044,+Narvarte+Poniente,+Benito+Juárez,+03020+Ciudad+de+México,+CDMX",
  fituneScript: "https://dev-my.fitune.io/iframeHeightSetter.js",
};

const COPY = {
  es: {
    nav: ["Clases", "Horarios", "Precios", "Eventos", "Cursos", "Ubicación", "Preguntas"],
    heroTitle: "Pilates y Barre Studio",
    heroSubtitle: "Fuerza, postura y bienestar en un mismo lugar.",
    ctaBook: "Reservar clase",
    ctaWhats: "WhatsApp",
    ctaMemberships: "Ver membresías",
    trust: ["Espacios amplios", "Instructores certificados", "Un espacio seguro"],
    classesTitle: "Nuestras clases",
    scheduleTitle: "Horarios",
    pricesTitle: "Precios y membresías",
    eventsTitle: "Eventos",
    faqTitle: "Preguntas frecuentes",
    locationTitle: "Ubicación",
    footer:
      "© " + new Date().getFullYear() + " Casa Solena. Todos los derechos reservados.",
    faq: [
      {
        q: "¿Necesito experiencia previa?",
        a: "Para nada. Tenemos clases de iniciación y te guiamos desde tu primera sesión.",
      },
      {
        q: "¿Qué debo llevar?",
        a: "Ropa cómoda, calcetines antiderrapantes (opcional) y ganas de moverte.",
      },
      {
        q: "¿Cómo reservo o cancelo?",
        a: "Reserva desde el sistema en línea o por WhatsApp. Puedes cancelar hasta 8 horas antes sin penalidad.",
      },
    ],
  },
};

type SectionProps = {
  id?: string;
  children: React.ReactNode;
};

function Section({ id, children }: SectionProps) {
  return (
    <section id={id} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {children}
    </section>
  );
}

function StickyWhatsApp({ label }: { label: string }) {
  return (
    <a
      href={BRAND.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 inline-flex items-center gap-2 rounded-full bg-green-500 text-white px-5 py-3 shadow-lg hover:bg-green-600 z-40"
    >
      <MessageCircle className="w-5 h-5" />
      {label}
    </a>
  );
}

function FituneEmbed({
  id,
  src,
  title,
}: {
  id: string;
  src: string;
  title: string;
}) {
  return (
    <div className="rounded-2xl overflow-hidden border bg-white shadow-sm">
      <iframe
        id={id}
        title={title}
        src={src}
        height="700"
        width="100%"
        frameBorder="0"
        className="w-full"
      />
    </div>
  );
}

export default function StudioLanding() {
  const [lang] = useState<"es">("es");
  const [menuOpen, setMenuOpen] = useState(false);

  const t = useMemo(() => COPY[lang], [lang]);

  useEffect(() => {
    const id = "fitune-iframe-height";
    if (!document.getElementById(id)) {
      const script = document.createElement("script");
      script.id = id;
      script.src = BRAND.fituneScript;
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen text-gray-900 bg-gradient-to-b from-[#F5F5EB] via-white to-white">
        {/* —— NAVBAR —— */}
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <a href="/" className="flex items-center">
              <Image
                src={BRAND.logo}
                alt={BRAND.name}
                width={220}
                height={60}
                className="h-12 w-auto"
                priority
                sizes="(max-width: 768px) 160px, 220px"
              />
              <span className="sr-only">{BRAND.name}</span>
            </a>

            <nav className="hidden md:flex items-center gap-6">
              {t.nav.map((item, i) => (
                <a
                  key={i}
                  href={`#sec-${i}`}
                  className="text-sm hover:text-[#A48363] transition"
                >
                  {item}
                </a>
              ))}
              <a
                href="/book"
                className="text-sm hover:text-[#A48363] transition"
              >
                Reservar
              </a>
            </nav>

            <div className="hidden sm:flex items-center gap-2">
              <a
                href="/book"
                className="inline-flex items-center gap-2 rounded-xl bg-[#B39D7A] text-white px-4 py-2 hover:brightness-95"
              >
                <Clock3 className="w-4 h-4" />
                Reservar
              </a>
            </div>

            <button
              className="md:hidden inline-flex items-center justify-center rounded-md p-2 hover:bg-gray-100"
              aria-label="Abrir menú"
              onClick={() => setMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </header>

        {/* —— MENÚ MOBILE —— */}
        {menuOpen && (
          <div className="fixed inset-0 z-[1000]">
            <div className="absolute inset-0 bg-white" />

            <div className="relative z-[1001] flex h-full flex-col">
              <div className="h-16 flex items-center justify-between border-b px-4 sm:px-6 lg:px-8">
                <a
                  href="/"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center"
                >
                  <Image
                    src={BRAND.logo}
                    alt={BRAND.name}
                    width={200}
                    height={84}
                    className="h-7 w-auto"
                  />
                  <span className="sr-only">{BRAND.name}</span>
                </a>

                <button
                  className="inline-flex items-center justify-center rounded-md p-2 hover:bg-gray-100"
                  aria-label="Cerrar menú"
                  onClick={() => setMenuOpen(false)}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="px-6 py-6 space-y-3 overflow-auto">
                {t.nav.map((item, i) => (
                  <a
                    key={i}
                    href={`#sec-${i}`}
                    className="block text-lg py-2"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}

                <div className="pt-4">
                  <a
                    href="/book"
                    className="inline-flex w-full items-center justify-center rounded-xl bg-[#B39D7A] text-white py-3 font-semibold hover:brightness-95"
                    onClick={() => setMenuOpen(false)}
                  >
                    Reservar clase
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* —— HERO MOBILE —— */}
        <section id="hero" className="lg:hidden relative min-h-[80vh] z-0">
          <Image
            src="/heromobile3.png"
            alt="Casa Solena"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/35" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 px-6 text-center">
            <h1 className="text-white text-[28px] leading-tight font-light italic tracking-wide">
              {t.heroTitle}
            </h1>

            <div className="flex flex-col gap-3 w-full max-w-xs">
              <a
                href="/book"
                className="rounded-full bg-white/90 text-gray-900 py-3 font-semibold hover:bg-white"
              >
                {t.ctaBook}
              </a>
              <a
                href="#sec-2"
                className="rounded-full bg-white/70 text-gray-900 py-3 font-medium hover:bg-white/85"
              >
                {t.ctaMemberships}
              </a>
            </div>
          </div>
        </section>

        {/* —— HERO DESKTOP —— */}
        <div className="hidden lg:flex items-center justify-center min-h-screen">
          <section id="hero" className="flex flex-col items-center text-center">
            <Image
              src={BRAND.logo}
              alt="Casa Solena"
              width={600}
              height={300}
              className="w-auto h-auto mb-6"
              priority
            />

            <h1 className="text-4xl font-bold text-[#5e544a]">
              {t.heroTitle}
            </h1>

            <p className="mt-4 text-lg text-gray-600">{t.heroSubtitle}</p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="/book"
                className="inline-flex items-center gap-2 rounded-xl bg-[#B39D7A] text-white px-5 py-3 font-semibold hover:brightness-95"
              >
                <Clock3 className="w-5 h-5" />
                Reservar
              </a>

              <a
                href={BRAND.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border px-5 py-3 font-semibold hover:bg-gray-50"
              >
                <Phone className="w-5 h-5" />
                WhatsApp
              </a>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {t.trust.map((item, i) => (
                <span
                  key={i}
                  className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium bg-white/70 backdrop-blur border-gray-200"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-8 flex items-center gap-6 text-sm text-gray-600 flex-wrap justify-center">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4" style={{ color: BRAND.accent }} />
                4.9/5 rating
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" style={{ color: BRAND.accent }} />
                {BRAND.address}
              </div>
            </div>
          </section>
        </div>

        {/* —— CLASES —— */}
        <Section id="sec-0">
          <h2 className="text-3xl font-bold mb-8">{t.classesTitle}</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Mat Pilates",
                desc: "Core, control y postura en clases sobre mat.",
                icon: Leaf,
              },
              {
                title: "Sculpt",
                desc: "Rutinas para fortalecer y definir todo el cuerpo.",
                icon: Dumbbell,
              },
              {
                title: "Barre",
                desc: "Trabajo de bajo impacto con foco en piernas, glúteo y estabilidad.",
                icon: HeartPulse,
              },
            ].map((c, i) => (
              <div
                key={i}
                className="rounded-2xl border bg-white p-6 shadow-sm hover:shadow-md transition"
              >
                <c.icon className="w-8 h-8" style={{ color: BRAND.accent }} />
                <h3 className="mt-3 font-semibold text-lg">{c.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{c.desc}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* —— HORARIOS —— */}
        <Section id="sec-1">
          <h2 className="text-3xl font-bold mb-8">{t.scheduleTitle}</h2>
          <FituneEmbed
            id="fituneActivities"
            src={BRAND.booking}
            title="Horarios Casa Solena"
          />
        </Section>

        {/* —— PRECIOS —— */}
        <Section id="sec-2">
          <h2 className="text-3xl font-bold mb-8">{t.pricesTitle}</h2>
          <FituneEmbed
            id="fitunePricing"
            src={BRAND.pricing}
            title="Precios y membresías Casa Solena"
          />
        </Section>
                {/* —— Cursos —— */}
        <Section id="sec-4">
  <h2 className="text-3xl font-bold mb-8">Cursos</h2>

  <div className="rounded-2xl overflow-hidden border bg-white">
    <iframe
      id="fituneCourses"
      src="https://www.myfitune.io/embed/casa-solena/courses"
      height="700"
      width="100%"
      frameBorder="0"
      className="w-full"
    />
  </div>
</Section>
  

        {/* —— EVENTOS —— */}
        <Section id="sec-3">
          <h2 className="text-3xl font-bold mb-8">{t.eventsTitle}</h2>
          <FituneEmbed
            id="fituneEvents"
            src={BRAND.events}
            title="Eventos Casa Solena"
          />
        </Section>

        {/* —— UBICACIÓN —— */}
        <Section id="sec-5">
          <h2 className="text-3xl font-bold mb-6">{t.locationTitle}</h2>

          <div className="grid lg:grid-cols-2 gap-6 items-start">
            <div className="rounded-2xl border bg-white p-6 space-y-3">
              <div className="flex items-center gap-2">
                <MapPin
                  className="w-5 h-5 flex-shrink-0"
                  style={{ color: BRAND.accent }}
                />
                <span>{BRAND.address}</span>
              </div>

              <a
                href={BRAND.maps}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#A48363] hover:underline text-sm"
              >
                Ver en Google Maps
                <ChevronRight className="w-4 h-4" />
              </a>

              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Phone className="w-4 h-4" />
                <a
                  href={BRAND.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </a>
              </div>

              <div className="flex gap-3 pt-2">
                <a
                  href="https://www.instagram.com/casasolenamx?igsh=ZjJkMTZyZWYzM3Q4"
                  className="p-2 rounded-full border hover:bg-gray-50"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://www.instagram.com/casasolenamx?igsh=ZjJkMTZyZWYzM3Q4"
                  className="p-2 rounded-full border hover:bg-gray-50"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="mailto:melissagracian@casasolena.mx"
                  className="p-2 rounded-full border hover:bg-gray-50"
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border bg-white">
              <div className="aspect-[16/9]">
                <iframe
                  title="Mapa Casa Solena"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d120406.9309!2d-99.28!3d19.39!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zQ0RNWA!5e0!3m2!1ses!2smx!4v1700000000000"
                  width="100%"
                  height="100%"
                  loading="lazy"
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </Section>

        {/* —— FAQ —— */}
        <Section id="sec-6">
          <h2 className="text-3xl font-bold mb-8">{t.faqTitle}</h2>

          <div className="space-y-4">
            {t.faq.map((item, i) => (
              <details
                key={i}
                className="rounded-2xl border bg-white p-5 group"
              >
                <summary className="cursor-pointer list-none font-medium flex items-center justify-between">
                  {item.q}
                  <ChevronRight className="w-5 h-5 transition-transform group-open:rotate-90" />
                </summary>
                <p className="mt-3 text-sm text-gray-700">{item.a}</p>
              </details>
            ))}
          </div>
        </Section>

        {/* —— FOOTER —— */}
        <footer className="border-t py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-sm text-gray-600 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>{t.footer}</div>

            <div className="flex items-center gap-4">
              <a href="#hero" className="hover:text-[#A48363]">
                Inicio
              </a>
              <a href="/book" className="hover:text-[#A48363]">
                Reservar
              </a>
              <a
                href={BRAND.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#A48363]"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </footer>

        {!menuOpen && <StickyWhatsApp label={t.ctaWhats} />}
      </div>
    </MotionConfig>
  );
}
