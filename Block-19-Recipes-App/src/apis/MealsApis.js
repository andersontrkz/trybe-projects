// filter meals based on SearchBar
export async function fetchMealsApi({ searchText, filter }) {
  if (filter === 'ingredient') {
    const request = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchText}`);
    const { meals } = await request.json();
    return meals == null ? [] : meals;
  }
  if (filter === 'name') {
    const request = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`);
    const { meals } = await request.json();
    return meals == null ? [] : meals;
  }
  if (filter === 'firstLetter') {
    const request = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchText}`);
    const { meals } = await request.json();
    return meals == null ? [] : meals;
  }
}

// All meals
export async function fetchMealsRecomendation() {
  const request = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const { meals } = await request.json();
  return meals;
}

// only one Meal, by ID
export async function fetchMealsById(id) {
  const request = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const { meals } = await request.json();
  return meals;
}

// filter meals based on Category
export async function fetchMealsByCategory(cat) {
  const request = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`);
  const { meals } = await request.json();
  return meals;
}

// filter meals based on Ingredient
export async function fetchMealsByIngredient(ing) {
  const request = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ing}`);
  const { meals } = await request.json();
  return meals;
}

// return all meal Categories
export async function fetchMealsCategories() {
  const request = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  const { meals } = await request.json();
  return meals;
}

// return all meal Ingredients
export async function fetchMealsIngredients() {
  const request = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
  const { meals } = await request.json();
  return meals;
}

// return all meal Areas
export async function fetchMealsAreas() {
  const request = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
  const { meals } = await request.json();
  return meals;
}
