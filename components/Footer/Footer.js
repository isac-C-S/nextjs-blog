import Image from 'next/image';
import styles from './Footer.module.css';
import { router  } from 'next/router';

export default function Footer() {
 
  const IrAreaAdministrativa = () => {
    return () => router.push({
        pathname: '/Login/page',   
    })
};

  return (
    <div className={styles.Footer}>

      <Image
        src="/Logoblack.png"
        alt="Logo"
        width={250}
        height={200}
      />
      <p>COPYRIGHT © 2025 <a onClick={IrAreaAdministrativa()} >Estrelinha</a>. Desenvolvido por <a>Isac Santos</a>.</p>

    </div>

    
    
  );
}
