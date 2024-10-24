import styles from './MeusDados.module.css'
import imgPerfil from '../../assets/imgPerfil.png'
import { MdEdit } from 'react-icons/md';
import { useState } from 'react';
import InputMeusDados from './InputMeusDados/InputMeusDados';
import {atualizarUsuario} from '../../api/api'
const MeusDados = () => {
    const [isEdit, setIsEdit] = useState(false);
    const user = JSON.parse(sessionStorage.usuario);
   
    const [name, setName] = useState(user.nome);
    const [email, setEmail] = useState(user.email);
    const [telefone, setTelefone] = useState(user.telefone);
    const [quantidadeReserva, setQuantidadeReserva] = useState(user.quantidadeReserva);
    const [imgUsuario, setImgUsuario] = useState(user.imgUsuario);
    

    const cancelarEdit = () => {
        setIsEdit(false)
        setName(user.nome);
        setEmail(user.email);
        setTelefone(user.telefone);
        setQuantidadeReserva(user.quantidadeReserva);
        setImgUsuario(user.imgUsuario);
    }
    const handleAtualizarUsuario = () => {
        const usuario = {
            nome: name,
            email,
            senha: 'dwdasdasds',
            telefone
        }
        console.log(user)
        atualizarUsuario(user.userId, usuario).then((response) => {
            sessionStorage.usuario = JSON.stringify(response.data);
            setIsEdit(false);
        }).catch((error) => {
            console.log(error)
        })
    }
  return (
    <>
        <div className={styles.header}>
            <h1 className='titulo-perfil'>MEU PERFIL</h1>
            {!isEdit && <button className='btn-default-bgRosa-perfil' onClick={()=> setIsEdit(true)}>Editar</button>}
            {isEdit && (
                <div>
                    <button style={{marginRight: '10px'}} className='btn-default-bgTransparent-perfil' onClick={cancelarEdit}>Cancelar</button>
                    <button className='btn-default-bgRosa-perfil' onClick={handleAtualizarUsuario}>Salvar</button>
                </div>
            )}
        </div>
        <div className={styles.container}>
            <div className={styles.imagemUsuario}>
                <img src={user.imgUsuario ? user.imgUsuario : imgPerfil} alt="img de perfil" />
                {isEdit && <button className={styles.editar}>
                    <MdEdit color='#fff' fontSize={34}/>
                </button>}
            </div>
                    <div className={styles.infoUsuario}>
                        <div className={styles.inputsLados}>
                            <InputMeusDados label='Nome' onValue={name} onSet={setName} edit={isEdit}/>
                            <InputMeusDados label='E-mail' onValue={email} onSet={setEmail} edit={isEdit}/>
                        </div>
                        <div className={styles.inputsLados}>
                            <InputMeusDados label='Telefone' onValue={telefone} onSet={setTelefone} edit={isEdit}/>
                            <InputMeusDados label='Quantidade de reservas' onValue={quantidadeReserva} onSet={setQuantidadeReserva} edit={isEdit}/>
                        </div>
                </div>

        </div>
    </>
  )
}

export default MeusDados
