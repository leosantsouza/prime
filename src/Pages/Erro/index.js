import { Link } from "react-router-dom";
import './erro.css';

function Erro() {
    return(
        <div class="page">
           
            <div class="content">
                <h1>404</h1>
                <h2>Page not found</h2>
                <p>I tried to catch some fog, but i mist</p>
                <article>
                    <Link to="/" >Veja todos os filmes!</Link>
                </article>
            </div>
            
           
        </div>
        
    )
}

export default Erro;