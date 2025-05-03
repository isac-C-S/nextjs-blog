import { createContext, useContext, useState, useEffect } from 'react';

// Funções utilitárias para manipular cookies
function setCookie(name, value, days) {
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie = name + '=' + (value || '') + expires + '; path=/';
}

function getCookie(name) {
  const nameEQ = name + '=';
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function eraseCookie(name) {
  document.cookie = name + '=; Max-Age=-99999999; path=/';
}

const AuthContext = createContext({
  isAdmin: false,
  setIsAdmin: () => {},
});

export function AuthProvider({ children }) {
  const [isAdmin, setIsAdminState] = useState(false);

  useEffect(() => {
    // Lê o cookie ao iniciar
    const adminCookie = getCookie('isAdmin');
    setIsAdminState(adminCookie === 'true');
  }, []);

  // Removido o useEffect que apagava o cookie ao fechar/recarregar a página

  const setIsAdmin = (value) => {
    setIsAdminState(value);
    if (value) {
      // Cookie válido por 1 hora
      const date = new Date();
      date.setTime(date.getTime() + 1 * 60 * 60 * 1000); // 1 hora
      document.cookie = 'isAdmin=true; expires=' + date.toUTCString() + '; path=/';
    } else {
      eraseCookie('isAdmin');
    }
  };

  return (
    <AuthContext.Provider value={{ isAdmin, setIsAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
