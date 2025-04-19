import Image from "next/image";
import styles from "./TopPosts.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {getTopPosts} from "./Buscador"


export default function TopPosts() {
    const [topPosts, setTopPosts] = useState([]);
    const router = useRouter();
    
    // Função para limitar caracteres
    const limitarTexto = (texto, limite = 50) => {
        if (texto.length <= limite) return texto;
        return texto.substring(0, limite) + '...';
    };
    
    // Função para navegar para a página da receita
    const IrReceita = (id) => {
        return () => router.push({
            pathname: '/Receita/page',
            query: { id: id },
        })
    };
    
    // Buscar os posts mais populares quando o componente for montado
    useEffect(() => {
        async function fetchTopPosts() {
            const posts = await getTopPosts();
            if (posts) {
                setTopPosts(posts);
            }
        }
        fetchTopPosts();
    }, []);

    return (
      
  
          <div className={styles.TopPosts}>
             <div className={styles.titulo}>
                <h1>Posts Populares</h1>
            </div>

            <div>
                <ul className={styles.lista}>
                    {topPosts.length > 0 ? (
                        topPosts.map((post, index) => (
                            <li 
                                key={post.id} 
                                className={styles.posts}
                                onClick={IrReceita(post.id)}
                            > 
                                <div className={styles.img}>
                                    <Image src={post.imagem || "/item1.jpg"} alt={post.titulo} width={72} height={72}/>
                                </div>

                                <div >
                                    <p title={post.titulo}>{limitarTexto(post.titulo)}</p>
                                </div>

                                <div className={styles.numero}>
                                    <h1>{index + 1}</h1>
                                </div>
                            </li>
                        ))
                    ) : (
                        // Placeholder items if no posts are loaded yet
                        Array.from({ length: 5 }).map((_, index) => (
                            <li key={`placeholder-${index}`} className={styles.posts}> 
                                <div className={styles.img}>
                                    <Image src="/item1.jpg" alt="placeholder" width={72} height={72}/>
                                </div>

                                <div   >
                                    <p>Carregando...</p>
                                </div>

                                <div className={styles.numero}>
                                    <h1>{index + 1}</h1>
                                </div>
                            </li>
                        ))
                    )}
                </ul>
            </div>
          </div>
         
      
    );
  }
