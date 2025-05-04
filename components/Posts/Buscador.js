import URLConfig from '../../Config/URLConfig'
 
 //Busca Todos os Posts(Receitas) Cadastrados
    export const BuscarReceitas = async (pagina,setReceitas,setTotalPaginas) => {
        try{
            const response = await fetch(`${URLConfig.BACKEND_URL}/Receita?page=${pagina}`, {
                method : "GET",
                headers:{
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            });
            if(!response.ok){
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data.content);
            setReceitas(data.content);
            setTotalPaginas(data.totalPages);
           
        }catch(error){
            console.error("Erro ao buscar posts:", error
            )
        }
    };

    export const BuscarReceitas2 = async (setReceitas) => {
        try{
            const response = await fetch(`${URLConfig.BACKEND_URL}/Receita?page=${1}`, {
                method : "GET",
                headerds:{
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            });
            if(!response.ok){
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data.content);
            setReceitas(data.content);
        }catch(error){
            console.error("Erro ao buscar posts:", error
            )
        }
    };

