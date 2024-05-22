import "./comprar-carros.css";

export default function ComprarCarros() {
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
            <tbody></tbody>
          </table>
        </div>
      </div>
    </main>
  )
}