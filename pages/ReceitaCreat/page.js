import {useRouter} from 'next/router'
import Nav from '../../components/Nav/nav';
import Footer from '../../components/Footer/Footer';
import Receitas from '../../components/Receitas/Receitas';
import PostEditor from '../../components/PostEditor/PostEditor';

export default function ReceitaCreat() {
    const router = useRouter();
    const {id} = router.query;

  return (
    
    <div>
      <PostEditor/>
       
    </div>
       
    
  );
}
