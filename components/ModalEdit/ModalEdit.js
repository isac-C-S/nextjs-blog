import styles from './ModalEdit.module.css';
import { useState, useEffect } from 'react';
import {BuscarCategorias} from './buscador';

export default function ModalEdit({isOpen,  onClose, editType, content, onSave }) {
    const [editedContent, setEditedContent] = useState('');
    const [categories, setCategories] = useState([]);
    
    useEffect(() => {
        if (content) {
            setEditedContent(content);
        }
    }, [content]);

    useEffect(() => {
        if (editType === 'categoria') {
            Categorias();
        }
    }, [editType]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(editedContent);
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
                            type="text" 
                            value={editedContent} 
                            onChange={(e) => setEditedContent(e.target.value)}
                            placeholder="URL da imagem"
                            className={styles.inputField}
                        />
                        <div className={styles.imagePreview}>
                            {editedContent && <img src={editedContent} alt="Preview" />}
                        </div>
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
