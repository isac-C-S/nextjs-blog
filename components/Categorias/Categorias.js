import Image from "next/image";
import styles from "./categorias.module.css";
import { useState, useEffect } from "react";



export default function Categorias() {
  const [categorias, setCategorias] = useState([]);

  //Busca Todas as Categorias Cadastradas
  const BuscarCategorias = async () => {
    try {
      const response = await fetch("http://localhost:8080/Categoria", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
     setCategorias(data);
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
    }
  };useEffect(() => {BuscarCategorias();}, []);

  return (
     <div className={styles.categorias}>
        {categorias.map((categoria => (
          <div className={styles.categoria}>
            <Image 
              src={categoria.imagem} 
              alt={categoria.nome}   
              width={500}                 
              height={300}              
            />
            <p>{categoria.nome}</p>
          </div>
        )))}
     </div>
       
    
  );
}
