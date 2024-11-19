import React, { useState } from 'react';
import styles from './AvaliacoesEdicao.module.css';

const AvaliacoesEdicao = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
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
                                {/* Placeholder para a imagem */}
                                <div className={styles.image}></div>
                                <button className={styles.editButton}>✏️</button>
                            </div>
                            <div className={styles.fieldsContainer}>
                                <label className={styles.label}>Avaliação:
                                    <input type="text" className={styles.inputField} placeholder="Muito legal" />
                                </label>
                                <label className={styles.label}>Evento:
                                    <input type="text" className={styles.inputField} placeholder="Aniversário" />
                                </label>
                                <label className={styles.label}>Descrição:
                                    <textarea className={styles.textareaField} placeholder="Máximo de 200 caracteres" rows="4"></textarea>
                                </label>
                            </div>
                        </div>
                        <div className={styles.modalFooter}>
                            <button onClick={toggleModal} className='btn-default-bgTransparent-perfil'>Cancelar</button>
                            <button className='btn-default-bgRosa-perfil'>Salvar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AvaliacoesEdicao;
