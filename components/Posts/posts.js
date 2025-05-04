import "./posts"
import styles from "./post.module.css";
import Conteudo from "./Conteudo/conteudo";
import SideBar from "./SideBar/sideBar";


export default function Principal({setReceitas, setTotalPaginas,receitas, totalpaginas, setPagina, pagina, categorias, categoriaSelecionada}) {
  return (
    <div className={styles.Principal}>
        <Conteudo  
          categorias={categorias}  
          receitas={receitas} 
          totalpaginas={totalpaginas} 
          setPagina={setPagina} 
          pagina={pagina}
          categoriaSelecionada={categoriaSelecionada} 
          setReceitas={setReceitas}
          setTotalPaginas={setTotalPaginas}
        />
        <SideBar/>
    </div>
  );
}
