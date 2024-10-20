import React, { useEffect, useState } from 'react';
import styles from './FormularioCadastro.module.css';
import Step from '../Step/Step';

const FormularioCadastro = () => {
  const [passoAtivo, setPassoAtivo] = useState(1);
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmSenha, setConfirmSenha] = useState('');
  const [erro, setErro] = useState('');

  const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Validação básica de email
    return regex.test(email);
  };

  const validarTelefone = (telefone) => {
    const regex = /^\d{10,11}$/; // Aceita 10 ou 11 dígitos para celular
    return regex.test(telefone);
  };

  const proximoPasso = () => {
    if (passoAtivo === 1) {
      if (nome === '' || telefone === '') {
        return setErro('Preencha todos os campos');
      }
      if (!validarTelefone(telefone)) {
        return setErro('Telefone inválido.');
      }
      setErro(''); // Limpa o erro quando os campos são válidos
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
      setErro(''); // Limpa o erro quando os campos são válidos
    }
    
    setPassoAtivo(passoAtivo + 1); // Avança para o próximo passo
  };

  const voltarPasso = () => {
    if (passoAtivo > 1) {
      setPassoAtivo(passoAtivo - 1);
    }
  };

  useEffect(() => {
    if (passoAtivo === 3) {
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    }
  }, [passoAtivo]);

  return (
    <div>
      <form className={styles.form}>
        {passoAtivo === 1 && (
          <div className="passo-1">
            <div className={styles.containerInputs}>
              <label className={styles.tamanhoLabel}>Qual seu nome?</label>
              <input type="text" value={nome || ''} onChange={(e) => setNome(e.target.value)} />

              <label className={styles.tamanhoLabel}>Informe seu celular</label>
              <input type="text" value={telefone || ''} onChange={(e) => setTelefone(e.target.value)} />
            </div>
          </div>
        )}
        {passoAtivo === 2 && (
          <div className="passo-2">
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
      <div style={{ marginTop: '100px' }} className={styles.containerStepEbutton}>
       
        {passoAtivo !== 3 && (
          <Step passo={passoAtivo} qtdPassos={[1, 2]} />
        )}
        
        <div className={styles.divBotoes}>
          {passoAtivo >= 2 && passoAtivo < 3 && (
            <button onClick={voltarPasso} className={styles.botaoVoltar}>Voltar</button>
          )}

          {passoAtivo !== 3 && (
            <button onClick={proximoPasso}>Continuar</button>
          )}
        </div>
        
      </div>
    </div>
  );
};

export default FormularioCadastro;
