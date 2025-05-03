import { useState, useRef, useCallback, useEffect } from "react";
import styles from "./CategoriaAdministrativo.module.css";

export default function EditarCategoriaModal({ categoria, onClose, onAtualizar }) {
  const [nome, setNome] = useState("");
  const [imagem, setImagem] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);
  const [estaArrastando, setEstaArrastando] = useState(false);
  const [imagemAlterada, setImagemAlterada] = useState(false);

  // Carrega os dados da categoria quando o componente é montado
  useEffect(() => {
    if (categoria) {
      setNome(categoria.nome || "");
      setPreview(categoria.imagem || null);
    }
  }, [categoria]);

  // Lida com upload e preview da imagem
  const tratarMudancaImagem = useCallback((e) => {
    e.stopPropagation();
    
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      
      if (file) {
        setImagem(file);
        setImagemAlterada(true);
        
        const reader = new FileReader();
        reader.onloadend = () => setPreview(reader.result);
        reader.readAsDataURL(file);
      }
    }
  }, []);

  // Processa arquivo de imagem
  const processarArquivoImagem = useCallback((file) => {
    if (file && file.type.startsWith('image/')) {
      setImagem(file);
      setImagemAlterada(true);
      
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  }, []);

  // Função para lidar com o drop de arquivos
  const tratarSoltar = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setEstaArrastando(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      processarArquivoImagem(file);
      
      if (fileInputRef.current) {
        fileInputRef.current.files = e.dataTransfer.files;
      }
    }
  }, [processarArquivoImagem]);

  // Eventos para controlar o drag & drop
  const tratarArrastoPor = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const tratarArrastoEntrar = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setEstaArrastando(true);
  }, []);

  const tratarArrastoSair = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setEstaArrastando(false);
  }, []);

  // Função para abrir o seletor de arquivos
  const tratarCliqueNaCaixaArquivo = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }
  }, []);

  // Função para remover a imagem e reativar seleção
  const tratarRemoverImagem = useCallback((e) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    
    setImagem(null);
    setPreview(null);
    setImagemAlterada(true);
    
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, []);

  // Lida com a atualização da categoria
  const handleAtualizar = () => {
    if (!nome) return;
    
    onAtualizar({
      id: categoria.id,
      nome,
      imagem: imagemAlterada ? imagem : null,
      imagemUrl: categoria.imagem
    });
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Editar Categoria</h2>
          <button 
            className={styles.closeButton} 
            onClick={onClose}
            aria-label="Fechar"
          >
            &times;
          </button>
        </div>
        
        <label className={styles.modalLabel}>
          Nome da Categoria:
          <input
            className={styles.modalInputText}
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Digite o nome da categoria"
          />
        </label>
        
        <label className={styles.modalLabel}>
          Imagem:
          <div className={styles.fileUploadContainer}>
            <input
              ref={fileInputRef}
              className={styles.modalInputFile}
              type="file"
              accept="image/*"
              onChange={tratarMudancaImagem}
              onClick={e => e.stopPropagation()}
            />
            {!preview ? (
              <div 
                className={`${styles.fileUploadBox} ${estaArrastando ? styles.dragging : ''}`}
                onClick={tratarCliqueNaCaixaArquivo}
                onDragOver={tratarArrastoPor}
                onDragEnter={tratarArrastoEntrar}
                onDragLeave={tratarArrastoSair}
                onDrop={tratarSoltar}
              >
                <span className={styles.fileUploadIcon}>📷</span>
                <span className={styles.fileUploadText}>
                  {estaArrastando ? 'Solte a imagem aqui' : 'Selecione uma imagem'}
                </span>
                <span className={styles.fileUploadSubtext}>
                  {estaArrastando ? '' : 'ou arraste e solte aqui'}
                </span>
              </div>
            ) : (
              <div className={styles.categoriaPreview}>
                <div className={styles.previewImageContainer}>
                  <img src={preview} alt="Preview" className={styles.previewImage} />
                  <button 
                    type="button" 
                    className={styles.removePreview} 
                    onClick={tratarRemoverImagem}
                    aria-label="Remover imagem"
                  >
                    ×
                  </button>
                </div>
                <p className={styles.previewNome}>{nome || "Nome da categoria"}</p>
              </div>
            )}
          </div>
        </label>
        
        <div className={styles.buttonGroup}>
          <button
            className={`${styles.modalBtn} ${styles.modalBtnSubmit}`}
            type="button"
            onClick={handleAtualizar}
            disabled={!nome}
          >
            Atualizar
          </button>
        </div>
      </div>
    </div>
  );
}
