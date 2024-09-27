import React from 'react'
import './Step.css'
const Step = ({passo, qtdPassos}) => {
  return (
    <div>
        <div className="step-wrapper-util">
            <div className={`step-container-util ${passo === 1 ? 'inicio-util' : passo === 3 ? 'fim-util' : ''}`}>
            {qtdPassos.map((num) => (
                <React.Fragment key={num}>
                <div
                    className={`passo-util ${passo >= num ? 'ativo-util' : ''}`}
                >
                    {num}
                </div>
                {num !== qtdPassos.length  && (
                    <div className={`linha-util ${passo > num ? 'linha-ativa-util' : ''}`}></div>
                )}
                </React.Fragment>
            ))}
            </div>
        </div>
    </div>
  )
}

export default Step
