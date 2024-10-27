import React, { useEffect, useState } from 'react';
import styles from './FormularioCadastro.module.css';
import Step from '../Step/Step';
import InputMask from 'react-input-mask';
import { criarUsuario } from '../../api/api';
import {  useNavigate } from 'react-router-dom';


const FormularioCadastro = () => {
  const navigate = useNavigate();

  const [passoAtivo, setPassoAtivo] = useState(1);
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmSenha, setConfirmSenha] = useState('');
  const [erro, setErro] = useState('');

  const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    return regex.test(email);
  };

  

  const proximoPasso = () => {
    if (passoAtivo === 1) {
      if (nome === '' || telefone === '') {
        return setErro('Preencha todos os campos');
      }
      const cleanValueTelefone = telefone.replace(/[()-\s_]/g, '');
      
      if (cleanValueTelefone.length !== 11) {
        return setErro('Telefone inválido.');
      }
      setErro(''); 
    }
    
    if (passoAtivo === 2) {
      if (email === '' || confirmEmail === '' || senha === '' || confirmSenha === '') {
        return setErro('Preencha todos os campos');
      }
      if (!validarEmail(email)) {
        return setErro('Email inválido.');
      }
      if (email !== confirmEmail) {
        return setErro('Os e-mails não coincidem');
      }
      if (senha !== confirmSenha) {
        return setErro('As senhas não coincidem');
      }
      if (senha.length < 6) {
        return setErro('A senha deve ter pelo menos 6 caracteres');
      }
      setErro(''); 
      const telefoneFormatado = telefone.replace(/[()\- ]/g, '');
      const formData = new FormData();
        formData.append('nome', nome);
        formData.append('email', email);
        formData.append('senha', senha);  
        formData.append('telefone', telefoneFormatado);
      const fetchUsuario = async () => {
        try {
          const response = await criarUsuario(formData); 
          console.log(response.data);
          setPassoAtivo(3);
        } catch (error) {
          console.error('Erro ao criar o usuário:', error);
        }
      }  
      fetchUsuario();
    }
    
    setPassoAtivo(passoAtivo + 1);
  };

  const voltarPasso = () => {
    if (passoAtivo > 1) {
      setPassoAtivo(passoAtivo - 1);
    }
  };

  useEffect(() => {
    if (passoAtivo === 3) {
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }
  }, [passoAtivo, navigate]);

  return (
    <div style={{width: '100%'}}>
      <form className={styles.form}>
        {passoAtivo === 1 && (
          <div className={styles.passo1}>
            <div className={styles.containerInputs}>
              <label className={styles.tamanhoLabel}>Qual seu nome?</label>
              <input type="text" value={nome || ''} onChange={(e) => setNome(e.target.value)} />

              <label style={{marginTop: '20px'}} className={styles.tamanhoLabel}>Informe seu celular</label>
              <InputMask  mask="(99) 99999-9999" value={telefone || ''} onChange={(e) => setTelefone(e.target.value)} />
            </div>
          </div>
        )}
        {passoAtivo === 2 && (
          <div className={styles.passo2}>
            <div className={styles.controleDasInputs}>
              <div className={styles.containerInputs}>
                <label className={styles.tamanhoLabel}>Informe seu e-mail</label>
                <input type="email" value={email || ''} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className={styles.containerInputs}>
                <label className={styles.tamanhoLabel}>Confirme seu e-mail</label>
                <input type="email" value={confirmEmail || ''} onChange={(e) => setConfirmEmail(e.target.value)} />
              </div>
            </div>
            <div className={styles.controleDasInputs}>
              <div className={styles.containerInputs}>
                <label className={styles.tamanhoLabel}>Informe sua senha</label>
                <input type="password" value={senha || ''} onChange={(e) => setSenha(e.target.value)} />
              </div>
              <div className={styles.containerInputs}>
                <label className={styles.tamanhoLabel}>Confirme sua senha</label>
                <input type="password" value={confirmSenha || ''} onChange={(e) => setConfirmSenha(e.target.value)} />
              </div>
            </div>
          </div>
        )}
        {passoAtivo === 3 && (
          <div>
            <h1 className={styles.tituloCadastrado}>Cadastro realizado com sucesso!</h1>
            <p className={styles.textoCadastrado}>Redirecionando para o login...</p>
          </div>
        )}

        {erro && <p className={styles.error}>{erro}</p>}
      </form>
      <div className={styles.containerStepEbutton}>
       
        {passoAtivo !== 3 && (
          <Step passo={passoAtivo} qtdPassos={[1, 2]} />
        )}
        
        <div className={styles.divBotoes}>
          {passoAtivo >= 2 && passoAtivo < 3 && (
            <button onClick={voltarPasso} className={`btn-default-bgTransparent ${styles.btn}`}>Voltar</button>
          )}

          {passoAtivo !== 3 && (
            <button onClick={proximoPasso} className={`btn-default-bgRosa ${styles.btn}`}>Continuar</button>
          )}
        </div>
        
      </div>
    </div>
  );
};

export default FormularioCadastro;
