import { useState, useEffect } from "react";

const RANGO_PRECIO = { min: 7000, max: 50000 };
const LIMITE_POR_PAGINA = 12;

function precioAleatorio() {
  return Math.floor(Math.random() * (RANGO_PRECIO.max - RANGO_PRECIO.min + 1)) + RANGO_PRECIO.min;
}

export function useCharacter(pagina = 1) {
  const [personajes, setPersonajes] = useState([]);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let activo = true;

    async function cargarPersonajes() {
      try {
        setCargando(true);
        setError(null);

        const res = await fetch(
          `https://dragonball-api.com/api/characters?page=${pagina}&limit=${LIMITE_POR_PAGINA}`
        );

        if (!res.ok) throw new Error("No se pudo cargar el catálogo");

        const data = await res.json();

        const listaConPrecio = data.items.map((personaje) => ({
          ...personaje,
          precio: precioAleatorio(),
        }));

        if (activo) {
          setPersonajes(listaConPrecio);
          setTotalPaginas(data.meta.totalPages);
        }
      } catch (err) {
        if (activo) setError(err.message);
      } finally {
        if (activo) setCargando(false);
      }
    }

    cargarPersonajes();

    return () => {
      activo = false; // Función de limpieza
    };
  }, [pagina]);

  return { personajes, cargando, error, totalPaginas };
}