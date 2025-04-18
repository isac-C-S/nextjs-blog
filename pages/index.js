import Carrousel from "../components/Carrousel/carrousel";
import Categorias from "../components/Categorias/Categorias";
import Footer from "../components/Footer/Footer";
import Nav from "../components/Nav/nav";
import Principal from "../components/Posts/posts";
import {BuscarReceitas} from "../components/Posts/Buscador";
import { useRouter } from 'next/router';
import { useState, useEffect } from "react";

export default function Home() {
   const [receitas, setReceitas] = useState([]);
   const [totalpaginas, setTotalPaginas] = useState(0);
   const [pagina, setPagina] = useState(0);

  useEffect(() => { 
          BuscarReceitas(pagina, setReceitas, setTotalPaginas);
      }, [pagina]);

  return (
      <main>
        <Nav/>
        <Carrousel/>
        <Categorias setReceitas={setReceitas}/>
        <Principal receitas={receitas} totalpaginas={totalpaginas} setPagina={setPagina} pagina={pagina} />
        <Footer/>
      </main>
       
    
  );
}
