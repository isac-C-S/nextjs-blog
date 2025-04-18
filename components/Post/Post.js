import styles from './Post.module.css';
import Image from 'next/image';

export default function Post() {
    const steps = [
        "Antes de tudo, em uma tigela, junte a farinha de trigo, o açúcar, o chocolate em pó e o fermento químico. Misture bem para combinar todos os ingredientes secos, garantindo que o fermento esteja bem distribuído.",
        "Em seguida, em outra tigela, bata os ovos e adicione o leite. Depois, incorpore essa mistura aos ingredientes secos, mexendo bem até obter uma massa homogênea e sem grumos.",
        "Agora, despeje a massa em uma forma untada e enfarinhada. Leve ao forno preaquecido a 180 °C por 40 minutos, ou até que um palito inserido no centro do bolo saia limpo. Por fim, deixe o bolo esfriar antes de desenformar.",
        "Em uma panela, então, leve ao fogo médio o achocolatado em pó, o açúcar, a margarina e o leite. Mexa constantemente até que todos os ingredientes estejam bem incorporados e a calda esteja homogênea e quente.",
        "Com o bolo ainda quente, então, faça pequenos furos em toda a superfície utilizando um garfo. Despeje a calda quente sobre o bolo, garantindo que ela penetre bem nos furos. Deixe o bolo descansar e absorver a calda antes de servir, a fim de garantir que ele fique bem molhadinho e delicioso."
    ];

    return (
        <div className={styles.post}>
            <div className={styles.titulo}>
                <h3>BOLO</h3>
                <h1>Receita de bolo de chocolate molhadinho</h1>
                <p>—— May 08, 2021 ——</p>
            </div>

            <div className={styles.introducao}>
                <p>
                    Prepare um delicioso bolo de chocolate molhadinho com esta receita fácil e prática. 
                    Assim, surpreenda sua família com uma sobremesa úmida e saborosa que derrete na boca.
                </p>
                <img src="/carne.jpeg" alt="Bolo de chocolate" />
            </div>

            <div className={styles.ingredientes}>
                <h3>Ingredientes (8 porções):</h3>
                <div className={styles.ingredientes_lista}>
                    <ul>
                        <li><img src="/carne.jpeg"></img> 1 xícara de açúcar</li>
                        <li><img src="/carne.jpeg"></img>1 xícara de farinha de trigo</li>
                        <li><img src="/carne.jpeg"></img>/2 xícara de chocolate em pó</li>
                        <li><img src="/carne.jpeg"></img>1/2 xícara de óleo</li>
                        <li><img src="/carne.jpeg"></img>1/2 xícara de água</li>
                        <li><img src="/carne.jpeg"></img>3 ovos</li>
                        <li><img src="/carne.jpeg"></img>1 colher de fermento em pó</li>
                        <li><img src="/carne.jpeg"></img>1 colher de fermento em pó</li>
                        <li><img src="/carne.jpeg"></img>1 colher de fermento em pó</li>
                        <li><img src="/carne.jpeg"></img>1 colher de fermento em pó</li>
                    </ul>
                </div>
            </div>

            <div className={styles.ingredientes}>
                <h3>Cobertura:</h3>
                <div className={styles.ingredientes_lista}>
                    <ul>
                        <li><img src="/carne.jpeg"></img> 1 xícara de açúcar</li>
                        <li><img src="/carne.jpeg"></img>1 xícara de farinha de trigo</li>
                        <li><img src="/carne.jpeg"></img>/2 xícara de chocolate em pó</li>
                        <li><img src="/carne.jpeg"></img>1/2 xícara de óleo</li>
                        <li><img src="/carne.jpeg"></img>1/2 xícara de água</li>
                        <li><img src="/carne.jpeg"></img>3 ovos</li>
                        <li><img src="/carne.jpeg"></img>1 colher de fermento em pó</li>
                        <li><img src="/carne.jpeg"></img>1 colher de fermento em pó</li>
                        <li><img src="/carne.jpeg"></img>1 colher de fermento em pó</li>
                        <li><img src="/carne.jpeg"></img>1 colher de fermento em pó</li>
                    </ul>
                </div>
            </div>

            <div className={styles.preparo}>
                <h3>Modo de Preparo:</h3>
                <div className={styles.tempo}>
                    <h4>Tempo de Preparo:</h4>
                    <p>1H30min</p>
                </div>

                <div className={styles.preparoLista}>
                    <ul>
                        {steps.map((step, index) => (
                            <li key={index}>
                              
                                <span>
                                    <strong>Passo {index + 1}:</strong> {step}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
