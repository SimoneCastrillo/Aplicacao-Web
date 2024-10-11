import styles from './InputMeusDados.module.css'
const InputMeusDados = ({label , onValue, onSet, edit}) => {
  return (
    <div>
       <label>{label}</label>
       <input type="text" 
        disabled={!edit}
       className={edit ? styles.input : styles.inputBlock} 
       value={onValue} 
       onChange={(e) => 
       onSet(e.target.value)}/>
    </div>
  )
}

export default InputMeusDados
