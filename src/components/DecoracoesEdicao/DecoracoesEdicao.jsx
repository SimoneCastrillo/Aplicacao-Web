import React, { useState } from 'react';
import styles from './DecoracoesEdicao.module.css';

const DecoracoesEdicao = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return ( 
        <div>
            <div className={styles.divTituloBotao}>
                <h1 className={styles.titulo}>DECORAÇÕES</h1>
                <div className={styles.divBotao}>
                    <button className={styles.botaoAdicionar} onClick={toggleModal}>Adicionar</button>
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
                                <label className={styles.label}>Decoração:
                                    <input type="text" className={styles.inputField} placeholder="Minnie Mouse - 5 Anos" />
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
                            <button onClick={toggleModal} className={styles.cancelButton}>Cancelar</button>
                            <button className={styles.saveButton}>Salvar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DecoracoesEdicao;
