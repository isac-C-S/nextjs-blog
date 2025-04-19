import Image from "next/image";
import styles from "./categorias.module.css";
import { useState, useEffect } from "react";
import {BuscarReceitasPorCategoria,BuscarCategorias} from "./Buscador";
import {BuscarReceitas} from "../Posts/Buscador";

export default function Categorias({setReceitas, categorias, setCategorias, setTotalPaginas, setPagina, pagina, setCategoriaSelecionada}) {
  const [categoriaAtual, setCategoriaAtual] = useState("");

 useEffect(() => {BuscarCategorias(setCategorias);}, []);

  // aciona a busca de receita de acordo com a categoria clicada. se clicar em uma categoria já selecionada, ele limpa a categoria e busca todas as receitas novamente.
  const handleCategoriaClick = (id) => {
    if (categoriaAtual === id) {
      setCategoriaAtual("");
      setCategoriaSelecionada(null);
      setPagina(0);
    
      BuscarReceitas(0, setReceitas, setTotalPaginas);
    } else {
      setCategoriaAtual(id);
      setCategoriaSelecionada(id);
      setPagina(0);
      BuscarReceitasPorCategoria(id, setReceitas, setTotalPaginas, 0);
    }
  };

  // Aciona a Busca de Acordo com a paginação e a categoria selecionada
  useEffect(() => {
    if (categoriaAtual) {
      BuscarReceitasPorCategoria(categoriaAtual, setReceitas, setTotalPaginas, pagina);
    }
  }, [pagina, categoriaAtual, setTotalPaginas, setReceitas]);

  return (
     <div className={styles.categorias}>
        {categorias.map((categoria => (
          <div 
            className={`${styles.categoria} ${categoriaAtual === categoria.id ? styles.categoriaAtiva : ''}`} 
            onClick={() => handleCategoriaClick(categoria.id)} 
            key={categoria.id}
          >
            <Image 
              src={categoria.imagem} 
              alt={categoria.nome}   
              width={500}                 
              height={300}              
            />
            <p style={{fontSize:"medium"}}>{categoria.nome}</p>
          </div>
        )))}
     </div>
  );
}
