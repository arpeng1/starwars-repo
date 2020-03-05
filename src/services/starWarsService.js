import axios from 'axios';
const planetsUrl = 'https://swapi.co/api/planets';

async function getAllPlanets(url=planetsUrl) {
  const response = await axios.get(url);
  if (response.data.next) {
    return response.data.results.concat( await getAllPlanets(response.data.next));
  } else {
    return response.data.results;
  }
}

export default {
  getAllPlanets
}