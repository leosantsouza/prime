
import { useEffect, useState } from 'react'
import './favoritos.css'
import { Link } from 'react-router-dom'
import { toast } from "react-toastify"

function Favoritos() {                                                                         // esta função é responsável por renderizar os favoritos

    const [filmes, setFilmes] = useState([])                                                   // esta variável é responsável por armazenar os filmes

    useEffect(() => {
        const minhaLista = localStorage.getItem('@primeflix')                                  // esta variavel carrega os dados da minha lista que está no localStorage
        setFilmes(JSON.parse(minhaLista) || [])                                                // esta funcao armazena e converte os dados da minha lista em um array
    }, [])

    function excluirFilme(id) {                                                                // esta função é responsável por deletar um filme
        let filtroFilmes = filmes.filter( (item) => {                                          // esta função é responsável por filtrar os filmes
            return (item.id !== id)                                                            // Retorna um novo array apenas com os filmes que não foram deletados
        })

        setFilmes(filtroFilmes);                                                               // esta função armazena os filmes nao deletados na variável filmes
        localStorage.setItem('@primeflix', JSON.stringify(filtroFilmes));                      // Salva os filmes nao deletados  no localStorage
        toast.success("Filme removido com sucesso!!")                      
    }

    return (
        <div className="meus-filmes">  
            <h1>Meus filmes</h1>  
            {filmes.length === 0 && <span>Você não possui nenhum filme salvo :( </span>}
            <ul>
                {filmes.map((item) => {  
                    return (
                        <li key={item.id}>
                            <span>{item.title}</span>
                            <div>
                                <Link to={`/filme/${item.id}`}>Ver detalhes</Link>
                                <button onClick={() => excluirFilme(item.id)}>Excluir</button>
                            </div>
                        </li>
                    )

                })}
            </ul>
        </div>
    )


}





export default Favoritos;
