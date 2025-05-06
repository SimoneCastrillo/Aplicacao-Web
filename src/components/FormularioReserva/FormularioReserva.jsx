import React, { useEffect } from 'react'
import { useState } from 'react';
import { MdArrowBack, MdArrowForward, MdCheck } from 'react-icons/md';
import styles from './FormularioReserva.module.css';
import Step from '../Step/Step';
import InputReserva from './InputReserva/InputReserva';
import { criarOrcamento, buscarBuffetPorId } from '../../api/api';
import loadingGif from '../../assets/loading-gif.gif';
const buffetIdEnv = process.env.REACT_APP_BUFFET_ID;
const FormularioReserva = ({ onOpenEscolherDecoracao, onTipoEventoModal, onDecoracaoEscolhida }) => {

  const [diaAtual, setDiaAtual] = useState('');

  const [passoAtivo, setPassoAtivo] = useState(1);

  const [data, setData] = useState('');

  const [horario, setHorario] = useState('');

  const [quantidadePessoas, setQuantidadePessoas] = useState('');

  const [tipoEvento, setTipoEvento] = useState(1);

  const [decoracao, setDecoracao] = useState('');

  const [sugestao, setSugestao] = useState('')

  const [loading, setLoading] = useState(false);


  useEffect(() => {
    setDecoracao(onDecoracaoEscolhida.id)
  }, [onDecoracaoEscolhida])

  useEffect(() => {
    onTipoEventoModal(tipoEvento)
  }, [tipoEvento])

  useEffect(() => {
    setDiaAtual(getDiaAtual())

  }, [])

  const [erro, setErro] = useState(false);

  const getDiaAtual = () => {
    const data = new Date();
    const dia = data.getDate();
    const mes = data.getMonth() + 1;
    const ano = data.getFullYear();
    return `${ano}-${mes < 10 ? `0${mes}` : mes}-${dia < 10 ? `0${dia}` : dia}`
  }

  const proximoPasso = () => {
    if (passoAtivo === 1) {
      if (data === '' || horario === '' || quantidadePessoas === '') {
        return setErro('Preencha todos os campos')
      }
      if (data < getDiaAtual()) {
        return setErro('Data inválida')
      }
      if (quantidadePessoas > 180) {
        return setErro('Quantidade de pessoas excedida, o maximo de pessoas permitida é 180')
      }
    }
    setErro('')
    if (tipoEvento === 'alugar espaço') {
      setPassoAtivo(3)
    } else {
      setPassoAtivo(passoAtivo + 1)
    }
  }


  const handleSubmit = async () => {
    setLoading(true);
    const horarioFormatado = horario.split(".")[0];

    try {
      const buffets = await buscarBuffetPorId(buffetIdEnv);
      console.log("buffets", buffets.data);

      let enderecoBuffet;
      for (let i = 0; i < buffets.data.length; i++) {
        console.log("buffets.data[i].buffetId.Id", buffets.data[i].buffetId.id);
        if (buffets.data[i].buffetId.id == parseInt(buffetIdEnv)) {

          enderecoBuffet = buffets.data[i];
        }
      }

      if (!enderecoBuffet) {
        throw new Error("Endereço do buffet não encontrado");
      }

      const orcamento = {
        dataEvento: data,
        qtdConvidados: Number(quantidadePessoas),
        inicio: horarioFormatado,
        sugestao,
        usuarioId: JSON.parse(sessionStorage.usuario).id,
        decoracaoId: decoracao,
        buffetId: parseInt(buffetIdEnv),
        enderecoId: enderecoBuffet.buffetId.id
      };

      console.log(orcamento);

      const res = await criarOrcamento(orcamento);
      setLoading(false);
      console.log(res);

      document.getElementById('idH1Orcamento').style.display = 'none';
      setPassoAtivo(3);

      const tipos = {
        1: 'Infantil',
        2: 'Casamento',
        3: 'Debutante',
        4: 'Coffe Break',
        5: 'Aniversário',
        6: 'Alugar espaço',
        7: 'Outros'
      };

      const mensagem = `Olá, meu nome é ${JSON.parse(sessionStorage.usuario).nome} e gostaria de saber os valores para o orçamento:
  
  Data do evento: ${data}
  Quantidade de pessoas: ${quantidadePessoas}
  Horário de início: ${horarioFormatado}
  Tipo de evento: ${tipos[tipoEvento]}
  Decoração: ${decoracao ? onDecoracaoEscolhida.nome : 'N/A'}
  Observação: ${sugestao || 'N/A'}`;

      const numeroWhatsApp = '+5511953311150';
      const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;

      setTimeout(() => {
        window.location.href = urlWhatsApp;
      }, 3000);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  return (
    <div>
      {passoAtivo !== 3 && (
        <>
          <form className={styles.form}>

            {passoAtivo === 1 && (
              <div className='passo-1'>
                <p className={styles.descricao}>Selecione o horário e data da sua reserva e a quantidade de pessoas.</p>
                <div className={styles.controleDasInputs}>
                  <InputReserva label='Data' type='date' onMin={diaAtual} onValue={data} onSet={setData} />
                  <InputReserva label='Horário' type='time' onValue={horario} onSet={setHorario} />
                </div>
                <div className={styles.controleDasInputs}>
                  <InputReserva label='Quantidade de pessoas' type='number' onValue={quantidadePessoas} onSet={setQuantidadePessoas} />
                  <div className="container-input">
                    <label className={styles.tamanhoLabel}>Tipo de evento</label>
                    <select value={tipoEvento} onChange={(e) => {
                      setTipoEvento(e.target.value)
                    }}>
                      <option value="Infantil">Infantil</option>
                      <option value="Debutante">Debutante</option>
                      <option value="Casamento">Casamento</option>
                      <option value="Aniversário">Aniversário</option>
                      <option value="Coffe Break">Coffe Break</option>
                      <option value="Alugar espaço">Alugar espaço</option>
                      <option value="Outros">Outros</option>
                    </select>
                  </div>
                </div>

              </div>
            )}
            {passoAtivo === 2 && (
              <div className='passo-2'>
                <p className={styles.descricao}>Selecione as preferências para seu evento e informe o sabor do bolo</p>
                <div className="container-input" style={{ width: '100%' }}>
                  <label className={styles.tamanhoLabel}>Decoração</label>
                  <button className={styles.btnModalDecoracao} onClick={onOpenEscolherDecoracao}>{decoracao ? onDecoracaoEscolhida.nome : "Escolher decoração"}</button>
                </div>


                <div className={styles.controleDasInputs} style={{ margin: '0', marginTop: '10px' }}>
                  <div className={styles.textareaSemPrato}>
                    <label style={{ display: 'block', marginBottom: '10px' }}>Observação</label>
                    <textarea onChange={(e) => setSugestao(e.target.value)} placeholder='Máximo de 200 caracteres' />
                  </div>
                </div>
              </div>
            )}


            {erro && <p className={styles.erro_msg}>{erro}</p>}
          </form>
          {loading && <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '70px' }}>
            <img width={50} src={loadingGif} alt="loading" />
          </div>}
          {!loading && (
            <>
              <div style={{ marginTop: '100px' }} className={styles.containerStepEbutton}>
                <div style={{ width: '33.3%' }}>
                  {passoAtivo !== 1 && (
                    <button onClick={() => {
                      setPassoAtivo(passoAtivo - 1)
                    }} className='btn-default-bgTransparent buttonAjuste'><MdArrowBack /></button>
                  )}
                </div>
                <div style={{ width: '33.3%', display: 'flex', justifyContent: 'center' }}>
                  <Step passo={passoAtivo} qtdPassos={[1, 2]} />
                </div>
                <div style={{ width: '33.3%', textAlign: 'right' }}>
                  {passoAtivo !== 2 && (
                    <button onClick={proximoPasso} className='btn-default-bgRosa buttonAjuste'><MdArrowForward color='#fff' /></button>
                  )}
                  {passoAtivo === 2 && (
                    <button onClick={handleSubmit} className='btn-default-bgRosa buttonAjuste'><MdCheck color='#fff' /></button>
                  )}
                </div>
              </div>
              <div className={styles.containerStepEbuttonMob}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Step passo={passoAtivo} qtdPassos={[1, 2]} />
                </div>
                <div className={styles.buttonsMob}>
                  <div >
                    {passoAtivo !== 1 && (
                      <button onClick={() => {
                        setPassoAtivo(passoAtivo - 1)
                      }} className='btn-default-bgTransparent buttonAjuste'><MdArrowBack /></button>
                    )}
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    {passoAtivo !== 2 && (
                      <button onClick={proximoPasso} className='btn-default-bgRosa buttonAjuste'><MdArrowForward color='#fff' /></button>
                    )}
                    {passoAtivo === 2 && (
                      <button onClick={handleSubmit} className='btn-default-bgRosa buttonAjuste'><MdCheck color='#fff' /></button>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
      {passoAtivo === 3 && (
        <div className={styles.orcamentoFeito}>
          <h1>Orçamento enviado com Sucesso!</h1>
          <h4>Estamos redirecionando você para o whatsapp.
            <br></br>
            Obrigada pela preferência!</h4>
        </div>
      )}
    </div>
  )
}

export default FormularioReserva
