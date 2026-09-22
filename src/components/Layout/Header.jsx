import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useTheme } from "../../Context/ThemeContext";
import { useCart } from "../../Context/CartContext";
import { useAuth } from "../../Context/AuthContext";
import { Sun, Moon, ShoppingCart, UserCircle2 } from "lucide-react";
import zombieImg from "../../assets/zombie.jpg";

function Header() {
  const navigate = useNavigate();
  const { tema, cambiarTema } = useTheme();
  const { totalItems } = useCart();
  const { usuario, logout } = useAuth();
  const [mostrarPerfil, setMostrarPerfil] = useState(false);

  const handleCerrarSesion = () => {
    const confirmar = window.confirm("¿Seguro que deseas cerrar sesión?");
    if (confirmar) {
      logout();
      setMostrarPerfil(false);
      toast.success("Sesión cerrada correctamente");
    }
  };

  return (
    <header className="relative z-20 flex items-center justify-between gap-10 max-w-4xl mx-auto mt-2.5 mb-1.5 px-8 py-3.5 rounded-xl border-b-2 border-[#4caf50] bg-black/85 backdrop-blur-sm shadow-lg shadow-black/50">
      <div className="flex items-center gap-3 flex-1">
        <Link to="/">
          <img
            src={zombieImg}
            alt="React705"
            className="w-[50px] h-[50px] rounded-full object-cover border-2 border-[#4caf50] transition-transform duration-300 hover:scale-110 hover:-rotate-6 cursor-pointer"
          />
        </Link>
        <h2
          className="text-2xl font-bold uppercase tracking-widest m-0 text-[#4caf50]"
          style={{ textShadow: "0 0 8px rgba(76,175,80,0.4)" }}
        >
          ¡Hostias, Tío! ¿Y mis tripitas?
        </h2>
      </div>

      <div className="flex items-center gap-3">
        {/* Botón del Carrito con Contador */}
        <button
          type="button"
          title="Ver carrito"
          onClick={() => navigate("/carrito")}
          className="relative w-10 h-10 rounded-full border border-[#4caf50] flex items-center justify-center text-[#4caf50] transition-all duration-300 hover:bg-[#4caf50]/15 hover:-translate-y-0.5 cursor-pointer"
        >
          <ShoppingCart size={20} />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-emerald-500 text-slate-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow">
              {totalItems}
            </span>
          )}
        </button>

        {/* Botón de Cambio de Tema */}
        <button
          type="button"
          onClick={cambiarTema}
          aria-label="Cambiar tema"
          title={tema === "claro" ? "Cambiar a modo oscuro" : "Cambiar a modo claro"}
          className="w-10 h-10 rounded-full border border-[#4caf50] flex items-center justify-center text-[#4caf50] transition-all duration-300 hover:bg-[#4caf50]/15 hover:-translate-y-0.5 cursor-pointer"
        >
          {tema === "claro" ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        {/* Login o ícono de usuario con perfil, según el estado de sesión */}
        {!usuario ? (
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="bg-[#222] px-6 py-2 rounded-full border border-[#4caf50] transition-all duration-300 hover:bg-[#4caf50] hover:-translate-y-0.5 cursor-pointer group"
          >
            <span className="text-sm font-semibold text-white group-hover:text-[#121212] transition-colors">
              Login
            </span>
          </button>
        ) : (
          <div className="relative">
            <button
              type="button"
              onClick={() => setMostrarPerfil((v) => !v)}
              title="Mi perfil"
              className="w-10 h-10 rounded-full border border-[#4caf50] flex items-center justify-center text-[#4caf50] transition-all duration-300 hover:bg-[#4caf50]/15 cursor-pointer"
            >
              <UserCircle2 size={22} />
            </button>

            {mostrarPerfil && (
              <div className="absolute right-0 top-12 w-64 bg-[#121212] border border-[#4caf50] rounded-xl p-4 shadow-xl shadow-black/60 z-50">
                <p className="text-xs uppercase tracking-wide text-slate-400 mb-1">
                  Sesión iniciada como
                </p>
                <p className="text-[#81c784] font-semibold break-all mb-4">{usuario.email}</p>
                <button
                  type="button"
                  onClick={handleCerrarSesion}
                  className="w-full bg-[#4caf50] text-[#121212] font-bold py-2 rounded-lg hover:bg-[#66bb6a] transition-colors cursor-pointer"
                >
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;