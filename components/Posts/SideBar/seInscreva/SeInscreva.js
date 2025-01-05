
import Image from "next/image";
import styles from "./SeInscreva.module.css";

export default function SeInscreva() {
    return (
      
  
          <div className={styles.SeInscreva} >
            
            <div className={styles.titulo}>
                <h1>Inscreva-se e acompanhe!</h1>
            </div>

            <div className={styles.redes}>

                <div>
                     <Image src="/facebook.png" alt="redes" width={25} height={25}/>
                </div>

                <div>
                     <Image src="/facebook.png" alt="redes" width={25} height={25}/>
                </div>

                <div>
                     <Image src="/facebook.png" alt="redes" width={25} height={25}/>
                </div>
            </div>
  
          </div>
         
      
    );
  }
  