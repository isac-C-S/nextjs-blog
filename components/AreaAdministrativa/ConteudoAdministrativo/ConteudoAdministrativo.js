import Image from "next/image";
import styles from "./ConteudoAdministrativo.module.css";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';

export default function ConteudoAdministrativo({receitas, totalpaginas, setPagina, pagina, categorias, categoriaSelecionada}) {
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
    const router = useRouter();

    // Formata a data para um formato mais amigavel para o usuario
    const formatarData = (dataString) => {
        if (!dataString) return '--/--/----';
        
        try {
            const data = new Date(dataString);
            
            // Check if date is valid
            if (isNaN(data.getTime())) return dataString;
            
            // Format: "DD de Mês de YYYY às HH:MM"
            const options = { 
                day: '2-digit',
                month: 'long', 
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            };
            
            return data.toLocaleDateString('pt-BR', options)
                .replace(',', ' às'); // Replace comma with "às" for better readability
        } catch (error) {
            console.error("Erro ao formatar data:", error);
            return dataString; // Return original string in case of error
        }
    };

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        if (typeof window !== 'undefined') {
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    }, []);

    // Função para mudar a paginação
    const MudarPagina = (numero) => {
        return () => setPagina(numero);
    };

    // Renderiza os botoes de paginação
    const renderPaginas = () => {
        if (totalpaginas <= 1) return null;
        
        let maxPagesVisible = 5; 
        
        if (windowWidth <= 480) {
            maxPagesVisible = 3; 
        } else if (windowWidth <= 768) {
            maxPagesVisible = 4; 
        }
        
        let startPage = Math.max(0, Math.min(pagina - Math.floor(maxPagesVisible / 2), totalpaginas - maxPagesVisible));
        let endPage = Math.min(totalpaginas, startPage + maxPagesVisible);
        
      
        if (endPage - startPage < maxPagesVisible) {
            startPage = Math.max(0, endPage - maxPagesVisible);
        }

       
        if (totalpaginas <= maxPagesVisible) {
            startPage = 0;
            endPage = totalpaginas;
        }

        return (
            <div className={styles.paginacaoContainer}>
                {/* First page button */}
                <button 
                    onClick={MudarPagina(0)} 
                    disabled={pagina === 0}
                    className={`${styles.paginaControle} ${pagina === 0 ? styles.paginaDesabilitada : ''}`}
                    aria-label="Primeira página"
                >
                    &laquo;
                </button>
                
                {/* Previous button */}
                <button 
                    onClick={MudarPagina(Math.max(0, pagina - 1))} 
                    disabled={pagina === 0}
                    className={`${styles.paginaControle} ${pagina === 0 ? styles.paginaDesabilitada : ''}`}
                    aria-label="Página anterior"
                >
                    &lsaquo;
                </button>
                
                {/* Show ellipsis if not at start */}
                {startPage > 0 && (
                    <span className={styles.paginaEllipsis}>...</span>
                )}
                
                {/* Page numbers */}
                {Array.from({length: endPage - startPage}, (_, i) => startPage + i).map((numero) => (
                    <button
                        key={numero}
                        onClick={MudarPagina(numero)}
                        className={`${styles.paginaNumero} ${numero === pagina ? styles.paginaAtual : ''}`}
                        aria-label={`Página ${numero + 1}`}
                        aria-current={numero === pagina ? "page" : null}
                    >
                        {numero + 1}
                    </button>
                ))}
                
                {/* Show ellipsis if not at end */}
                {endPage < totalpaginas && (
                    <span className={styles.paginaEllipsis}>...</span>
                )}
                
                {/* Next button */}
                <button 
                    onClick={MudarPagina(Math.min(totalpaginas - 1, pagina + 1))} 
                    disabled={pagina >= totalpaginas - 1}
                    className={`${styles.paginaControle} ${pagina >= totalpaginas - 1 ? styles.paginaDesabilitada : ''}`}
                    aria-label="Próxima página"
                >
                    &rsaquo;
                </button>
                
                {/* Last page button */}
                <button 
                    onClick={MudarPagina(totalpaginas - 1)} 
                    disabled={pagina >= totalpaginas - 1}
                    className={`${styles.paginaControle} ${pagina >= totalpaginas - 1 ? styles.paginaDesabilitada : ''}`}
                    aria-label="Última página"
                >
                    &raquo;
                </button>
            </div>
        );
    };

    // Redireciona para a página de receita
    const IrReceita = (id) => {
        return () => router.push({
            pathname: '/Receita/page',
            query: { id: id },
        })
    };

    // Create placeholder items if needed
    const renderPlaceholders = () => {
        const placeholdersNeeded = Math.max(0, 8 - receitas.length);
        
        if (placeholdersNeeded <= 0) return null;
        
        return Array.from({ length: placeholdersNeeded }, (_, index) => (
            <div key={`placeholder-${index}`} className={`${styles.posts} ${styles.placeholder}`}>
                <div className={styles.img}>
                    <div className={styles.placeholderImage}></div>
                </div>
                <div className={styles.posts_txt}>
                    <div className={styles.data}>
                        <h4>Categoria</h4>
                        <p>--/--/----</p>
                    </div>
                    <div className={styles.titulo}>
                        <h1>Nova receita em breve</h1>
                    </div>
                    <div className={styles.texto}>
                        <p>Estamos preparando novos conteúdos para você. Fique atento às nossas próximas atualizações!</p>
                    </div>
                    <div className={styles.link}>
                        <a>Aguarde</a>
                    </div>
                </div>
            </div>
        ));
    };

    return (
        <div className={styles.Conteudo}>
            {/* Removed category badge section */}
            
            {receitas.map((receita =>(

                <div key={receita.id} className={styles.posts} onClick={IrReceita(receita.id)}>
                <div className={styles.img}>
                    <Image 
                        src={receita.imagem} 
                        alt={receita.titulo} 
                        width={100} 
                        height={300}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                        }}
                        priority={pagina === 0 && receitas.indexOf(receita) < 2}
                    />
                </div>
                <div className={styles.posts_txt}>
                    
                    <div className={styles.data}>
                        <h4>{categorias.find(cat => cat.id === receita.categoria)?.nome}</h4>
                        <p>{formatarData(receita.dataPostagem)}</p>
                    </div>

                    <div className={styles.titulo}>
                        <h1>{receita.titulo}</h1>
                    </div>

                    <div className={styles.texto}>
                        <p>{receita.texto}</p>
                    </div>

                    <div className={styles.verMais} >
                        <div className={styles.link}>
                            <a>Ler Mais</a>
                        </div>
                        <div className={styles.visualizacoes}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className={styles.eyeIcon}>
                                <path d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-44.2 0-80 35.8-80 80s35.8 80 80 80z"/>
                            </svg>
                            <span className={styles.viewsLabel}>Visualizações:</span>
                            <span className={styles.viewsCount}>{receita.visualizacoes}</span>
                        </div>
                    </div>
                </div>
            </div>

           )))}
            
            {/* Render placeholder items when needed */}
            {renderPlaceholders()}
            
            <div className={styles.paginacao}>
                {renderPaginas()}
            </div>
        </div>
    );
}

