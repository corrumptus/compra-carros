import { useNavigate } from "react-router-dom";
import "./action-bar.css";

export default function ActionBar() {
  const navigator = useNavigate();

  return (
    <header id="action-bar">
      <button onClick={() => navigator("/")}>Carros</button>
      <button onClick={() => navigator("/carro")}>Cadastrar</button>
    </header>
  )
}