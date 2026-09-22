import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../Context/AuthContext";
import zombieImg from "../../assets/zombie.jpg";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email });
    toast.success(`¡Grrr! Gracias por el bocado... digo, por ingresar, ${email}. ¡Ceeeeerebros! 🧠🧟‍♂️`);
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] p-5">
      <div className="bg-[#121212]/95 border-2 border-[#4caf50] rounded-2xl p-9 w-full max-w-[520px] text-center shadow-[0_0_30px_rgba(76,175,80,0.35)] backdrop-blur-md">

        <div className="mb-6">
          <img
            src={zombieImg}
            alt="Zombie Avatar"
            className="w-[70px] h-[70px] rounded-full border-[3px] border-[#4caf50] object-cover mx-auto mb-4 shadow-[0_0_12px_rgba(76,175,80,0.5)]"
          />
          <h2 className="text-[#4caf50] text-3xl tracking-wide mb-2 font-bold">¡Grrr... Ceeeeerebros! 🧠</h2>
          <p className="text-slate-300 leading-relaxed">
            Soy el zombie al mando. Identifícate antes de que me dé más hambre...
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col text-left">
            <label htmlFor="email" className="text-[#81c784] text-sm mb-1.5 font-semibold uppercase tracking-wide">
              Correo de la Víctima
            </label>
            <input
              type="email"
              id="email"
              placeholder="tu-correo@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-[#1e1e1e] border border-[#333] rounded-lg px-4 py-3.5 text-white text-base outline-none transition-all duration-300 focus:border-[#4caf50] focus:shadow-[0_0_10px_rgba(76,175,80,0.4)]"
            />
          </div>

          <div className="flex flex-col text-left">
            <label htmlFor="password" className="text-[#81c784] text-sm mb-1.5 font-semibold uppercase tracking-wide">
              Clave Secreta
            </label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-[#1e1e1e] border border-[#333] rounded-lg px-4 py-3.5 text-white text-base outline-none transition-all duration-300 focus:border-[#4caf50] focus:shadow-[0_0_10px_rgba(76,175,80,0.4)]"
            />
          </div>

          <button
            type="submit"
            className="mt-2 bg-[#4caf50] text-[#121212] font-bold text-lg py-3.5 rounded-lg transition-all duration-300 hover:bg-[#66bb6a] hover:shadow-[0_0_15px_rgba(76,175,80,0.7)] hover:-translate-y-0.5 cursor-pointer"
          >
            ¡ENTRAR AL CLAN ZOMBIE! 🧟‍♂️
          </button>
        </form>

        <div className="mt-5 text-sm text-slate-400">
          <p>
            ¿Aún no te hemos infectado?{" "}
            <a href="#registro" className="text-[#81c784] font-semibold hover:underline">
              Únete al bando zombie
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;