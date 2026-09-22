import { ShoppingCart } from "lucide-react";
import { useCart } from "../../Context/CartContext";

function formatearPrecio(valor) {
  return valor.toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  });
}

export default function CharacterCard({ personaje }) {
  const { agregarAlCarrito } = useCart();

  return (
    <article className="group bg-white dark:bg-slate-800 rounded-2xl shadow-sm ring-1 ring-slate-200 dark:ring-slate-700
     overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <div className="relative bg-slate-100 dark:bg-slate-900/60">
        <img
          src={personaje.image}
          alt={personaje.name}
          className="w-full h-56 object-contain p-3"
        />
        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-medium ring-1 bg-emerald-500/15 text-emerald-400 ring-emerald-500/30">
          {personaje.race}
        </span>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-slate-800 dark:text-slate-100 text-lg leading-tight">{personaje.name}</h3>
          <span className="text-xs text-slate-400 dark:text-slate-500 shrink-0">#{personaje.id}</span>
        </div>
        <ul className="mt-3 space-y-1 text-sm text-slate-500 dark:text-slate-400">
          <li><span className="text-slate-400 dark:text-slate-500">Género:</span> {personaje.gender}</li>
          <li><span className="text-slate-400 dark:text-slate-500">Afiliación:</span> {personaje.affiliation}</li>
          <li><span className="text-slate-400 dark:text-slate-500">Ki:</span> {personaje.ki}</li>
        </ul>
        <div className="mt-4 flex items-center justify-between">
          <span className="font-bold text-lg" style={{ color: '#4caf50' }}>
            {formatearPrecio(personaje.precio)}
          </span>
          <button
            type="button"
            onClick={() => agregarAlCarrito(personaje)}
            className="p-2 rounded-full bg-slate-900 dark:bg-slate-700 text-[#4caf50] hover:bg-[#4caf50] hover:text-slate-900
             transition-colors cursor-pointer"
            title="Agregar al carrito"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </article>
  );
}