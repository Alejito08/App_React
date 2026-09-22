// src/components/Layout/Navbar.jsx
import { Link } from "react-router-dom";

const linkClasses =
  "font-semibold text-sm uppercase tracking-wide text-emerald-400 px-3 py-1.5 rounded-md transition-all duration-300 hover:text-white hover:bg-emerald-500/20";

function Navbar() {
  return (
    <nav className="flex justify-center items-center gap-24 max-w-4xl mx-auto mb-5 px-8 py-3.5 rounded-xl border border-emerald-500/20 bg-black/85 backdrop-blur-sm shadow-lg shadow-black/50">
      <ul className="flex items-center gap-24 list-none m-0 p-0">
        <li>
          <Link to="/escenario" className={linkClasses}>
            Diviértete
          </Link>
        </li>
        <li>
          <Link to="/catalogo" className={linkClasses}>
            Catálogo
          </Link>
        </li>
        <li>
          <Link to="/contacto" className={linkClasses}>
            Contáctame
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;