import styles from './MeusDados.module.css'
import imgPerfil from '../../assets/imgPerfil.png'
import { MdEdit } from 'react-icons/md';
import { useState } from 'react';
import InputMeusDados from './InputMeusDados/InputMeusDados';
const MeusDados = () => {
    const [isEdit, setIsEdit] = useState(false);
    const user = {
        name: 'Igor',
        sobrenome: 'Anthony',
        email: 'igor.iop@gmail.com',
        telefone: '(11) 99999-9999',
        quantidadeReserva: 2,
        imgUsuario: ''
    }
    const [name, setName] = useState(user.name);
    const [sobrenome, setSobrenome] = useState(user.sobrenome);
    const [email, setEmail] = useState(user.email);
    const [telefone, setTelefone] = useState(user.telefone);
    const [quantidadeReserva, setQuantidadeReserva] = useState(user.quantidadeReserva);
    // const [imgUsuario, setImgUsuario] = useState(user.imgUsuario);
  return (
    <>
        <div className={styles.header}>
            <h1 className='titulo-perfil'>MEU PERFIL</h1>
            {!isEdit && <button className='btn-default-bgRosa-perfil' onClick={()=> setIsEdit(true)}>Editar</button>}
            {isEdit && (
                <div>
                    <button style={{marginRight: '10px'}} className='btn-default-bgTransparent-perfil' onClick={()=> setIsEdit(false)}>Cancelar</button>
                    <button className='btn-default-bgRosa-perfil' onClick={()=> setIsEdit(false)}>Salvar</button>
                </div>
            )}
        </div>
        <div className={styles.container}>
            <div className={styles.imagemUsuario}>
                <img src={user.imgUsuario !== '' ? user.imgUsuario : imgPerfil} alt="img de perfil" />
                {isEdit && <button className={styles.editar}>
                    <MdEdit color='#fff' fontSize={34}/>
                </button>}
            </div>
                    <div className={styles.infoUsuario}>
                        <div className={styles.inputsLados}>
                            <div className={styles.controleInfo}>
                            <InputMeusDados label='Nome' onValue={name} onSet={setName} edit={isEdit}/>
                            </div> 
                            <div className={styles.controleInfo}>
                                <InputMeusDados label='E-mail' onValue={email} onSet={setEmail} edit={isEdit}/>
                            </div> 
                            <div className={styles.controleInfo}>
                            <InputMeusDados label='Quantidade de reservas' onValue={quantidadeReserva} onSet={setQuantidadeReserva} edit={isEdit}/>
                            </div>
                        </div>
                        <div className={styles.inputsLados}>
                            <div className={styles.controleInfo}>
                                <InputMeusDados label='Sobrenome' onValue={sobrenome} onSet={setSobrenome} edit={isEdit}/>
                            </div> 
                            <div className={styles.controleInfo}>
                                <InputMeusDados label='Telefone' onValue={telefone} onSet={setTelefone} edit={isEdit}/>
                            </div>    
                    </div>
                </div>

        </div>
    </>
  )
}

export default MeusDados
