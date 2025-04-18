import Image from "next/image";
import styles from "./conteudo.module.css";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';

export default function Conteudo({receitas,totalpaginas,setPagina,pagina}) {
   
    
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
    const router = useRouter();

    

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        if (typeof window !== 'undefined') {
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    }, []);

    const MudarPagina = (numero) => {
        return () => setPagina(numero);
    };

    const renderPaginas = () => {
        if (totalpaginas <= 1) return null;
        
        // Adjust number of visible pages based on screen width
        let maxPagesVisible = 5; // Default for larger screens
        
        if (windowWidth <= 480) {
            maxPagesVisible = 3; // Show only 3 pages on mobile
        } else if (windowWidth <= 768) {
            maxPagesVisible = 4; // Show 4 pages on tablets
        }
        
        let startPage = Math.max(0, Math.min(pagina - Math.floor(maxPagesVisible / 2), totalpaginas - maxPagesVisible));
        let endPage = Math.min(totalpaginas, startPage + maxPagesVisible);
        
        // Adjust if we can't show enough pages
        if (endPage - startPage < maxPagesVisible) {
            startPage = Math.max(0, endPage - maxPagesVisible);
        }

        // Handle case where there are fewer pages than maxPagesVisible
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

    const IrReceita = (id) => {
        return () => router.push({
            pathname: '/Receita/page',
            query: { id: id },
        })
    }

    return (
        <div className={styles.Conteudo} >
            {receitas.map((receita =>(

                <div className={styles.posts} onClick={IrReceita(receita.id)}>
                <div className={styles.img}>
                    <Image src={receita.imagem} alt={receita.titulo} width={365} height={300}/>
                </div>
                <div className={styles.posts_txt}>
                    
                    <div className={styles.data}>
                        <h4>BOLOS</h4>
                        <p>{receita.data}</p>
                    </div>

                    <div className={styles.titulo}>
                        <h1>{receita.titulo}</h1>
                    </div>

                    <div className={styles.texto}>
                        <p>{receita.texto}</p>
                    </div>

                    <div className={styles.link}>
                        <a>Ler Mais</a>
                    </div>
                </div>
            </div>

           )))}
            
            <div className={styles.paginacao}>
                {renderPaginas()}
            </div>
        </div>
    );
}
