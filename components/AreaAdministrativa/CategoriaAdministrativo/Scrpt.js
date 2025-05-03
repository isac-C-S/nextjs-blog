import URLConfig from '../../../Config/URLConfig';
import {BuscarCategorias} from "../../Categorias/Buscador";
import CryptoJS from 'crypto-js';

// Salva a Imagem no Cloudinary e depois salva a categoria no banco de dados
export const CadastrarCategoria = async (nome, imagem, setCategorias) => {
    try {
        // Primeiro, fazer upload da imagem para o Cloudinary
        const cloudinaryResponse = await uploadImageToCloudinary(imagem);
        
        // Agora enviar apenas os dados para o backend (sem o arquivo)
        const data = {
            nome: nome,
            imagem: cloudinaryResponse.secure_url,
        };

        const response = await fetch(`${URLConfig.BACKEND_URL}/Categoria`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error("Erro ao cadastrar categoria");
        }

        BuscarCategorias(setCategorias);
    }
    catch (error) {
        console.error("Erro ao cadastrar categoria:", error);
        throw error;
    }
};

// exclui a categoria do banco de dados e depois exclui a imagem do Cloudinary
export const ExcluirCategoria = async (categoriaId, imagemUrl, setCategorias) => {
    try {
      // Excluir a imagem do Cloudinary primeiro
      if (imagemUrl) {
        await deletarImagemDoCloudinary(imagemUrl);
      }
  
      // Depois excluir a categoria no backend
      const deleteResponse = await fetch(`${URLConfig.BACKEND_URL}/Categoria/${categoriaId}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!deleteResponse.ok) {
        throw new Error("Erro ao excluir categoria");
      }
  
      // Atualizar a lista de categorias após exclusão
      BuscarCategorias(setCategorias);
      return true;
    }
    catch (error) {
      console.error("Erro ao excluir categoria:", error);
      throw error;
    }
};

// Função para fazer upload no Cloudinary
const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'categorias'); // ou seu preset personalizado
    formData.append('folder', 'categorias'); // definindo a pasta como "categorias"
    
    try {
      const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'seu-cloud-name'}/image/upload`;
      
      const response = await fetch(cloudinaryUrl, {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) {
        throw new Error('Falha no upload para Cloudinary');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Erro no upload para Cloudinary:', error);
      throw error;
    }
};

// Função para deletar imagem do Cloudinary
const deletarImagemDoCloudinary = async (imageUrl) => {
try {
    // Extrair o public_id da URL do Cloudinary
    // A URL geralmente é algo como: https://res.cloudinary.com/cloud-name/image/upload/v1234567890/categorias/filename.jpg
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

// Função para gerar a assinatura necessária para deletar a imagem do Cloudinary
const gerarAssinaturaCloudinary = (publicId, timestamp) => {
const stringToSign = `public_id=${publicId}&timestamp=${timestamp}${process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET}`;
return CryptoJS.SHA1(stringToSign).toString();
};

// Função para atualizar a categoria
export async function AtualizarCategoria(categoriaId, nome, imagem, imagemAntiga, setCategorias) {
    try {
      let imagemUrl = imagemAntiga;
      
      // Se uma nova imagem foi fornecida
      if (imagem) {
        // Primeiro, fazer upload da nova imagem para o Cloudinary
        const cloudinaryResponse = await uploadImageToCloudinary(imagem);
        imagemUrl = cloudinaryResponse.secure_url;
        
        // Depois, deletar a imagem antiga se existir
        if (imagemAntiga) {
          await deletarImagemDoCloudinary(imagemAntiga);
        }
      }
      
      // Enviar os dados atualizados para o backend
      const data = {
        id: categoriaId,
        nome: nome,
        imagem: imagemUrl
      };
      
      const response = await fetch(`${URLConfig.BACKEND_URL}/Categoria/${categoriaId}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        // Atualiza a lista de categorias após sucesso
        BuscarCategorias(setCategorias);
        return true;
      } else {
        console.error("Erro ao atualizar categoria:", await response.text());
        return false;
      }
    } catch (error) {
      console.error("Erro ao atualizar categoria:", error);
      return false;
    }
  };

