import Link from "next/link";

export default function CalendarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <nav className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">
            Casa de Eventos
          </Link>
          <Link href="/admin" className="hover:underline text-sm">
            Panel de Administración
          </Link>
        </div>
      </nav>
      <main className="min-h-screen bg-gray-100">{children}</main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>
          &copy; 2025 Casa de Eventos . Todos los derechos
          reservados.
        </p>
      </footer>
    </>
  );
}
