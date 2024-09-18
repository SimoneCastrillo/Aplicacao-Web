import React, { useState } from 'react';
import './StepReserva.css';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
const StepReserva = () => {
  const [passoAtivo, setPassoAtivo] = useState(1);

  const mensagens = [
    (<p key='mensagem1'>Para iniciar o atendimento, clique em <Link to='/solicitar-orcamento' className='destaque-texto-step'>Solicitar Orçamento</Link> <br /> Você será levado <span className='destaque-texto-step'>automaticamente</span> à página de Reservas</p>),
    (<p key='mensagem1'>Preencha os dados <span className='destaque-texto-step'>solicidados</span> para concluir a <br/> solicitação de reserva do local.</p>),
    "Selecione o horário",
    "Informe o número de pessoas",
    "Confirme os detalhes da reserva",
  ];

  return (
    <div className="step-reserva-wrapper">
      <div className={`step-reserva-container ${passoAtivo === 1 ? 'inicio' : passoAtivo === 6 ? 'fim' : ''}`}>
        {[1, 2, 3, 4, 5].map((num) => (
          <React.Fragment key={num}>
            {num  === 1 && (
              <div className={`linha linha-ativa primeira`}></div>
            )}
            <motion.button
              className={`passo ${passoAtivo >= num ? 'ativo' : ''}`}
              onClick={() => setPassoAtivo(num)}
            >
              {num}
            </motion.button>
            {num !== 5 && (
              <div className={`linha ${passoAtivo > num ? 'linha-ativa' : ''}`}></div>
            )}
            {num === 5 && (
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
