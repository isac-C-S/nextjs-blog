import URLConfig from './URLConfig';

export const Autenticar = async (login, senha) => {
    const response = await fetch(`${URLConfig.BACKEND_URL}/Administrador`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, senha }),
        credentials: 'include'
    });
    return response.ok;
};

