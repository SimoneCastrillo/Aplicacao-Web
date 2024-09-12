import { forwardRef, useImperativeHandle, useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import img1 from '../assets/imgDecoracaoBanner.jpg';
import img2 from '../assets/imgDecoracaoBanner2.jpg';
import img3 from '../assets/teste.jpeg';
import img4 from '../assets/teste.jpeg';
import img5 from '../assets/teste.jpeg';
import img6 from '../assets/teste.jpeg';
import img7 from '../assets/imgDecoracaoBanner2.jpg';
import img8 from '../assets/imgDecoracaoBanner2.jpg';

import styles from './BannerEventos.module.css';

const images = [img1, img2, img3, img4, img5, img6, img7, img8];

const BannerEventos = forwardRef((props, ref) => {
  const carrossel = useRef();
  const [width, setWidth] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      setWidth(carrossel.current?.offsetWidth);
    // setWidth(350)
    };

    updateWidth(); 

    window.addEventListener('resize', updateWidth);

    return () => {
      window.removeEventListener('resize', updateWidth);
    };
  }, []);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
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
            <motion.div className={styles.item} key={index} style={{ minWidth: width }}>
              <img src={image} alt={`carrossel-img-${index}`} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
});

export default BannerEventos;
