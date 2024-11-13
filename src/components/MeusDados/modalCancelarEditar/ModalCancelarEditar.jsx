import React, { useState } from 'react'
import styles from './ModalCancelarEditar.module.css'
import {BsX, BsExclamationTriangleFill} from 'react-icons/bs'



const ModalCancelarEditar = ({onCloseModalEdit, onSetDescartarAlteracoes}) => {
    
  return (
    <div className={styles.container}>
        <div className={styles.box}>
           <BsExclamationTriangleFill color='#C00F0C' fontSize={50}/>
           <h2>SUAS ALTERAÇÕES 
           NÃO FORAM SALVAS!</h2>
           <h4>Deseja continuar editando 
           ou descartar as alterações?</h4>
           <div style={{display:'flex', gap: '20px'}}>
            <button onClick={()=> {
                onSetDescartarAlteracoes(true)
                onCloseModalEdit()
            }} className='btn-default-bgTransparent-perfil'>Descartar</button>
            <button onClick={()=> {
                onSetDescartarAlteracoes(false)
                onCloseModalEdit()
            }} className='btn-default-bgRosa-perfil'>Cancelar</button>
           </div>
        </div>
    </div>
  )
}

export default ModalCancelarEditar
