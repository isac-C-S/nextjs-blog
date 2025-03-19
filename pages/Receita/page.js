import {useRouter} from 'next/router'
import Nav from '../../components/Nav/nav';
import Footer from '../../components/Footer/Footer';
import Receitas from '../../components/Receitas/Receitas';

export default function Receita() {
    const router = useRouter();
    const {id} = router.query;

  return (
    
    <div>
        <Nav/>
        <Receitas/>
         <Footer/>
        
    </div>
       
    
  );
}
