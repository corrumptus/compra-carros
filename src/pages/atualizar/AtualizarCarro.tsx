import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Carro from "../../model/Carro";
import CarrosAPILS from "../../api/CarrosAPILS";
import useToasters, { ToasterType } from "../../toaster/Toaster";
import "./atualizar-carro.css";

export default function AtualizarCarro() {
  const navigator = useNavigate();

  const [ Toasters, addToaster ] = useToasters();

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
  }, []);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const changedField = e.target.id;
    const newValue = e.target.value;

    const isStringMap = {
      "modelo": true,
      "fabricante": true,
      "ano": false,
      "potencia": false,
      "preco": false,
      "numeroSerie": false
    }

    setUpdateCarro(prev => ({
      ...prev,
      [changedField]: isStringMap[changedField as keyof typeof isStringMap]
        ? newValue
        : Number(newValue)
    }));
  }

  function handleDelete(e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) {
    e.preventDefault();

    carrosAPI.delete(updateCarro.id);
    navigator("/");
  }

  function handleAtualizar(e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) {
    e.preventDefault();

    try {
      carrosAPI.update(updateCarro);
      addToaster("Carro updated successfully", ToasterType.SUCCESS);
    } catch (error) {
      addToaster((error as Error).message, ToasterType.ERROR);
    }
  }

  function handleBack(e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) {
    e.preventDefault();

    navigator(-1);
  }

  return (
    <main id="atualizar">
      {Toasters}
      <form>
        <h1>Cadastrar Carro</h1>
        <div>
          <label htmlFor="modelo">Modelo</label>
          <input type="text" id="modelo" value={updateCarro.modelo} onChange={handleChange} placeholder=" " />
        </div>
        <div>
          <label htmlFor="fabricante">Fabricante</label>
          <input type="text" id="fabricante" value={updateCarro.fabricante} onChange={handleChange} placeholder=" " />
        </div>
        <div>
          <label htmlFor="numeroSerie">Número de Série</label>
          <input type="number" id="numeroSerie" value={updateCarro.numeroSerie} onChange={handleChange} placeholder=" " />
        </div>
        <div>
          <label htmlFor="ano">Ano</label>
          <input type="number" id="ano" value={updateCarro.ano} onChange={handleChange} placeholder=" " />
        </div>
        <div>
          <label htmlFor="potencia">Potência</label>
          <input type="number" id="potencia" value={updateCarro.potencia} onChange={handleChange} placeholder=" " />
        </div>
        <div>
          <label htmlFor="preco">Preço</label>
          <input type="number" id="preco" value={updateCarro.preco} onChange={handleChange} placeholder=" " />
        </div>
        <div>
          <button onClick={handleBack}>Voltar</button>
          <button onClick={handleAtualizar}>Atualizar</button>
          <button onClick={handleDelete}>Excluir</button>
        </div>
      </form>
    </main>
  )
}