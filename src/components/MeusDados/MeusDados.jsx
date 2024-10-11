import styles from './MeusDados.module.css'
import imgPerfil from '../../assets/imgPerfil.png'
import { MdEdit } from 'react-icons/md';
import { useState } from 'react';
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
            {!isEdit && (
                <div className={styles.infoUsuario}>
                    <div className={styles.inputsLados}>
                    <div className={styles.controleInfo}>
                        <label>Nome</label>
                        <div className={styles.caixa}>
                            <p>{name}</p>
                        </div>
                    </div> 
                    <div className={styles.controleInfo}>
                        <label>E-mail</label>
                        <div className={styles.caixa}>
                            <p>{email}</p>
                        </div>
                    </div> 
                    <div className={styles.controleInfo}>
                        <label>Quantidade de reservas</label>
                        <div className={styles.caixa}>
                            <p>{quantidadeReserva}</p>
                        </div>
                    </div>
                    </div>
                     <div className={styles.inputsLados}>
                     <div className={styles.controleInfo}>
                        <label>Sobrenome</label>
                        <div className={styles.caixa}>
                            <p>{sobrenome}</p>
                        </div>
                    </div> <div className={styles.controleInfo}>
                        <label>Telefone</label>
                        <div className={styles.caixa}>
                            <p>{telefone}</p>
                        </div>
                    </div>    
                     </div>
                </div>
            )}
            {isEdit && (
               
                    <div className={styles.infoUsuario}>
                    <div className={styles.inputsLados}>
                    <div className={styles.controleInfo}>
                        <label>Nome</label>
                        <input type="text" className={styles.input} value={name} onChange={(e) => setName(e.target.value)}/>
                    </div> 
                    <div className={styles.controleInfo}>
                        <label>E-mail</label>
                        <input type="text" className={styles.input} value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div> 
                    <div className={styles.controleInfo}>
                        <label>Quantidade de reservas</label>
                        <input type="text" className={styles.input} value={quantidadeReserva} onChange={(e) => setQuantidadeReserva(e.target.value)}/>
                    </div>
                    </div>
                     <div className={styles.inputsLados}>
                     <div className={styles.controleInfo}>
                        <label>Sobrenome</label>
                        <input type="text" className={styles.input} value={sobrenome} onChange={(e) => setSobrenome(e.target.value)}/>

                    </div> <div className={styles.controleInfo}>
                        <label>Telefone</label>
                        <input type="text" className={styles.input} value={telefone} onChange={(e) => setTelefone(e.target.value)}/>
                    </div>    
                     </div>
                </div>
            )}
        </div>
    </>
  )
}

export default MeusDados
