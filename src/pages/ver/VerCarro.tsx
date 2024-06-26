import { useNavigate, useParams } from "react-router-dom";
import Carro from "../../model/Carro";
import CarrosAPILS from "../../api/CarrosAPILS";
import "./ver-carro.css";

export default function VerCarro() {
  const navigator = useNavigate();

  const { id } = useParams();

  const carrosAPI: API<number, "id", Carro> = new CarrosAPILS();

  const carro = carrosAPI.get(Number(id));

  if (id === undefined || carro === undefined) {
    navigator("/");
    return null;
  }

  function handleDelete() {
    carrosAPI.delete((carro as Carro).id);
    navigator("/");
  }

  return (
    <main id="ver">
      <div className="container">
        <h1>{carro.modelo}</h1>
        <div>
          <p>Fabricante</p>
          <span>{carro.fabricante}</span>
        </div>
        <div>
          <p>Ano</p>
          <span>{carro.ano}</span>
        </div>
        <div>
          <p>Potência</p>
          <span>{carro.potencia}</span>
        </div>
        <div>
          <p>Preço</p>
          <span>{carro.preco}</span>
        </div>
        <div>
          <p>Número de série</p>
          <span>{carro.numeroSerie}</span>
        </div>
        <div>
          <button onClick={() => navigator(-1)}>Voltar</button>
          <button onClick={() => navigator(`/carro/${carro.id}/edit`)}>Editar</button>
          <button onClick={handleDelete}>Excluir</button>
        </div>
      </div>
    </main>
  )
}