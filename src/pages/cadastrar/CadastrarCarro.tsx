import { useNavigate } from "react-router-dom";
import "./cadastrar-carro.css";

export default function CadastrarCarro() {
  const navigator = useNavigate();

  return (
    <main>
      <form>
        <div>
          <label htmlFor="modelo">Modelo</label>
          <input type="text" id="modelo" />
        </div>
        <div>
          <label htmlFor="fabricante">Fabricante</label>
          <input type="text" id="fabricante" />
        </div>
        <div>
          <label htmlFor="n-serie">Número de Série</label>
          <input type="number" id="n-serie" />
        </div>
        <div>
          <label htmlFor="ano">Ano</label>
          <input type="number" id="ano" />
        </div>
        <div>
          <label htmlFor="potencia">Potência</label>
          <input type="number" id="potencia" />
        </div>
        <div>
          <label htmlFor="preco">Preço</label>
          <input type="number" id="preco" />
        </div>
        <div>
          <button onClick={() => navigator("/")}>Voltar</button>
          <button type="reset">Limpar</button>
          <button>Cadastrar</button>
        </div>
      </form>
    </main>
  )
}