import styles from './BannerHome.module.css';
import imgLogo from '../assets/Matriz (1).png';
import { BsChevronDown } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const BannerHome = () => {
  return (
    <div className={styles.container} id='bannerId'>
      <img src={imgLogo} alt="" />
      <Link to="#eventos">
        <BsChevronDown size={50} color='#fff' />
      </Link>
    </div>
  );
};

export default BannerHome;