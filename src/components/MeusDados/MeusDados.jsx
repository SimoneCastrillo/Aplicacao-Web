import styles from './MeusDados.module.css'
import imgPerfil from '../../assets/imgPerfil.png'
import { MdEdit } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import InputMeusDados from './InputMeusDados/InputMeusDados';
import {atualizarUsuario, buscarUsuario} from '../../api/api'
import loadingGif from '../../assets/loading-gif.gif'
import { useNavigate } from 'react-router-dom';
const MeusDados = ({onOpenModalFoto, onImg, onSetImg, onSetNomeUser}) => {
    const [isEdit, setIsEdit] = useState(false);
    const [user, setUser] = useState({});    
    const [loading, setLoading] = useState(false);
    const location = useNavigate();
   
    useEffect(() => {
        const userBanco = async () => {
            setLoading(true)
            try{

                const response = await buscarUsuario(JSON.parse(sessionStorage.usuario).id);
                setName(response.data.nome);
                setEmail(response.data.email);
                setTelefone(response.data.telefone);
                setQuantidadeReserva(response.data.qtdOrcamento);
                setImgUsuario(response.data.foto);
                onSetImg(response.data.foto);
                setUser(response.data);
                onSetNomeUser(response.data.nome);
                sessionStorage.img = response.data.foto;
                setLoading(false)
                sessionStorage.setItem('usuario', JSON.stringify(response.data));
            } catch (error) {
                setLoading(false)
                console.log(error);
            }
        }
        userBanco();
    }, [location] || [])
    
   
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [quantidadeReserva, setQuantidadeReserva] = useState('');
    const [imgUsuario, setImgUsuario] = useState('');
    const [urlImg, setUrlImg] = useState('');

    const cancelarEdit = () => {
        setIsEdit(false)
        setName(user.nome);
        setEmail(user.email);
        setTelefone(user.telefone);
        setQuantidadeReserva(user.qtdOrcamento);
        setImgUsuario(user.foto);
        onSetImg(user.foto);
    }
    
    useEffect(() => {
        setImgUsuario(onImg)
        
        if (onImg && (onImg instanceof File || onImg instanceof Blob)) {
            const imageUrl = URL.createObjectURL(onImg);
            setUrlImg(imageUrl);
            return () => {
                URL.revokeObjectURL(imageUrl);
            };
        } else {
           
            setUrlImg('');
        }
    }, [onImg])
    
    const base64ToBlob = (base64Data, contentType = '') => {
        const byteCharacters = atob(base64Data);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        return new Blob([byteArray], { type: contentType });
    };
    const handleAtualizarUsuario = () => {
        let usuarioBanco = {};
        
        if(!onImg.size){
            
            const blob = base64ToBlob(imgUsuario, 'image/jpeg');
            usuarioBanco = {
                nome: name,
                email,
                foto: blob,
                telefone
            }
        }else {
            usuarioBanco = {
                nome: name,
                email,
                foto: imgUsuario,
                telefone
            }
        }
      console.log(usuarioBanco);
      
        setLoading(true)
        atualizarUsuario(JSON.parse(sessionStorage.usuario).id, usuarioBanco)
        .then((response) => {
            console.log('estou no then');
            
            toast.success('Usuário atualizado com sucesso!',{
                autoClose: 500
            });
            setIsEdit(false);
            setLoading(false)
            setTimeout(() => {
                window.location.reload();
            }, 500);
        }).catch((error) => {
            toast.error('Erro ao atualizar',{
                autoClose: 500
            });
            console.log(error)
            setLoading(false)

        })
    }
  return (
    <>
        <div className={styles.header}>
            <h1 className='titulo-perfil'>MEU PERFIL</h1>
            {!isEdit && <button className='btn-default-bgRosa-perfil' onClick={()=> setIsEdit(true)}>Editar</button>}
            {isEdit && (
            !loading && (
                <div>
                    <button style={{ marginRight: '10px' }} className='btn-default-bgTransparent-perfil' onClick={cancelarEdit}>
                        Cancelar
                    </button>
                    <button className='btn-default-bgRosa-perfil' onClick={handleAtualizarUsuario}>
                        Salvar
                    </button>
                </div>
            ) 
        )}
        </div>
        {loading && (
            <div style={{textAlign: 'center', marginTop: '100px'}}>
                <img  src={loadingGif} width={'50px'} alt="loading" />
            </div>
        )}
        {!loading && (
            <div className={styles.container}>
            <div className={styles.imagemUsuario}>
                <img  src={imgUsuario ? urlImg.includes('blob') ? urlImg : `data:image/jpeg;base64,${imgUsuario}`  : imgPerfil} alt="img de perfil" />
                {isEdit && <button onClick={onOpenModalFoto} className={styles.editar}>
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
                            <InputMeusDados label='Quantidade de reservas' onQtdReservas={true} onValue={quantidadeReserva} onSet={setQuantidadeReserva} edit={isEdit}/>
                        </div>
                </div>

        </div>
        )}
    </>
  )
}

export default MeusDados
