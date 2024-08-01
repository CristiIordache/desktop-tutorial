import { createContext, useState, useEffect, useContext } from "react";
import { auth, db } from "../services/firebase"; // Importă obiectele de autentificare și Firestore din configurația Firebase
import { onAuthStateChanged } from "firebase/auth"; // Importă funcția pentru a asculta schimbările de stare de autentificare
import { doc, getDoc } from "firebase/firestore"; // Importă funcțiile pentru a lucra cu documentele Firestore

// Creează contextul pentru autentificare
const AuthContext = createContext();

// Componenta AuthProvider care furnizează contextul de autentificare
export const AuthProvider = ({ children }) => {
  // Starea pentru utilizatorul curent și dacă este admin
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Funcția de callback care se va apela la schimbarea stării de autentificare
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Dacă utilizatorul este autentificat
        setCurrentUser(user); // Setează utilizatorul curent în stare
      }
    });
    // Returnează funcția de curățare care se apelează la demontarea componentei
    return () => unsubscribe();
  }, []); // Dependințe goale înseamnă că efectul se va rula o singură dată, la montare

  useEffect(() => {
    const getuser = async (uid) => {
      try {
        // Obține referința la documentul utilizatorului din Firestore
        console.log(uid);
        const userDoc = doc(db, "users", uid);
        const docSnap = await getDoc(userDoc); // Obține documentul utilizatorului
        console.log("---------------------");
        console.log(docSnap.data());
        if (docSnap.exists()) {
          // Dacă documentul există, extrage datele utilizatorului
          const userData = docSnap.data();
          setIsAdmin(userData.isAdmin); // Setează starea de admin
        }
      } catch (error) {
        // În caz de eroare la obținerea datelor utilizatorului
        console.error("Error fetching user data:", error);
      }
    };

    if (currentUser) {
      getuser(currentUser.uid);
    }
  }, [currentUser]);
  // Furnizează contextul cu valorile curente
  return (
    <AuthContext.Provider value={{ currentUser, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizat pentru a folosi contextul de autentificare în alte componente
export const useAuth = () => useContext(AuthContext);
