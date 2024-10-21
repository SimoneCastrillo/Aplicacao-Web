import React, { useState } from 'react';
import styles from './Login.module.css';
import { Link } from 'react-router-dom';
import logo from '../../assets/Matriz (1).png'

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
      <div className={styles.containerGeral}>
      <BotaoVoltarOrcamento className={styles} />
        <div className={styles.container}>
          <h1 className={styles.titulo}>LOGIN</h1>
          <span>Não possui uma conta? <Link className={styles.link} to="/cadastro">Cadastre-se.</Link></span>

          <form className={styles.form} onSubmit={validarLogin}> 
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
            <button type="submit" className={`btn-default-bgRosa ${styles.btnEntrar}`}>
              Entrar
            </button>
          </form>

          <Link className={styles.link} to="/recuperar-senha">Esqueceu a senha?</Link>
        </div>
      </div>
      <div className={styles.containerBanner}>
      <div className={styles.containerLogo}>
        <img width={400} src={logo} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Login;
