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
        
        // Verificar se deve incrementar a visualização
        const deveIncrementarVisualizacao = verificarNovaVisualizacao(id);
        
        if (deveIncrementarVisualizacao) {
            await SomarVisualizaçãoReceita(id);
        }
        
        setReceita(data);
    } catch (error) {
        console.error('Erro:', error);
        throw error;
    }
};

// Função para verificar se é uma nova visualização
const verificarNovaVisualizacao = (receitaId) => {
    // Chave para armazenar no localStorage
    const storageKey = 'receitasVisualizadas';
    
    // Obter receitas já visualizadas
    const receitasVisualizadasJSON = localStorage.getItem(storageKey);
    const receitasVisualizadas = receitasVisualizadasJSON 
        ? JSON.parse(receitasVisualizadasJSON) 
        : {};
    
    // Verificar se a receita foi visualizada e quando
    const agora = new Date().getTime();
    const ultimaVisualizacao = receitasVisualizadas[receitaId];
    
    // Definir período mínimo entre visualizações (24 horas em milissegundos)
    const periodoMinimo = 24 * 60 * 60 * 1000;
    
    // Verificar se é uma nova visualização válida
    const ehNovaVisualizacao = !ultimaVisualizacao || (agora - ultimaVisualizacao) > periodoMinimo;
    
    // Se for nova visualização, atualiza o registro
    if (ehNovaVisualizacao) {
        receitasVisualizadas[receitaId] = agora;
        localStorage.setItem(storageKey, JSON.stringify(receitasVisualizadas));
    }
    
    return ehNovaVisualizacao;
};

const SomarVisualizaçãoReceita = async (id) => {
    try {
        const response = await fetch(`${URLConfig.BACKEND_URL}/Receita/Visualizar/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            console.log(id);
            throw new Error('Erro ao incrementar visualização da receita');
        }
       
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

export const BuscarRelacionados = async (id,categoria, setRelacionados) => {

    try {
        const response = await fetch(`${URLConfig.BACKEND_URL}/Receita/postsRelacionados?categoria=${categoria}&receita=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Erro ao buscar as receitas relacionadas');
        }

        const data = await response.json();
        setRelacionados(data);
    } catch (error) {
        console.error('Erro:', error);
        throw error;
    }

};