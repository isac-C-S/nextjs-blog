import URLConfig from '../../../../Config/URLConfig'

export async function getTopPosts() {
    try{
        const response = await fetch(`${URLConfig.BACKEND_URL}/Receita/topPost`);
        if (!response.ok) {
            throw new Error('Erro ao buscar os posts mais populares');
        }
        const data = await response.json();
        return data; // Return the fetched data
    }
    catch (error) {
        console.error('Erro ao buscar os posts:', error);
        return null;
    }
};