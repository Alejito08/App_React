import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Trash2, Plus, Minus, ShoppingCart } from "lucide-react";
import { useCart } from "../../Context/CartContext";

function formatearPrecio(valor) {
  return valor.toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  });
}

function Carrito() {
  const {
    carrito,
    quitarDelCarrito,
    actualizarCantidad,
    enviarPedido,
    total,
    iva,
    totalConIva,
  } = useCart();

  const [enviando, setEnviando] = useState(false);

  const handleEnviarPedido = () => {
    if (carrito.length === 0) {
      toast.error("Tu carrito está vacío.");
      return;
    }

    const confirmar = window.confirm(
      `¿Confirmas el envío del pedido por ${formatearPrecio(totalConIva)}?`
    );
    if (!confirmar) return;

    setEnviando(true);
    try {
      const resultado = enviarPedido();
      if (resultado.ok) {
        toast.success(resultado.mensaje);
      } else {
        toast.error(resultado.mensaje);
      }
    } catch {
      toast.error("Hubo un error al enviar el pedido. Intenta de nuevo.");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <section className="min-h-screen w-full px-6 py-10">
      <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 p-8 rounded-2xl shadow-2xl transition-colors duration-300">
        <div className="flex items-center gap-3 mb-6">
          <ShoppingCart style={{ color: "#4caf50" }} />
          <h2 className="text-3xl font-bold" style={{ color: "#4caf50" }}>
            Carrito de Personajes
          </h2>
        </div>

        {carrito.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-slate-400 mb-4">
              Aún no has agregado ningún personaje al carrito.
            </p>
            <Link
              to="/catalogo"
              className="inline-block px-6 py-2 rounded-full border border-[#4caf50] text-[#4caf50] font-semibold hover:bg-[#4caf50] hover:text-slate-900 transition-colors"
            >
              Ir al catálogo
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {carrito.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-wrap items-center gap-4 p-4 rounded-xl ring-1 ring-slate-200 dark:ring-slate-700"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-lg object-contain bg-slate-100 dark:bg-slate-800/60 p-1"
                  />

                  <div className="flex-1 min-w-[150px]">
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-xs text-slate-400">
                      Afiliación: {item.afiliacion || "N/D"}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Precio unitario: {formatearPrecio(item.precio)}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => actualizarCantidad(item.id, item.cantidad - 1)}
                      className="w-8 h-8 rounded-full border border-slate-300 dark:border-slate-600 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-6 text-center font-medium">{item.cantidad}</span>
                    <button
                      type="button"
                      onClick={() => actualizarCantidad(item.id, item.cantidad + 1)}
                      className="w-8 h-8 rounded-full border border-slate-300 dark:border-slate-600 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <div className="w-32 text-right font-bold" style={{ color: "#4caf50" }}>
                    {formatearPrecio(item.precio * item.cantidad)}
                  </div>

                  <button
                    type="button"
                    onClick={() => quitarDelCarrito(item.id)}
                    title="Quitar del carrito"
                    className="w-9 h-9 rounded-full flex items-center justify-center text-rose-500 hover:bg-rose-500/10 cursor-pointer"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-8 border-t border-slate-200 dark:border-slate-700 pt-6 flex flex-col items-end gap-2">
              <p className="text-slate-600 dark:text-slate-300">
                Total: <span className="font-semibold">{formatearPrecio(total)}</span>
              </p>
              <p className="text-slate-600 dark:text-slate-300">
                IVA (19%): <span className="font-semibold">{formatearPrecio(iva)}</span>
              </p>
              <p className="text-xl font-bold" style={{ color: "#4caf50" }}>
                Total a Pagar: {formatearPrecio(totalConIva)}
              </p>

              <button
                type="button"
                onClick={handleEnviarPedido}
                disabled={enviando}
                className="mt-4 px-8 py-3 rounded-full font-bold text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-transform hover:-translate-y-0.5 cursor-pointer"
                style={{ backgroundColor: "#4caf50" }}
              >
                Enviar Pedido
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default Carrito;