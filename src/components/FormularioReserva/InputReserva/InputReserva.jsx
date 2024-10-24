import styles from './InputReserva.module.css'

const InputReserva = ({label, onValue , onSet, type}) => {
  return (
    <div className='container-input'>
      <label className={styles.tamanhoLabel}>{label}</label>
      <input 
      type={type}
      value={onValue} 
      onChange={(e)=>
      onSet(e.target.value)} />
    </div>
  )
}

export default InputReserva
