import React, { useEffect } from 'react'
import { useState } from 'react';
import { MdArrowBack, MdArrowForward, MdCheck } from 'react-icons/md';
import styles from './FormularioReserva.module.css';
import Step from '../Step/Step';
import InputReserva from './InputReserva/InputReserva';
const FormularioReserva = ({onOpenEscolherDecoracao, onTipoEventoModal, onDecoracaoEscolhida}) => {

  const [passoAtivo, setPassoAtivo] = useState(1);

  const [data, setData] = useState('');
  
  const [horario, setHorario] = useState('');
  
  const [quantidadePessoas, setQuantidadePessoas] = useState('');
  
  const [tipoEvento, setTipoEvento] = useState('infantil');
  
  const [decoracao, setDecoracao] = useState('');

  const [saborBolo, setSaborBolo] = useState('Chocolate com mousse e pedaços de chocolate');

  const [pratoPrincipal, setPratoPrincipal] = useState('');
  useEffect(() => {
    setDecoracao(onDecoracaoEscolhida.id)
  }, [onDecoracaoEscolhida])

  useEffect(() => {
    onTipoEventoModal(tipoEvento)
  }, [tipoEvento])

  
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
        return setErro('Quantidade de pessoas excedida, o maximo de pessoas permitida é 180')
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
    let orcamento = {};
    if(tipoEvento === 'casamento'){
      orcamento = {
        data,
        "inicio" : horario,
        quantidadePessoas,
        pratoPrincipal,
        tipoEvento,
        decoracao,
        saborBolo
      }
    }else {
      orcamento = {
        data,
        "inicio" : horario,
        quantidadePessoas,
        tipoEvento,
        decoracao,
        saborBolo
      }
    }
    console.log('json orcamento', orcamento);
    
  }
  return (
    <div>
      <form className={styles.form}>

        {passoAtivo === 1 && (
          <div className='passo-1'>
            <p className={styles.descricao}>Selecione o horário e data da sua reserva e a quantidade de pessoas.</p>
                <div className={styles.controleDasInputs}>
                  <InputReserva label='Data' type='date' onValue={data} onSet={setData} />
                  <InputReserva label='Horário' type='time' onValue={horario} onSet={setHorario} />
                </div>
                <div className={styles.controleDasInputs}>
                  <InputReserva label='Quantidade de pessoas' type='number' onValue={quantidadePessoas} onSet={setQuantidadePessoas} />
                  <div className="container-input">
                    <label className={styles.tamanhoLabel}>Tipo de evento</label>
                    <select value={tipoEvento} onChange={(e)=>{
                      setTipoEvento(e.target.value)
                    }}>
                      <option value="infantil">Infantil</option>
                      <option value="debutante">Debutante</option>
                      <option value="casamento">Casamento</option>
                      <option value="aniversario">Aniversário</option>
                      <option value="coffe break">Coffe Break</option>
                      <option value="alugar espaço">Alugar espaço</option>
                      <option value="outros">Outros</option>
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
                    <button className={styles.btnModalDecoracao} onClick={onOpenEscolherDecoracao}>{decoracao ? onDecoracaoEscolhida.nome : "Escolher decoração"}</button>
                  </div>
                  <div className="container-input">
                    <label className={styles.tamanhoLabel}>Sabor do bolo</label>
                    <select value={saborBolo} onChange={(e)=>setSaborBolo(e.target.value)}>
                      <option value="chocolate_mousse_chocolate">Chocolate com mousse e pedaços de chocolate</option>
                      <option value="chocolate_mousse_maracuja">Chocolate com mousse de maracujá e pedaços de chocolate</option>
                      <option value="creme_mestre_pessego">Creme Mestre com pêssego</option>
                      <option value="prestigio">Prestígio</option>
                      <option value="abacaxi">Abacaxi</option>
                      <option value="doce_leite_coco">Doce de leite com coco</option>
                      <option value="doce_leite_ameixa">Doce de leite com ameixa</option>
                      <option value="mousse_morango">Mousse de morango</option>
                      <option value="bolo_ninho">Bolo Ninho</option>
                      <option value="ninho_morango">Ninho com morango</option>
                    </select>
                  </div>
                </div>
                <div className={styles.controleDasInputs}>
                  {tipoEvento === 'casamento' && ( 
                    <InputReserva label='Prato principal' type='text' onValue={pratoPrincipal} onSet={setPratoPrincipal} />
                )}
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
        <div style={{marginTop: '100px'}} className={styles.containerStepEbutton}>
            <div style={{width: '33.3%'}}>
            {passoAtivo !== 1 && (
                <button onClick={()=>{
                  setPassoAtivo(passoAtivo - 1)
                }} className='btn-default-bgTransparent buttonAjuste'><MdArrowBack/></button>
              )}
              </div>
            <div style={{width: '33.3%', display: 'flex', justifyContent: 'center'}}>
            <Step  passo={passoAtivo} qtdPassos={[1, 2, 3]} />
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
        <div className={styles.containerStepEbuttonMob}>
            
            <div style={{display: 'flex', justifyContent: 'center'}}>
            <Step  passo={passoAtivo} qtdPassos={[1, 2, 3]} />
            </div>
            <div className={styles.buttonsMob}>
            <div >
            {passoAtivo !== 1 && (
                <button onClick={()=>{
                  setPassoAtivo(passoAtivo - 1)
                }} className='btn-default-bgTransparent buttonAjuste'><MdArrowBack/></button>
              )}
              </div>
            <div style={{textAlign: 'right'}}>
            {passoAtivo !== 3 && (
              <button onClick={proximoPasso} className='btn-default-bgRosa buttonAjuste'><MdArrowForward color='#fff'/></button>
            )}
            {passoAtivo === 3 && (
              <button onClick={handleSubmit} className='btn-default-bgRosa buttonAjuste'><MdCheck color='#fff'/></button>
            )}
            </div>
            </div>
        </div>
    </div>
  )
}

export default FormularioReserva
