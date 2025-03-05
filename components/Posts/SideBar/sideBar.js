import Anuncios from "./Anuncios/Anuncios";
import SeInscreva from "./seInscreva/SeInscreva";
import styles from "./sidebar.module.css";
import SobreMim from "./SobreMim/sobreMim";
import TopPosts from "./TopPosts/TopPosts";

export default function SideBar() {
    return (
      
  
          <div className={styles.SideBars} >
            <SobreMim/>
            <SeInscreva/>    
            <TopPosts/>
            <Anuncios/>
          </div>
         
      
    );
  }
  