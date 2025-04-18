// Verificação de variáveis de ambiente obrigatórias
if (!process.env.NEXT_PUBLIC_BACKEND_URL) {
    throw new Error('NEXT_PUBLIC_BACKEND_URL não está definido. Por favor, configure esta variável de ambiente.');
  }
  
  if (!process.env.NEXT_PUBLIC_FRONTEND_URL) {
    throw new Error('NEXT_PUBLIC_FRONTEND_URL não está definido. Por favor, configure esta variável de ambiente.');
  }


const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const FRONTEND_URL = process.env.NEXT_PUBLIC_FRONTEND_URL;

const URLConfig = {
    BACKEND_URL,
    FRONTEND_URL
  };


export default URLConfig;
