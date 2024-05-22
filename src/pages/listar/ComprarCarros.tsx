import CarrosAPILS from "../../api/CarrosAPILS";
import Carro from "../../model/Carro";
import CarroComponent from "./CarroComponent";
import "./comprar-carros.css";

export default function ComprarCarros() {
  const carrosAPI: API<number, "id", Carro> = new CarrosAPILS();

  const carros = carrosAPI.getAll();

  return (
    <main>
      <div className="lista-container">
        <h1>Lista de Carro</h1>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Modelo</th>
                <th>Fabricante</th>
                <th>Ano</th>
                <th>Potência</th>
                <th>Preço</th>
                <th>Estoque</th>
              </tr>
            </thead>
            <tbody>{carros
              .map(carro => ({ ...carro, estoque: carros.filter(c => c.modelo === carro.modelo).length }))
              .map(carro => <CarroComponent key={carro.id} carro={carro} />)
            }</tbody>
          </table>
        </div>
      </div>
    </main>
  )
}