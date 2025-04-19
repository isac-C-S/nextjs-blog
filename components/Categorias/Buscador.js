import URLConfig from '../../Config/URLConfig';

// Busca As Receitas de Acordo com a Categoria
export async function BuscarReceitasPorCategoria(id, setReceitas, setTotalPaginas = null, pagina = 0) {
    try {
        const response = await fetch(`${URLConfig.BACKEND_URL}/Receita/${id}?page=${pagina}&size=8&sort=id&direction=asc`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) {
            setReceitas([]);
            if (setTotalPaginas) setTotalPaginas(0);
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // Extract the content array from the paginated response
        if (data && data.content) {
            setReceitas(data.content);
            // Update total pages if the function is provided
            if (setTotalPaginas) {
                setTotalPaginas(data.totalPages || 0);
            }
        } else {
            setReceitas([]);
            if (setTotalPaginas) setTotalPaginas(0);
            console.warn("Response data doesn't contain a content property:", data);
        }
    } catch (error) {
        console.error("Erro ao buscar receitas:", error);
    }
};

//Busca Todas as Categorias Cadastradas
export const BuscarCategorias = async (setCategorias) => {
try {
    const response = await fetch(`${URLConfig.BACKEND_URL}/Categoria`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
    });
    if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    setCategorias(data);
} catch (error) {
    console.error("Erro ao buscar categorias:", error);
}
};