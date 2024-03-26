
import { useEffect, useState } from "react";                                              // hook
import { useParams, useNavigate } from "react-router-dom";                                // hook 
import api from '../../services/api';
import './filme.info.css';
import { toast } from "react-toastify"

function Filme() {                                                                        // Esta função é responsável por renderizar a página do filme
  const { id } = useParams();                                                             // Esta função é responsável por pegar os parâmetros da URL
  const navigate = useNavigate();                                                         // Esta função é responsável por navegação no navegador
  const [filme, setFilme] = useState({});                                                 // Esta função é responsável por armazenar os dados do filme
  const [loading, setLoading] = useState(true);                                           // Esta função é responsável por carregar a página

  useEffect(() => {    
    async function loadFilme(){                                                           // função que carrega os dados do filme
      await api.get(`/movie/${id}`, {                                                     // Espera os dados serem carregados da API
        params:{                                                                          // Parâmetros da API
          api_key: "871376425a459173d284aababd24c0d6",                                    // Chave da API
          language: "pt-BR"                                                               // Idioma do filme
        }
      })
      .then(response =>{                                                                  // pegar os dados da api
          setFilme(response.data);                                                        // colocar os dados na variavel filme
          setLoading(false);                                                              // desabilitar o loading
        })
        .catch(()=>{                                                                      // caso ocorra algum erro
          navigate("/", {replace: true})                                                  // redirecionar para home
        });
    }

    loadFilme();                                                                          // carregar a api
    return () => { 

    }

    
  }, [id, navigate])                                                                      // depois de carregar a api, desabilitar o loading

  function salvarFilme() {
    const minhaLista = localStorage.getItem("@primeflix");                                // Cria a lista de filmes salvos no localStorage
    let filmesSalvos = JSON.parse(minhaLista) || [];                                      // cria uma variavel para armazenar a lista de filmes salvos
    const hasFilme = filmesSalvos.some((filmesSalvo) => filmesSalvo.id === filme.id)      // verifica se o filme já existe na lista de filmes salvos

    if (hasFilme) { 
      toast.warn("Esse filme já está na sua lista!!")                                            // condição para verificar se o filme já existe na lista de filmes salvos
      return;
    }

      filmesSalvos.push(filme);                                                           // adiciona o filme na lista de filmes salvos
      localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
      toast.success("Filme salvo com sucesso!!")                                          // salva a lista de filmes salvos no localStorage           

  }



  if (loading) {                                                                          // condição para verificar se a página está carregada
    return (
      <div className="filme-info">
        <h1>Carregando detalhes...</h1>
      </div>
    )
  }

  return (    
    <div className="filme-info">
      <h1>{filme.title}</h1>
      <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}/>
      <h3>Sinopse</h3>
      <span>{filme.overview}</span>
      <strong>{filme.vote_average} /10</strong>
      <div className="area-buttons">
        <button onClick={salvarFilme}>Salvar</button>
        <button><a target="blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>Trailer</a></button>
      </div>
    </div>
  );
}

export default Filme;
