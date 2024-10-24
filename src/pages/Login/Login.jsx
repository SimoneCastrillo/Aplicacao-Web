import React, { useState } from 'react';
import styles from './Login.module.css';
import { Link } from 'react-router-dom';
import logo from '../../assets/Matriz (1).png';
import { logar } from '../../api/api';
import BotaoVoltarOrcamento from '../../components/BotaoVoltarCadastro/BotaoVoltarCadastro';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

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

    // Se a validação passar, chama o handleSave
    handleSave();
  };

  const handleSave = async () => {
    const usuario = {
      email,
      senha
    };
    
    try {
      const response = await logar(usuario);
      console.log(response.data);
      sessionStorage.setItem('token', response.data.token);
      sessionStorage.setItem('usuario', JSON.stringify(response.data));
      
      toast.success('Login efetuado com sucesso!',{
        autoClose: 1600
      });
      setTimeout(()=>{
        navigate('/perfil');
      }, 2000)
    } catch (error) {
      
      
      if (error.response) {
        const errorMessage = typeof error.response.data === 'string'
          ? error.response.data
          : error.response.data.message || 'Erro ao tentar efetuar login. Tente novamente.';
        toast.error(errorMessage);
      } else {
        toast.error('Erro ao tentar efetuar login. Tente novamente.');
      }
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
                type="email"
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
            <button
              type="submit"
              className={`btn-default-bgRosa ${styles.btnEntrar}`}
              disabled={email && senha ? false : true}
              style={{ opacity: email && senha ? 1 : 0.5 }}
            >
              Entrar
            </button>
          </form>

          <Link className={styles.link} to="/recuperar-senha">Esqueceu a senha?</Link>
        </div>
      </div>
      <div className={styles.containerBanner}>
        <div className={styles.containerLogo}>
          <img className={styles.logoBuffet} src={logo} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Login;
