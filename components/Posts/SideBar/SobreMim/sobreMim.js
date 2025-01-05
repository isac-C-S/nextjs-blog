import Image from "next/image";
import styles from "./SobreMim.module.css";

export default function SobreMim() {
    return (
      
  
          <div  className={styles.sobreMim}>
            <div className={styles.titulo}>
                <h1>Sobre Mim</h1>
            </div>

            <div className={styles.img}>
               <Image src="/item1.jpg" alt="Sobre Mim" width={365} height={300}/>
            </div>

            <div className={styles.txt}>
                <p>Assistente social que encontra na cozinha o equilíbrio perfeito entre cuidar das pessoas e criar receitas incríveis. Apaixonada por sabores, compartilho meu amor pela culinária no blog. Vamos nos conectar?</p>
            </div>
  
  
          </div>
         
      
    );
  }
  