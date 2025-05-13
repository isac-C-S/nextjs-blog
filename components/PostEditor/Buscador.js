import URLConfig from '../../Config/URLConfig'

export const BuscarCategorias = async () => {
  const response = await fetch(`${URLConfig.BACKEND_URL}/Categoria`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error('Error al buscar categorías')
  }

  const data = await response.json()
  return data
};

export const BuscarIngredientes = async () => {
  const response = await fetch(`${URLConfig.BACKEND_URL}/Ingrediente`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },

  })

  if (!response.ok) {
    throw new Error('Error al buscar ingredientes')
  }

  const data = await response.json()
  return data
};

export const CadastrarIngrediente = async (nome, descricao) => {
  const response = await fetch(`${URLConfig.BACKEND_URL}/Ingrediente`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        nome: nome,
        descricao: descricao
    }),
  })

  if (!response.ok) {
    throw new Error('Error al crear ingrediente')
  }

  const data = await response.json()
  return data
}