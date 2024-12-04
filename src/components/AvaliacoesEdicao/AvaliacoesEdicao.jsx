import React, { useEffect, useState } from 'react';
import styles from './AvaliacoesEdicao.module.css';
import { criarAvaliacao, listarTodasAvaliacoes, atualizarAvaliacao, deleteAvaliacoes } from '../../api/api';
import { toast } from 'react-toastify';
import loadingGif from '../../assets/loading-gif.gif'

const AvaliacoesEdicao = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [idAvaliacao, setIdAvaliacao] = useState('');
    const [avaliacao, setAvaliacao] = useState('');
    const [foto, setFoto] = useState('');
    const [loading, setLoading] = useState(false);
    const [tipoEvento, setTipoEvento] = useState('');
    const [descricao, setDescricao] = useState(''); // Campo para descrição
    const [avaliacoes, setAvaliacoes] = useState([]); // Inicializado como array vazio

    const fetchData = async () => {
        setLoading(true);
        try {
            setLoading(false);
            console.log(loading)
            const response = await listarTodasAvaliacoes();
            console.log(response.data);
            setAvaliacoes(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            setLoading(false);
            console.log(loading)
            console.error('Erro ao buscar avaliações:', error);
            toast.error('Erro ao carregar avaliações.', { autoClose: 2000 });
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const toggleModal = (isEditing = false, item = null) => {
        setIsModalOpen(!isModalOpen);

        if (!isEditing) {
            // Resetar campos ao adicionar
            setIdAvaliacao('');
            setAvaliacao('');
            setFoto('');
            setTipoEvento('');
            setDescricao('');
        } else if (item) {
            console.log(item); // Depuração para verificar o objeto recebido
            // Preencher campos ao editar
            setIdAvaliacao(item.id);
            setAvaliacao(item.texto || ''); // Garantir que texto seja preenchido ou vazio
            setTipoEvento(item.tipoEvento?.id || ''); // Validação defensiva
            setDescricao(item.nomeCliente || ''); // Adicionar descrição corretamente
            setFoto(item.foto);
        }
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
            await criarAvaliacao(data);
            toast.success('Avaliação criada com sucesso!', { autoClose: 1000 });
            setIsModalOpen(false);
            fetchData();
        } catch (error) {
            console.error('Erro ao criar avaliação:', error.response?.data || error.message);
            toast.error('Erro ao criar avaliação.', { autoClose: 1000 });
        }
    };

    const atualizarAvaliacaoJS = async (data) => {
        try {
            await atualizarAvaliacao(data, idAvaliacao);
            toast.success('Avaliação atualizada com sucesso!', { autoClose: 1000 });
            setIsModalOpen(false);
            fetchData();
        } catch (error) {
            console.error('Erro ao atualizar avaliação:', error.response?.data || error.message);
            toast.error('Erro ao atualizar avaliação.', { autoClose: 1000 });
        }
    };

    const handleRemoverAvaliacao = async () => {
        try {
            await deleteAvaliacoes(idAvaliacao);
            toast.success('Avaliação removida com sucesso!', { autoClose: 1000 });
            toggleModal();
            fetchData();
        } catch (error) {
            toast.error('Erro ao remover avaliação.', { autoClose: 1000 });
        }
    };

    const handleClickSave = () => {
        const data = new FormData();
        data.append('texto', avaliacao);

        // Verifica se foto é arquivo ou Base64 e adiciona corretamente
        if (foto && foto.name) {
            data.append('foto', foto); // Arquivo
        } else if (typeof foto === 'string') {
            data.append('fotoBase64', foto); // String Base64 para edição
        }

        data.append('tipoEventoId', tipoEvento);
        data.append('nomeCliente', descricao); // Adiciona a descrição no envio
        

        if (idAvaliacao === '') {
            novaAvaliacao(data);
        } else {
            atualizarAvaliacaoJS(data);
        }
    };

    return (
        <div>
            <div className={styles.divTituloBotao}>
                <h1 className={styles.titulo}>AVALIAÇÕES</h1>
                <div className={styles.divBotao}>
                    <button className="btn-default-bgRosa-perfil" onClick={() => toggleModal(false)}>
                        Adicionar
                    </button>
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
                                            src={
                                                foto?.name
                                                    ? URL.createObjectURL(foto)
                                                    : `data:image/jpeg;base64,${foto}`
                                            }
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
                                    className={styles.hiddenInput}
                                    id="fileInput"
                                    onChange={handleImageUpload}
                                />
                                <button
                                    className={styles.editButton}
                                    onClick={() => document.getElementById('fileInput').click()}
                                >
                                    ✏️
                                </button>
                            </div>

                            <div className={styles.fieldsContainer}>
                                <label className={styles.label}>
                                    Avaliação:
                                    <input
                                        type="text"
                                        className={styles.inputField}
                                        placeholder="Muito legal"
                                        value={avaliacao}
                                        onChange={(e) => setAvaliacao(e.target.value)}
                                    />
                                </label>
                                <label className={styles.label}>
                                    Evento:
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

                                <label className={styles.label}>
                                    Descrição:
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
                            <button onClick={() => toggleModal(false)} className="btn-default-bgTransparent-perfil">
                                Cancelar
                            </button>
                            {idAvaliacao&& (
                                <button
                                    onClick={handleRemoverAvaliacao}
                                    className="btn-default-bgTransparent-perfil"
                                >
                                    Remover
                                </button>
                            )}
                            <button
                                className="btn-default-bgRosa-perfil"
                                onClick={handleClickSave}
                            >
                                Salvar
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <div className={styles.cards}>
                {loading === false && avaliacoes && avaliacoes.length > 0 && (
                    avaliacoes.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => toggleModal(true, item)}
                            className={styles.card}
                        >
                            <img
                                className={styles.cardImg}
                                src={`data:image/jpeg;base64,${item.foto}`}
                                alt={item.nome || 'Avaliacao'}
                            />
                            <p className={styles.cardText}>{item.texto}</p>
                        </button>
                    ))
                )}
                {loading === false && avaliacoes && avaliacoes.length === 0 && (
                    <img width={50} height={50} src={loadingGif} alt='loading' />
                )}
                {loading === true && <p>Carregando...</p>}
            </div>
        </div>
    );
};

export default AvaliacoesEdicao;
