import Slider from "react-slick";
import styles from"./carrousel.module.css"
import {BuscarReceitas2} from "../../components/Posts/Buscador";
import { useEffect , useState} from "react";
import { useRouter } from 'next/router';

export default function Carrousel({categorias}) {
  const [receitas,setReceitas] = useState([]);
  const router = useRouter();

  // Função para navegar para a página da receita
  const IrReceita = (id) => {
    return () => router.push({
      pathname: '/Receita/page',
      query: { id: id },
    });
  };

  // Função para obter o nome da categoria a partir do ID
  const obterNomeCategoria = (categoriaId) => {
    const categoria = categorias.find(cat => cat.id === categoriaId);
    // Retorna o nome da categoria ou "Sobremesa" como fallback
    return categoria ? categoria.nome : "Sobremesa";
  };

  // Função para formatar a data em um formato mais amigável
  const formatarData = (dataString) => {
    if (!dataString) return "28 de Dezembro de 2024";
    
    try {
      const data = new Date(dataString);
      
      if (isNaN(data.getTime())) return dataString; // Se não for uma data válida, retorna o original
      
      const meses = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
      ];
      
      const dia = data.getDate();
      const mes = meses[data.getMonth()];
      const ano = data.getFullYear();
      
      return `${dia} de ${mes} de ${ano}`;
    } catch (error) {
      console.error("Erro ao formatar data:", error);
      return dataString;
    }
  };

  // Configurações do Carrousel
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    swipeToSlide: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 9999, // For very large screens
        settings: {
          slidesToShow: 7, // Show more items on large screens to fill width
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 1440, // Standard desktop down to 1440px
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 1030, // Tela média (tablets grandes)
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          swipeToSlide: true,
        },
      },
      {
        breakpoint: 768, // Tablets e celulares em modo paisagem
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          swipeToSlide: true,
        },
      },
      {
        breakpoint: 480, // Celulares
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          swipeToSlide: true,
        },
      },
    ],
  };

  // Busca as receitas ao carregar o componente
  useEffect(() => {
    BuscarReceitas2(setReceitas);
  }, []);

  return (
    <div className={styles.container}>
      <Slider {...settings}>
        {receitas.length > 0 ? (
          receitas.map((receita, index) => (
            <div 
              className={styles.containerItem} 
              key={index} 
              onClick={IrReceita(receita.id)}
              style={{ cursor: 'pointer' }}
            >
              <img 
                src={receita.imagem || `/item${(index % 4) + 1}.jpg`} 
                alt={`Imagem ${receita.titulo || index + 1}`} 
              />
              <div className={styles.borda}/>
              <div className={styles.titulo}>
                <div className={styles.tituloP}>
                  <h1>{obterNomeCategoria(receita.categoria)}</h1>
                </div>

                <div className={styles.tituloS}>
                  <h3>{receita.titulo || "Bolo de cenoura"}</h3>
                </div>

                <div className={styles.data}>
                  <p>—— {formatarData(receita.dataPostagem)} ——</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          // Fallback items when receitas is empty
          Array.from({ length: 4 }).map((_, index) => (
            <div 
              className={styles.containerItem} 
              key={index}
              style={{ cursor: 'default' }}
            >
              <img src={`/item${index + 1}.jpg`} alt={`Imagem ${index + 1}`} />
              <div className={styles.borda}/>
              <div className={styles.titulo}>
                <div className={styles.tituloP}>
                  <h1>Sobremesa</h1>
                </div>
                <div className={styles.tituloS}>
                  <h3>Bolo de cenoura</h3>
                </div>
                <div className={styles.data}>
                  <p>—— 28 de Dezembro de 2024 ——</p>
                </div>
              </div>
            </div>
          ))
        )}
      </Slider>
    </div>
  );
}
