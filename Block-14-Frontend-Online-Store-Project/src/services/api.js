export async function getCategories() {
  const categories = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const responseCategories = await categories.json();
  return responseCategories;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const categoriesQuery = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`, { method: 'GET' });
  const responseCategoriesQuery = await categoriesQuery.json();
  return responseCategoriesQuery;
}
