
export function searchProducts(products, query) {
  const text = query.trim().toLowerCase()

  return products.filter((product) =>
    product.title.toLowerCase().includes(text)
  )
}

export function filterProductsByCategory(products, category) {
  if (category === 'all') return products

  return products.filter((product) => product.category === category)
}

export function sortProducts(products, sortType) {
  const result = [...products]

  const price = (product) =>
    product.price * (1 - product.discountPercent / 100)

  if (sortType === 'price-asc') {
    result.sort((a, b) => price(a) - price(b))
  }

  if (sortType === 'price-desc') {
    result.sort((a, b) => price(b) - price(a))
  }

  if (sortType === 'title-asc') {
    result.sort((a, b) => a.title.localeCompare(b.title, 'ru'))
  }

  return result
}

export function getPreparedProducts(products, query, category, sortType) {
  let result = searchProducts(products, query)
  result = filterProductsByCategory(result, category)
  return sortProducts(result, sortType)
}
