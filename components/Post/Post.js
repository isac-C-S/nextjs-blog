import styles from './Post.module.css';
import Image from 'next/image';

export default function Post() {
   

  return (
    
    <div className={styles.post}>
        <div className={styles.titulo}>
            <h3>BOLO</h3>
            <h1>Receita de bolo de chocolate molhadinho</h1>
            <p>—— May 08, 2021 ——</p>
        </div>

        <div className={styles.introducao}>
            <p>Prepare um delicioso bolo de chocolate molhadinho com esta receita fácil e prática. Assim, surpreenda sua família com uma sobremesa úmida e saborosa que derrete na boca.</p>
            <img src="/carne.jpeg" alt="Bolo de chocolate" />
        </div>

        <div className={styles.ingredientes}>
            <h3>ingredientes (8 porçoes):</h3>
        </div>
        
    </div>
       
    
  );
}
