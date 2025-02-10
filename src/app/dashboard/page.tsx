import ProtectedRoute from "@/components/ProtectedRoute";

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <div className="p-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p>Bienvenido, solo administradores y desarrolladores pueden ver esto.</p>
      </div>
    </ProtectedRoute>
  );
}
