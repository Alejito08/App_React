import { createContext, useContext, useState, useEffect, useCallback } from "react";

const CartContext = createContext();
const CLAVE_CARRITO = "carrito";
const IVA_PORCENTAJE = 0.19;

function leerCarritoDesdeStorage() {
  try {
    const data = localStorage.getItem(CLAVE_CARRITO);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [carrito, setCarrito] = useState(leerCarritoDesdeStorage);

  // Cada vez que "carrito" cambia, lo guardamos en localStorage
  useEffect(() => {
    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
  }, [carrito]);

  const agregarAlCarrito = useCallback((personaje) => {
    setCarrito((prev) => {
      const yaExiste = prev.find((item) => item.id === personaje.id);
      if (yaExiste) {
        return prev.map((item) =>
          item.id === personaje.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          id: personaje.id,
          name: personaje.name,
          image: personaje.image,
          afiliacion: personaje.affiliation,
          precio: personaje.precio,
          cantidad: 1,
        },
      ];
    });
  }, []);

  const quitarDelCarrito = useCallback((id) => {
    setCarrito((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const actualizarCantidad = useCallback((id, cantidad) => {
    setCarrito((prev) => {
      if (cantidad < 1) return prev.filter((item) => item.id !== id);
      return prev.map((item) =>
        item.id === id ? { ...item, cantidad } : item
      );
    });
  }, []);

  const vaciarCarrito = useCallback(() => {
    setCarrito([]);
  }, []);

  // Simula el envío del pedido y vacía el carrito (y su copia en localStorage)
  const enviarPedido = useCallback(() => {
    if (carrito.length === 0) {
      return { ok: false, mensaje: "Tu carrito está vacío." };
    }
    vaciarCarrito();
    return { ok: true, mensaje: "¡Pedido enviado con éxito!" };
  }, [carrito, vaciarCarrito]);

  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  const iva = total * IVA_PORCENTAJE;
  const totalConIva = total + iva;

  return (
    <CartContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        quitarDelCarrito,
        actualizarCantidad,
        vaciarCarrito,
        enviarPedido,
        totalItems,
        total,
        iva,
        totalConIva,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}