import styles from './ModalEdit.module.css';
import { useState, useEffect } from 'react';
import {AdicionarPasso,AdicionarIngrediente,BuscarCategorias,EditarCategoriaDaReceita,EditarTituloDaReceita,editarTextoDaReceita,AtualizarReceitaImagem} from './buscador';


export default function ModalEdit({isOpen,  onClose, editType, onSave,id,setCategoria,valorAtual }) {
    const [editedContent, setEditedContent] = useState(1);
    const [categories, setCategories] = useState([]);
    const [imagemOriginal, setImagemOriginal] = useState(''); // Novo estado para a imagem original
    const [imagemNova, setImagemNova] = useState(null); // Novo estado para o arquivo de imagem
    const [nomeIngrediente, setNomeIngrediente] = useState('');
    const [quantidadeIngrediente, setQuantidadeIngrediente] = useState('');
    const [modoPreparo, setModoPreparo] = useState({ etapa: '', instrucao: '' });

    useEffect(() => {
        if (isOpen) {
            if (editType === 'categoria') {
                Categorias();
                // Se valorAtual for o ID da categoria, você pode definir editedContent aqui:
                // setEditedContent(valorAtual || ''); // Ou o valor inicial apropriado para categoria
            } else if (editType === 'imagem') {
                setEditedContent(valorAtual || ''); // Preenche o input com a URL da imagem atual
                setImagemOriginal(valorAtual || ''); // Armazena a URL da imagem original
            } else {
                // Para outros tipos como 'titulo' ou 'texto'
                setEditedContent(valorAtual || '');
            }
        } else {
            // Resetar estados quando o modal é fechado para evitar dados obsoletos
            setEditedContent('');
            setImagemOriginal('');
            // setCategories([]); // Considere resetar categorias também se forem buscadas a cada abertura
        }
    }, [isOpen, editType, valorAtual]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();

        if(editType === 'categoria') {
          EditarCategoriaDaReceita(id, editedContent,setCategoria);
        }
        if(editType === 'titulo') {
            EditarTituloDaReceita(id, editedContent,onSave);
        }
        if(editType === 'texto') {
            editarTextoDaReceita(id, editedContent,onSave);
        }
        if(editType === 'imagem') {
            AtualizarReceitaImagem(id, imagemNova, imagemOriginal, onSave);
        }
         if(editType === 'ingrediente') {
            AdicionarIngrediente(id, nomeIngrediente,quantidadeIngrediente,onSave);
        }
        if(editType === 'passo') {
            AdicionarPasso(id,modoPreparo,onSave);
        }
        onClose();
    };

    const Categorias = async () => {
        setCategories(await BuscarCategorias());
    };

    const renderEditForm = () => {
        switch (editType) {
            case 'categoria':
                return (
                    <div className={styles.selectContainer}>
                        <select 
                            value={editedContent} 
                            onChange={(e) => setEditedContent(e.target.value)}
                            className={styles.selectField}
                        >
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.nome}
                                </option>
                            ))}
                        </select>
                    </div>
                );
            case 'titulo':
                return (
                    <input 
                        type="text" 
                        value={editedContent} 
                        onChange={(e) => setEditedContent(e.target.value)}
                        className={styles.inputField}
                    />
                );
            case 'texto':
                return (
                    <textarea 
                        value={editedContent} 
                        onChange={(e) => setEditedContent(e.target.value)}
                        rows="6"
                        className={styles.textareaField}
                    />
                );
            case 'imagem':
                return (
                    <div className={styles.imageEditContainer}>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                    setImagemNova(file); // Salva o arquivo para upload
                                    setEditedContent(file.name); // Apenas exibe o nome do arquivo
                                }
                            }}
                            className={styles.inputField}
                        />
                        <div className={styles.imagePreview}>
                            {imagemNova && <img src={URL.createObjectURL(imagemNova)} alt="Preview" />}
                        </div>
                    </div>
                );
            case 'ingrediente':
                return (
                    <div className={styles.imageEditContainer}>
                        <label>Nome:</label>
                        <input
                            type="text"
                            onChange={(e) => {setNomeIngrediente(e.target.value)}}
                            className={styles.inputField}
                        />
                        <label>Quantidade:</label>
                        <input
                         className={styles.inputField}
                         onChange={(e) => {setQuantidadeIngrediente(e.target.value)}}
                        >
                        </input>
                    </div>
                );
                 case 'passo':
                return (
                    <div className={styles.imageEditContainer}>
                        <label>Etapa:</label>
                        <input
                            type="number"
                            onChange={(e) => {setModoPreparo(({ ...modoPreparo, etapa: e.target.value }))}}
                            className={styles.inputField}
                        />
                        <label>Instrução:</label>
                        <input
                            className={styles.inputField}
                            onChange={(e) => {setModoPreparo(({ ...modoPreparo, instrucao: e.target.value }))}}
                        >
                        </input>
                    </div>
                );
            default:
                return (
                    <input 
                        type="text" 
                        value={editedContent} 
                        onChange={(e) => setEditedContent(e.target.value)}
                        className={styles.inputField}
                    />
                );
                
        }
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContainer}>
                <div className={styles.modalHeader}>
                    <h2>Editar {getTitleByType(editType)}</h2>
                    <button 
                        className={styles.closeButton} 
                        onClick={onClose}
                    >
                        &times;
                    </button>
                </div>
                <form onSubmit={handleSubmit} className={styles.modalForm}>
                    {renderEditForm()}
                    <div className={styles.modalActions}>
                        <button 
                            type="button" 
                            className={styles.cancelButton} 
                            onClick={onClose}
                        >
                            Cancelar
                        </button>
                        <button 
                            type="submit" 
                            className={styles.saveButton}
                        >
                            Salvar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

function getTitleByType(type) {
    switch (type) {
        case 'categoria': return 'Categoria';
        case 'titulo': return 'Título';
        case 'texto': return 'Texto';
        case 'imagem': return 'Imagem';
        default: return type;
    }
}
