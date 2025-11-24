import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Golpes from "./pages/Golpes";
import Alertas from "./pages/Alertas";
import Denunciar from "./pages/Denunciar";
import PainelUsuario from "./pages/PainelUsuario";

export default function App() {
  return (<>
      <Navbar />
      <div className="p-6">
        <Routes>
          <Route path="/" element={<Golpes />} />
          <Route path="/alertas" element={<Alertas />} />
          <Route path="/denunciar" element={<Denunciar />} />
          <Route path="/painel" element={<PainelUsuario />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
        </Routes>
      </div>
      </>
  );
}
