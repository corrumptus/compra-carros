import { useNavigate } from "react-router-dom";
import Carro from "../../model/Carro";

export default function CarroComponent({
  carro,
  handleExcluir
}: {
  carro: Carro,
  handleExcluir: (id: number) => void
}) {
  const navigator = useNavigate();

  return (
    <tr>
      <td>{carro.modelo}</td>
      <td>{carro.fabricante}</td>
      <td>{carro.ano}</td>
      <td>{carro.potencia}</td>
      <td>{carro.preco}</td>
      <td>
        <button onClick={() => navigator(`/carro/${carro.id}`)}>Ver</button>
        <button onClick={() => navigator(`/carro/${carro.id}/edit`)}>Editar</button>
        <button onClick={() => handleExcluir(carro.id)}>Excluir</button>
      </td>
    </tr>
  )
}