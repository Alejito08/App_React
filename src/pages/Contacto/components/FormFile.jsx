import { useDropzone } from "react-dropzone";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

function FormFile({
  label,
  name,
  required = false,
  value = [],
  accept = { "application/pdf": [".pdf"] },
  maxSizeMB = 2,
  maxFiles = 3,
  onFilesChange = () => {},
}) {
  const MAX_SIZE_MB = maxSizeMB;
  const [archivos, setArchivos] = useState([]);
  const [mensajeEliminado, setMensajeEliminado] = useState("");

  const generarId = (file) => `${file.name}-${file.lastModified}-${file.size}`;
  const espacioDisponible = maxFiles - archivos.length;
  const limiteAlcanzado = espacioDisponible <= 0;

  useEffect(() => {
    if (Array.isArray(value) && value.length === 0 && archivos.length > 0) {
      archivos.forEach((arch) => {
        if (arch.preview) URL.revokeObjectURL(arch.preview);
      });
      setArchivos([]);
    }
  }, [value]);

  const onDrop = (acceptedFiles, rejectedFiles) => {
    if (espacioDisponible <= 0) {
      toast.error(`Ya alcanzaste el máximo de ${maxFiles} archivos`, { id: "dropzone-limit" });
    } else if (acceptedFiles.length > 0) {
      const nuevosArchivos = acceptedFiles
        .slice(0, espacioDisponible)
        .map((file) => ({
          id: generarId(file),
          file,
          preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : null,
        }));

      setArchivos((anteriores) => [...anteriores, ...nuevosArchivos]);
    }

    if (rejectedFiles.length > 0) {
      const primerError = rejectedFiles[0].errors[0];
      let msg = "Error al adjuntar archivo";

      if (primerError.code === "file-too-large") {
        msg = `El archivo supera el tamaño máximo de ${maxSizeMB}MB`;
      } else if (primerError.code === "file-invalid-type") {
        msg = "Tipo de archivo no permitido";
      } else if (primerError.code === "too-many-files") {
        msg = `Ya alcanzaste el máximo de ${maxFiles} archivos`;
      }

      toast.error(msg, { id: "dropzone-error" });
    }
  };

  const eliminarArchivo = (id) => {
    setArchivos((anteriores) => {
      const archivoAEliminar = anteriores.find((arch) => arch.id === id);
      if (archivoAEliminar?.preview) {
        URL.revokeObjectURL(archivoAEliminar.preview);
      }
      return anteriores.filter((arch) => arch.id !== id);
    });
    setMensajeEliminado("Archivo eliminado");
  };

  useEffect(() => {
    if (mensajeEliminado) {
      const timer = setTimeout(() => setMensajeEliminado(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [mensajeEliminado]);

  useEffect(() => {
    return () => {
      archivos.forEach((arch) => {
        if (arch.preview) URL.revokeObjectURL(arch.preview);
      });
    };
  }, []);

  useEffect(() => {
    onFilesChange(archivos.map((a) => a.file));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [archivos]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    maxFiles,
    maxSize: MAX_SIZE_MB * 1024 * 1024,
    accept,
    disabled: limiteAlcanzado,
  });

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="font-semibold text-slate-700 dark:text-slate-200">
        {label} {required && "*"} ({archivos.length}/{maxFiles})
      </label>

      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-8 text-center transition bg-white dark:bg-slate-800/40 ${
          limiteAlcanzado
            ? "border-slate-200 dark:border-slate-700 cursor-not-allowed opacity-60"
            : "cursor-pointer hover:border-emerald-500 border-slate-300 dark:border-slate-600"
        }`}
      >
        <input
          {...getInputProps({
            id: name,
            name: name,
            required: required && archivos.length === 0,
          })}
        />
        <div className="text-4xl mb-3">📎</div>
        {limiteAlcanzado ? (
          <p className="font-medium text-slate-500 dark:text-slate-400">
            Ya alcanzaste el máximo de {maxFiles} archivos
          </p>
        ) : isDragActive ? (
          <p className="font-medium text-emerald-600 dark:text-emerald-400">Suelta el archivo aquí...</p>
        ) : (
          <>
            <p className="font-medium text-slate-700 dark:text-slate-200">Arrastra tus archivos aquí</p>
            <p className="text-sm text-slate-400 mt-1">
              o haz clic para seleccionarlos (máx. {maxFiles})
            </p>
          </>
        )}
      </div>

      {mensajeEliminado && (
        <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">✅ {mensajeEliminado}</p>
      )}

      {archivos.length > 0 && (
        <div className="mt-3 flex flex-col gap-3">
          {archivos.map(({ id, file, preview }) => (
            <div
              key={id}
              className="rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 flex items-center justify-between gap-4 shadow-sm"
            >
              <div className="text-left">
                <p className="font-semibold text-slate-800 dark:text-slate-100 mb-1">{file.name}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  <strong>Tipo:</strong> {file.type || "desconocido"}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  <strong>Tamaño:</strong> {(file.size / 1024).toFixed(2)} KB
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                {preview && (
                  <img
                    src={preview}
                    alt={`Vista previa de ${file.name}`}
                    className="w-20 h-20 object-cover rounded-lg border border-slate-200 dark:border-slate-700"
                  />
                )}
                <button
                  type="button"
                  onClick={() => eliminarArchivo(id)}
                  className="text-red-500 hover:text-red-700 text-xl cursor-pointer"
                  title="Eliminar archivo"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FormFile;