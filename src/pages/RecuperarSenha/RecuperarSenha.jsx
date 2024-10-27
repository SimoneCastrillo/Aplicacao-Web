import React, { useEffect, useState } from 'react';
import styles from './RecuperarSenha.module.css';
import BotaoVoltarOrcamento from '../../components/BotaoVoltarCadastro/BotaoVoltarCadastro';

const RecuperarSenha = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [senhaConfirm, setSenhaConfirm] = useState('');
  const [erro, setErro] = useState(''); 
  const [passoAtivo, setPassoAtivo] = useState(1);
  const [codigo, setCodigo] = useState('');

  const proximoPasso = () => {
    setErro(''); // Limpa erros anteriores

    // Validação para cada passo
    if (passoAtivo === 1) {
      if (!validarEmail(email)) {
        return setErro('Email inválido.');
      }
    }
    
    if (passoAtivo === 2) {
      // if (codigo.length < 6) {
      //   return setErro('Código inválido.');
      // }
    }

    if (passoAtivo === 3) {
      if (senha !== senhaConfirm) {
        return setErro('As senhas não coincidem.');
      }
      if (senha.length < 6) {
        return setErro('A senha deve ter pelo menos 6 caracteres.');
      }
    }
    
    setPassoAtivo(passoAtivo + 1); // Avança para o próximo passo
  };

  const reenviar = () => {
    console.log('Reenviar código');
    // Lógica para reenviar o código para o e-mail
  };

  useEffect(() => {
    if (passoAtivo === 4) {
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    }
  }, [passoAtivo]);

  const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Validação básica de email
    return regex.test(email);
  };

  return (
    <div className={styles.container1}>
      <BotaoVoltarOrcamento />
      <div className={styles.containerGeral}>
        <h1 className={styles.titulo}>RECUPERAR SENHA</h1>
        {passoAtivo === 1 && (
          <div className={styles.containerPasso}>
            <p className={styles.descPasso1}>Para garantir a segurança da sua conta, insira o e-mail registrado para que possamos enviar um código de recuperação. Esse código permitirá que você redefina sua senha e recupere o acesso à sua conta.</p>

            <div className={styles.containerInputs}>
            <label>Insira seu email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            </div>
            {erro && <p className={styles.error}>{erro}</p>}
            <button type="button" onClick={proximoPasso} className={styles.botaoEntrar}>
              Enviar código
            </button>
          </div>
        )}

        {passoAtivo === 2 && (
          <div className={styles.containerPasso}>
            <p className={styles.descPasso1}>Um e-mail com o código de recuperação foi enviado para {email}. Por favor, verifique sua caixa de entrada (e também a pasta de spam ou lixo eletrônico, se necessário) para encontrar o e-mail.</p>

            <div className={styles.containerInputsCodigo}>
              {[...Array(6)].map((_, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  onChange={(e) => {
                    const newCodigo = codigo.split('');
                    newCodigo[index] = e.target.value;
                    setCodigo(newCodigo.join(''));
                  }}
                />
              ))}
            </div>

            {erro && <p className={styles.error}>{erro}</p>}
            <button type="button" onClick={proximoPasso} className={styles.botaoEntrar}>
              Verificar
            </button>
            <p className={styles.reenviar} onClick={reenviar}>Reenviar código</p>
          </div>     
        )}

        {passoAtivo === 3 && (
          <div className={styles.containerPasso}>
            <h1 className={styles.tituloSenha}>INSIRA SUA SENHA</h1>

            <label>Insira sua senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            <label>Confirme sua senha</label>
            <input
              type="password"
              value={senhaConfirm}
              onChange={(e) => setSenhaConfirm(e.target.value)}
            />
            {erro && <p className={styles.error}>{erro}</p>}
            <button type="button" onClick={proximoPasso} className={styles.botaoEntrar}>
              Continuar
            </button>
          </div>
        )}

        {passoAtivo === 4 && (
          <div>
            <h1 className={styles.tituloCadastrado}>Senha Atualizada com sucesso!</h1>
            <p className={styles.textoCadastrado}>Redirecionando para o login...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecuperarSenha;
