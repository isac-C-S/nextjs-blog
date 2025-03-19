import Post from "../Post/Post";
import SideBar from "../Posts/SideBar/sideBar";
import styles from './Receitas.module.css';

export default function Receitas() {
   

  return (
    
    <div className={styles.container}>
         <Post/>
         <SideBar/>
    </div>
       
    
  );
}
