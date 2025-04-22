import InputPesquisa from "../InputPesquisa/inputPesquisa";
import styles from "./nav.module.css";
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function Nav() {
    const router = useRouter();
    
    const goToHome = () => {
        router.push('/');
    };
    
    return (
      
        <div className={styles.container}>
            <div className={styles.container_logo}>
                
                <Image src="/Logo.svg" alt="Receitas da Naty" width={200} height={100} />
            </div>

            <div className={styles.container_ul}>
                <ul>
                    <li onClick={goToHome}><p>HOME</p></li>
                    <li><p>CONTEUDO</p></li>
                    <li><p>SOCIAL</p></li>
                    <li><p>NOVIDADES</p></li>
                </ul>
            </div>

            <div className={styles.pesquisa}>
                <InputPesquisa/>
            </div>
        </div>
         
      
    );
}
