import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { Navigation } from 'swiper/modules'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { listarDecoracoesPorEvento } from '../../api/api';
import styles from './BannerDecoracoes.module.css';
import useWindowWidth from '../../hooks/useWindowWidth';



const BannerDecoracoes = forwardRef((props, ref) => {
  const swiperRef = useRef(null);
  const larguraTelaDoUsuario = useWindowWidth();
  const [images, setImages] = useState([])
  const { nome } = useParams();
  useEffect(() => {
    const fetchDecoracoes = async () => {
        try {
            const response = await listarDecoracoesPorEvento(nome); 
            console.log(response.data);
            setImages(response.data);
            
        } catch (error) {
            console.error('Erro ao buscar as decorações:', error);
        }
    };

    fetchDecoracoes();
  }, []);

  const nextImage = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const prevImage = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  useImperativeHandle(ref, () => ({
    nextImage,
    prevImage
  }));

  const slidesPerView = larguraTelaDoUsuario / 380

  return (
    <Swiper
    ref={swiperRef}
    modules={[Navigation]}
      spaceBetween={0}
      slidesPerView={slidesPerView}
    >
      {images && images.map((image) => (
        <SwiperSlide key={image.id}>
          {console.log(image)}
            <motion.div className={styles.item} key={image.id} style={{ minWidth: 280 }}>
            <img src={`data:image/jpeg;base64,${image.foto}`} alt={image.nome} />
               <div className={styles.infoEvento}>
    
    <h3 style={{overflowWrap: 'break-word', width: '100%'}}>{image.nome}</h3>
               </div>
             </motion.div>
         </SwiperSlide>
      ))}
    </Swiper>
  );
});

export default BannerDecoracoes;