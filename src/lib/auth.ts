import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth, db } from "./firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

// Proveedor de Google
const provider = new GoogleAuthProvider();

// Iniciar sesión con Google
export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const email = user.email;

    if (!email) throw new Error("No se encontró un email válido");

    const role = await getUserRole(email);
    if (!role) {
      throw new Error("Acceso no autorizado");
    }

    return { user, role };
  } catch (error) {
    console.error("Error en login:", error);
    throw error;
  }
};

// Cerrar sesión
export const logout = async () => {
  await signOut(auth);
};

// Obtener rol del usuario desde Firestore
export const getUserRole = async (email: string) => {
  if (!email) return null;

  const userRef = doc(db, "users", email);
  const userSnap = await getDoc(userRef);

  return userSnap.exists() ? userSnap.data().role : null;
};
