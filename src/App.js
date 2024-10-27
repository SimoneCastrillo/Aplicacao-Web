import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Home from "./pages/Home/Home";
import SolicitarOrcamento from "./pages/SolicitarOrcamento/SolicitarOrcamento";
import Cadastro from "./pages/Cadastro/Cadastro";
import Perfil from "./pages/Perfil/Perfil";
import EventoEspecifico from "./pages/EventoEspecifico/EventoEspecifico";
import Login from "./pages/Login/Login";
import RecuperarSenha from "./pages/RecuperarSenha/RecuperarSenha";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/solicitar-orcamento" element={<SolicitarOrcamento/>} />
        <Route path="/cadastro" element={<Cadastro/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/recuperar-senha" element={<RecuperarSenha/>} />
        <Route path="/perfil" element={<Perfil/>} />
        <Route path="/evento/:nome" element={<EventoEspecifico/>} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
