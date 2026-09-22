import ContactoForm from "./ContactoForm";

function Contacto() {
  return (
    <section className="min-h-screen py-12 px-4">
      {/* Cuadro central */}
      <div className="max-w-6xl mx-auto bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 p-8 rounded-2xl shadow-2xl transition-colors duration-300">
        
        {/* Encabezado con título */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-2" style={{ color: '#4caf50' }}>
            Contáctame
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl">
            ¿Tienes alguna pregunta, sugerencia o deseas comunicarte conmigo?
            Completa el siguiente formulario y recibiré tu mensaje directamente
            en mi correo electrónico.
          </p>
        </div>

        {/* Formulario */}
        <ContactoForm />
      </div>
    </section>
  );
}

export default Contacto;