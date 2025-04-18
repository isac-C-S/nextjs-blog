import "./posts"
import styles from "./post.module.css";
import Conteudo from "./Conteudo/conteudo";
import SideBar from "./SideBar/sideBar";


export default function Principal({receitas,totalpaginas,setPagina,pagina}) {
  return (
    

        <div className={styles.Principal}>
            <Conteudo  receitas={receitas} totalpaginas={totalpaginas} setPagina={setPagina} pagina={pagina} />
            <SideBar/>
            

        </div>
       
    
  );
}
