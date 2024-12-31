import "./posts"
import styles from "./post.module.css";
import Conteudo from "./Conteudo/conteudo";
import SideBar from "./SideBar/sideBar";


export default function Principal() {
  return (
    

        <div className={styles.Principal}>
            <Conteudo/>
            <SideBar/>


        </div>
       
    
  );
}
