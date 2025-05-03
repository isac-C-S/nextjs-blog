import Image from "next/image";
import styles from "./categorias.module.css";
import { useState, useEffect } from "react";
import {BuscarReceitasPorCategoria,BuscarCategorias} from "./Buscador";
import {BuscarReceitas} from "../Posts/Buscador";
import {ExcluirCategoria} from "../AreaAdministrativa/CategoriaAdministrativo/Scrpt";
import { useAuth } from '../../Config/AuthContext';
import CategoriaAdministrativo from "../AreaAdministrativa/CategoriaAdministrativo/CategoriaAdministrativo";

export default function Categorias({setReceitas, categorias, setCategorias, setTotalPaginas, setPagina, pagina, setCategoriaSelecionada}) {
  const { isAdmin } = useAuth();
  const [categoriaAtual, setCategoriaAtual] = useState("");
  const [hoveredId, setHoveredId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {BuscarCategorias(setCategorias);}, []);

  // aciona a busca de receita de acordo com a categoria clicada
  const tratarCliqueCategorias = (id) => {
    if (categoriaAtual === id) {
      setCategoriaAtual("");
      setCategoriaSelecionada(null);
      setPagina(0);
    
      BuscarReceitas(0, setReceitas, setTotalPaginas);
    } else {
      setCategoriaAtual(id);
      setCategoriaSelecionada(id);
      setPagina(0);
      BuscarReceitasPorCategoria(id, setReceitas, setTotalPaginas, 0);
    }
  };

  // Aciona a Busca de Acordo com a paginação e a categoria selecionada
  useEffect(() => {
    if (categoriaAtual) {
      BuscarReceitasPorCategoria(categoriaAtual, setReceitas, setTotalPaginas, pagina);
    }
  }, [pagina, categoriaAtual, setTotalPaginas, setReceitas]);

  // Função para cadastrar nova categoria
  const tratarCadastrarCategoria = async ({ nome, imagem }) => {
    // Exemplo de envio, ajuste conforme sua API/backend
    const formData = new FormData();
    formData.append("nome", nome);
    formData.append("imagem", imagem);

    await fetch("/api/categorias", {
      method: "POST",
      body: formData,
    });

    setShowModal(false);
    BuscarCategorias(setCategorias);
  };

  // Função para calcular e definir a posição do popup
  const handleMouseEnter = (id, e) => {
    if (e.currentTarget) {
      const rect = e.currentTarget.getBoundingClientRect();
      setPopupPosition({
        top: rect.top - 40, // Posiciona 40px acima do item
        left: rect.left + rect.width / 2 // Centraliza horizontalmente
      });
      setHoveredId(id);
    }
  };

const tratarExcluirCategoria = (e, categoriaId, categoriaNome, imagemUrl) => {
  e.stopPropagation(); // Impede a propagação do clique
  
  const confirmacao = window.confirm(`Tem certeza que deseja excluir a categoria "${categoriaNome}"?`);
  
  if (confirmacao) {
    ExcluirCategoria(categoriaId, imagemUrl, setCategorias);
  }
};

  return (
     <div className={styles.categorias}>
        {isAdmin && (
          <div>
            <div 
              className={styles.categoria}
              style={{ position: 'relative', border: '2px dashed #e84d85', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#e84d85', fontWeight: 'bold', fontSize: 'medium', cursor: 'pointer', minHeight: 150, margin: 0}}
              onClick={() => setShowModal(true)}
            >
              <span style={{fontSize: 40, lineHeight: 1}}>&#43;</span>
              <span>Criar nova categoria</span>
            </div>
            {showModal && (
              <CategoriaAdministrativo
                onClose={() => setShowModal(false)}
                onCadastrar={tratarCadastrarCategoria}
                setCategorias={setCategorias}
              />
            )}
          </div>
        )}
      
        {categorias.map((categoria => (
          
          <div 
            className={`${styles.categoria} ${categoriaAtual === categoria.id ? styles.categoriaAtiva : ''}`} 
            onClick={() => tratarCliqueCategorias(categoria.id)} 
            key={categoria.id}
            onMouseEnter={(e) => handleMouseEnter(categoria.id, e)}
            onMouseLeave={() => setHoveredId(null)}
            style={{position: 'relative'}}
          >
            <Image 
              src={categoria.imagem} 
              alt={categoria.nome}   
              width={500}                 
              height={300}              
            />
            <p style={{fontSize:"medium"}}>{categoria.nome}</p>
            {isAdmin && hoveredId === categoria.id && (
              <div 
                className={styles.adminActionsAbove}
                style={{
                  top: `${popupPosition.top}px`,
                  left: `${popupPosition.left}px`,
                  transform: 'translateX(-50%)'
                }}
              >
                <button 
                  className={styles.iconButton} 
                  onClick={e => {e.stopPropagation(); /* lógica editar */}}
                  title="Editar"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                  </svg>
                </button>
                <button 
                  className={styles.iconButton} 
                  onClick={e => tratarExcluirCategoria(e, categoria.id, categoria.nome, categoria.imagem)}
                  title="Excluir"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                  </svg>
                </button>
              </div>
            )}
          </div>
        )))}
     </div>
  );
}
