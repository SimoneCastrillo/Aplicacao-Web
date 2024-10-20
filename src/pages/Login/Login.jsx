import React, { useState } from 'react';
import styles from './Login.module.css';
import { Link } from 'react-router-dom';
import BotaoVoltarOrcamento from '../../components/BotaoVoltarCadastro/BotaoVoltarCadastro';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState(''); 

  const validarLogin = (e) => {
    e.preventDefault(); 
    setErro(''); 

  
    if (!email || !senha) {
      return setErro('Por favor, preencha todos os campos.');
    }

    
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email)) {
      return setErro('Por favor, insira um email válido.');
    }

  };

  return (
    <div className={styles.container1}>
      <BotaoVoltarOrcamento className={styles} />
      <div className={styles.containerGeral}>
        <div className={styles.container}>
          <h1 className={styles.titulo}>LOGIN</h1>
          <span>Não possui uma conta? <Link className={styles.link} to="/cadastro">Cadastre-se.</Link></span>

          <form onSubmit={validarLogin}> 
            <div className={styles.containerInputs}>
              <label className={styles.tamanhoLabel}>Insira seu email</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <label className={styles.tamanhoLabel}>Insira sua senha</label>
              <input
                type="password" 
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>

            {erro && <p className={styles.error}>{erro}</p>} 
            <button type="submit" className={styles.botaoEntrar}>
              Entrar
            </button>
          </form>

          <Link className={styles.link} to="/recuperar-senha">Esqueceu a senha?</Link>
        </div>
      </div>
      <div className={styles.containerBanner}></div>
    </div>
  );
};

export default Login;
