import Carrousel from "../components/Carrousel/carrousel";
import Categorias from "../components/Categorias/Categorias";
import Footer from "../components/Footer/Footer";
import Nav from "../components/Nav/nav";
import Principal from "../components/Posts/posts";
import {BuscarReceitas} from "../components/Posts/Buscador";
import { useState, useEffect } from "react";
import { createContext, useContext } from 'react';



export default function Home() {
   const [receitas, setReceitas] = useState([]);
   const [totalpaginas, setTotalPaginas] = useState(0);
   const [pagina, setPagina] = useState(0);
   const [categorias, setCategorias] = useState([]);
   const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);

  useEffect(() => { 
      // Only use the default BuscarReceitas when no category is selected
      if (!categoriaSelecionada) {
          BuscarReceitas(pagina, setReceitas, setTotalPaginas);
      }
  }, [pagina, categoriaSelecionada]);

  


  return ( 
      <main>
        <Nav/>
        <Carrousel categorias={categorias} />
        <Categorias 
          setReceitas={setReceitas} 
          categorias={categorias} 
          setCategorias={setCategorias}
          setTotalPaginas={setTotalPaginas}
          setPagina={setPagina}
          pagina={pagina}
          setCategoriaSelecionada={setCategoriaSelecionada}
        />
        <Principal 
          receitas={receitas} 
          totalpaginas={totalpaginas} 
          setPagina={setPagina} 
          pagina={pagina} 
          categorias={categorias} 
          categoriaSelecionada={categoriaSelecionada}
          setReceitas={setReceitas}
          setTotalPaginas={setTotalPaginas}

        />
        <Footer/>
      </main>
  );
}
