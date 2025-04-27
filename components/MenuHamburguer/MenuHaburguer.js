import styles from "./MenuHaburguer.module.css";
import React, { useState, useEffect } from 'react';

export default function MenuHamburger({ onToggle,isOpen,setIsOpen }) {
   
    
    const toggleMenu = () => {
        const newState = !isOpen;
        setIsOpen(newState);
        if (onToggle) onToggle(newState);
    };

    useEffect(() => {
        // Previne rolagem do body quando o menu está aberto
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    return (
       <div className={styles.container}>
        <button 
            className={`${styles.btn} ${isOpen ? styles.open : ''}`}
            onClick={toggleMenu}
            type="button"
        >
          <span className={styles.icon}>
            <svg viewBox="0 0 175 80" width={40} height={40}>
              <rect className={styles.line1} width={80} height={15} fill="#f0f0f0" rx={10} />
              <rect className={styles.line2} y={30} width={80} height={15} fill="#f0f0f0" rx={10} />
              <rect className={styles.line3} y={60} width={80} height={15} fill="#f0f0f0" rx={10} />
            </svg>
          </span>
          <span className={styles.text}>{isOpen ? "FECHAR" : "MENU"}</span>
        </button>
     </div>
    );
}