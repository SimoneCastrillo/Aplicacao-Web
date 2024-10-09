import { useEffect, useState } from 'react';
import styles from './ModalEscolherDecoracao.module.css'
import { listarDecoracoesPorEvento } from '../../../api/api';
import loadingGif from '../../../assets/loading-gif.gif'
import {BsX} from 'react-icons/bs'
const ModalEscolherDecoracao = ({onCloseEscolherDecoracao, tipoEvento, onSetDecoracao}) => {
  const [decoracoes, setDecoracoes] = useState([]);
  const [loading , setLoading] = useState(true)
  
    useEffect(() => {
    const fetchDecoracoes = async () => {
        try {
            const response = await listarDecoracoesPorEvento(tipoEvento); 
            console.log(response.data);
            setDecoracoes(response.data);
            setLoading(false)
        } catch (error) {
            console.error('Erro ao buscar as decorações:', error);
        }
    };

    fetchDecoracoes();
}, []);
const decoracaoSelecionada = (decoracao)=>{
  onSetDecoracao(decoracao)
  onCloseEscolherDecoracao()
}
  return (
    <div className={styles.container}>
        <div style={{width: '88%', textAlign: 'right'}}>
          <button onClick={onCloseEscolherDecoracao}><BsX color='#fff' size={44}/></button>
        </div>
        <div className={styles.box}>
          <h2 className={styles.titulo}>Decorações</h2>
         {loading && <div className={styles.loading}>
         <img src={loadingGif} alt='loading'/>
          </div>}
         {!loading && <div className={styles.decoracoes}>
         {decoracoes && decoracoes.map((decoracao) => (
            <button key={decoracao.id} className={styles.decoracao}
            onClick={()=> {decoracaoSelecionada(decoracao)}}
            >
              <img src={`data:image/jpeg;base64,${decoracao.foto}`} alt={decoracao.nome} />
              <p>{decoracao.nome}</p>
            </button>
          ))}
         </div>}
        </div>
    </div>
  )
}

export default ModalEscolherDecoracao
