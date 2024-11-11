import React, { useState } from 'react'
import styles from '../../MeusDados/modalCancelarEditar/ModalCancelarEditar.module.css'
import {BsExclamationTriangleFill} from 'react-icons/bs'



const ModalCancelarReserva = ({onCloseModalReserva, onSetCancelarReserva}) => {
    
  return (
    <div className={styles.container}>
        <div className={styles.box} style={{gap: '50px'}}>
           <BsExclamationTriangleFill color='#C00F0C' fontSize={50}/>
           <h2>DESEJA CANCELAR ESSA RESERVA?</h2>
          
           <div style={{display:'flex', gap: '20px'}}>
            <button onClick={()=> {
                onSetCancelarReserva(true)
                onCloseModalReserva()
            }} className='btn-default-bgTransparent-perfil'>Sim</button>
            <button onClick={()=> {
                onSetCancelarReserva(false)
                onCloseModalReserva()
            }} className='btn-default-bgRosa-perfil'>Não</button>
           </div>
        </div>
    </div>
  )
}

export default ModalCancelarReserva
