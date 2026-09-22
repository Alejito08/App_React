import { useState } from "react";
import { useCharacter } from "../../hooks/useCharacter";
import CharacterCard from "../../components/Catalogo/CharacterCard";
import Paginador from "../../components/Catalogo/Paginador";

function Productos() {
  const [pagina, setPagina] = useState(1);
  const { personajes, cargando, error, totalPaginas } = useCharacter(pagina);

  return (
    <section className="min-h-screen px-6 py-10">
      {/* Cuadro principal del catálogo */}
      <div className="max-w-6xl mx-auto bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 p-8 rounded-2xl shadow-2xl transition-colors duration-300">

        {/* Cabecera interna del cuadro con el título */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold" style={{ color: '#4caf50' }}>
            Catálogo
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Personajes de Dragon Ball disponibles en la tienda
          </p>
        </div>

        {cargando && <p className="mt-10 text-center text-slate-400">Cargando personajes...</p>}
        {error && <p className="mt-10 text-center text-rose-500">{error}</p>}

        {!cargando && !error && (
          <>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {personajes.map((personaje) => (
                <CharacterCard key={personaje.id} personaje={personaje} />
              ))}
            </div>

            <Paginador
              paginaActual={pagina}
              totalPaginas={totalPaginas}
              onCambiarPagina={setPagina}
            />
          </>
        )}
      </div>
    </section>
  );
}

export default Productos;