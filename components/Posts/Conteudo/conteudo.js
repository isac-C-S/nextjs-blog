import Image from "next/image";
import styles from "./conteudo.module.css";
import { useState, useEffect } from "react";
  

export default function Conteudo() {
    const [receitas, setReceitas] = useState([]);

    //Busca Todos os Posts(Receitas) Cadastrados
    const BuscarReceitas = async () => {
        try{
            const response = await fetch("http://localhost:8080/Receita", {
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
            setReceitas(data);
        }catch(error){
            console.error("Erro ao buscar posts:", error
            )
        }
    };useEffect(() => {BuscarReceitas();}, []);

    return (
          <div className={styles.Conteudo} >
            {receitas.map((receita =>(

                <div className={styles.posts}>
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
                
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>Ultimo</span>
            </div>
          </div>

          
         
      
    );
  }
  