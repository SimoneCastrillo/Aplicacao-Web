import React, { useEffect, useState } from 'react';
import styles from './DecoracoesEdicao.module.css';
import { criarDecoracao, listarTodasDecoracoes, atualizarDecoracao, deleteDecoracoes } from '../../api/api';
import { toast } from 'react-toastify';

const DecoracoesEdicao = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [idDecoracao, setIdDecoracao] = useState('');
    const [nome, setNome] = useState('');
    const [foto, setFoto] = useState('');
    const [tipoEvento, setTipoEvento] = useState('');
    const [decoracoes, setDecoracoes] = useState([]);

    const fetchData = async () => {
        try {
            const response = await listarTodasDecoracoes();
            setDecoracoes(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error('Erro ao carregar decorações:', error);
            toast.error('Erro ao carregar decorações.', { autoClose: 2000 });
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const toggleModal = (isEditing = false, item = null) => {
        setIsModalOpen(!isModalOpen);

        if (!isEditing) {
            // Resetar campos ao adicionar
            setIdDecoracao('');
            setNome('');
            setFoto('');
            setTipoEvento('');
        } else if (item) {
            // Preencher campos ao editar
            setIdDecoracao(item.id);
            setNome(item.nome || '');
            setFoto(item.foto || '');
            setTipoEvento(item.tipoEvento?.id || '');
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFoto(file);
        }
    };

    const novaDecoracao = async (data) => {
        try {
            await criarDecoracao(data);
            toast.success('Decoração criada com sucesso!', { autoClose: 1000 });
            setIsModalOpen(false);
            fetchData();
        } catch (error) {
            console.error('Erro ao criar decoração:', error.response?.data || error.message);
            toast.error('Erro ao criar decoração.', { autoClose: 1000 });
        }
    };

    const atualizarDecoracaoJS = async (data) => {
        try {
            await atualizarDecoracao(data, idDecoracao);
            toast.success('Decoração atualizada com sucesso!', { autoClose: 1000 });
            setIsModalOpen(false);
            fetchData();
        } catch (error) {
            console.error('Erro ao atualizar decoração:', error.response?.data || error.message);
            toast.error('Erro ao atualizar decoração.', { autoClose: 1000 });
        }
    };

    const handleRemoverDecoracao = async () => {
        try {
            await deleteDecoracoes(idDecoracao);
            toast.success('Decoração removida com sucesso!', { autoClose: 1000 });
            setIsModalOpen(false);
            fetchData();
        } catch (error) {
            console.error('Erro ao remover decoração:', error.response?.data || error.message);
            toast.error('Erro ao remover decoração.', { autoClose: 1000 });
        }
    };

    const handleClickSave = () => {
        const data = new FormData();
        data.append('nome', nome);

        if (foto?.name) {
            data.append('foto', foto); // Adiciona o arquivo se for um novo
        } else if (typeof foto === 'string') {
            data.append('fotoBase64', foto); // Caso seja uma string Base64
        }

        data.append('tipoEventoId', tipoEvento);

        if (idDecoracao === '') {
            novaDecoracao(data);
        } else {
            atualizarDecoracaoJS(data);
        }
    };

    return (
        <div>
            <div className={styles.divTituloBotao}>
                <h1 className={styles.titulo}>DECORAÇÕES</h1>
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
                                    Decoração:
                                    <input
                                        type="text"
                                        className={styles.inputField}
                                        placeholder="Minnie Mouse - 5 Anos"
                                        value={nome}
                                        onChange={(e) => setNome(e.target.value)}
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
                            </div>
                        </div>
                        <div className={styles.modalFooter}>
                            <button onClick={() => toggleModal(false)} className="btn-default-bgTransparent-perfil">
                                Cancelar
                            </button>
                            {idDecoracao && (
                                <button
                                    onClick={handleRemoverDecoracao}
                                    className="btn-default-bgTransparent-perfil"
                                >
                                    Remover
                                </button>
                            )}
                            <button className="btn-default-bgRosa-perfil" onClick={handleClickSave}>
                                Salvar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className={styles.cards}>
                {decoracoes.length > 0 ? (
                    decoracoes.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => toggleModal(true, item)}
                            className={styles.card}
                        >
                            <img
                                className={styles.cardImg}
                                src={`data:image/jpeg;base64,${item.foto}`}
                                alt={item.nome || 'Decoração'}
                            />
                            <p className={styles.cardText}>{item.nome}</p>
                        </button>
                    ))
                ) : (
                    <p className={styles.noDataText}>Nenhuma decoração encontrada.</p>
                )}
            </div>
        </div>
    );
};

export default DecoracoesEdicao;
