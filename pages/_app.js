import '../styles/global.css';  // Importando o CSS global corretamente
import { AuthProvider } from '../Config/AuthContext';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
