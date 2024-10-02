import React from 'react'
import { useEffect, useState } from 'react';
import { MdArrowBack, MdArrowForward, MdCheck } from 'react-icons/md';
import styles from './FormularioReserva.module.css';
import StepOrcamento from '../Step/Step';
const FormularioReserva = () => {

  const [passoAtivo, setPassoAtivo] = useState(1);
  const [data, setData] = useState('');
  const [horario, setHorario] = useState('');
  const [quantidadePessoas, setQuantidadePessoas] = useState('');
  const [tipoEvento, setTipoEvento] = useState('infantil');
  const [erro, setErro] = useState(false);
  const getDiaAtual = ()=>{
    const data = new Date();
    const dia = data.getDate();
    const mes = data.getMonth() + 1;
    const ano = data.getFullYear();
    return `${ano}-${mes < 10 ? `0${mes}` : mes}-${dia < 10 ? `0${dia}` : dia}`
  }

  const proximoPasso = ()=>{
    if(passoAtivo === 1){
      if(data === '' || horario === '' || quantidadePessoas === '') {
        return setErro('Preencha todos os campos')
      }
      
      if(data < getDiaAtual()){
        return setErro('Data inválida') 
      }
      if(quantidadePessoas > 180){
        return setErro('Quantidade de pessoas excedida, o maximo de pessoas permitida é 150')
      }
    }
    setErro('')
    if(tipoEvento === 'alugar espaço'){
      setPassoAtivo(3)
    }else {
      setPassoAtivo(passoAtivo + 1)
    }
  }
  const handleSubmit = ()=> {
    console.log('aaa');
    
  }
  return (
    <div>
      <form className={styles.form}>
        {passoAtivo === 1 && (
          <div className='passo-1'>
            <p className={styles.descricao}>Selecione o horário e data da sua reserva e a quantidade de pessoas.</p>
                <div className={styles.controleDasInputs}>
                  <div className="container-input">
                    <label className={styles.tamanhoLabel}>Data</label>
                    <input type="date"  value={data || ''} onChange={(e)=>setData(e.target.value)} />
                  </div>
                  <div className="container-input">
                    <label className={styles.tamanhoLabel}>Horario</label>
                    <input type="time" value={horario || ''} onChange={(e)=>setHorario(e.target.value)}/>
                  </div>
                </div>
                <div className={styles.controleDasInputs}>
                  <div className="container-input">
                    <label className={styles.tamanhoLabel}>Quantidade de pessoas</label>
                    <input type="number" className={styles.inputEspecifico} placeholder='Digite a quantidade de pessoas' value={quantidadePessoas || ''} onChange={(e)=>setQuantidadePessoas(e.target.value)}/>
                  </div>
                  <div className="container-input">
                    <label className={styles.tamanhoLabel}>Tipo de evento</label>
                    <select value={tipoEvento || ''} onChange={(e)=>setTipoEvento(e.target.value)}>
                      <option value="infantil">Infantil</option>
                      <option value="debutante">Debutante</option>
                      <option value="casamento">Casamento</option>
                      <option value="aniversario">Aniversário</option>
                      <option value="coffe break">Coffe Break</option>
                      <option value="alugar espaço">Alugar espaço</option>
                    </select>
                  </div>
                </div>
                
          </div>
        )}
        {passoAtivo === 2 && (
          <div className='passo-2'>
            <p className={styles.descricao}>Selecione as preferências para seu evento e informe o sabor do bolo</p>
            <div className={styles.controleDasInputs}>
                  <div className="container-input">
                    <label className={styles.tamanhoLabel}>Decoração</label>
                    <button className={styles.btnModalDecoracao}>Escolher decoração</button>
                  </div>
                  <div className="container-input">
                    <label className={styles.tamanhoLabel}>Sabor do bolo</label>
                    <input type="text" placeholder='Escolha o sabor do bolo'/>
                  </div>
                </div>
                <div className={styles.controleDasInputs}>
                  {tipoEvento === 'casamento' && ( <div className="container-input">
                    <label className={styles.tamanhoLabel}>Prato principal</label>
                    <input type="text" className={styles.inputEspecifico} />
                  </div>)}
                </div>
          </div>
        )}
        {passoAtivo === 3 && (
          <div className='passo-3'>
            <p className={styles.descricao}>Observações (Opcional)</p>
            <div className={styles.controleDasInputs}>
                  <div className="container-input-full">
                    <label>Observação</label>
                    <textarea placeholder='Máximo de 200 caracteres' />
                  </div>
                </div>
          </div>
        )}
      {erro && <p className={styles.erro_msg}>{erro}</p>}
      </form>
        <div className={styles.containerStepEbutton}>
            <div style={{width: '33.3%'}}>
            {passoAtivo !== 1 && (
                <button onClick={()=>{
                  setPassoAtivo(passoAtivo - 1)
                }} className='btn-default-bgTransparent buttonAjuste'><MdArrowBack/></button>
              )}
              </div>
            <div style={{width: '33.3%', display: 'flex', justifyContent: 'center'}}>
            <StepOrcamento  passo={passoAtivo} qtdPassos={[1, 2, 3]} />
            </div>
            <div style={{width: '33.3%', textAlign: 'right'}}>
            {passoAtivo !== 3 && (
              <button onClick={proximoPasso} className='btn-default-bgRosa buttonAjuste'><MdArrowForward color='#fff'/></button>
            )}
            {passoAtivo === 3 && (
              <button onClick={handleSubmit} className='btn-default-bgRosa buttonAjuste'><MdCheck color='#fff'/></button>
            )}
            </div>
        </div>
    </div>
  )
}

export default FormularioReserva
