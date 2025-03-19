import Image from "next/image";
import styles from "./conteudo.module.css";
import { useState, useEffect } from "react";
import {BuscarReceitas} from "../../Posts/Buscador";
import { useRouter } from 'next/router';

export default function Conteudo() {
    const [receitas, setReceitas] = useState([]);
    const [totalpaginas, setTotalPaginas] = useState(0);
    const [pagina, setPagina] = useState(0);
    const router = useRouter();

   useEffect(() => { BuscarReceitas(pagina, setReceitas, setTotalPaginas);}, [pagina]);

   const MudarPagina = (numero) => {
         return () => setPagina(numero);
   };

   const renderPaginas = () => {
    const paginas = [];
    const inicio = Math.max(0, pagina - 4);
    const fim = Math.min(totalpaginas, pagina + 4);

    for (let i = inicio; i < fim; i++) {
        paginas.push(i);
    }

    return paginas.map((numero) => (
        <span
            key={numero}
            onClick={MudarPagina(numero)}
            className={numero === pagina ? styles.paginaAtual : ''}
        >
            {numero + 1}
        </span>
    ));
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
  