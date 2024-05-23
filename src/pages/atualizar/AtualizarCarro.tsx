import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Carro from "../../model/Carro";
import CarrosAPILS from "../../api/CarrosAPILS";
import "./atualizar-carro.css";

export default function AtualizarCarro() {
  const navigator = useNavigate();

  const { id } = useParams();

  const carrosAPI: API<number, "id", Carro> = new CarrosAPILS();

  if (id === undefined || carrosAPI.get(Number(id)) === undefined) {
    navigator("/");
    return null;
  }

  const [ updateCarro, setUpdateCarro ] = useState<Carro>({
    id: -1,
    modelo: "",
    fabricante: "",
    numeroSerie: -1,
    ano: -1,
    potencia: -1,
    preco: -1
  });

  useEffect(() => {
    setUpdateCarro(carrosAPI.get(Number(id)) as Carro);
  });

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const changedField = e.target.id;
    const newValue = e.target.value;

    setUpdateCarro(prev => ({ ...prev, [changedField]: newValue }));
  }

  function clearInputs(e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) {
    e.preventDefault();

    setUpdateCarro(carrosAPI.get(Number(id)) as Carro);

    const formTag = e.currentTarget.parentElement?.parentElement;

    formTag?.querySelectorAll("input")
      .forEach(input => input.value = String(updateCarro[input.id as keyof Carro]));
  }

  function handleAtualizar() {
    carrosAPI.update(updateCarro);
  }

  return (
    <main id="atualizar">
      <form>
        <h1>Cadastrar Carro</h1>
        <div>
          <label htmlFor="modelo">Modelo</label>
          <input type="text" id="modelo" onChange={handleChange} placeholder=" " />
        </div>
        <div>
          <label htmlFor="fabricante">Fabricante</label>
          <input type="text" id="fabricante" onChange={handleChange} placeholder=" " />
        </div>
        <div>
          <label htmlFor="numeroSerie">Número de Série</label>
          <input type="number" id="numeroSerie" onChange={handleChange} placeholder=" " />
        </div>
        <div>
          <label htmlFor="ano">Ano</label>
          <input type="number" id="ano" onChange={handleChange} placeholder=" " />
        </div>
        <div>
          <label htmlFor="potencia">Potência</label>
          <input type="number" id="potencia" onChange={handleChange} placeholder=" " />
        </div>
        <div>
          <label htmlFor="preco">Preço</label>
          <input type="number" id="preco" onChange={handleChange} placeholder=" " />
        </div>
        <div>
          <button onClick={() => navigator("/")}>Voltar</button>
          <button onClick={clearInputs}>Limpar</button>
          <button onClick={handleAtualizar}>Atualizar</button>
        </div>
      </form>
    </main>
  )
}