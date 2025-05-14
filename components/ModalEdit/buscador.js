import URLConfig from '../../Config/URLConfig';

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