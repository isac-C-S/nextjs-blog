import Image from "next/image";
import styles from "./SeInscreva.module.css";

export default function SeInscreva() {
    return (
      
  
          <div className={styles.SeInscreva} >
            
            <div className={styles.titulo}>
                <h1>Inscreva-se e acompanhe!</h1>
            </div>

            <div className={styles.redes}>

                <div className={styles.redeItem}>
                     <Image 
                        src="/facebook-icon.svg" 
                        alt="Facebook" 
                        width={25} 
                        height={25}
                        className={styles.socialIcon}
                     />
                </div>

                <div className={styles.redeItem}>
                     <Image 
                        src="/instagram-icon.svg" 
                        alt="Instagram" 
                        width={25} 
                        height={25}
                        className={styles.socialIcon}
                     />
                </div>

                <div className={styles.redeItem}>
                     <Image 
                        src="/pinterest-icon.svg" 
                        alt="Pinterest" 
                        width={25} 
                        height={25}
                        className={styles.socialIcon}
                     />
                </div>
            </div>
  
          </div>
         
      
    );
  }
