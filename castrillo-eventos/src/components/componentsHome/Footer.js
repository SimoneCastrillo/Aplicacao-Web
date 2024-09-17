import React, { useState } from 'react';
import styles from './Footer.module.css';
import imgLogo from '../../assets/Matriz (1).png';
import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css'; 
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [viewState, setViewState] = useState({
    longitude: -46.78806700381357, 
    latitude: -23.668215140977676, 
    zoom: 14,
  });

  return (
    <footer className={styles.container}>
      <div>
        <img src={imgLogo} alt="" />
        <ul className={styles.lista_redes}>
          <li><Link to=''><FaFacebook size={20}/></Link></li>
          <li><Link to=''><FaInstagram size={20}/></Link></li>
          <li><Link to=''><FaWhatsapp size={20}/></Link></li>
        </ul>
      </div>

      <div style={{  width: '254px', height: '400px' }}> 
        <Map
          {...viewState}
          mapboxAccessToken="pk.eyJ1IjoiaWdvcmFudGhvbnkiLCJhIjoiY20xNTExYzBzMDJqczJrb3NwNDdtYzFyeCJ9.n12FyiERWUs3wSNS0y8lTg"
          style={{ width: '254px', height: '320px', borderRadius: '10px' }} 
          mapStyle="mapbox://styles/mapbox/streets-v11"
          onMove={(evt) => setViewState(evt.viewState)}
        >
          <Marker longitude={-46.78806700381357} latitude={-23.668215140977676} />
        </Map>
        <p className='descricao'
        style={{textAlign: 'center'}}>R. Gen. Ribamar de Miranda, 330
        Parque Fernanda - São Paulo</p>
      </div>
    </footer>
  );
}

export default Footer;
