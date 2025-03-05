import Image from 'next/image';
import styles from './Footer.module.css';
export default function Footer() {
  return (
    
    <div className={styles.Footer}>

      <Image
        src="/Logoblack.png"
        alt="Logo"
        width={250}
        height={200}
      />
      <p>COPYRIGHT © 2025 <a>Estrelinha</a>. Desenvolvido por <a>Isac Santos</a>.</p>

    </div>

    
    
  );
}
