import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import input from "./inputPesquisa.module.css";
import {BuscarSugestao} from "./Buscador";

export default function InputPesquisa({setIsMenuOpen,setIsOpen}) {
    const router = useRouter();
    const [termoPesquisa, setTermoPesquisa] = useState('');
    const [sugestoes, setSugestoes] = useState([]);
    const [mostrarSugestoes, setMostrarSugestoes] = useState(false);
    const pesquisaRef = useRef(null);

    // Filtrar sugestões baseadas no termo digitado
    useEffect(() => {
        if (termoPesquisa.length === 0) {
            setSugestoes([]);
        }else{
            BuscarSugestao(termoPesquisa,setSugestoes,setMostrarSugestoes);
        }
    }, [termoPesquisa]);

    // Fechar sugestões quando clicar fora
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (pesquisaRef.current && !pesquisaRef.current.contains(event.target)) {
                setMostrarSugestoes(false);
                setSugestoes([]);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Selecionar uma sugestão
    const selecionarSugestao = (sugestao) => {
        setTermoPesquisa(sugestao.titulo);
        setMostrarSugestoes(false);
        setIsMenuOpen(false);
        setIsOpen(false);
        // Redirecionar para a página da receita
        router.push({
            pathname: '/Receita/page',
            query: { id: sugestao.id },
        });
    };

    return (
        <div className={input.container} ref={pesquisaRef}>
            <form className={input.form} onSubmit={(e) => e.preventDefault()}>
                <button type="submit">
                    <svg width="17" height="16" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="search">
                        <path d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9" stroke="currentColor" strokeWidth="1.333" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                </button>
                <input 
                    className={input.input} 
                    placeholder="Pesquisar..." 
                    required 
                    type="text"
                    value={termoPesquisa}
                    onChange={(e) => setTermoPesquisa(e.target.value)}
                    onFocus={() => termoPesquisa.length > 0 && setMostrarSugestoes(true)}
                />
                {termoPesquisa && (
                    <button className={input.reset} type="reset" onClick={() => setTermoPesquisa('')}>
                        <svg xmlns="http://www.w3.org/2000/svg" className={input.h_6} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                )}
            </form>
            
            {mostrarSugestoes && sugestoes.length > 0 && (
                <ul className={input.sugestoes}>
                    {sugestoes.map((sugestao) => (
                        <li 
                            key={sugestao.id} 
                            onClick={() => selecionarSugestao(sugestao)}
                            className={input.sugestao_item}
                        >
                            {sugestao.titulo}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
