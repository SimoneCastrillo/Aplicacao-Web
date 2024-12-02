import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination , Autoplay} from 'swiper/modules'
import img0 from '../../assets/eventoLove.jpg'
import img1 from '../../assets/imgDecoracaoBanner.jpg'
import img5 from '../../assets/imgDecoracaoBanner5.jpg'
import img6 from '../../assets/imgDecoracaoBanner6.jpg'
import img7 from '../../assets/imgDecoracaoBanner7.jpg'
import styles from './CarrosselHome.module.css'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const textosCarrossel = [
  (
    <>
      <h1>Reserve Sua Festa</h1>
      <p>Um sistema simples e seguro para reservar o espaço perfeito para sua festa, com total personalização no orçamento e atendimento especializado.</p>
    </>
  ),
  (
    <>
      <h1>Orçamento Personalizado</h1>
      <p>Ajuste o orçamento de acordo com as suas necessidades e garanta o melhor custo-benefício para seu evento.</p>
    </>
  ),
  (
    <>
      <h1>Decoração Sob Medida</h1>
      <p>Escolha a decoração ideal para o seu evento, com várias opções para deixar tudo perfeito e do seu jeito.</p>
    </>
  ),
  (
    <>
      <h1>Ambientes Sofisticados</h1>
      <p>Ambientes amplos e confortáveis para receber seus convidados, com todo o espaço necessário para sua celebração.</p>
    </>
  ),
  (
    <>
      <h1>Eventos Inesquecíveis</h1>
      <p>Transforme sua festa em um evento memorável, com nossa infraestrutura e suporte completos para garantir o sucesso do seu evento.</p>
    </>
  )
];


const CarrosselHome = () => {
  const slides = [ img5, img6, img7, img0, img1]
  return (
    <div id='bannerId' className={styles.container}>
       <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        // navigation
        pagination
        autoplay={{ delay: 3000, disableOnInteraction: false }} 
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={slide}>
            <img src={slide} alt='slide' className={styles.imgBanner} />
            <div className={styles.conteudoBanner}>
              {textosCarrossel[i]}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default CarrosselHome 