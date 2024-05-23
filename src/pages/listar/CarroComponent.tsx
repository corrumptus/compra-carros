import Carro from "../../model/Carro";

export default function CarroComponent({ carro }: { carro: Carro }) {
  return (
    <tr>
      <td>{carro.modelo}</td>
      <td>{carro.fabricante}</td>
      <td>{carro.ano}</td>
      <td>{carro.potencia}</td>
      <td>{carro.preco}</td>
      <td>
        <button>Ver</button>
        <button>Editar</button>
        <button>Excluir</button>
      </td>
    </tr>
  )
}