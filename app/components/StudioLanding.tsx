"use client";
import React, { useMemo, useState, useEffect } from "react";
import { MotionConfig } from "framer-motion";
import {
  Dumbbell, HeartPulse, Leaf, MapPin, Phone,
  Clock3, ChevronRight, Quote, Star, ShieldCheck,
  Instagram, Facebook, Mail, Languages, MessageCircle,Menu,X
} from "lucide-react";
import Image from "next/image";
// —— CONFIGURABLE BRAND TOKENS ——
const BRAND = {
  name: "Casa Solena",
  logo: "/logonegro.png",
  primary: "#5e544a",   // brown-gray headings
  accent: "#B39D7A",    // terracotta
  light: "#F5F5EB",     // cream
  whatsapp: "https://wa.me/526642952887?text=Hola%20quiero%20reservar%20una%20clase",
  booking: "https://www.myfitune.io/embed/casa-solena/activities",
  address: "Av. División del Nte. 1044, Narvarte Poniente, Benito Juárez, 03020 Ciudad de México, CDMX",
  maps: "https://maps.google.com/?q=Av.+División+del+Nte.+1044,+Narvarte+Poniente,+Benito+Juárez,+03020+Ciudad+de+México,+CDMX"
};

// —— COPY: ES / EN ——
const COPY = {
  es: {
    nav: ["Clases", "Horarios", "Precios", "Ubicación", "Preguntas"],
    heroTitle: "Pilates y Barre Studio",
    heroSubtitle: "Fuerza, postura y bienestar en un mismo lugar.",
    ctaBook: "Reservar clase",
    ctaWhats: "WhatsApp",
    trust: ["Espacios Amplios", "Instructores certificados", "Un espacio seguro"],
    classesTitle: "Nuestras clases",
    scheduleTitle: "Horarios",
    pricesTitle: "Precios y membresías",
    testimonialsTitle: "Lo que dicen nuestras alumnas",
    faqTitle: "Preguntas frecuentes",
    locationTitle: "Ubicación",
    contactTitle: "Contacto",
    footer: "© " + new Date().getFullYear() + " " + BRAND.name + ". Todos los derechos reservados.",
    faq: [
      { q: "¿Necesito experiencia previa?", a: "Para nada. Tenemos clases de iniciación y te guiamos desde tu primera sesión." },
      { q: "¿Qué debo llevar?", a: "Ropa cómoda, calcetines antiderrapantes (opcional) y ganas de moverte." },
      { q: "¿Cómo reservo o cancelo?", a: "Reserva desde el sistema en línea o por WhatsApp. Puedes cancelar hasta 8 h antes sin penalidad." }
    ],
    pricePlans: [
      { name: "First Time", price: "$229", features: ["1 acceso", "Válido 30 días"], highlight: false },
      { name: "Clase suelta", price: "$289", features: ["1 acceso", "Válido 30 días"], highlight: false },
      { name: "Paquete 4 clases", price: "$1,039", features: ["4 accesos", "Vigencia 30 días", "Reserva flexible"], highlight: false },
      { name: "Paquete 8 clases", price: "$1,899", features: ["8 accesos", "Vigencia 30 días", "Reserva flexible"], highlight: true },
      { name: "Paquete 12 clases", price: "$2,699", features: ["12 accesos", "Vigencia 30 días", "Reserva flexible"], highlight: false },
      { name: "Mensualidad", price: "$3,199", features: ["1 Check in al día", "Prioridad en reservas"], highlight: false },
      { name: "All Access", price: "$4,299", features: ["Clases ilimitadas", "Prioridad en reservas"], highlight: false }
    ],
    testimonials: [
      { name: "Mariana", text: "En 3 semanas mejoró mi postura y cero dolor lumbar. Amo que las clases sean chiquitas.", stars: 5 },
      { name: "Sofía", text: "El ambiente es súper amable y las rutinas cambian cada clase. Me motiva muchísimo.", stars: 5 }
    ]
  }
};

function Section({ id, children }: { id?: string; children: React.ReactNode }) {
  return <section id={id} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">{children}</section>;
}
function Badge({ children }: { children: React.ReactNode }) {
  return <span className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium bg-white/70 backdrop-blur border-gray-200">{children}</span>;
}
function PlanCard({ name, price, features, highlight, ctaText, href }: any) {
  return (
    <div
      className={`rounded-2xl border p-6 shadow-sm bg-white ${
        highlight
          ? "border-[#B39D7A] shadow-[#E1DACA] ring-1 ring-[#E1DACA]"
          : "border-gray-200"
      }`}
    >
      <div className="flex items-baseline justify-between">
        <h3 className="text-xl font-semibold">{name}</h3>
        {highlight && (
          <span className="text-xs bg-[#EFD7DA] text-[#8a5f49] px-2 py-1 rounded-full">
            Popular
          </span>
        )}
      </div>

      <p className="text-3xl font-bold mt-2">
        {price}
        <span className="text-sm font-normal text-gray-500"> MXN</span>
      </p>

      <ul className="space-y-2 mt-4 text-sm">
        {features.map((f: string, i: number) => (
          <li key={i} className="flex gap-2">
            <ChevronRight className="w-4 h-4" />
            {f}
          </li>
        ))}
      </ul>

      <a
        href={href ?? "/book"}
        className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-[#B39D7A] text-white py-3 font-semibold hover:brightness-95 transition"
      >
        {ctaText}
      </a>
    </div>
  );
}
function Testimonial({ name, text, stars }: any) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-3">{Array.from({ length: stars }).map((_, i) => (<Star key={i} className="w-5 h-5 text-[#B39D7A]" />))}</div>
      <p className="text-base">“{text}”</p>
      <div className="mt-4 flex items-center gap-2 text-sm text-gray-600"><Quote className="w-4 h-4"/> {name}</div>
    </div>
  );
}
function StickyWhatsApp({ label }: { label: string }) {
  return (
    <a
      href={BRAND.whatsapp}
      target="_blank"
      className="fixed bottom-5 right-5 inline-flex items-center gap-2 rounded-full bg-green-500 text-white px-5 py-3 shadow-lg hover:bg-green-600"
    >
      <MessageCircle className="w-5 h-5" />
      {label}
    </a>
  );
}
export default function StudioLanding() {
  const [lang] = useState<'es' | 'en'>('es');
    const [menuOpen, setMenuOpen] = useState(false);
  const t = useMemo(() => COPY[lang as 'es'], [lang]);

  // Cargar script de Fitune para auto-altura del iframe
  useEffect(() => {
    const id = 'fitune-iframe-height';
    if (!document.getElementById(id)) {
      const s = document.createElement('script');
      s.id = id;
      s.src = 'https://dev-my.fitune.io/iframeHeightSetter.js';
      s.async = true;
      document.body.appendChild(s);
    }
  }, []);

  const scheduleNote = "Lunes a Jueves: 6–10am y 6–10pm · Viernes: 6–10am y 6–9pm · Sábado: 8–12pm · Domingo: 9–12pm";

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen text-gray-900 bg-gradient-to-b from-[#F5F5EB] via-white to-white">
        {/* —— NAVBAR —— */}
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
    {/* Logo / Nombre */}
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
    {/* Nav desktop */}
    <nav className="hidden md:flex items-center gap-6">
      {t.nav.map((item, i) => (
        <a key={i} href={`#sec-${i}`} className="text-sm hover:text-[#A48363]">{item}</a>
      ))}
      <a href="#reservas" className="text-sm hover:text-[#A48363]">Reservas</a>
    </nav>

    {/* Acciones (desktop) */}
    <div className="hidden sm:flex items-center gap-2">
      <a href="/book" className="inline-flex items-center gap-2 rounded-xl bg-[#B39D7A] text-white px-4 py-2 hover:brightness-95">
        <Clock3 className="w-4 h-4" /> Reservar
      </a>
    </div>

    {/* Botón hamburger (mobile) */}
    <button
      className="md:hidden inline-flex items-center justify-center rounded-md p-2 hover:bg-gray-100"
      aria-label="Abrir menú"
      onClick={() => setMenuOpen(true)}
    >
      <Menu className="w-6 h-6" />
    </button>
  </div>

  {/* Panel móvil */}
  {menuOpen && (
    <div className="md:hidden fixed inset-0 z-50 bg-white/95 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between border-b">
       <a href="/" onClick={() => setMenuOpen(false)} className="flex items-center">
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

      <div className="px-6 py-6 space-y-3">
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
        <a href="#reservas" className="block text-lg py-2" onClick={() => setMenuOpen(false)}>
          Reservas
        </a>

        <div className="pt-4">
          <a
            href="/book"
            className="inline-flex w-full items-center justify-center rounded-xl bg-[#B39D7A] text-white py-3 font-semibold hover:brightness-95"
            onClick={() => setMenuOpen(false)}
          >
            Book a class
          </a>
        </div>
      </div>
    </div>
  )}
</header>
 {/* HERO MÓVIL (Moon-style) */}
<div className="lg:hidden relative min-h-[80vh]">
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
        Book a class
      </a>
      <a
        href="#sec-2"
        className="rounded-full bg-white/70 text-gray-900 py-3 font-medium hover:bg-white/85"
      >
        Memberships
      </a>
    </div>
  </div>
</div>

{/* HERO DESKTOP (tu layout original) */}
<div className="hidden lg:block">
  <Section id="hero">
    <div className="grid lg:grid-cols-2 gap-10 items-center">
      <div>
        <div className="inline-flex items-center gap-2 bg-white rounded-full border px-3 py-1 text-xs">
          <ShieldCheck className="w-4 h-4" style={{ color: BRAND.accent }} />
          <span>Clases seguras · Formato boutique</span>
        </div>

        <section className="flex flex-col items-center text-center py-12">
          <Image
            src="/logonegro.png"
            alt="Casa Solena"
            width={600}
            height={300}
            className="w-auto h-auto mb-6"
            priority
          />
          <h1 className="text-4xl font-bold text-[#5e544a]">{t.heroTitle}</h1>
        </section>

        <p className="mt-4 text-lg text-gray-600">Fuerza, postura y bienestar en un mismo lugar.</p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a href="/book" className="inline-flex items-center gap-2 rounded-xl bg-[#B39D7A] text-white px-5 py-3 font-semibold hover:brightness-95">
            <Clock3 className="w-5 h-5" /> Reservar clase
          </a>
          <a href={BRAND.whatsapp} target="_blank" className="inline-flex items-center gap-2 rounded-xl border px-5 py-3 font-semibold hover:bg-gray-50">
            <Phone className="w-5 h-5" /> WhatsApp
          </a>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {t.trust.map((v, i) => (<span key={i} className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium bg-white/70 backdrop-blur border-gray-200">{v}</span>))}
        </div>

        <div className="mt-8 flex items-center gap-6 text-sm text-gray-600">
          <div className="flex items-center gap-2"><Star className="w-4 h-4" style={{ color: BRAND.accent }} /> 4.9/5 rating</div>
          <div className="flex items-center gap-2"><MapPin className="w-4 h-4" style={{ color: BRAND.accent }} /> {BRAND.address}</div>
        </div>
      </div>

      <div className="relative">
        <div className="rounded-3xl overflow-hidden shadow-xl ring-1" style={{ boxShadow: "#E1DACA 0 10px 30px -10px", borderColor: "#E1DACA" }}>
          <img
            src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1600&auto=format&fit=crop"
            alt="Clase de Pilates"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  </Section>
</div>
        {/* —— CLASES —— */}
        <Section id="sec-0">
          <h2 className="text-3xl font-bold mb-8">Nuestras clases</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {title:"Mat Pilates", desc:"Core y postura en mat.", icon:Leaf},
              {title:"Sculpt", desc:"Definir y fortalecer el cuerpo", icon:Leaf},
              {title:"Barre", desc:"Cardio de bajo impacto con foco en tren inferior.", icon:HeartPulse},
            ].map((c,i)=>(
              <div key={i} className="rounded-2xl border bg-white p-6 shadow-sm hover:shadow-md transition">
                <c.icon className="w-8 h-8" style={{color: BRAND.accent}}/>
                <h3 className="mt-3 font-semibold text-lg">{c.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{c.desc}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* —— HORARIOS —— */}
        <Section id="sec-1">
          <h2 className="text-3xl font-bold mb-8">Horarios</h2>
          <ul className="space-y-2 text-gray-700">
            <li>Lunes a Jueves: 6:00 – 10:00 am y 6:00 – 10:00 pm</li>
            <li>Viernes: 6:00 – 10:00 am y 6:00 – 9:00 pm</li>
            <li>Sábado: 8:00 – 12:00 pm</li>
            <li>Domingo: 9:00 – 12:00 pm</li>
          </ul>
          <p className="mt-4 text-sm text-gray-500">Clases de 30 min· </p>
          <p className="mt-2 text-xs text-gray-400">{scheduleNote}</p>
        </Section>

        {/* —— PRECIOS —— */}
        <Section id="sec-2">
          <h2 className="text-3xl font-bold mb-8">Precios y membresías</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {COPY.es.pricePlans.map((p, i) => (<PlanCard key={i} {...p} ctaText={COPY.es.ctaBook} href="/book"/>))}
          </div>
          <p className="text-sm text-gray-500 mt-4">*Precios de promoción, pueden cambiar sin previo aviso*</p>
        </Section>
        {/* —— TESTIMONIOS —— */}
        <Section>
          <h2 className="text-3xl font-bold mb-8">Lo que dicen nuestras alumnas</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {COPY.es.testimonials.map((ts, i) => (<Testimonial key={i} {...ts}/>))}
          </div>
        </Section>

        {/* —— FAQ —— */}
        <Section id="sec-5">
          <h2 className="text-3xl font-bold mb-8">Preguntas frecuentes</h2>
          <div className="space-y-4">
            {COPY.es.faq.map((item, i) => (
              <details key={i} className="rounded-2xl border bg-white p-5 group">
                <summary className="cursor-pointer list-none font-medium flex items-center justify-between">
                  {item.q}
                  <ChevronRight className="w-5 h-5 transition-transform group-open:rotate-90"/>
                </summary>
                <p className="mt-3 text-sm text-gray-700">{item.a}</p>
              </details>
            ))}
          </div>
        </Section>

        {/* —— UBICACIÓN —— */}
        <Section id="sec-4">
          <h2 className="text-3xl font-bold mb-6">Ubicación</h2>
          <div className="grid lg:grid-cols-2 gap-6 items-start">
            <div className="rounded-2xl border bg-white p-6 space-y-3">
              <div className="flex items-center gap-2"><MapPin className="w-5 h-5" style={{color: BRAND.accent}}/> {BRAND.address}</div>
              <a href={BRAND.maps} target="_blank" className="inline-flex items-center gap-2 text-[#A48363] hover:underline text-sm">Ver en Google Maps <ChevronRight className="w-4 h-4"/></a>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Phone className="w-4 h-4"/> <a href={BRAND.whatsapp} target="_blank">WhatsApp</a>
              </div>
              <div className="flex gap-3 pt-2">
                <a href="#" className="p-2 rounded-full border hover:bg-gray-50" aria-label="Instagram"><Instagram className="w-5 h-5"/></a>
                <a href="#" className="p-2 rounded-full border hover:bg-gray-50" aria-label="Facebook"><Facebook className="w-5 h-5"/></a>
                <a href="mailto:hola@casasolena.mx" className="p-2 rounded-full border hover:bg-gray-50" aria-label="Email"><Mail className="w-5 h-5"/></a>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden border bg-white">
              <div className="aspect-[16/9]">
                <iframe
                  title="Mapa"
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

        {/* —— FOOTER —— */}
        <footer className="border-t py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-sm text-gray-600 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>{COPY.es.footer}</div>
            <div className="flex items-center gap-4">
              <a href="#hero" className="hover:text-[#A48363]">Inicio</a>
              <a href="/book" target="_blank" className="hover:text-[#A48363]">Reservar</a>
              <a href={BRAND.whatsapp} target="_blank" className="hover:text-[#A48363]">WhatsApp</a>
            </div>
          </div>
        </footer>

        <StickyWhatsApp label={COPY.es.ctaWhats}/>
      </div>
    </MotionConfig>
  );
}
