import styles from './InputMeusDados.module.css'
const InputMeusDados = ({label , onValue, onSet, edit, onQtdReservas}) => {
  return (
    <div className={styles.controleInfo}>
       <label>{label}</label>
       <input type="text" 
        disabled={!edit}
       className={edit ? onQtdReservas ? styles.inputBlock : styles.input : styles.inputBlock} 
       value={onValue} 
       onChange={(e) => 
       onSet(e.target.value)}/>
    </div>
  )
}

export default InputMeusDados
