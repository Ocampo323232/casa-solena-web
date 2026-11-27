import "./globals.css";

export const metadata = {
  title: "Casa Solena",
  description: "Pilates & Barre en CDMX – Reserva tu clase",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <script src="https://cdn.pagesense.io/js/casasolena/a45b8238c7bf464a8dbe12e7d3f398c3.js" async></script>
      </head>
      <body>{children}</body>
    </html>
  );
}
