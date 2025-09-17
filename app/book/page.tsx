"use client";
import { useEffect } from "react";

export default function BookPage() {
  // Auto-altura del iframe de Fitune:
  useEffect(() => {
    const id = "fitune-iframe-height";
    if (!document.getElementById(id)) {
      const s = document.createElement("script");
      s.id = id;
      s.src = "https://dev-my.fitune.io/iframeHeightSetter.js";
      s.async = true;
      document.body.appendChild(s);
    }
  }, []);

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">Book a class</h1>
        <p className="text-gray-600 mt-2">Reserva tu clase de Casa Solena.</p>

        <div className="mt-6 rounded-2xl overflow-hidden border">
          <iframe
            id="fituneWebsiteIframeEmbed"
            src="https://www.myfitune.io/embed/casa-solena/activities"
            height="1200"
            width="100%"
            frameBorder="0"
            title="Reservas Casa Solena"
            className="w-full"
          />
        </div>
      </div>
    </main>
  );
}
