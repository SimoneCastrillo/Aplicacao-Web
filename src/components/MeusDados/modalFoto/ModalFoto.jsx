import React, { useState } from 'react'
import styles from './ModalFoto.module.css'
import {BsX} from 'react-icons/bs'
import imgPerfil from '../../../assets/imgPerfil.png'

const ModalFoto = ({onCloseModalFoto, onSetImg, onFoto}) => {
    const [foto, setFoto] = useState(onFoto);
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
         
          const imageUrl = URL.createObjectURL(file);
          setFoto(imageUrl);
            onSetImg(file);
            
        }
      };
      const validarFoto = () => {
        if(foto.includes('blob:', foto)){
          
          return foto
        }
        
        return `data:image/jpeg;base64,${foto}`
      }
  return (
    <div className={styles.container}>
        <div style={{width: '65%', textAlign: 'right'}}>
          <button onClick={onCloseModalFoto}><BsX color='#fff' size={44}/></button>
        </div>
        <div className={styles.box}>
            <img className={styles.foto} src={foto ? validarFoto()  : imgPerfil} alt="img de perfil" />
            <input type="file" onChange={handleFileChange} className={styles.input}/>
        </div>
    </div>
  )
}

export default ModalFoto
