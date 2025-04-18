import URLConfig from '../../Config/URLConfig';

export async function BuscarReceitasPorCategoria(id, setReceitas) {
    try {
        const response = await fetch(`${URLConfig.BACKEND_URL}/Receita/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) {
            setReceitas([]);
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setReceitas(data);
    } catch (error) {
        console.error("Erro ao buscar receitas:", error);
    }
}