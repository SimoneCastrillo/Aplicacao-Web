import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination , Autoplay} from 'swiper/modules'
import img1 from '../assets/teste.jpeg'
import img2 from '../assets/teste.jpeg'
import img3 from '../assets/teste.jpeg'
import img4 from '../assets/teste.jpeg'
import styles from './BannerHome.module.css'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const BannerHome = () => {
  const slides = [img1, img2, img3, img4]
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
