import URLConfig from '../../../Config/URLConfig';
import { useReceitas } from '../../../pages/index';
import {BuscarReceitas} from "../Buscador";




export const DeletarReceita = async (id,pagina, setReceitas, setTotalPaginas) => {
    try {
        // Primeiro deletar entidades relacionadas
        let comentariosExcluidos = false;
        let modoPreparoExcluido = false;
        let ingredientesExcluidos = false;
        
        try {
            comentariosExcluidos = await DeletarComentariosPorIdReceita(id);
        } catch (error) {
            console.error("Erro ao excluir comentários:", error);
        }
        
        try {
            modoPreparoExcluido = await DeletarModoPreparoPorIdReceita(id);
        } catch (error) {
            console.error("Erro ao excluir modo de preparo:", error);
        }
        
        try {
            ingredientesExcluidos = await DeletarIngredientesPorIdReceita(id);
        } catch (error) {
            console.error("Erro ao excluir ingredientes:", error);
        }
        
        // Só continua se todas as operações anteriores forem bem-sucedidas
        if (comentariosExcluidos && modoPreparoExcluido && ingredientesExcluidos) {
            // Após deletar todas as entidades relacionadas, deletar a receita
            const response = await fetch(`${URLConfig.BACKEND_URL}/Receita/${id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            if (!response.ok) {
                throw new Error("Erro ao excluir receita");
            }

            BuscarReceitas(pagina, setReceitas, setTotalPaginas);

            return true;
        } else {
            throw new Error("Não foi possível excluir todos os itens relacionados à receita");
        }
    } catch (error) {
        console.error("Erro ao excluir receita:", error);
        throw error;
    }
};

const DeletarComentariosPorIdReceita = async (id) => {
    try {
        const response = await fetch(`${URLConfig.BACKEND_URL}/Comentario/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });
        if (!response.ok) {
            throw new Error("Erro ao excluir omentario da receita");
        }
        return true;
    } catch (error) {
        console.error("Erro ao excluir comentario da receita:", error);
        throw error;
    }
};

const DeletarModoPreparoPorIdReceita = async (id) => {
    try {
        const response = await fetch(`${URLConfig.BACKEND_URL}/ModoPreparo/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });
        if (!response.ok) {
            throw new Error("Erro ao excluir modo de preparo da receita");
        }
        return true;
    } catch (error) {
        console.error("Erro ao excluir modo de preparo da receita:", error);
        throw error;
    }
};

const DeletarIngredientesPorIdReceita = async (id) => {
    try {
        const response = await fetch(`${URLConfig.BACKEND_URL}/IngredienteDaReceita/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });
        if (!response.ok) {
            throw new Error("Erro ao excluir ingrediente da receita");
        }
        return true;
    } catch (error) {
        console.error("Erro ao excluir ingrediente da receita:", error);
        throw error;
    }
};
