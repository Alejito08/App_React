import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./Context/ThemeContext";
import { CartProvider } from "./Context/CartContext";
import { AuthProvider } from "./Context/AuthContext";
import Layout from "./components/Layout/Layout";
import Inicio from "./pages/Inicio.jpx/Inicio";
import Escenario from "./pages/Escenario/Escenario";
import Contacto from "./pages/Contacto/Contacto";
import Productos from "./pages/Catalogo/Productos";
import Carrito from "./pages/Carrito/Carrito";
import Login from "./components/auth/login";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <Toaster position="top-center" />
            <Layout>
              <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="/escenario" element={<Escenario />} />
                <Route path="/catalogo" element={<Productos />} />
                <Route path="/carrito" element={<Carrito />} />
                <Route path="/contacto" element={<Contacto />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;