import styles from './Post.module.css';
import {BuscarReceitaPorId,BuscarCategoriaDaReceita,BuscarIngredientesDareceita,BuscarModoPreparoDaReceita} from './Buscador.js'
import { useEffect } from 'react';
import { useState } from 'react';
import Link from 'next/link';

export default function Post({id}) {
    const [Receita,setReceita] = useState([]);
    const [categoria,setCategoria] = useState("");
    const [ingredientes,setIngredientes] = useState([]);
    const [cobertura, setCobertura] = useState([]);
    const [modoPreparo, setModoPreparo] = useState([]);
    const [postsRelacionados, setPostsRelacionados] = useState([]);
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
        if(Receita.categoria){
            BuscarCategoriaDaReceita(Receita.categoria, setCategoria);
        }

        const intId = parseInt(id);
        if(Receita && !isNaN(intId)){
            BuscarIngredientesDareceita(intId, setIngredientes);
            BuscarModoPreparoDaReceita(intId, setModoPreparo);
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

    // Deixa a Data em um formato mais amigavel para o usuario
    const formatDate = (dateString) => {
        if (!dateString) return "—— Data não disponível ——";
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'short', day: '2-digit' };
        return `—— ${date.toLocaleDateString('en-US', options)} ——`;
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

    return (
        <div className={styles.post}>
            <div className={styles.titulo}>
                <h3>{categoria}</h3>
                <h1>{Receita.titulo}</h1>
                <p>{formatDate(Receita.dataPostagem)}</p>
            </div>

            <div className={styles.introducao}>
                <p>
                    {Receita.texto}
                </p>
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

            <div className={styles.ingredientes}>
                <h3>Cobertura:</h3>
                <div className={styles.ingredientes_lista}>
                    <ul>
                        <li><img src={Receita.imagem || "/carne.jpeg"}></img> 1 xícara de açúcar</li>
                        <li><img src={Receita.imagem || "/carne.jpeg"}></img>1 xícara de farinha de trigo</li>
                        <li><img src={Receita.imagem || "/carne.jpeg"}></img>/2 xícara de chocolate em pó</li>
                        <li><img src={Receita.imagem || "/carne.jpeg"}></img>1/2 xícara de óleo</li>
                        <li><img src={Receita.imagem || "/carne.jpeg"}></img>1/2 xícara de água</li>
                        <li><img src={Receita.imagem || "/carne.jpeg"}></img>3 ovos</li>
                        <li><img src={Receita.imagem || "/carne.jpeg"}></img>1 colher de fermento em pó</li>
                        <li><img src={Receita.imagem || "/carne.jpeg"}></img>1 colher de fermento em pó</li>
                        <li><img src={Receita.imagem || "/carne.jpeg"}></img>1 colher de fermento em pó</li>
                        <li><img src={Receita.imagem || "/carne.jpeg"}></img>1 colher de fermento em pó</li>
                    </ul>
                </div>
            </div>

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
                <h3>Posts Relacionados:</h3>
                <div className={styles.postsGrid}>
                    {postsRelacionados && postsRelacionados.length > 0 ? (
                        postsRelacionados.map((post) => (
                            <Link href={`/posts/${post.id}`} key={post.id}>
                                <div className={styles.relatedPostCard}>
                                    <img 
                                        src={post.imagem || "/placeholder-food.jpg"} 
                                        alt={post.titulo}
                                        className={styles.relatedPostImage} 
                                    />
                                    <h4>{post.titulo}</h4>
                                    <p>{post.categoria}</p>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p>Nenhum post relacionado encontrado.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
