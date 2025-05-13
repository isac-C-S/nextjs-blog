import styles from './PostEditor.module.css';
import editorStyles from './PostEditor.module.css';
import { useState, useEffect, useRef } from 'react';
import {BuscarCategorias, BuscarIngredientes, CadastrarIngrediente} from './Buscador';

export default function PostEditor() {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        titulo: '',
        categoria: '', // Empty default, will be set once categories are loaded
        texto: '',
        imagem: '',
        porcoes: '8',
        tempoPreparo: '60',
        ingredientes: [{ nome: '', quantidade: '' }],
        modoPreparo: [{ etapa: 1, instrucao: '' }],
        cobertura: [{ 
            nome: 'Cobertura', 
            descricao: '', 
            ingredientes: [{ nome: '', quantidade: '' }] 
        }]
    });
    
    // State for fetched categories
    const [categorias, setCategorias] = useState([]);
    const [loadingCategorias, setLoadingCategorias] = useState(true);
    const [errorCategorias, setErrorCategorias] = useState(null);
    const [ingredientes, setIngredientes] = useState([]);
    const [loadingIngredientes, setLoadingIngredientes] = useState(true);
    const [errorIngredientes, setErrorIngredientes] = useState(null);

    // Add state for file upload
    const [imageFile, setImageFile] = useState(null);
    const fileInputRef = useRef(null);
    
    // Add state for upload error
    const [imageUploadError, setImageUploadError] = useState(null);
    
    // Enhanced image file selection with validation
    const handleImageSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Reset error
            setImageUploadError(null);
            
            // Check file type
            const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
            if (!validTypes.includes(file.type)) {
                setImageUploadError('Por favor, selecione uma imagem nos formatos JPG, PNG ou GIF.');
                return;
            }
            
            // Check file size (limit to 5MB)
            if (file.size > 5 * 1024 * 1024) {
                setImageUploadError('A imagem deve ter no máximo 5MB.');
                return;
            }
            
            setImageFile(file);
            
            // Create a preview URL for the selected image
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
                handleChange('imagem', e.target.result);
            };
            fileReader.readAsDataURL(file);
        }
    };
    
    // Trigger file input click
    const triggerFileInput = () => {
        fileInputRef.current.click();
    };
    
    // Handle drag over event
    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.currentTarget.classList.add(editorStyles.dragActive);
    };
    
    // Handle drag leave event
    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.currentTarget.classList.remove(editorStyles.dragActive);
    };
    
    // Enhanced drop event with validation
    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.currentTarget.classList.remove(editorStyles.dragActive);
        
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const file = e.dataTransfer.files[0];
            
            // Reset error
            setImageUploadError(null);
            
            // Check file type
            const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
            if (!validTypes.includes(file.type)) {
                setImageUploadError('Por favor, selecione uma imagem nos formatos JPG, PNG ou GIF.');
                return;
            }
            
            // Check file size (limit to 5MB)
            if (file.size > 5 * 1024 * 1024) {
                setImageUploadError('A imagem deve ter no máximo 5MB.');
                return;
            }
            
            setImageFile(file);
            
            // Create a preview URL for the dropped image
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
                handleChange('imagem', e.target.result);
            };
            fileReader.readAsDataURL(file);
            
            // Reset the file input
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    };

    // Fetch categories and ingredients on component mount
    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                setLoadingCategorias(true);
                const data = await BuscarCategorias();
                setCategorias(data);
                
                // Set default category if categories were loaded and no category is selected yet
                if (data.length > 0 && !formData.categoria) {
                    setFormData(prevData => ({
                        ...prevData,
                        categoria: data[0].nome || data[0] // Adjust based on the actual data structure
                    }));
                }
            } catch (error) {
                console.error("Erro ao buscar categorias:", error);
                setErrorCategorias(error.message);
            } finally {
                setLoadingCategorias(false);
            }
        };
        
        const fetchIngredientes = async () => {
            try {
                setLoadingIngredientes(true);
                const data = await BuscarIngredientes();
                setIngredientes(data);
            } catch (error) {
                console.error("Erro ao buscar ingredientes:", error);
                setErrorIngredientes(error.message);
            } finally {
                setLoadingIngredientes(false);
            }
        };
        
        fetchCategorias();
        fetchIngredientes();
    }, []);

    // Handle form data changes
    const handleChange = (field, value) => {
        setFormData({
            ...formData,
            [field]: value
        });
    };

    // Handle ingredient changes
    const handleIngredientChange = (index, field, value) => {
        const newIngredientes = [...formData.ingredientes];
        newIngredientes[index][field] = value;
        setFormData({
            ...formData,
            ingredientes: newIngredientes
        });
    };

    // Add new ingredient field
    const addIngredient = () => {
        setFormData({
            ...formData,
            ingredientes: [...formData.ingredientes, { nome: '', quantidade: '' }]
        });
    };

    // Remove ingredient field
    const removeIngredient = (index) => {
        const newIngredientes = [...formData.ingredientes];
        newIngredientes.splice(index, 1);
        setFormData({
            ...formData,
            ingredientes: newIngredientes
        });
    };

    // Handle preparation step changes
    const handleStepChange = (index, value) => {
        const newModoPreparo = [...formData.modoPreparo];
        newModoPreparo[index].instrucao = value;
        setFormData({
            ...formData,
            modoPreparo: newModoPreparo
        });
    };

    // Add new preparation step
    const addStep = () => {
        const newStep = {
            etapa: formData.modoPreparo.length + 1,
            instrucao: ''
        };
        setFormData({
            ...formData,
            modoPreparo: [...formData.modoPreparo, newStep]
        });
    };

    // Remove preparation step
    const removeStep = (index) => {
        const newModoPreparo = [...formData.modoPreparo];
        newModoPreparo.splice(index, 1);
        // Update step numbers
        newModoPreparo.forEach((step, idx) => {
            step.etapa = idx + 1;
        });
        setFormData({
            ...formData,
            modoPreparo: newModoPreparo
        });
    };

    // Handle topping/frosting ingredient changes
    const handleCoberturaIngredientChange = (coberturaIndex, ingredientIndex, field, value) => {
        const newCobertura = [...formData.cobertura];
        newCobertura[coberturaIndex].ingredientes[ingredientIndex][field] = value;
        setFormData({
            ...formData,
            cobertura: newCobertura
        });
    };

    // Add new topping/frosting ingredient
    const addCoberturaIngredient = (coberturaIndex) => {
        const newCobertura = [...formData.cobertura];
        newCobertura[coberturaIndex].ingredientes.push({ nome: '', quantidade: '' });
        setFormData({
            ...formData,
            cobertura: newCobertura
        });
    };

    // Remove topping/frosting ingredient
    const removeCoberturaIngredient = (coberturaIndex, ingredientIndex) => {
        const newCobertura = [...formData.cobertura];
        newCobertura[coberturaIndex].ingredientes.splice(ingredientIndex, 1);
        setFormData({
            ...formData,
            cobertura: newCobertura
        });
    };

    // Handle navigation to next step
    const nextStep = () => {
        if (currentStep < 5) {
            setCurrentStep(currentStep + 1);
        }
    };

    // Handle navigation to previous step
    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    // Handle direct navigation to a specific step
    const goToStep = (step) => {
        setCurrentStep(step);
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data:", formData);
        // Here you would add the logic to submit the data to your backend
        alert("Receita cadastrada com sucesso!");
    };

    // Format current date
    const getCurrentDate = () => {
        const date = new Date();
        const options = { year: 'numeric', month: 'short', day: '2-digit' };
        return `—— ${date.toLocaleDateString('pt-BR', options)} ——`;
    };

    // Add state for ingredient registration modal
    const [showIngredientModal, setShowIngredientModal] = useState(false);
    const [newIngredient, setNewIngredient] = useState({ nome: '', descricao: '' });
    const [submittingIngredient, setSubmittingIngredient] = useState(false);
    const [ingredientError, setIngredientError] = useState(null);
    
    // Open ingredient modal
    const openIngredientModal = () => {
        setShowIngredientModal(true);
        setNewIngredient({ nome: '', descricao: '' });
        setIngredientError(null);
    };
    
    // Close ingredient modal
    const closeIngredientModal = () => {
        setShowIngredientModal(false);
    };
    
    // Handle new ingredient input change
    const handleNewIngredientChange = (field, value) => {
        setNewIngredient({
            ...newIngredient,
            [field]: value
        });
    };
    
    // Submit new ingredient
    const submitNewIngredient = async () => {
        // Validate form
        if (!newIngredient.nome.trim()) {
            setIngredientError('O nome do ingrediente é obrigatório');
            return;
        }
        
        try {
            setSubmittingIngredient(true);
            setIngredientError(null);
            
            // Call the CadastrarIngrediente API
            const createdIngredient = await CadastrarIngrediente(newIngredient.nome, newIngredient.descricao);
            
            // Add the new ingredient to the list
            setIngredientes(prevIngredientes => [...prevIngredientes, createdIngredient]);
            
            // Close the modal
            closeIngredientModal();
            
            // Show success message
            alert(`Ingrediente "${newIngredient.nome}" cadastrado com sucesso!`);
            
        } catch (error) {
            console.error('Erro ao cadastrar ingrediente:', error);
            setIngredientError('Ocorreu um erro ao cadastrar o ingrediente. Tente novamente.');
        } finally {
            setSubmittingIngredient(false);
        }
    };
    
    // Refresh ingredients list
    const refreshIngredientes = async () => {
        try {
            setLoadingIngredientes(true);
            const data = await BuscarIngredientes();
            setIngredientes(data);
        } catch (error) {
            console.error("Erro ao buscar ingredientes:", error);
            setErrorIngredientes(error.message);
        } finally {
            setLoadingIngredientes(false);
        }
    };
    
    // Add state for ingredient search
    const [ingredientSearchTerm, setIngredientSearchTerm] = useState('');
    
    // Filter ingredients based on search
    const getFilteredIngredients = () => {
        if (!ingredientSearchTerm.trim()) {
            return ingredientes;
        }
        return ingredientes.filter(ing => {
            const name = typeof ing === 'string' ? ing.toLowerCase() : ing.nome.toLowerCase();
            return name.includes(ingredientSearchTerm.toLowerCase());
        });
    };
    
    // Clear search when adding a new ingredient to list
    const handleAddIngredient = () => {
        setIngredientSearchTerm('');
        addIngredient();
    };

    return (
        <div className={editorStyles.editorContainer}>
            <div className={editorStyles.sideMenu}>
                <h3 className={editorStyles.menuTitle}>Etapas</h3>
                <ul className={editorStyles.menuList}>
                    <li 
                        className={currentStep === 1 ? editorStyles.activeStep : ''}
                        onClick={() => goToStep(1)}
                    >
                        1. Informações Básicas
                    </li>
                    <li 
                        className={currentStep === 2 ? editorStyles.activeStep : ''}
                        onClick={() => goToStep(2)}
                    >
                        2. Ingredientes
                    </li>
                    <li 
                        className={currentStep === 3 ? editorStyles.activeStep : ''}
                        onClick={() => goToStep(3)}
                    >
                        3. Modo de Preparo
                    </li>
                    <li 
                        className={currentStep === 4 ? editorStyles.activeStep : ''}
                        onClick={() => goToStep(4)}
                    >
                        4. Coberturas e Adicionais
                    </li>
                    <li 
                        className={currentStep === 5 ? editorStyles.activeStep : ''}
                        onClick={() => goToStep(5)}
                    >
                        5. Revisão e Publicação
                    </li>
                </ul>
                <div className={editorStyles.progressContainer}>
                    <div 
                        className={editorStyles.progressBar} 
                        style={{ width: `${(currentStep / 5) * 100}%` }}
                    ></div>
                </div>
            </div>

            {/* Ingredient Modal */}
            {showIngredientModal && (
                <div className={editorStyles.modalOverlay} onClick={closeIngredientModal}>
                    <div className={editorStyles.modalContent} onClick={e => e.stopPropagation()}>
                        <div className={editorStyles.modalHeader}>
                            <h3>Cadastrar Novo Ingrediente</h3>
                            <button 
                                type="button" 
                                className={editorStyles.modalCloseButton}
                                onClick={closeIngredientModal}
                            >
                                ×
                            </button>
                        </div>
                        
                        <div className={editorStyles.modalBody}>
                            {ingredientError && (
                                <div className={editorStyles.formError}>
                                    {ingredientError}
                                </div>
                            )}
                            
                            <div className={editorStyles.formGroup}>
                                <label>Nome do Ingrediente:</label>
                                <input 
                                    type="text"
                                    value={newIngredient.nome}
                                    onChange={(e) => handleNewIngredientChange('nome', e.target.value)}
                                    placeholder="Ex: Farinha de Trigo"
                                    className={editorStyles.formInput}
                                    required
                                />
                            </div>
                            
                            <div className={editorStyles.formGroup}>
                                <label>Descrição (opcional):</label>
                                <textarea
                                    value={newIngredient.descricao}
                                    onChange={(e) => handleNewIngredientChange('descricao', e.target.value)}
                                    placeholder="Adicione informações adicionais sobre o ingrediente"
                                    className={editorStyles.formTextarea}
                                    rows="3"
                                ></textarea>
                            </div>
                        </div>
                        
                        <div className={editorStyles.modalFooter}>
                            <button 
                                type="button"
                                className={editorStyles.cancelButton}
                                onClick={closeIngredientModal}
                                disabled={submittingIngredient}
                            >
                                Cancelar
                            </button>
                            <button 
                                type="button"
                                className={editorStyles.submitButton}
                                onClick={submitNewIngredient}
                                disabled={submittingIngredient}
                            >
                                {submittingIngredient ? 'Cadastrando...' : 'Cadastrar Ingrediente'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className={editorStyles.contentArea}>
                <form onSubmit={handleSubmit}>
                    {/* Step 1: Basic Information */}
                    {currentStep === 1 && (
                        <div className={editorStyles.formStep}>
                            <h2 className={editorStyles.stepTitle}>Informações Básicas</h2>
                            
                            <div className={editorStyles.formGroup}>
                                <label>Categoria:</label>
                                {loadingCategorias ? (
                                    <p>Carregando categorias...</p>
                                ) : errorCategorias ? (
                                    <p>Erro ao carregar categorias: {errorCategorias}</p>
                                ) : (
                                    <select 
                                        value={formData.categoria} 
                                        onChange={(e) => handleChange('categoria', e.target.value)}
                                        className={editorStyles.formSelect}
                                    >
                                        {categorias.map((cat, index) => (
                                            <option key={index} value={typeof cat === 'string' ? cat : cat.nome}>
                                                {typeof cat === 'string' ? cat : cat.nome}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            </div>
                            
                            <div className={editorStyles.formGroup}>
                                <label>Título da Receita:</label>
                                <input 
                                    type="text" 
                                    value={formData.titulo} 
                                    onChange={(e) => handleChange('titulo', e.target.value)}
                                    placeholder="Digite o título da sua receita"
                                    className={editorStyles.formInput}
                                    required
                                />
                            </div>
                            
                            <div className={editorStyles.formGroup}>
                                <label>Data de Publicação:</label>
                                <p className={editorStyles.dateDisplay}>{getCurrentDate()}</p>
                            </div>
                            
                            <div className={editorStyles.formGroup}>
                                <label>Introdução/Descrição:</label>
                                <textarea 
                                    value={formData.texto} 
                                    onChange={(e) => handleChange('texto', e.target.value)}
                                    placeholder="Escreva uma breve introdução para sua receita"
                                    className={editorStyles.formTextarea}
                                    rows="5"
                                    required
                                ></textarea>
                            </div>
                            
                            <div className={editorStyles.formGroup}>
                                <label>Imagem da Receita:</label>
                                <div 
                                    className={`${editorStyles.imageUploadArea} ${imageUploadError ? editorStyles.hasError : ''}`}
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                    onClick={triggerFileInput}
                                >
                                    <input 
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleImageSelect}
                                        accept="image/jpeg,image/png,image/gif"
                                        className={editorStyles.fileInput}
                                        style={{ display: 'none' }}
                                    />
                                    {formData.imagem ? (
                                        <div className={editorStyles.previewContainer}>
                                            <img 
                                                src={formData.imagem} 
                                                alt="Preview" 
                                                className={editorStyles.imagePreview}
                                                onError={(e) => e.target.src = "/placeholder-food.jpg"}
                                            />
                                            <div className={editorStyles.changeImageOverlay}>
                                                <span>Clique para alterar a imagem</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className={editorStyles.uploadPrompt}>
                                            <div className={editorStyles.uploadIcon}>
                                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M21 19V5C21 3.9 20.1 3 19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19ZM8.5 13.5L11 16.51L14.5 12L19 18H5L8.5 13.5Z" fill="currentColor"/>
                                                </svg>
                                            </div>
                                            <p>Clique para selecionar uma imagem ou arraste e solte aqui</p>
                                            <span className={editorStyles.formatHint}>Formatos aceitos: JPG, PNG, GIF (máx. 5MB)</span>
                                        </div>
                                    )}
                                </div>
                                {imageUploadError && (
                                    <p className={editorStyles.uploadError}>{imageUploadError}</p>
                                )}
                            </div>
                            
                        </div>
                    )}

                    {/* Step 2: Ingredients */}
                    {currentStep === 2 && (
                        <div className={editorStyles.formStep}>
                            <div className={editorStyles.ingredientHeader}>
                                <h2 className={editorStyles.stepTitle}>Ingredientes</h2>
                                <button 
                                    type="button"
                                    className={editorStyles.addIngredientButton}
                                    onClick={openIngredientModal}
                                >
                                    Cadastrar Ingrediente
                                </button>
                            </div>
                            
                            <div className={editorStyles.formGroup}>
                                <label>Porções:</label>
                                <input 
                                    type="number" 
                                    value={formData.porcoes} 
                                    onChange={(e) => handleChange('porcoes', e.target.value)}
                                    min="1"
                                    className={editorStyles.formInput}
                                    required
                                />
                            </div>
                            
                            <div className={editorStyles.ingredientsList}>
                                <h3>Lista de Ingredientes:</h3>
                                <div className={editorStyles.searchWrapper}>
                                    <input
                                        type="text"
                                        placeholder="Buscar ingrediente..."
                                        value={ingredientSearchTerm}
                                        onChange={(e) => setIngredientSearchTerm(e.target.value)}
                                        className={editorStyles.ingredientSearchInput}
                                    />
                                    {ingredientSearchTerm && (
                                        <button 
                                            type="button"
                                            className={editorStyles.clearSearchBtn}
                                            onClick={() => setIngredientSearchTerm('')}
                                            aria-label="Limpar busca"
                                        >
                                            ×
                                        </button>
                                    )}
                                </div>
                                                                
                                {formData.ingredientes.map((ingrediente, index) => (
                                    <div key={index} className={editorStyles.ingredientItem}>
                                        <div className={editorStyles.ingredientInputGroup}>
                                            <input 
                                                type="text" 
                                                value={ingrediente.quantidade} 
                                                onChange={(e) => handleIngredientChange(index, 'quantidade', e.target.value)}
                                                placeholder="Quantidade (ex: 2 xícaras)"
                                                className={editorStyles.quantityInput}
                                            />
                                            <div className={editorStyles.selectContainer}>
                                                <select 
                                                    value={ingrediente.nome} 
                                                    onChange={(e) => handleIngredientChange(index, 'nome', e.target.value)}
                                                    className={editorStyles.nameInput}
                                                    required
                                                >
                                                    <option value="">Selecione um ingrediente</option>
                                                    {loadingIngredientes ? (
                                                        <option disabled>Carregando ingredientes...</option>
                                                    ) : errorIngredientes ? (
                                                        <option disabled>Erro ao carregar ingredientes</option>
                                                    ) : getFilteredIngredients().length === 0 ? (
                                                        <option disabled>Nenhum ingrediente encontrado</option>
                                                    ) : (
                                                        getFilteredIngredients().map((ing, i) => (
                                                            <option key={i} value={typeof ing === 'string' ? ing : ing.nome}>
                                                                {typeof ing === 'string' ? ing : ing.nome}
                                                            </option>
                                                        ))
                                                    )}
                                                </select>
                                                {ingredientSearchTerm && getFilteredIngredients().length === 0 && (
                                                    <p className={editorStyles.noResults}>
                                                        Nenhum ingrediente encontrado. <button 
                                                            type="button" 
                                                            onClick={openIngredientModal}
                                                            className={editorStyles.inlineAddButton}
                                                        >
                                                            Cadastrar novo?
                                                        </button>
                                                    </p>
                                                )}
                                            </div>
                                            <button 
                                                type="button" 
                                                onClick={() => removeIngredient(index)}
                                                className={editorStyles.removeButton}
                                            >
                                                ×
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                <button 
                                    type="button" 
                                    onClick={handleAddIngredient}
                                    className={editorStyles.addButton}
                                >
                                    + Adicionar Ingrediente
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Preparation Steps */}
                    {currentStep === 3 && (
                        <div className={editorStyles.formStep}>
                            <h2 className={editorStyles.stepTitle}>Modo de Preparo</h2>
                            
                            <div className={editorStyles.formGroup}>
                                <label>Tempo de Preparo (minutos):</label>
                                <input 
                                    type="number" 
                                    value={formData.tempoPreparo} 
                                    onChange={(e) => handleChange('tempoPreparo', e.target.value)}
                                    min="1"
                                    className={editorStyles.formInput}
                                    required
                                />
                            </div>
                            
                            <div className={editorStyles.stepsList}>
                                <h3>Passos:</h3>
                                {formData.modoPreparo.map((step, index) => (
                                    <div key={index} className={editorStyles.stepItem}>
                                        <div className={editorStyles.stepNumber}>
                                            Passo {step.etapa}
                                        </div>
                                        <div className={editorStyles.stepInputGroup}>
                                            <textarea 
                                                value={step.instrucao} 
                                                onChange={(e) => handleStepChange(index, e.target.value)}
                                                placeholder="Descreva este passo do preparo"
                                                className={editorStyles.stepTextarea}
                                                rows="3"
                                                required
                                            ></textarea>
                                            <button 
                                                type="button" 
                                                onClick={() => removeStep(index)}
                                                className={editorStyles.removeButton}
                                            >
                                                ×
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                <button 
                                    type="button" 
                                    onClick={addStep}
                                    className={editorStyles.addButton}
                                >
                                    + Adicionar Passo
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 4: Toppings and Additional Information */}
                    {currentStep === 4 && (
                        <div className={editorStyles.formStep}>
                            <h2 className={editorStyles.stepTitle}>Coberturas e Adicionais</h2>
                            
                            {formData.cobertura.map((cobertura, coberturaIndex) => (
                                <div key={coberturaIndex} className={editorStyles.coberturaSection}>
                                    <div className={editorStyles.formGroup}>
                                        <label>Nome da Cobertura:</label>
                                        <input 
                                            type="text" 
                                            value={cobertura.nome} 
                                            onChange={(e) => {
                                                const newCobertura = [...formData.cobertura];
                                                newCobertura[coberturaIndex].nome = e.target.value;
                                                setFormData({...formData, cobertura: newCobertura});
                                            }}
                                            placeholder="Ex: Cobertura de Chocolate"
                                            className={editorStyles.formInput}
                                        />
                                    </div>
                                    
                                    <div className={editorStyles.formGroup}>
                                        <label>Descrição (opcional):</label>
                                        <textarea 
                                            value={cobertura.descricao} 
                                            onChange={(e) => {
                                                const newCobertura = [...formData.cobertura];
                                                newCobertura[coberturaIndex].descricao = e.target.value;
                                                setFormData({...formData, cobertura: newCobertura});
                                            }}
                                            placeholder="Descreva brevemente esta cobertura"
                                            className={editorStyles.formTextarea}
                                            rows="3"
                                        ></textarea>
                                    </div>
                                    
                                    <div className={editorStyles.ingredientsList}>
                                        <h3>Ingredientes da Cobertura:</h3>
                                        {cobertura.ingredientes.map((ingrediente, ingredientIndex) => (
                                            <div key={ingredientIndex} className={editorStyles.ingredientItem}>
                                                <div className={editorStyles.ingredientInputGroup}>
                                                    <input 
                                                        type="text" 
                                                        value={ingrediente.quantidade} 
                                                        onChange={(e) => handleCoberturaIngredientChange(
                                                            coberturaIndex, 
                                                            ingredientIndex, 
                                                            'quantidade', 
                                                            e.target.value
                                                        )}
                                                        placeholder="Quantidade"
                                                        className={editorStyles.quantityInput}
                                                    />
                                                    <input 
                                                        type="text" 
                                                        value={ingrediente.nome} 
                                                        onChange={(e) => handleCoberturaIngredientChange(
                                                            coberturaIndex, 
                                                            ingredientIndex, 
                                                            'nome', 
                                                            e.target.value
                                                        )}
                                                        placeholder="Nome do ingrediente"
                                                        className={editorStyles.nameInput}
                                                    />
                                                    <button 
                                                        type="button" 
                                                        onClick={() => removeCoberturaIngredient(coberturaIndex, ingredientIndex)}
                                                        className={editorStyles.removeButton}
                                                    >
                                                        ×
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                        <button 
                                            type="button" 
                                            onClick={() => addCoberturaIngredient(coberturaIndex)}
                                            className={editorStyles.addButton}
                                        >
                                            + Adicionar Ingrediente
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Step 5: Review and Publish */}
                    {currentStep === 5 && (
                        <div className={editorStyles.formStep}>
                            <h2 className={editorStyles.stepTitle}>Revisão e Publicação</h2>
                            
                            <div className={editorStyles.previewSection}>
                                <h3>Prévia da Receita</h3>
                                
                                <div className={styles.post}>
                                    <div className={styles.titulo}>
                                        <h3>{formData.categoria}</h3>
                                        <h1>{formData.titulo || "Título da Receita"}</h1>
                                        <p>{getCurrentDate()}</p>
                                    </div>
                                    
                                    <div className={styles.introducao}>
                                        <p>{formData.texto || "Introdução da receita..."}</p>
                                        {formData.imagem && (
                                            <img 
                                                src={formData.imagem} 
                                                alt={formData.titulo} 
                                                style={{
                                                    width: "100%", 
                                                    height: "auto", 
                                                    maxHeight: "300px",
                                                    display: "block"
                                                }}
                                                onError={(e) => e.target.src = "/placeholder-food.jpg"}
                                            />
                                        )}
                                    </div>
                                    
                                    <div className={styles.ingredientes}>
                                        <h3>Ingredientes ({formData.porcoes} porções):</h3>
                                        <div className={styles.ingredientes_lista}>
                                            <ul>
                                                {formData.ingredientes.map((ingrediente, index) => (
                                                    ingrediente.nome && (
                                                        <li key={index}>
                                                            {ingrediente.quantidade ? `${ingrediente.quantidade} ` : ""}
                                                            {ingrediente.nome}
                                                        </li>
                                                    )
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                    
                                    {formData.cobertura[0].ingredientes.some(ing => ing.nome) && (
                                        <div className={styles.ingredientes}>
                                            <h3>{formData.cobertura[0].nome || "Cobertura"}:</h3>
                                            {formData.cobertura[0].descricao && (
                                                <p className={styles.coberturaDescricao}>
                                                    {formData.cobertura[0].descricao}
                                                </p>
                                            )}
                                            <div className={styles.ingredientes_lista}>
                                                <ul>
                                                    {formData.cobertura[0].ingredientes.map((ingrediente, index) => (
                                                        ingrediente.nome && (
                                                            <li key={index}>
                                                                {ingrediente.quantidade ? `${ingrediente.quantidade} ` : ""}
                                                                {ingrediente.nome}
                                                            </li>
                                                        )
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    )}
                                    
                                    <div className={styles.preparo}>
                                        <h3>Modo de Preparo:</h3>
                                        <div className={styles.tempo}>
                                            <h4>Tempo de Preparo:</h4>
                                            <p>
                                                {parseInt(formData.tempoPreparo) >= 60 
                                                    ? `${Math.floor(parseInt(formData.tempoPreparo) / 60)}h${parseInt(formData.tempoPreparo) % 60 > 0 ? ` ${parseInt(formData.tempoPreparo) % 60}min` : ''}`
                                                    : `${formData.tempoPreparo}min`
                                                }
                                            </p>
                                        </div>
                                        
                                        <div className={styles.preparoLista}>
                                            <ul>
                                                {formData.modoPreparo.map((step) => (
                                                    step.instrucao && (
                                                        <li key={step.etapa}>
                                                            <span>
                                                                <strong>Passo {step.etapa}:</strong> {step.instrucao}
                                                            </span>
                                                        </li>
                                                    )
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className={editorStyles.publishSection}>
                                <p className={editorStyles.publishMessage}>
                                    Sua receita está pronta para ser publicada. Verifique se todos os detalhes estão corretos antes de enviar.
                                </p>
                                <button 
                                    type="submit"
                                    className={editorStyles.publishButton}
                                >
                                    Publicar Receita
                                </button>
                            </div>
                        </div>
                    )}

                    <div className={editorStyles.navigationButtons}>
                        {currentStep > 1 && (
                            <button 
                                type="button" 
                                onClick={prevStep}
                                className={editorStyles.prevButton}
                            >
                                Anterior
                            </button>
                        )}
                        
                        {currentStep < 5 && (
                            <button 
                                type="button" 
                                onClick={nextStep}
                                className={editorStyles.nextButton}
                            >
                                Próximo
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}
