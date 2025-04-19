import URLConfig from '../../Config/URLConfig'



export const BuscarSugestao = async (palavra,setSugestoes,setMostrarSugestoes) => {
    const url = `${URLConfig.BACKEND_URL}/Receita/sugestao?palavra=${palavra}`;
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    setSugestoes(data);
    setMostrarSugestoes(true);

    if(!response.ok){
        setSugestoes([]);
        setMostrarSugestoes(false);
    }
}