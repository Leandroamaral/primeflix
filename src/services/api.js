//base da URL https://api.themoviedb.org/3/
//URL da API: movie/now_playing?api_key=28fc232cc001c31e8a031f419d0a14ca&language=pt-BR

import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api;
