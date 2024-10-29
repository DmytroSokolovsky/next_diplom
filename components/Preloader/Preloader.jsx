// Імпортуємо необхідні модулі та компоненти
import { createPortal } from 'react-dom'; 
import preloader from './../../images/preloader.gif'; 
import s from './Preloader.module.scss'; 
import { useEffect, useState } from 'react'; 
import Image from 'next/image'; 

// Компонент Preloader для відображення анімації завантаження
const Preloader = () => {
  // Стан для визначення, чи рендериться компонент на клієнті
  const [isClient, setIsClient] = useState(false);
  
  // Використовуємо useEffect для встановлення isClient в true після першого рендеру
  useEffect(() => {
    setIsClient(true); 
  }, []);

  // Якщо компонент ще не рендериться на клієнті, нічого не повертаємо
  if (!isClient) return null; 

  // Створюємо портал для відображення прелоадера
  return createPortal(
    <div className={s.preloader}>
      <Image priority={true} src={preloader} alt="Loading..." />
    </div>,
    document.body,
  );
};

// Експортуємо компонент Preloader
export default Preloader;
