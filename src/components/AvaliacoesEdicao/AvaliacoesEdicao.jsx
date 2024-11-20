import React, { useState } from 'react';
import styles from './AvaliacoesEdicao.module.css';
import { criarAvaliacao } from '../../api/api'
import { toast } from 'react-toastify';
const AvaliacoesEdicao = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [avaliacao, setAvaliacao] = useState('');
    const [foto, setFoto] = useState('');
    const [tipoEvento, setTipoEvento] = useState('');
    const [descricao, setDescricao] = useState('');

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0]; // Obtém o primeiro arquivo selecionado
        if (file) {
            console.log('Imagem carregada (File):', file); // Verifique o objeto do arquivo no console
            setFoto(file); // Define o arquivo como estado
        }
    };
    const handleClickSave = async () => {
        const data = new FormData();
        data.append('texto', avaliacao); // Título da avaliação
        data.append('foto', foto); // Arquivo enviado
        data.append('tipoEventoId', tipoEvento); // ID do tipo de evento
        data.append('nomeCliente', 'Robson'); // Nome do cliente

        data.forEach((value, key) => {
            console.log(`${key}:`, value);
        });

        try {
            const result = await criarAvaliacao(data);
            console.log('Sucesso:', result);
            toast.success('Avaliação criada com sucesso!');
        } catch (error) {
            console.error('Erro:', error.response?.data || error.message);
            toast.error('Erro ao criar avaliação.');
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
                                        <img src={URL.createObjectURL(foto)} alt="Preview" className={styles.previewImage} />
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
                                        <option value="4">Coffee_Break</option>
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
        </div>
    );
};

export default AvaliacoesEdicao;
