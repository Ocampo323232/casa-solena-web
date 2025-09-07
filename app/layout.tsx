export const metadata = {
  title: "Casa Solena",
  description: "Pilates & Barre en CDMX – Reserva tu clase"
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
