import React, { useEffect, useState } from 'react';
import styles from './AvaliacoesEdicao.module.css';
import { criarAvaliacao, listarTodasAvaliacoes, atualizarAvaliacao } from '../../api/api'
import { toast } from 'react-toastify';
const AvaliacoesEdicao = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [idAvaliacao, setIdAvaliacao] = useState('');
    const [avaliacao, setAvaliacao] = useState('');
    const [foto, setFoto] = useState('');
    const [tipoEvento, setTipoEvento] = useState('');
    const [descricao, setDescricao] = useState('');
    const [avaliacoes, setAvaliacoes] = useState([]);


    const fetchData = async () => {
        const response = await listarTodasAvaliacoes();
        console.log(response.data);
        setAvaliacoes(response.data);
    }

    useEffect(() => {
        fetchData();
    },[])
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            console.log(file);
            setFoto(file); 
        }
    };
    const novaAvaliacao = async (data) => {
        try {
            const result = await criarAvaliacao(data);
            console.log('Sucesso:', result);
            toast.success('Avaliação criada com sucesso!', {
                autoClose: 1000,
            });
            setIsModalOpen(false);
            fetchData()
        } catch (error) {
            console.error('Erro:', error.response?.data || error.message);
            toast.error('Erro ao criar avaliação.', {
                autoClose: 1000
            });
        }
    }
    const atualizarAvaliacaoJS = async (data) => {
        try {
            const result = await atualizarAvaliacao(data, idAvaliacao);
            console.log('Sucesso:', result);
            toast.success('Avaliação atualizada com sucesso!', {
                autoClose: 1000,
            });
            setIsModalOpen(false);
            fetchData()
        } catch (error) {
            console.error('Erro:', error.response?.data || error.message);
            toast.error('Erro ao atualizar avaliação.', {
                autoClose: 1000
            });
    }
    }
    const handleClickSave = () => {
        const data = new FormData();
        data.append('texto', avaliacao); 
        data.append('foto', foto); 
        data.append('tipoEventoId', tipoEvento); 
        data.append('nomeCliente', 'Robson'); 
    
        if (idAvaliacao == '') {
            novaAvaliacao(data);
        } else {
            if (foto?.name) {
                atualizarAvaliacaoJS(data);
            } else {
                
                const base64Image = foto; 
                const byteString = atob(base64Image); 
                const arrayBuffer = new ArrayBuffer(byteString.length);
                const uint8Array = new Uint8Array(arrayBuffer);
    
                for (let i = 0; i < byteString.length; i++) {
                    uint8Array[i] = byteString.charCodeAt(i);
                }
    
               
                const file = new File([uint8Array], 'image.jpg', { type: 'image/jpeg' });
                data.set('foto', file); 
                
                atualizarAvaliacaoJS(data); 
            }
        }
    };
    
    return (
        <div>
            <div className={styles.divTituloBotao}>
                <h1 className={styles.titulo}>AVALIAÇÕES</h1>
                <div className={styles.divBotao}>
                    <button className='btn-default-bgRosa-perfil' onClick={toggleModal}>Adicionar</button>
                </div>
            </div>

            {isModalOpen && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <div className={styles.modalBody}>
                            <div className={styles.imageContainer}>
                                <div className={styles.image}>
                                    {foto ? (
                                       <img 
                                       src={foto?.name 
                                         ? URL.createObjectURL(foto) 
                                         : `data:image/jpeg;base64,${foto}`} 
                                       alt="Preview" 
                                       className={styles.previewImage} 
                                     />
                                    ) : (
                                        <span>Sem imagem</span>
                                    )}
                                </div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className={styles.editButton}
                                    onChange={handleImageUpload}
                                />
                            </div>
                            <div className={styles.fieldsContainer}>
                                <label className={styles.label}>Avaliação:
                                    <input
                                        type="text"
                                        className={styles.inputField}
                                        placeholder="Muito legal"
                                        value={avaliacao}
                                        onChange={(e) => setAvaliacao(e.target.value)}
                                    />
                                </label>
                                <label className={styles.label}>Evento:
                                    <select
                                        className={styles.inputField}
                                        value={tipoEvento}
                                        onChange={(e) => setTipoEvento(e.target.value)}
                                    >
                                        <option value="">Selecione</option>
                                        <option value="1">Infantil</option>
                                        <option value="2">Casamento</option>
                                        <option value="3">Debutante</option>
                                        <option value="4">Coffee Break</option>
                                        <option value="5">Aniversário</option>
                                        <option value="6">Aluguel_Espaço</option>
                                        <option value="7">Outros</option>
                                    </select>
                                </label>
                                
                                <label className={styles.label}>Descrição:
                                    <textarea
                                        className={styles.textareaField}
                                        placeholder="Máximo de 200 caracteres"
                                        rows="4"
                                        value={descricao}
                                        onChange={(e) => setDescricao(e.target.value)}
                                    />
                                </label>
                            </div>
                        </div>
                        <div className={styles.modalFooter}>
                            <button onClick={toggleModal} className='btn-default-bgTransparent-perfil'>Cancelar</button>
                            <button
                                className='btn-default-bgRosa-perfil'
                                onClick={handleClickSave}
                            >
                                Salvar
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <div className={styles.cards}>
                {avaliacoes && avaliacoes.map((item) => (
                    <button
                    onClick={()=>{
                        setIsModalOpen(true);
                        setIdAvaliacao(item.id);
                        setAvaliacao(item.texto);
                        setTipoEvento(item.tipoEvento.id);
                        setDescricao(item.descricao);
                        setFoto(item.foto);
                        console.log(item.foto);
                    }}
                    className={styles.card}>
                        <img className={styles.cardImg} src={`data:image/jpeg;base64,${item.foto}`} alt={item.texto} />
                    </button>
                ))}
            </div>
        </div>
    );
};

export default AvaliacoesEdicao;
