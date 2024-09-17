import { forwardRef, useImperativeHandle, useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import img1 from '../../assets/decoração.jpg';
import img2 from '../../assets/decoração2.jpg';
import img3 from '../../assets/decoracao4.jpg';
import { Link } from 'react-router-dom';

import styles from './BannerEventos.module.css';

const images = [img1, img2, img3];

const BannerEventos = forwardRef((props, ref) => {
  const carrossel = useRef();
  const [width, setWidth] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      // setWidth(carrossel.current?.offsetWidth);
    setWidth(280)
    };

    updateWidth(); 

    window.addEventListener('resize', updateWidth);

    return () => {
      window.removeEventListener('resize', updateWidth);
    };
  }, []);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex < images.length - 1) {
        return prevIndex + 1;
      }
      return prevIndex; 
    });
  };
  
  const prevImage = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex > 0) {
        return prevIndex - 1;
      }
      return prevIndex;
    });
  };
  

  useImperativeHandle(ref, () => ({
    nextImage,
    prevImage
  }));

  return (
    <div className={styles.container_carrosel}>
      <motion.div ref={carrossel} className={styles.carrossel}>
        <motion.div
          className={styles.inner}
          initial={{ x: 0 }}
          animate={{ x: -currentIndex * width }} 
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {images.map((image, index) => (
            <Link to='/a'>
            <motion.div className={styles.item} key={`carrossel-img-${index}`} style={{ minWidth: width }}>
            <img src={image} alt={`carrossel-img-${index}`} />
          </motion.div>
          </Link>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
});

export default BannerEventos;
