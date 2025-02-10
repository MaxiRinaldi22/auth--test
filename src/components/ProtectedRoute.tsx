"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { getUserRole } from "@/lib/auth";
import { auth } from "@/lib/firebaseConfig";


const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/login");
        return;
      }

      const role = await getUserRole(user.email!);
      if (role === "admin" || role === "developer") {
        setAuthorized(true);
      } else {
        router.push("/login");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) return <p>Cargando...</p>;
  if (!authorized) return null;

  return <>{children}</>;
};

export default ProtectedRoute;
