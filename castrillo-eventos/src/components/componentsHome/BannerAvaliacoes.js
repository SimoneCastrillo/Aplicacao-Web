import { forwardRef, useImperativeHandle, useRef } from 'react';
import { motion } from 'framer-motion';
import img1 from '../../assets/imgDecoracaoBanner.jpg';
import img2 from '../../assets/imgDecoracaoBanner2.jpg';
import img3 from '../../assets/teste.jpeg';
import styles from './BannerEventos.module.css';
import styles2 from './BannerAvaliacoes.module.css';
import useWindowWidth from '../../hooks/useWindowWidth';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
const images = [img1, img2, img3, img1,img2, img2];

const BannerAvaliacoes = forwardRef((props, ref) => {
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
        modules={[Navigation, Autoplay]}
        spaceBetween={0}
        slidesPerView={slidesPerView}
        
        autoplay={{ delay: 3000 }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={`carrossel-img-${index}`}>
            <motion.div className={styles.item} style={{ minWidth: 280 }}>
              <img src={image} alt={`carrossel-img-${index}`} />
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
});

export default BannerAvaliacoes;
