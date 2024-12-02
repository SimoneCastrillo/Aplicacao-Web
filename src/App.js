import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
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
import Gastronomia from "./pages/Gastronomia/Gastronomia";
import { useEffect, useState } from "react";

function App() {
  const [logado, setLogado] = useState(false);
  const location = useLocation(); 

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      setLogado(true);
    } else {
      setLogado(false);
    }
  }, [location]); 

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/evento/:nome" element={<EventoEspecifico />} />
      <Route path="/gastronomia" element={<Gastronomia />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/login" element={<Login />} />
      <Route path="/recuperar-senha" element={<RecuperarSenha />} />
      <Route path="/perfil/:abaPerfil" element={<Perfil />} />
      <Route path="/solicitar-orcamento" element={logado ? <SolicitarOrcamento /> : <Login />} />
      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
  );
}

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
      <ToastContainer />
    </BrowserRouter>
  );
}

export default AppWrapper;
