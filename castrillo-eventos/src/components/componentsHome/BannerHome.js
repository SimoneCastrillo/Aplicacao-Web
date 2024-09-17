import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination , Autoplay} from 'swiper/modules'
import img0 from '../../assets/eventoLove.jpg'
import img1 from '../../assets/imgDecoracaoBanner.jpg'
import img2 from '../../assets/imgDecoracaoBanner2.jpg'
import img3 from '../../assets/imgDecoracaoBanner3.jpg'
import img4 from '../../assets/imgDecoracaoBanner4.jpg'
import img5 from '../../assets/imgDecoracaoBanner5.jpg'
import img6 from '../../assets/imgDecoracaoBanner6.jpg'
import img7 from '../../assets/imgDecoracaoBanner7.jpg'
import styles from './BannerHome.module.css'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const BannerHome = () => {
  const slides = [ img5, img6, img7, img0, img1, img2, img3, img4]
  return (
    <div className={styles.container}>
       <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
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

export default BannerHome