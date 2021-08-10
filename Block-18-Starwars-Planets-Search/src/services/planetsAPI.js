async function fetchPlanets() {
  const request = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
  const response = await request.json();
  const { results } = response;

  return results;
}

export default fetchPlanets;
