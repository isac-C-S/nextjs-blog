import styles from './Post.module.css';
import {BuscarRelacionados,CadastrarComentarioNaReceita,BuscarReceitaPorId,BuscarCategoriaDaReceita,BuscarIngredientesDareceita,BuscarModoPreparoDaReceita,BuscarComentariosDaReceita,BuscarCobertura} from './Buscador.js'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../../Config/AuthContext.js';
import ModalEdit from '../modalEdit/ModalEdit.js';

export default function Post({id}) {
    const { isAdmin } = useAuth();
    const [Receita,setReceita] = useState([]);
    const [categoria,setCategoria] = useState("");
    const [ingredientes,setIngredientes] = useState([]);
    const [cobertura, setCobertura] = useState([]);
    const [modoPreparo, setModoPreparo] = useState([]);
    const [postsRelacionados, setPostsRelacionados] = useState([]);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [comentario,setComentarios] = useState([]);
    const [commentLimit, setCommentLimit] = useState(3);
    const [relacionados,setRelacionados] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editType, setEditType] = useState(null);
    const [editContent, setEditContent] = useState('');
    const steps = [
        "Antes de tudo, em uma tigela, junte a farinha de trigo, o açúcar, o chocolate em pó e o fermento químico. Misture bem para combinar todos os ingredientes secos, garantindo que o fermento esteja bem distribuído.",
        "Em seguida, em outra tigela, bata os ovos e adicione o leite. Depois, incorpore essa mistura aos ingredientes secos, mexendo bem até obter uma massa homogênea e sem grumos.",
        "Agora, despeje a massa em uma forma untada e enfarinhada. Leve ao forno preaquecido a 180 °C por 40 minutos, ou até que um palito inserido no centro do bolo saia limpo. Por fim, deixe o bolo esfriar antes de desenformar.",
        "Em uma panela, então, leve ao fogo médio o achocolatado em pó, o açúcar, a margarina e o leite. Mexa constantemente até que todos os ingredientes estejam bem incorporados e a calda esteja homogênea e quente.",
        "Com o bolo ainda quente, então, faça pequenos furos em toda a superfície utilizando um garfo. Despeje a calda quente sobre o bolo, garantindo que ela penetre bem nos furos. Deixe o bolo descansar e absorver a calda antes de servir, a fim de garantir que ele fique bem molhadinho e delicioso."
    ];

    // Buscar a receita pelo ID
    useEffect(() => {
        if(id){
            var intId = parseInt(id);
            BuscarReceitaPorId(intId, setReceita);
        }
    }, [id]);

    // Buscar o Nome da categoria da receita
    useEffect(() => {
        const intId = parseInt(id);
        if(Receita.categoria){
            BuscarCategoriaDaReceita(Receita.categoria, setCategoria);
            BuscarRelacionados(intId, Receita.categoria, setRelacionados);
        }

        if(Receita && !isNaN(intId)){
            BuscarIngredientesDareceita(intId, setIngredientes);
            BuscarModoPreparoDaReceita(intId, setModoPreparo);
            BuscarComentariosDaReceita(intId, setComentarios);
            BuscarCobertura(intId, setCobertura);   
        }
    }, [Receita]);

    // Exemplo de posts relacionados
    useEffect(() => {
        // Dados de exemplo para posts relacionados
        const exampleRelatedPosts = [
            {
                id: 1,
                titulo: "Bolo de Chocolate com Cobertura",
                categoria: "Sobremesas",
                imagem: "/bolo-chocolate.jpg"
            },
            {
                id: 2,
                titulo: "Torta de Limão",
                categoria: "Sobremesas",
                imagem: "/torta-limao.jpg"
            },
            {
                id: 3,
                titulo: "Pudim de Leite Condensado",
                categoria: "Sobremesas",
                imagem: "/pudim.jpg"
            }
        ];
      
        
        setPostsRelacionados(exampleRelatedPosts);
    }, []);

    // Exemplo de comentários
    useEffect(() => {
        // Dados de exemplo para comentários
        const exampleComments = [
            {
                id: 1,
                name: "Maria Silva",
                date: "2023-11-15",
                comment: "Adorei essa receita! Fiz para minha família no final de semana e todos amaram. Vou fazer novamente com certeza!"
            },
            {
                id: 2,
                name: "João Santos",
                date: "2023-11-10",
                comment: "Muito fácil de fazer e ficou delicioso. Só adicionei um pouco mais de açúcar porque gosto de doces mais adocicados."
            }
        ];
        
        setComments(exampleComments);
    }, []);

    // Deixa a Data em um formato mais amigavel para o usuario
    const formatDate = (dateString) => {
        if (!dateString) return "—— Data não disponível ——";
        
        // Create date object from the dateString
        const date = new Date(dateString);
        
        // Adjust for timezone difference (subtract 3 hours)
        const adjustedDate = new Date(date.getTime() - (3 * 60 * 60 * 1000));
        
        // Format for the title (only date)
        if (dateString === Receita.dataPostagem) {
            const options = { year: 'numeric', month: 'short', day: '2-digit' };
            return `—— ${adjustedDate.toLocaleDateString('pt-BR', options)} ——`;
        }
        
        // Format for comments (date and time)
        const dateOptions = { year: 'numeric', month: 'short', day: '2-digit' };
        const timeOptions = { hour: '2-digit', minute: '2-digit' };
        
        const formattedDate = adjustedDate.toLocaleDateString('pt-BR', dateOptions);
        const formattedTime = adjustedDate.toLocaleTimeString('pt-BR', timeOptions);
        
        return `${formattedDate} às ${formattedTime}`;
    };

    // Converte minutos para formato de hora e minutos
    const formatTime = (minutes) => {
        if (!minutes) return "Tempo não disponível";
        
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        
        if (hours > 0) {
            return `${hours}h${mins > 0 ? ` ${mins}min` : ''}`;
        } else {
            return `${mins}min`;
        }
    };

    // Função para adicionar um novo comentário
    const handleSubmitComment = (e) => {
        e.preventDefault();
        
        if (!newComment.trim() || !userName.trim()) return;
        
        const newCommentObj = {
            id: comments.length + 1,
            name: userName,
            date: new Date().toISOString().split('T')[0],
            comment: newComment
        };
        
        setComments([...comments, newCommentObj]);
        setNewComment('');
        setUserName('');
        setUserEmail('');
    };

    // Function to show more comments
    const showMoreComments = () => {
        setCommentLimit(prev => prev + 5); // Show 5 more comments
    };

    // Show all comments
    const showAllComments = () => {
        setCommentLimit(comentario.length);
    };

    const openModal = (type, content) => {
        setEditType(type);
        setEditContent(content);
        setIsModalOpen(true);
    };
    
    const closeModal = () => {
        setIsModalOpen(false);
        setEditType(null);
        setEditContent('');
    };
    
    const handleSaveEdit = (newContent) => {
        console.log(`Saving ${editType} with content: ${newContent}`);
        
        // For demonstration, update local state
        if (editType === 'categoria') {
            setCategoria(newContent);
        } else if (editType === 'titulo') {
            setReceita({...Receita, titulo: newContent});
        } else if (editType === 'texto') {
            setReceita({...Receita, texto: newContent});
        } else if (editType === 'imagem') {
            setReceita({...Receita, imagem: newContent});
        }
    };

    return (
        <div className={styles.post}>
            <ModalEdit 
                isOpen={isModalOpen}
                onClose={closeModal}
                editType={editType}
                content={editContent}
                onSave={handleSaveEdit}
                id={id}
                setCategoria={setCategoria}
                valorAtual={Receita.imagem}
            />
            <div className={styles.titulo}>
                <div>
                     <h3>{categoria}</h3>
                     {isAdmin && (<button className={styles.editButton} onClick={() => openModal('categoria', categoria)}>Editar Categoria</button>)}
                </div>
                
                <div>
                    <h1>{Receita.titulo}</h1>
                    {isAdmin && (<button className={styles.editButton} onClick={() => openModal('titulo', Receita.titulo)}>Editar Título</button>)}
                </div>
                    <p>{formatDate(Receita.dataPostagem)}</p>
            </div>

            <div className={styles.introducao}>
                <div>
                    <p>{Receita.texto}</p>
                    {isAdmin && (<button className={styles.editButton} onClick={() => openModal('texto', Receita.texto)}>Editar texto</button>)}
                </div>
                
                
                    <img 
                        src={Receita.imagem} 
                        alt={Receita.titulo} 
                        style={{
                            width: "100%", 
                            height: "auto", 
                            maxHeight: "500px",
                            animation: "none",
                            transition: "none",
                            display: "block" // Ensures the image is a block element
                        }}
                    />
                    {isAdmin && (<button className={styles.editButton} onClick={() => openModal('imagem', Receita.imagem)}>Editar Imagem</button>)}
               
            </div>

            <div className={styles.ingredientes}>
                <h3>Ingredientes {Receita.porcoes ? `(${Receita.porcoes} porções)` : "(8 porções)"}:</h3>
                <div className={styles.ingredientes_lista}>
                    <ul>
                        {ingredientes && ingredientes.length > 0 ? (
                            ingredientes.map((item, idx) => (
                                <li key={idx}>
                                    {item.quantidade ? `${item.quantidade} ` : ""}{item.nome}
                                </li>
                            ))
                        ) : null}
                    </ul>
                </div>
            </div>

            {/* Only show Cobertura section if there are items */}
            {cobertura && cobertura.length > 0 && (
                <div className={styles.ingredientes}>
                    {cobertura.map((coberturaItem, index) => (
                        <div key={index}>
                            <h3>{coberturaItem.nome || "Cobertura"}:</h3>
                            {coberturaItem.descricao && <p className={styles.coberturaDescricao}>{coberturaItem.descricao}</p>}
                            <div className={styles.ingredientes_lista}>
                                <ul>
                                    {coberturaItem.ingredientes && coberturaItem.ingredientes.length > 0 ? (
                                        coberturaItem.ingredientes.map((ingrediente, idx) => (
                                            <li key={idx}>
                                                {ingrediente.quantidade ? `${ingrediente.quantidade} ` : ""}{ingrediente.nome}
                                            </li>
                                        ))
                                    ) : (
                                        <li>Sem ingredientes específicos para esta cobertura</li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className={styles.preparo}>
                <h3>Modo de Preparo:</h3>
                <div className={styles.tempo}>
                    <h4>Tempo de Preparo:</h4>
                    <p>{formatTime(Receita.tempoPreparo)}</p>
                </div>

                <div className={styles.preparoLista}>
                    <ul>
                        {modoPreparo && modoPreparo.length > 0 ? 
                            modoPreparo
                                .sort((a, b) => a.etapa - b.etapa)
                                .map((step) => (
                                    <li key={step.id}>
                                        <span>
                                            <strong>Passo {step.etapa}:</strong> {step.instrucao}
                                        </span>
                                    </li>
                                ))
                            : steps.map((step, index) => (
                                <li key={index}>
                                    <span>
                                        <strong>Passo {index + 1}:</strong> {step}
                                    </span>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>

            <div className={styles.postsRelacionados}>
                <div className={styles.relacionados}>
                    <h2>Posts Relacionados</h2>
                </div>
                <div className={styles.postsGrid}>
                    {relacionados && relacionados.length > 0 ? (
                        relacionados.map((post) => (
                            <Link href={`/Receita/page?id=${post.id}`} key={post.id}>
                                <div className={styles.relatedPostCard}>
                                    <img 
                                        src={post.imagem || "/placeholder-food.jpg"} 
                                        alt={post.titulo}
                                        className={styles.relatedPostImage} 
                                    />
                                    <h4>{post.titulo}</h4>
                                    <p>
                                        {typeof post.categoria === 'string'
                                            ? post.categoria
                                            : (categoria || post.categoria)}
                                    </p>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p>Nenhum post relacionado encontrado.</p>
                    )}
                </div>
            </div>

            <div className={styles.commentsSection}>
                <div className={styles.relacionados}>
                    <h2>Comentários</h2>
                </div>
                
                <div className={styles.commentsList}>
                    {comentario && comentario.length > 0 ? (
                        <>
                            {[...comentario]
                                .sort((a, b) => {
                                    // Sort by date in descending order (newest first)
                                    const dateA = a.data ? new Date(a.data) : new Date(0);
                                    const dateB = b.data ? new Date(b.data) : new Date(0);
                                    return dateB - dateA;
                                })
                                .slice(0, commentLimit)
                                .map(comment => (
                                    <div key={comment.id} className={styles.commentItem}>
                                        <div className={styles.commentHeader}>
                                            <h4>{comment.nome || 'Anônimo'}</h4>
                                            <span>{comment.data ? formatDate(comment.data) : '—— Data não disponível ——'}</span>
                                        </div>
                                        <p>{comment.comentario}</p>
                                    </div>
                                ))}
                            
                            {comentario.length > commentLimit && (
                                <div className={styles.commentActions}>
                                    <button 
                                        className={styles.showMoreButton} 
                                        onClick={showMoreComments}
                                    >
                                        Mostrar mais comentários
                                    </button>
                                    <button 
                                        className={styles.showAllButton} 
                                        onClick={showAllComments}
                                    >
                                        Mostrar todos ({comentario.length})
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <p className={styles.noComments}>Ainda não há comentários. Seja o primeiro a comentar!</p>
                    )}
                </div>
                
                <div className={styles.commentForm}>
                    <h3>Deixe seu comentário</h3>
                    <form onSubmit={handleSubmitComment}>
                        <div className={styles.formGroup}>
                            <input 
                                type="text" 
                                placeholder="Seu nome *" 
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <input 
                                type="email" 
                                placeholder="Seu email" 
                                value={userEmail}
                                onChange={(e) => setUserEmail(e.target.value)}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <textarea 
                                placeholder="Seu comentário *" 
                                rows="4"
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                required
                            ></textarea>
                        </div>
                        <button 
                            type="button" 
                            className={styles.submitButton} 
                            disabled={!newComment.trim() || !userName.trim()}
                            onClick={() => {
                                if (newComment.trim() && userName.trim()) {
                                    CadastrarComentarioNaReceita({
                                        newComment: newComment, 
                                        idReceita: parseInt(id),
                                        userName: userName,
                                        userEmail: userEmail
                                    });
                                    // Clear the form after submission
                                    setNewComment('');
                                    setUserName('');
                                    setUserEmail('');
                                    // Refresh comments after submission
                                    setTimeout(() => {
                                        BuscarComentariosDaReceita(parseInt(id), setComentarios);
                                    }, 1000);
                                }
                            }}
                        >
                            Enviar Comentário
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
