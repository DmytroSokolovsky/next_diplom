// Імпортуємо необхідні компоненти та стилі
import Script from 'next/script';
import { useEffect, useState } from "react";
import './../styles/global.scss';
import s from './../styles/global.module.scss';
import { UserIdContext } from '../context/UserIdContext';
import { ModalContext } from '../context/ModalContext';
import Head from 'next/head';

// Основний компонент додатку, який обгортає всі інші компоненти
function MyApp({ Component, pageProps }) {
  // Зберігаємо userId
  const [userId, setUserId] = useState(null);

  // Стан для контролю меню
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Додаємо/видаляємо клас 'lock' до тіла сторінки при зміні стану меню
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('lock');
    } else {
      document.body.classList.remove('lock');
    }
  }, [isMenuOpen]);

  // Перевіряємо та встановлюємо userId з параметрів URL або з локального сховища
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      let id = params.get('user_id');
      
      if (id) {
        localStorage.setItem('userId', id); 
        setUserId(id);
      } else {
        const storedId = localStorage.getItem('userId');
        if (storedId) {
          setUserId(storedId);
        }
      }
    }
  }, []);

  // Додаємо/видаляємо клас 'browser' до тіла сторінки залежно від наявності userId
  useEffect(() => {
    if (!userId) {
      document.body.classList.add('browser');
    } else {
      document.body.classList.remove('browser');
    }
  }, [userId]);

  return (
    <>
      {/* Додаємо метадані та іконки для SEO */}
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:image" content="/images/doctors.jpg" />
        <meta property="og:type" content="website" />
        <meta name="telegram:webapp" content="Amel Dental Clinic WebApp для легкого керування записами." />
        <meta name="format-detection" content="telephone=no"></meta>
        <meta name="Author" content="Amel Dental Clinic"></meta>
        <meta name="Copyright" content="Amel Dental Clinic"></meta>
        <meta name="Address" content="м. Дніпро, бул. Слави, 2-Б, ж/м Перемога-5"></meta>
        <meta name="robots" content="index, follow"></meta>
      </Head>
      
      {/* Підключаємо скрипт Telegram WebApp */}
      <Script 
        src="https://telegram.org/js/telegram-web-app.js"
        strategy="beforeInteractive" 
      />

      {/* Забезпечуємо доступ до контекстів UserId та Modal у всьому додатку */}
      <UserIdContext.Provider value={userId}>
        <ModalContext.Provider value={{isMenuOpen, setIsMenuOpen}}>
          <div className={s.wrapper}>
            {/* Рендеримо поточний компонент сторінки */}
            <Component {...pageProps} userId={userId} />
          </div>  
        </ModalContext.Provider>
      </UserIdContext.Provider>
    </>
  );
}

export default MyApp;