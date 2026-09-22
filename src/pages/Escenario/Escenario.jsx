import { useState } from "react";
import Tortuga from "../../components/Tortuga.jsx";
import BotonDerecha from "../../components/BotonDerecha.jsx";
import BotonIzquierda from "../../components/BotonIzquierda.jsx";
import BotonReiniciar from "../../components/BotonReiniciar.jsx";
import "./Escenario.css";

function Escenario() {
  const [posicion, setPosicion] = useState(0);

  function moverDerecha() {
    if (posicion + 15 >= 300) {
      setPosicion(0);
    } else {
      setPosicion(posicion + 15);
    }
  }

  function moverIzquierda() {
    if (posicion - 15 <= -300) {
      setPosicion(0);
    } else {
      setPosicion(posicion - 15);
    }
  }

  function reiniciar() {
    setPosicion(0);
  }

  return (
    <div className="escenario-container">
      <h2 className="titulo-carrera"> ¡AYUDA AL ZOMBIE A COMER! 🍖</h2>

      <div className="pista-escape">
        <div className="zona-segura-izquierda">🏚️ COMIDA</div>
        <Tortuga posicion={posicion} />
      </div>

      <div className="hud-stats">
        <div className="caja-posicion">
          <p className="posicion-texto">
            📍 COORDENADA: <span>{posicion} px</span>
          </p>
        </div>
      </div>

      <div className="panel-controles">
        <BotonIzquierda mover={moverIzquierda} />
        <BotonReiniciar reiniciar={reiniciar} />
        <BotonDerecha mover={moverDerecha} />
      </div>
    </div>
  );
}

export default Escenario;