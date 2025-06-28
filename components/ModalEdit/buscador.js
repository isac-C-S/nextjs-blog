import URLConfig from '../../Config/URLConfig';
import {BuscarCategoriaDaReceita,BuscarReceitaPorId} from "../Post/Buscador"
import CryptoJS from 'crypto-js';

export const BuscarCategorias = async () => {
  const response = await fetch(`${URLConfig.BACKEND_URL}/Categoria`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Error al buscar las categorías');
  }

  const data = await response.json();
  console.log('Categorias:', data);
  return data;
};

export const EditrarCategoria = async (id, categoria) => {
  const response = await fetch(`${URLConfig.BACKEND_URL}/Categoria/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(categoria),
  });

  if (!response.ok) {
    throw new Error('Error al editar la categoría');
  }

  const data = await response.json();
  console.log('Categoria editada:', data);
  return data;
};

export const EditarCategoriaDaReceita = async (id, idCategoria,setCategoria) =>{
  const response = await fetch(`${URLConfig.BACKEND_URL}/Receita/editarCategoria/${id}/${idCategoria}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json',},
  });

  if (!response.ok) {
    throw new Error('Problema ao editar a categoria da receita');
  }

  const data = await response.json();
  console.log('Categoria de receita editada:', data);
  BuscarCategoriaDaReceita(idCategoria, setCategoria);

  return data;
};

export const EditarTituloDaReceita = async (id, titulo,onSave) => {
  const response = await fetch(`${URLConfig.BACKEND_URL}/Receita/editarTitulo/${id}/${titulo}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json',},
  });

  if (!response.ok) {
    throw new Error('Erro ao editar o título da receita');
  }

  const data = await response.json();
  onSave(data.titulo);
};

export const editarTextoDaReceita = async (id, texto,onSave) => {
  const response = await fetch(`${URLConfig.BACKEND_URL}/Receita/editarTexto/${id}/${texto}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json',},
  });

  if (!response.ok) {
    throw new Error('Erro ao editar o texto da receita');
  }

  const data = await response.json();
  onSave(data.texto);
};

export const AdicionarIngrediente = async (id, nomeIngrediente,quantidadeIngrediente,onSave) => {
  const body = {
    idReceita: id,
    quantidade: quantidadeIngrediente,
    nome: nomeIngrediente,
  }

  const response = await fetch(`${URLConfig.BACKEND_URL}/IngredienteDaReceita`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json',},
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error('Erro ao adicionar o ingrediente');
  }

  const data = await response.json();
  onSave(data);

};

export const AdicionarPasso = async (id, modoPreparo, onSave) => {
  const body = {
    receita: id,
    etapa: modoPreparo.etapa,
    instrucao: modoPreparo.instrucao,
  }
  const response = await fetch(`${URLConfig.BACKEND_URL}/ModoPreparo`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json',},
    body: JSON.stringify(body),
  });
  if (response.status === 400){
    alert("Erro ao adicionar o passo, verifique se a etapa já existe");
    
  }else{
    const data = await response.json();
    onSave(data);
  }
}

// Função para fazer upload no Cloudinary
const uploadImageToCloudinary = async (file,id) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'estrelinha'); // ou o nome do seu preset
    formData.append('folder', 'Receitas');

    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;
    const response = await fetch(cloudinaryUrl, {
        method: 'POST',
        body: formData
    });

    const data = await response.json();

    salvarImagem(id, data.secure_url);
    if (!response.ok) {
        // Mostra o erro detalhado do Cloudinary no console
        console.error('Erro Cloudinary:', data);
        throw new Error(data.error?.message || 'Falha no upload para Cloudinary');
    }

    return data;
};

// Função para deletar imagem do Cloudinary
const deletarImagemDoCloudinary = async (imageUrl) => {
try {
    // Extrair o public_id da URL do Cloudinary
    const urlParts = imageUrl.split('/');
    const filenameWithExtension = urlParts[urlParts.length - 1];
    const folderName = urlParts[urlParts.length - 2];
    const publicId = `${folderName}/${filenameWithExtension.split('.')[0]}`;
    
    // Chamar a API de destruição do Cloudinary
    const timestamp = Math.round(new Date().getTime() / 1000);
    const signature = gerarAssinaturaCloudinary(publicId, timestamp);
    
    const formData = new FormData();
    formData.append('public_id', publicId);
    formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
    formData.append('timestamp', timestamp);
    formData.append('signature', signature);
    
    const cloudinaryDeleteUrl = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/destroy`;
    
    const response = await fetch(cloudinaryDeleteUrl, {
    method: 'POST',
    body: formData
    });
    
    if (!response.ok) {
    console.warn('Aviso: Não foi possível excluir a imagem do Cloudinary');
    }
    
    return await response.json();
} catch (error) {
    console.error('Erro ao excluir imagem do Cloudinary:', error);
    // Continuamos com a exclusão da categoria mesmo se falhar a exclusão da imagem
}
};

const gerarAssinaturaCloudinary = (publicId, timestamp) => {
const stringToSign = `public_id=${publicId}&timestamp=${timestamp}${process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET}`;
return CryptoJS.SHA1(stringToSign).toString();
};

export async function AtualizarReceitaImagem( id, imagem, imagemAntiga,onSave) {
    try {
      let imagemUrl = imagemAntiga;
      
      // Se uma nova imagem foi fornecida
      if (imagem) {
        // Primeiro, fazer upload da nova imagem para o Cloudinary
        const cloudinaryResponse = await uploadImageToCloudinary(imagem,id);
        imagemUrl = cloudinaryResponse.secure_url;
        
        // Depois, deletar a imagem antiga se existir
        if (imagemAntiga) {
          console.log("Deletando imagem antiga do Cloudinary:", imagemAntiga);
          await deletarImagemDoCloudinary(imagemAntiga);
        }
      }
      
      // Enviar os dados atualizados para o backend
      const data = {
        id: id,
        imagem: imagemUrl
      };
      
     return data;
    } catch (error) {
      console.error("Erro ao atualizar categoria:", error);
      return false;
    }
};

const salvarImagem = async (id, imagem) => {
    try {
        const response = await fetch(`${URLConfig.BACKEND_URL}/Receita/editarImagem/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: imagem 
        });

        if (!response.ok) {
            throw new Error('Erro ao salvar a imagem');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao salvar a imagem:', error);
        return false;
    }
};