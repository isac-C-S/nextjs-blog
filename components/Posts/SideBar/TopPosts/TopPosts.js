import Image from "next/image";
import styles from "./TopPosts.module.css";


export default function TopPosts() {
    return (
      
  
          <div className={styles.TopPosts}>
             <div className={styles.titulo}>
                <h1>Posts Populares</h1>
            </div>

            <div>
                <ul className={styles.lista}>
                    <li className={styles.posts}> 
                        <div className={styles.img}>
                            <Image src="/item1.jpg" alt="redes" width={72} height={72}/>
                        </div>

                        <div>
                            <p>Bolo de Cenoura Delcioso</p>
                        </div>

                        <div className={styles.numero}>
                            <h1>1</h1>
                        </div>
                    </li>

                    <li className={styles.posts}> 
                        <div className={styles.img}>
                            <Image src="/item1.jpg" alt="redes" width={72} height={72}/>
                        </div>

                        <div>
                            <p>Bolo de Cenoura Delcioso</p>
                        </div>

                        <div className={styles.numero}>
                            <h1>2</h1>
                        </div>
                    </li>

                    <li className={styles.posts}> 
                        <div className={styles.img}>
                            <Image src="/item1.jpg" alt="redes" width={72} height={72}/>
                        </div>

                        <div>
                            <p>Bolo de Cenoura Delcioso</p>
                        </div>

                        <div className={styles.numero}>
                            <h1>3</h1>
                        </div>
                    </li>

                    <li className={styles.posts}> 
                        <div className={styles.img}>
                            <Image src="/item1.jpg" alt="redes" width={72} height={72}/>
                        </div>

                        <div>
                            <p>Bolo de Cenoura Delcioso</p>
                        </div>

                        <div className={styles.numero}>
                            <h1>4</h1>
                        </div>
                    </li>

                    <li className={styles.posts}> 
                        <div className={styles.img}>
                            <Image src="/item1.jpg" alt="redes" width={72} height={72}/>
                        </div>

                        <div className={styles.texto}>
                            <p>Bolo de Cenoura Delcioso</p>
                        </div>

                        <div className={styles.numero}>
                            <h1>5</h1>
                        </div>
                    </li>
                    
                </ul>
            </div>
          </div>
         
      
    );
  }
  