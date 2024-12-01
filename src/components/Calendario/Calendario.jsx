import React from 'react'
import  { atualizarCalendario } from '../../api/api'
const Calendario = () => {
  const atualizar = async () => {
    try {
      await atualizarCalendario().then((response) => {console.log(response)})
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <button className='btn-default-bgRosa-perfil' onClick={() => atualizar()}>Atualizar calendario</button>
      <iframe src="https://calendar.google.com/calendar/embed?src=dudu.castrillo%40gmail.com&ctz=America%2FSao_Paulo" style={{border: '0'}} width="100%" height="600" frameborder="0" scrolling="no"></iframe>
    </div>
  )
}

export default Calendario
