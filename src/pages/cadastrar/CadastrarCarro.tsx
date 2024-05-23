import { ChangeEvent, MouseEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import Carro from "../../model/Carro";
import CarrosAPILS from "../../api/CarrosAPILS";
import "./cadastrar-carro.css";
import useToasters from "../../toaster/Toaster";

export default function CadastrarCarro() {
  const navigator = useNavigate();

  const [ Toasters, addToaster ] = useToasters();

  const [ newCarro, setNewCarro ] = useState<Omit<Carro, "id">>({
    modelo: "",
    fabricante: "",
    numeroSerie: -1,
    ano: -1,
    potencia: -1,
    preco: -1
  });

  const carrosAPI: API<number, "id", Carro> = new CarrosAPILS();

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

    setNewCarro(prev => ({
      ...prev,
      [changedField]: isStringMap[changedField as keyof typeof isStringMap]
        ? newValue
        : Number(newValue)
    }));
  }

  function clearInputs(e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) {
    e.preventDefault();

    setNewCarro({
      modelo: "",
      fabricante: "",
      numeroSerie: -1,
      ano: -1,
      potencia: -1,
      preco: -1
    });

    const formTag = e.currentTarget.parentElement?.parentElement;

    formTag?.querySelectorAll("input").forEach(input => input.value = "");
  }

  function handleCadastrar(e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) {
    try {
      carrosAPI.create(newCarro);
    } catch (error) {
      e.preventDefault();
      addToaster((error as Error).message);
    }
  }

  function handleBack(e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) {
    e.preventDefault();
    navigator(-1);
  }

  return (
    <main id="cadastrar">
      {Toasters}
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
          <button onClick={handleBack}>Voltar</button>
          <button onClick={clearInputs}>Limpar</button>
          <button onClick={handleCadastrar}>Cadastrar</button>
        </div>
      </form>
    </main>
  )
}