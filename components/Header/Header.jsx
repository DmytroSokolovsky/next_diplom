// Імпортуємо необхідні модулі та компоненти
import Link from "next/link";
import { useContext } from "react";
import { useRouter } from "next/router";
import { UserIdContext } from "../../context/UserIdContext"; 
import s from './Header.module.scss';
import cn from 'classnames'; 
import { ModalContext } from "../../context/ModalContext";

// Компонент Header
const Header = () => {
  // Отримуємо доступ до маршрутизатора
  const router = useRouter();

  // Отримуємо userId з контексту
  const userId = useContext(UserIdContext);

  // Отримуємо статус меню з контексту
  const { isMenuOpen, setIsMenuOpen } = useContext(ModalContext);
  
  // Функція для перемикання стану меню
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // Функція для закриття меню
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Класи для меню на основі стану
  let menuClass = cn(s.header__menu, s.menu, {
    [s.active]: isMenuOpen, 
    [s.active_browser]: !userId, 
  });

  // Клас для бургер-меню
  let burgerClass = cn(s.header__burger, {
    [s.active]: isMenuOpen, 
    [s.browser]: !userId, 
  });

  // Клас для хедера
  let headerClass = cn(s.header, {
    [s.browser]: !userId, 
  });

  // Клас для активного посилання
  let linkClass = cn(s.menu__link, s.menu__link_active);

  // Функція для перевірки активного маршруту
  const isActive = (pathname) => router.pathname === pathname;

  return (
    <>
      <header className={!userId ? headerClass : s.header} role="banner">
        <div className={s.header__body}>
          {/* Логотип клініки, посилання на головну сторінку */}
          <Link href={`/`} className={s.header__logo} aria-label="Перейти на головну сторінку">
            <img 
              src={'https://www.amelsmart.com/wp-content/themes/ameldental/assets/img/main-header/sloganlogo.svg'} 
              alt="Логотип клініки" 
              loading="lazy" 
            />
          </Link>
          {/* Кнопка бургер-меню для відкриття/закриття меню */}
          <div 
            className={burgerClass} 
            onClick={toggleMenu} 
            role="button" 
            tabIndex={0} 
            aria-label="Відкрити/закрити меню" 
            onKeyDown={(e) => e.key === 'Enter' && toggleMenu()} 
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
          {/* Основне меню */}
          <nav className={menuClass} aria-label="Основне меню">
            <ul className={s.menu__list}>
              {/* Посилання на сторінку "Наші лікарі" */}
              <li onClick={closeMenu}>
                <Link 
                  href="/" 
                  className={isActive("/") ? linkClass : s.menu__link} 
                  aria-current={isActive("/") ? "page" : undefined} 
                >
                  Наші лікарі
                </Link>
              </li> 
              {/* Посилання на сторінку "Запис" */}
              <li onClick={closeMenu}>
                <Link 
                  href="/registration" 
                  className={isActive("/registration") ? linkClass : s.menu__link}
                  aria-current={isActive("/registration") ? "page" : undefined} 
                >
                  Запис
                </Link>
              </li>
              {/* Посилання на "Ваші записи", якщо користувач авторизований */}
              {userId && (
                <li onClick={closeMenu}>
                  <Link 
                    href={`/records?user_id=${userId}`} 
                    className={isActive("/records") ? linkClass : s.menu__link}
                    aria-current={isActive("/records") ? "page" : undefined} 
                  >
                    Ваші записи
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div> 
      </header>
    </>
  );
};

// Експортуємо компонент Header
export default Header;

