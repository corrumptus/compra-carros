import { useNavigate } from "react-router-dom";
import "./actionBar.css";

export default function ActionBar() {
  const navigator = useNavigate();

  return (
    <header>
      <button onClick={() => navigator("/")}>Carros</button>
      <button onClick={() => navigator("/carro")}>Cadastrar</button>
    </header>
  )
}