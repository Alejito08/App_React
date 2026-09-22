import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import FormInput from "./components/FormInput";
import FormSelect from "./components/FormSelect";
import FormTextArea from "./components/FormTextArea";
import FormFile from "./components/FormFile";
import paises from "./paises";
import ciudades from "./ciudades";
import toast from "react-hot-toast";

function ContactoForm() {
  const [enviando, setEnviando] = useState(false);

  const { register, control, handleSubmit, reset } = useForm({
    defaultValues: {
      primerNombre: "",
      segundoNombre: "",
      primerApellido: "",
      segundoApellido: "",
      genero: "",
      pais: "",
      ciudad: "",
      correo: "",
      telefono: "",
      mensaje: "",
      archivo: [],
    },
  });

  const onSubmit = async (data) => {
    setEnviando(true);

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === "archivo") {
        value.forEach((file) => formData.append("archivo", file));
      } else {
        formData.append(key, value);
      }
    });

    try {
      const response = await fetch(import.meta.env.VITE_FORMSPREE_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" }, 
      });

      if (response.ok) {
        console.log("Datos del formulario:", data);
        toast.success("¡Formulario enviado con éxito!", { id: "form-success" });
        reset();
      } else {
        const resultado = await response.json();
        const mensajeError = resultado.errors
          ? resultado.errors.map((e) => e.message).join(", ")
          : "Ocurrió un error al enviar el formulario";
        toast.error(mensajeError, { id: "form-error" });
      }
    } catch (error) {
      console.error("Error de red al enviar el formulario:", error);
      toast.error("Revisa tu conexión a internet e intenta de nuevo.", { id: "form-error" });
    } finally {
      setEnviando(false);
    }
  };

  const onError = (errores) => {
    console.log("Errores de validación:", errores);
    const primerError = Object.values(errores)[0];
    toast.error(primerError?.message || "Revisa los campos del formulario", {
      id: "form-error",
    });
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit, onError)}
      className="bg-slate-50 dark:bg-slate-800/50 p-8 rounded-xl border border-slate-200 dark:border-slate-700 transition-colors"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          label="Primer Nombre"
          placeholder="Escribe tu primer nombre"
          required
          {...register("primerNombre", { required: "El primer nombre es obligatorio" })}
        />
        <FormInput
          label="Segundo Nombre"
          placeholder="Escribe tu segundo nombre"
          {...register("segundoNombre")}
        />
        <FormInput
          label="Primer Apellido"
          placeholder="Escribe tu primer apellido"
          required
          {...register("primerApellido", { required: "El primer apellido es obligatorio" })}
        />
        <FormInput
          label="Segundo Apellido"
          placeholder="Escribe tu segundo apellido"
          {...register("segundoApellido")}
        />
        <FormSelect
          label="Género"
          required
          options={["Femenino", "Masculino", "Otro"]}
          {...register("genero", { required: "El género es obligatorio" })}
        />
        <FormSelect
          label="País"
          required
          options={paises}
          {...register("pais", { required: "El país es obligatorio" })}
        />
        <FormSelect
          label="Ciudad"
          required
          options={ciudades}
          {...register("ciudad", { required: "La ciudad es obligatoria" })}
        />
        <FormInput
          label="Correo"
          type="email"
          required
          placeholder="ejemplo@correo.com"
          {...register("correo", {
            required: "El correo es obligatorio",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "El correo no tiene un formato válido",
            },
          })}
        />
        <FormInput
          label="Teléfono"
          type="tel"
          required
          placeholder="3000000000"
          {...register("telefono", {
            required: "El teléfono es obligatorio",
            pattern: {
              value: /^[0-9\s-]{10,15}$/,
              message: "El teléfono debe tener al menos 10 dígitos numéricos",
            },
          })}
        />
      </div>

      <div className="mt-6">
        <FormTextArea
          label="Mensaje"
          required
          placeholder="Escribe tu mensaje..."
          {...register("mensaje", { required: "El mensaje es obligatorio" })}
        />
      </div>

      <div className="mt-6">
        <Controller
          name="archivo"
          control={control}
          render={({ field }) => (
            <FormFile
              label="Adjuntar archivo..."
              name="archivo"
              value={field.value}
              maxFiles={3}
              maxSizeMB={2}
              accept={{
                "application/pdf": [".pdf"],
                "image/png": [".png"],
                "image/jpeg": [".jpg", ".jpeg"],
                "video/*": [],
              }}
              onFilesChange={field.onChange}
            />
          )}
        />
      </div>

      <div className="mt-8 flex justify-center">
        <button
          type="submit"
          disabled={enviando}
          className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white font-semibold px-8 py-3 rounded-lg transition disabled:opacity-60 disabled:cursor-not-allowed shadow-md cursor-pointer"
        >
          {enviando ? "Enviando..." : "Enviar mensaje"}
        </button>
      </div>
    </form>
  );
}

export default ContactoForm;