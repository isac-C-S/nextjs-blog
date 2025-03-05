import Carrousel from "../components/Carrousel/carrousel";
import Categorias from "../components/Categorias/Categorias";
import Footer from "../components/Footer/Footer";
import Nav from "../components/Nav/nav";
import Principal from "../components/Posts/posts";


export default function Home() {
  return (
    

      <main>
        <Nav/>
        <Carrousel/>
        <Categorias/>
        <Principal/>
        <Footer/>
      </main>
       
    
  );
}
