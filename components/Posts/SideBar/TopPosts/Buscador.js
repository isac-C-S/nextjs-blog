import URLConfig from '../../../../Config/URLConfig'

// Busca os 5 Posts(Receitas) Mais Visualizados Cadastrados
export async function getTopPosts() {
    try{
        const response = await fetch(`${URLConfig.BACKEND_URL}/Receita/topPost`);
        if (!response.ok) {
            throw new Error('Erro ao buscar os posts mais populares');
        }
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error('Erro ao buscar os posts:', error);
        return null;
    }
}; 