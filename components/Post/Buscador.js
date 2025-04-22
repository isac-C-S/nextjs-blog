import URLConfig from '../../Config/URLConfig'

export const BuscarReceitaPorId = async (id, setReceita) => {

    try {
        const response = await fetch(`${URLConfig.BACKEND_URL}/Receita/receita/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            console.log(id);
            throw new Error('Erro ao buscar a receita');
        }

        const data = await response.json();
        console.log(data);
        setReceita(data);
    } catch (error) {
        console.error('Erro:', error);
        throw error;
    }

};

export const BuscarCategoriaDaReceita = async (id, setCategoria) => {
    try {
        const response = await fetch(`${URLConfig.BACKEND_URL}/Categoria/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Erro ao buscar a categoria da receita');
        }

        const data = await response.json();
        setCategoria(data.nome);
    } catch (error) {
        console.error('Erro:', error);
        throw error;
    }

};

export const BuscarIngredientesDareceita = async (id, setIngredientes) => {
    try {
        const response = await fetch(`${URLConfig.BACKEND_URL}/IngredienteDaReceita/receita/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Erro ao buscar os ingredientes da receita');
        }

        const data = await response.json();
        setIngredientes(data);
    } catch (error) {
        console.error('Erro:', error);
        throw error;
    }

};

export const BuscarModoPreparoDaReceita = async (id, setModoPreparo) => {
    try {
        const response = await fetch(`${URLConfig.BACKEND_URL}/ModoPreparo/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Erro ao buscar o modo de preparo da receita');
        }

        const data = await response.json();
        setModoPreparo(data);
    } catch (error) {
        console.error('Erro:', error);
        throw error;
    }

};