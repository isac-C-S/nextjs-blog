import styles from './Anuncios.module.css';
import { useEffect } from 'react';

export default function Anuncios() {
    // Anúncios de exemplo com imagens reais ilustrativas
    const mockAds = [
        {
            id: 1,
            title: "Cursos de Programação Online",
            description: "Aprenda desenvolvimento web completo com React, Next.js e Node.",
            image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
            link: "https://exemplo.com/cursos",
            alt: "Pessoa programando em um laptop"
        },
        {
            id: 2,
            title: "eBooks de Desenvolvimento",
            description: "Biblioteca completa para desenvolvedores frontend e backend.",
            image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
            link: "https://exemplo.com/ebooks",
            alt: "Livros sobre programação e desenvolvimento"
        },
        {
            id: 3,
            title: "Hospedagem de Sites Premium",
            description: "Servidores de alta performance com 99.9% de disponibilidade.",
            image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
            link: "https://exemplo.com/hospedagem",
            alt: "Servidores em um datacenter"
        },
        {
            id: 4,
            title: "Templates Profissionais",
            description: "Temas e layouts prontos para seu próximo projeto web.",
            image: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
            link: "https://exemplo.com/templates",
            alt: "Designer trabalhando em um template de site"
        },
        {
            id: 5,
            title: "Domínios Premium",
            description: "Encontre o domínio perfeito para o seu negócio ou projeto.",
            image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
            link: "https://exemplo.com/dominios",
            alt: "Registros de domínios na internet"
        },
        {
            id: 6,
            title: "Ferramentas para Desenvolvedores",
            description: "Softwares e extensões para aumentar sua produtividade.",
            image: "https://imagess.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
            link: "https://exemplo.com/ferramentas",
            alt: "Conjunto de ferramentas de desenvolvimento"
        }
    ];

    useEffect(() => {
        // Mantemos esta função para quando você migrar para o AdSense
        try {
            if (typeof window !== 'undefined' && window.adsbygoogle) {
                const adElements = document.querySelectorAll('.adsbygoogle:not([data-adsbygoogle-status="done"])');
                adElements.forEach((ad) => {
                    if (!ad.getAttribute('data-adsbygoogle-status')) {
                        (window.adsbygoogle = window.adsbygoogle || []).push({});
                    }
                });
            }
        } catch (error) {
            console.log('AdSense ainda não disponível:', error);
        }
    }, []);

    return (
        <div className={styles.anunciosContainer}>
            {/* Mostrando todos os anúncios de exemplo */}
            {mockAds.map((ad) => (
                <div key={ad.id} className={styles.anuncio}>
                    <a href={ad.link} target="_blank" rel="noopener noreferrer" className={styles.mockAdLink}>
                        <div className={styles.mockAdContent}>
                            <div className={styles.mockAdImageContainer}>
                                {/* Usando imagem real diretamente */}
                                <div 
                                    className={styles.fallbackImage} 
                                    style={{backgroundImage: `url('${ad.image}')`}}
                                    aria-label={ad.alt}
                                />
                            </div>
                            <div className={styles.mockAdInfo}>
                                <h3>{ad.title}</h3>
                                <p>{ad.description}</p>
                                <span className={styles.mockAdCta}>Saiba mais</span>
                            </div>
                        </div>
                    </a>
                </div>
            ))}

            {/* Código do AdSense original mantido como comentário para referência futura */}
            {/* 
            <div className={styles.anuncio}>
                <ins className="adsbygoogle"
                     style={{ display: 'block' }}
                     data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
                     data-ad-slot="XXXXXXXXXX"
                     data-ad-format="auto"
                     data-full-width-responsive="true">
                </ins>
            </div>
            */}
        </div>
    );
}
