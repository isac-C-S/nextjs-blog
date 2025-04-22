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

export const BuscarComentariosDaReceita = async (id, setComentarios) => {
    try {
        const response = await fetch(`${URLConfig.BACKEND_URL}/Comentario/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Erro ao buscar os comentários da receita');
        }

        const data = await response.json();
        setComentarios(data);
    } catch (error) {
        console.error('Erro:', error);
        throw error;
    }

};

export const CadastrarComentarioNaReceita = async ({ newComment, idReceita, userName, userEmail }) => {
    try {
        // Create current date in ISO format
        const currentDate = new Date().toISOString();
        
        const comentarioData = {
            comentario: newComment,
            idReceita: idReceita,
            data: currentDate,
            nome: userName ,
            email: userEmail
        };
        
        const response = await fetch(`${URLConfig.BACKEND_URL}/Comentario`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(comentarioData),
        });

        if (!response.ok) {
            throw new Error('Erro ao cadastrar o comentário na receita');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro:', error);
        throw error;
    }
};

export const BuscarCobertura = async (id, setIngredienteCobertura) => {
    try {
        const response = await fetch(`${URLConfig.BACKEND_URL}/Cobertura/receita/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Erro ao buscar os ingredientes da cobertura da receita');
        }

        const data = await response.json();
        setIngredienteCobertura(data);
    } catch (error) {
        console.error('Erro:', error);
        throw error;
    }

};