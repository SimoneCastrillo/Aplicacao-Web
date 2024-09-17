import React, { useState } from 'react';
import './StepReserva.css';
import { Link } from 'react-router-dom';

const StepReserva = () => {
  const [passoAtivo, setPassoAtivo] = useState(1);

  const mensagens = [
    (<p key='mensagem1'>Para iniciar o atendimento, clique em <Link to='/solicitar-orcamento' className='destaque-texto-step'>Solicitar Orçamento</Link> <br /> Você será levado <span className='destaque-texto-step'>automaticamente</span> à página de Reservas</p>),
    "Escolha a data do evento",
    "Selecione o horário",
    "Informe o número de pessoas",
    "Confirme os detalhes da reserva",
    "Finalize o processo"
  ];

  return (
    <div className="step-reserva-wrapper">
      <div className={`step-reserva-container ${passoAtivo === 1 ? 'inicio' : passoAtivo === 6 ? 'fim' : ''}`}>
        {[1, 2, 3, 4, 5, 6].map((num) => (
          <React.Fragment key={num}>
            {num  === 1 && (
              <div className={`linha linha-ativa primeira`}></div>
            )}
            <button
              className={`passo ${passoAtivo >= num ? 'ativo' : ''}`}
              onClick={() => setPassoAtivo(num)}
            >
              {num}
            </button>
            {num !== 6 && (
              <div className={`linha ${passoAtivo > num ? 'linha-ativa' : ''}`}></div>
            )}
            {num === 6 && (
              <div className={`linha ${passoAtivo >= num ? 'linha-ativa' : ''} ultima`}></div>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="mensagem-passo">
        {mensagens[passoAtivo - 1]}
      </div>
    </div>
  );
};

export default StepReserva;
