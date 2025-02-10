"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginWithGoogle } from "@/lib/auth";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async () => {
    try {
      setError(null); // Resetear error antes de intentar login
      const { role } = await loginWithGoogle();
      if (role) {
        router.push("/dashboard");
      }
    } catch (err: unknown) {
      setError((err as Error).message || "Error desconocido. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <button 
        onClick={handleLogin}
        className="px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Iniciar sesión con Google
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
