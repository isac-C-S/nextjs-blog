import CategoriaAdministrativo from "../../components/AreaAdministrativa/CategoriaAdministrativo/CategoriaAdministrativo";
import NavAdministrativa from "../../components/AreaAdministrativa/NavAdministrativo/NavAdministrativa";


import {BuscarReceitas} from "../../components/Posts/Buscador";

import { useState, useEffect } from "react";

export default function DashBoard() {
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
    <div>
        <NavAdministrativa/>
        <CategoriaAdministrativo
              setReceitas={setReceitas} 
              categorias={categorias} 
              setCategorias={setCategorias}
              setTotalPaginas={setTotalPaginas}
              setPagina={setPagina}
              pagina={pagina}
              setCategoriaSelecionada={setCategoriaSelecionada}
        />
    </div>
  );
}
