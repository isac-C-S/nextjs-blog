import Image from "next/image";
import styles from "./categorias.module.css";
import { useState, useEffect } from "react";
import {BuscarReceitasPorCategoria} from "./Buscador";


export default function Categorias({setReceitas}) {
  const [categorias, setCategorias] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");

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


  useEffect(() => {
    // Only fetch if categoriaSelecionada has a valid value
    if (categoriaSelecionada) {
      BuscarReceitasPorCategoria(categoriaSelecionada, setReceitas);
    }
  }, [categoriaSelecionada]);

  return (
     <div className={styles.categorias}>
        {categorias.map((categoria => (
          <div className={styles.categoria} onClick={() => setCategoriaSelecionada(categoria.id)} key={categoria.id}>
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
