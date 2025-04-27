import InputPesquisa from "../InputPesquisa/inputPesquisa";
import styles from "./nav.module.css";
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';
import MenuHamburger from "../MenuHamburguer/MenuHaburguer";

export default function Nav() {
    const router = useRouter();
    const logoRef = useRef(null);
    const hamburgerRef = useRef(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isFixed, setIsFixed] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    
    //direcionar para a pagina inicial 
    const goToHome = () => {
        setIsMenuOpen(false); 
        setIsOpen(false);
        router.push('/');
    };

    // Mecanica para trasnformar o menu hamburguer em um menu fixo quando o logo sai da tela
    useEffect(() => {
        const handleScroll = () => {
            if (logoRef.current && hamburgerRef.current) {
                if (logoRef.current.getBoundingClientRect().bottom <= 0) {
                    hamburgerRef.current.classList.add(styles.fixed);
                    setIsFixed(true);
                } else {
                    hamburgerRef.current.classList.remove(styles.fixed);
                    setIsFixed(false);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    
    return (
        <div className={styles.container}>
            <div className={styles.container_logo} ref={logoRef}>
                <Image 
                    src="/Logo.svg" 
                    alt="Receitas da Naty" 
                    width={160} 
                    height={60} 
                    onClick={goToHome}
                />
            </div>

            <div className={styles.container_hamburguer} ref={hamburgerRef}>
                <MenuHamburger isOpen={isOpen} setIsOpen={setIsOpen} onToggle={(open) => setIsMenuOpen(open)} />
            </div>

            {/* Menu móvel que aparece quando o hambúrguer está aberto */}
            {isMenuOpen && (
                <div className={`${styles.mobile_menu} ${isFixed ? styles.fixed_menu : styles.relative_menu}`}>
                    <div className={styles.mobile_search}>
                        <InputPesquisa setIsOpen={setIsOpen} setIsMenuOpen={setIsMenuOpen} />
                    </div>
                    <nav className={styles.mobile_nav}>
                        <ul>
                            <li onClick={goToHome}><p>HOME</p></li>
                            <li><p>CONTEUDO</p></li>
                            <li><p>SOCIAL</p></li>
                            <li><p>NOVIDADES</p></li>
                        </ul>
                    </nav>
                </div>
            )}

            {/* Menu normal para desktop */}
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