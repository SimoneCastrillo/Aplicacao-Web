import { useEffect, useState } from 'react';
import styles from './ModalEscolherDecoracao.module.css';
import { listarDecoracoesPorEvento } from '../../../api/api';
import loadingGif from '../../../assets/loading-gif.gif';
import { BsX } from 'react-icons/bs';

const ModalEscolherDecoracao = ({ onCloseEscolherDecoracao, tipoEvento, onSetDecoracao }) => {
  const [decoracoes, setDecoracoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [decoracaoSelecionada, setDecoracaoSelecionada] = useState(null);

  useEffect(() => {
    const fetchDecoracoes = async () => {
      try {
        const response = await listarDecoracoesPorEvento(tipoEvento);
        console.log(response.data);
        setDecoracoes(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar as decorações:', error);
      }
    };

    fetchDecoracoes();
  }, []);

  const handleDecoracaoSelecionada = (decoracao) => {
    setDecoracaoSelecionada(decoracao);
  };

  const handleConfirmarDecoracao = () => {
    onSetDecoracao(decoracaoSelecionada);
    onCloseEscolherDecoracao();
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h2 className={styles.titulo}>SELECIONE A DECORAÇÃO</h2>
        {loading && (
          <div className={styles.loading}>
            <img src={loadingGif} alt="loading" />
          </div>
        )}
        {!loading && (
          <div className={styles.decoracoes}>
            {decoracoes &&
              decoracoes.map((decoracao) => (
                <button
                  key={decoracao.id}
                  className={`${styles.decoracao} ${
                    decoracaoSelecionada && decoracaoSelecionada.id === decoracao.id ? styles.decoracaoSelecionada : ''
                  }`}
                  onClick={() => handleDecoracaoSelecionada(decoracao)}
                >
                  <img src={`data:image/jpeg;base64,${decoracao.foto}`} alt={decoracao.nome} />
                  <div className={styles.infoEvento}>
                    <h3>{decoracao.nome}</h3>
                   </div>
                </button>
              ))}
          </div>
        )}
        {!loading && (
          <div className={styles.footer}>
            <button className="btn-default-bgTransparent" onClick={onCloseEscolherDecoracao}>
              Cancelar
            </button>
            <button className="btn-default-bgRosa" onClick={handleConfirmarDecoracao} disabled={!decoracaoSelecionada}>
              Selecionar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalEscolherDecoracao;
