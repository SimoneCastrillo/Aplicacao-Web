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
        {slides.map(slide => (
          <SwiperSlide key={slide}>
            <img src={slide} alt='slide' />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default CarrosselHome