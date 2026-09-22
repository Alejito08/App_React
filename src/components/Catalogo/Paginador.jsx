function Paginador({ paginaActual, totalPaginas, onCambiarPagina }) {
  const irAnterior = () => {
    if (paginaActual > 1) onCambiarPagina(paginaActual - 1);
  };

  const irSiguiente = () => {
    if (paginaActual < totalPaginas) onCambiarPagina(paginaActual + 1);
  };

  return (
    <div className="mt-10 flex items-center justify-center gap-4">
      <button
        type="button"
        onClick={irAnterior}
        disabled={paginaActual === 1}
        className="px-4 py-2 rounded-lg border border-[#4caf50] text-[#4caf50] font-semibold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#4caf50]/15 transition-colors cursor-pointer"
      >
        ⬅ Anterior
      </button>

      <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">
        Página {paginaActual} de {totalPaginas}
      </span>

      <button
        type="button"
        onClick={irSiguiente}
        disabled={paginaActual === totalPaginas}
        className="px-4 py-2 rounded-lg border border-[#4caf50] text-[#4caf50] font-semibold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#4caf50]/15 transition-colors cursor-pointer"
      >
        Siguiente ➡
      </button>
    </div>
  );
}

export default Paginador;