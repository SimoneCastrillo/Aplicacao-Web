import React from 'react'
import './StepOrcamento.css'
const StepOrcamento = ({passo}) => {
  return (
    <div>
        <div className="step-reserva-wrapper-orcamento">
            <div className={`step-reserva-container-orcamento ${passo === 1 ? 'inicio-orcamento' : passo === 3 ? 'fim-orcamento' : ''}`}>
            {[1, 2, 3].map((num) => (
                <React.Fragment key={num}>
                <div
                    className={`passo-orcamento ${passo >= num ? 'ativo-orcamento' : ''}`}
                >
                    {num}
                </div>
                {num !== 3 && (
                    <div className={`linha-orcamento ${passo > num ? 'linha-ativa-orcamento' : ''}`}></div>
                )}
                </React.Fragment>
            ))}
            </div>
        </div>
    </div>
  )
}

export default StepOrcamento
