import { forwardRef, useImperativeHandle, useRef } from 'react';
import { motion } from 'framer-motion';

import styles from '../../Eventos/CarrosselEventos/CarrosselEventos.module.css'; 
import styles2 from './CarrosselAvaliacoes.module.css';
import useWindowWidth from '../../../hooks/useWindowWidth';
import { Navigation } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const CarrosselAvaliacoes = forwardRef(({imagensBanner = []} ,ref ) => {
  // console.log('imagens banner aaaa',imagensBanner);
  const swiperRef = useRef(null);
  const larguraTelaDoUsuario = useWindowWidth();

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
    prevImage,
  }));
  const slidesPerView = larguraTelaDoUsuario / 380;
  return (
    <div className={styles2.container}>
      <Swiper
        ref={swiperRef}
        modules={[Navigation]}
        spaceBetween={0}
        slidesPerView={slidesPerView}
      >
        {imagensBanner && imagensBanner.map((image, index) => (
          <SwiperSlide key={`carrossel-img-${index}`}>
            <motion.div className={styles.item} style={{ minWidth: 260 }}>
              <img src={`data:image/jpeg;base64,${image.foto}`} alt={`carrossel-img-${index}`} />
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
});

export default CarrosselAvaliacoes;
