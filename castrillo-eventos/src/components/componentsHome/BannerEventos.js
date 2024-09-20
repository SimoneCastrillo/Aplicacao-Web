import { forwardRef, useImperativeHandle, useRef } from 'react';
import { motion } from 'framer-motion';
import imgCasamento from '../../assets/casamento.jpg';
import imgDebutante from '../../assets/debutante.jpg';
import imgInfantil from '../../assets/decoracao4.jpg';
import imgCoffeBreak from '../../assets/coffebreak.jpeg';
import imgPiscina from '../../assets/piscina.jpg';
import { Link } from 'react-router-dom';
import { Navigation , Autoplay} from 'swiper/modules'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import styles from './BannerEventos.module.css';
import useWindowWidth from '../../hooks/useWindowWidth';

const images = [
  { img: imgInfantil, tipoEvento: 'Infantil', descricao: 'Prepare-se para um dia cheio de diversão, alegria e muitas brincadeiras no nosso evento especial para as crianças!' },
  { img: imgDebutante, tipoEvento: 'Debutante', descricao: 'Uma festa de debutante inesquecível, com muito glamour, sofisticação e momentos emocionantes. Decoração encantadora, música vibrante e uma pista de dança animada fazem dessa celebração uma experiência mágica e cheia de surpresas.' },
  { img: imgCasamento, tipoEvento: 'Casamento', descricao: 'Uma celebração de amor inesquecível, com elegância, música envolvente e momentos emocionantes para marcar esse dia especial.' },
  { img: imgCoffeBreak, tipoEvento: 'Coffe Break', descricao: 'Um coffee break perfeito, com delícias variadas, bebidas quentes e um ambiente agradável para relaxar e conversar.' },
  { img: imgPiscina, tipoEvento: 'Aluguel do espaço', descricao: 'Espaço versátil e elegante, ideal para todo tipo de evento, com infraestrutura completa para garantir conforto e praticidade.' }
];

const BannerEventos = forwardRef((props, ref) => {
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
    prevImage
  }));

  const slidesPerView = larguraTelaDoUsuario / 380

  return (
    <Swiper
    ref={swiperRef}
    modules={[Navigation, Autoplay]}
      spaceBetween={0}
      slidesPerView={slidesPerView}
      autoplay={{ delay: 3000}}
      
    >
      {images.map((image, index) => (
        <SwiperSlide key={image.tipoEvento}>
          <Link to={`/evento/${(image.tipoEvento || '').toLowerCase()}`}>
            <motion.div className={styles.item} key={image.tipoEvento} style={{ minWidth: 280 }}>
              <img src={image.img} alt={image.tipoEvento} />
              <div className={styles.infoEvento}>
                <h3>{image.tipoEvento}</h3>
                <p className='descricao'>{image.descricao}</p>
              </div>
            </motion.div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
});

export default BannerEventos;