import {useEffect, useState } from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import api from '../../services/api';
import './filme.css';
import { toast } from 'react-toastify';

function Filme() {
    const {id} = useParams();
    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(()=>{

        async function loadFilme(){
            const response = await api.get(`movie/${id}`, {
                params:{
                    api_key:"28fc232cc001c31e8a031f419d0a14ca",
                    language: "pt-BR",
                }
            })
            .then((response) => {
                setFilme(response.data);
                setLoading(false);

            } )
            .catch(() => {
                console.log("Filme não encontrado");
                navigate("/",{replace: "true"});
                return;
            })

        };
        loadFilme();

        return () => {
            console.log("Componente foi desmontado");
        }

    }, [id,navigate]);

    function salvarFilme(){
       const minhaLista = localStorage.getItem("@primeflix");
       let filmesSalvos = JSON.parse(minhaLista) || [];
       const hasFilme = filmesSalvos.some( (xxx) => xxx.id === filme.id )
       
       if (hasFilme){
        toast.warn("Esse Filme já está na sua Lista");
        return;
       }

       filmesSalvos.push(filme);
       localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
       toast.success("Filme salvo com sucesso");


    }

    if(loading){
        return(
            <div className="loading">
                <h2>Carregando Detalhes....</h2>
            </div>
        )
    }

    return (
        <div className='filme-info'>
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}></img>
            <h3>Snopse</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação: {filme.vote_average} / 10</strong>
            <div className='area-buttons'>
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a href={`https://youtube.com/results?search_query=${filme.title} trailer`} target="blank" rel="external">Trailer</a>
                </button>
            </div>
            
        </div>
    )
}

export default Filme;