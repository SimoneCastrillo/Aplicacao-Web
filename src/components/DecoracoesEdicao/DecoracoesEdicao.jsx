import React, { useEffect, useState } from 'react';
import styles from './DecoracoesEdicao.module.css';
import { criarDecoracao, listarTodasDecoracoes, atualizarDecoracao, deleteDecoracoes, listarTipoEventosPorBuffet } from '../../api/api';
import { toast } from 'react-toastify';
import loadingGif from '../../assets/loading-gif.gif';
const buffetIdEnv = process.env.REACT_APP_BUFFET_ID;

const DecoracoesEdicao = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [idDecoracao, setIdDecoracao] = useState('');
    const [nome, setNome] = useState('');
    const [foto, setFoto] = useState('');
    const [tipoEvento, setTipoEvento] = useState('');
    const [decoracoes, setDecoracoes] = useState([]);
    const [tiposDeEvento, setTiposDeEvento] = useState([]);
    const fetchData = async () => {
        try {
            const response = await listarTodasDecoracoes();
            console.log('decoracoes', response.data)
            setDecoracoes(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error('Erro ao carregar decorações:', error);
            toast.error('Erro ao carregar decorações.', { autoClose: 2000 });
        }
    };

    useEffect(() => {
        const fetchTiposDeEvento = async () => {
            try {
              const response = await listarTipoEventosPorBuffet(buffetIdEnv);
              setTiposDeEvento(response.data);
              setTipoEvento(response.data[0]?.id || ''); 
              console.log('tipo de evento' , response.data[0].id)
            } catch (error) {
              console.error("Erro ao buscar tipos de evento:", error);
            }
          }
        fetchTiposDeEvento();
        fetchData();

    }, []);

    const toggleModal = (isEditing = false, item = null) => {
        setIsModalOpen(!isModalOpen);

        if (!isEditing) {
            setIdDecoracao('');
            setNome('');
            setFoto('');
            setTipoEvento('');
        } else if (item) {
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
            await criarDecoracao(data, tipoEvento, 1);
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
    function base64ToFileAuto(base64String) {
    let base64Data = base64String;
    let mimeType = 'image/jpeg'; // valor padrão
    let filename = 'imagem.jpg';

    // Caso contenha metadata (data:image/jpeg;base64,...)
    if (base64String.includes('base64,')) {
        const [metadata, data] = base64String.split(',');
        base64Data = data;

        const mimeMatch = metadata.match(/data:(.*);base64/);
        if (mimeMatch) {
            mimeType = mimeMatch[1];
            const extension = mimeType.split('/')[1] || 'jpg';
            filename = `imagem.${extension}`;
        }
    }

    try {
        const byteString = atob(base64Data);
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);

        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        return new File([ab], filename, { type: mimeType });
    } catch (error) {
        throw new Error('Base64 inválido.');
    }
}


    const handleClickSave = () => {
        const data = new FormData();
        data.append('nome', nome);

        if (foto?.name) {
            console.log('tipo evento', tipoEvento)
            data.append('foto', foto); 
        }  
        if (typeof foto === 'string') {
            try {
                const base64Foto = base64ToFileAuto(foto);
                console.log('base64Foto', base64Foto)
                data.append('foto', base64Foto);
            } catch (err) {
                console.error('Erro ao converter base64 para File:', err);
                toast.error('Erro ao processar imagem base64.', { autoClose: 2000 });
                return;
            }
        }

        data.append('tipoEventoId', tipoEvento);
        data.append('buffetId', 1);
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
                                        className={`${styles.inputField} ${styles.selectField}`}
                                        value={tipoEvento}
                                        onChange={(e) => {
                                            setTipoEvento(e.target.value)
                                            console.log(e.target.value)
                                        }}
                                    >
                                        <option value="">Selecione</option>
                                        {tiposDeEvento.map((tipo) => (
                                            
                                            <option key={tipo.id} value={tipo.id}>
                                                {tipo.nome}
                                            </option>
                                        ))}
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
                    <img width={50} height={50} src={loadingGif} alt='loading' />


                )}
            </div>
        </div>
    );
};

export default DecoracoesEdicao;
