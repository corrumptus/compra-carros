import "./comprar-carros.css";

export default function ComprarCarros() {
  return (
    <main>
      <div>
        <h1>Lista de Carro</h1>
        <div>
          <table>
            <thead>
              <tr>
                <td>Modelo</td>
                <td>Fabricante</td>
                <td>Ano</td>
                <td>Potência</td>
                <td>Preço</td>
                <td>Estoque</td>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </div>
    </main>
  )
}