import styles from './InputReserva.module.css'

const InputReserva = ({label, onValue , onSet, type, onMin}) => {
  return (
    <div className='container-input'>
      <label className={styles.tamanhoLabel}>{label}</label>
      {type === 'date' && (
        <input 
        min={onMin}
        type={type}
        value={onValue} 
        onChange={(e)=>
        onSet(e.target.value)} />
      )}
      {type !== 'date' && (
        <input 
        type={type}
        value={onValue} 
        onChange={(e)=>
        onSet(e.target.value)} />
      )}
    </div>
  )
}

export default InputReserva
