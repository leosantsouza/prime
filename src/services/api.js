import axios from "axios";

//Base da URL: https://api.themoviedb.org/3/
//URL da API: movie/now_playing?api_key=871376425a459173d284aababd24c0d6&language=pt-BR

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
});

export default api;
