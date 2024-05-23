import { useNavigate } from "react-router-dom";
import Carro from "../../model/Carro";
import CarrosAPILS from "../../api/CarrosAPILS";
import "./cadastrar-carro.css";
import { ChangeEvent, useState } from "react";

export default function CadastrarCarro() {
  const navigator = useNavigate();

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

    setNewCarro(prev => ({...prev, [changedField]: newValue}));
  }

  function handleCadastrar() {
    carrosAPI.create(newCarro);
  }

  return (
    <main>
      <form>
        <div>
          <label htmlFor="modelo">Modelo</label>
          <input type="text" id="modelo" onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="fabricante">Fabricante</label>
          <input type="text" id="fabricante" onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="n-serie">Número de Série</label>
          <input type="number" id="n-serie" onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="ano">Ano</label>
          <input type="number" id="ano" onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="potencia">Potência</label>
          <input type="number" id="potencia" onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="preco">Preço</label>
          <input type="number" id="preco" onChange={handleChange} />
        </div>
        <div>
          <button onClick={() => navigator("/")}>Voltar</button>
          <button type="reset">Limpar</button>
          <button onClick={handleCadastrar}>Cadastrar</button>
        </div>
      </form>
    </main>
  )
}