import React, { useEffect, useState } from 'react';
import styles from './DecoracoesEdicao.module.css';
import { criarDecoracao, listarTodasDecoracoes, atualizarDecoracao } from '../../api/api';
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
            toast.error('Erro ao carregar decorações.', { autoClose: 2000 });
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
        // Reseta os campos quando o modal é fechado
        if (isModalOpen) {
            setIdDecoracao('');
            setNome('');
            setFoto('');
            setTipoEvento('');
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
            toggleModal(); // Fecha o modal
            fetchData();
        } catch (error) {
            toast.error('Erro ao criar decoração.', { autoClose: 1000 });
        }
    };

    const atualizarDecoracaoJS = async (data) => {
        try {
            await atualizarDecoracao(data, idDecoracao);
            toast.success('Decoração atualizada com sucesso!', { autoClose: 1000 });
            toggleModal(); // Fecha o modal
            fetchData();
        } catch (error) {
            toast.error('Erro ao atualizar decoração.', { autoClose: 1000 });
        }
    };

    const handleClickSave = () => {
        const data = new FormData();
        data.append('nome', nome);
        data.append('foto', foto);
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
                    <button className="btn-default-bgRosa-perfil" onClick={toggleModal}>
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
                                            src={foto.name ? URL.createObjectURL(foto) : `data:image/jpeg;base64,${foto}`}
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
                            <button onClick={toggleModal} className="btn-default-bgTransparent-perfil">
                                Cancelar
                            </button>
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
                            onClick={() => {
                                setIsModalOpen(true);
                                setIdDecoracao(item.id);
                                setNome(item.nome);
                                setTipoEvento(item.tipoEvento?.id || '');
                                setFoto(item.foto);
                            }}
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
