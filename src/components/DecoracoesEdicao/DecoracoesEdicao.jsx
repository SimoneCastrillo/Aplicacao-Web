import React, { useEffect, useState } from 'react';
import styles from './DecoracoesEdicao.module.css';
import { criarDecoracao, listarTodasDecoracoes, atualizarDecoracao } from '../../api/api';
import { toast } from 'react-toastify';

const DecoracoesEdicao = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [idDecoracao, setIdDecoracao] = useState('');
    const [nome, setNome] = useState('');
    const [foto, setFoto] = useState('');
    const [descricao, setDescricao] = useState('');
    const [decoracoes, setDecoracoes] = useState([]); // Garantir que é um array vazio inicialmente

    // Fetch data from API
    const fetchData = async () => {
        try {
            const response = await listarTodasDecoracoes();
            console.log('Resposta da API:', response.data); // Log para depuração
            setDecoracoes(Array.isArray(response.data) ? response.data : []); // Garante que é um array
        } catch (error) {
            console.error('Erro ao listar decorações:', error);
            toast.error('Erro ao carregar decorações.', { autoClose: 2000 });
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
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

    const handleClickSave = () => {
        const data = new FormData();
        data.append('nome', nome);
        data.append('foto', foto);
        data.append('descricao', descricao);

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
                {Array.isArray(decoracoes) && decoracoes.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => {
                            setIsModalOpen(true);
                            setIdDecoracao(item.id);
                            setNome(item.nome);
                            setDescricao(item.descricao);
                            setFoto(item.foto);
                        }}
                        className={styles.card}
                    >
                        <img
                            className={styles.cardImg}
                            src={`data:image/jpeg;base64,${item.foto}`}
                            alt={item.nome}
                        />
                    </button>
                ))}
            </div>
        </div>
    );
};

export default DecoracoesEdicao;
