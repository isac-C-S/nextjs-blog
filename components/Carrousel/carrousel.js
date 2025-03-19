import Slider from "react-slick";
import styles from"./carrousel.module.css"
import {BuscarReceitas2} from "../../components/Posts/Buscador";
import { useEffect , useState} from "react";

export default function Carrousel() {
  const [receitas,setReceitas] = useState([]);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    arrows: false,
    responsive: [
      {
        breakpoint: 1030, // Tela média (tablets grandes)
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          
        },
      },
      {
        breakpoint: 768, // Tablets e celulares em modo paisagem
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480, // Celulares
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    BuscarReceitas2(setReceitas);
  }, []);

  return (
    <div className={styles.container}>

      <Slider {...settings}>

        <div className={styles.containerItem}>
           
            <img src="/item1.jpg" alt="Imagem 1" />
            
            <div className={styles.borda}/>
              <div className={styles.titulo}>
                <div className={styles.tituloP}>
                  <h1>Sobremesa</h1>
                </div>

                <div  className={styles.tituloS}>
                  <h3>Bolo de cenoura </h3>
                </div>

                <div className={styles.data}>
                  <p>—— 28/12/2024 ——</p>
              </div>
          </div>   
        </div>

          <div className={styles.containerItem}>

           
            <img src="/item2.jpg" alt="Imagem 2" />
            <div className={styles.borda}/>
            <div className={styles.titulo}>
              <div className={styles.tituloP}>
                <h1>Sobremesa</h1>
              </div>

              <div  className={styles.tituloS}>
                <h3>Bolo de cenoura </h3>
              </div>

              <div className={styles.data}>
                  <p>—— 28/12/2024 ——</p>
              </div>
            </div>
          </div>
        <div className={styles.containerItem}>
          <img src="/item3.jpg" alt="Imagem 3" />
          <div className={styles.borda}/>
          <div className={styles.titulo}>
            <div className={styles.tituloP}>
              <h1>Sobremesa</h1>
            </div>

            <div  className={styles.tituloS}>
              <h3>Bolo de cenoura </h3>
            </div>
            <div className={styles.data}>
              <p>—— 28/12/2024 ——</p>
            </div>
          </div>
        </div>
        <div className={styles.containerItem}>
          <img src="/item4.jpg" alt="Imagem 4" />
          <div className={styles.borda}/>
          <div className={styles.titulo}>
            <div className={styles.tituloP}>
              <h1>Sobremesa</h1>
            </div>

            <div  className={styles.tituloS}>
              <h3>Bolo de cenoura </h3>
            </div>

            <div className={styles.data}>
              <p>—— 28/12/2024 ——</p>
            </div>

          </div>
        </div>
        <div className={styles.containerItem}>
          <img src="/item1.jpg" alt="Imagem 5" />
          <div className={styles.borda}/>
          <div className={styles.titulo}>
            <div className={styles.tituloP}>
              <h1>Sobremesa</h1>
            </div>

            <div  className={styles.tituloS}>
              <h3>Bolo de cenoura </h3>
            </div>
            <div className={styles.data}>
              <p>—— 28/12/2024 ——</p>
            </div>
          </div>
        </div>
        <div className={styles.containerItem}>
          <img src="/item2.jpg" alt="Imagem 6" />
          <div className={styles.borda}/>
          <div className={styles.titulo}>
            <div className={styles.tituloP}>
              <h1>Sobremesa</h1>
            </div>

            <div  className={styles.tituloS}>
              <h3>Bolo de cenoura </h3>
            </div>
            <div className={styles.data}>
              <p>—— 28/12/2024 ——</p>
            </div>
          </div>
        </div>
        <div className={styles.containerItem}>
          <img src="/item3.jpg" alt="Imagem 7" />
          <div className={styles.borda}/>
          <div className={styles.titulo}>
            <div className={styles.tituloP}>
              <h1>Sobremesa</h1>
            </div>

            <div  className={styles.tituloS}>
              <h3>Bolo de cenoura </h3>
            </div>
            <div className={styles.data}>
              <p>—— 28/12/2024 ——</p>
            </div>
          </div>
        </div>
        <div className={styles.containerItem}>
          <img src="/item4.jpg" alt="Imagem 8" />
          <div className={styles.borda}/>
          <div className={styles.titulo}>
            <div className={styles.tituloP}>
              <h1>Sobremesa</h1>
            </div>

            <div  className={styles.tituloS}>
              <h3>Bolo de cenoura </h3>
            </div>
            <div className={styles.data}>
              <p>—— 28/12/2024 ——</p>
            </div>
          </div>
        </div>
        <div className={styles.containerItem}>
          <img src="/item1.jpg" alt="Imagem 9" />
          <div className={styles.borda}/>
          <div className={styles.titulo}>
            <div className={styles.tituloP}>
              <h1>Sobremesa</h1>
            </div>

            <div  className={styles.tituloS}>
              <h3>Bolo de cenoura </h3>
            </div>
            <div className={styles.data}>
              <p>—— 28/12/2024 ——</p>
            </div>
          </div>
        </div>
        
        <div className={styles.containerItem}>
          <img src="/item1.jpg" alt="Imagem 9" />
          <div className={styles.borda}/>
          <div className={styles.titulo}>
            <div className={styles.tituloP}>
              <h1>Sobremesa</h1>
            </div>

            <div  className={styles.tituloS}>
              <h3>Bolo de cenoura </h3>
            </div>
            <div className={styles.data}>
              <p>—— 28/12/2024 ——</p>
            </div>
          </div>
        </div>
        
      </Slider>
    </div>
  );
}
