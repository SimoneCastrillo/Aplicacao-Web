import styles from './ModalEscolherDecoracao.module.css'

const ModalEscolherDecoracao = ({onCloseEscolherDecoracao}) => {
  return (
    <div className={styles.container}>
        <button onClick={onCloseEscolherDecoracao} >X</button>
        <div className={styles.box}>

        </div>
    </div>
  )
}

export default ModalEscolherDecoracao
