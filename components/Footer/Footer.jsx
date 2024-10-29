import s from './Footer.module.scss' 
import cn from 'classnames' 
import { useContext } from 'react'
import { UserIdContext } from '../../context/UserIdContext'
import { useTelegram } from './../../hooks/useTelegram';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' 
import { faEnvelope, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons'

const Footer = () => {
  // Застосування класів для блоку контактів
  let contactsClass = cn(s.footer__contacts, s.contacts); 
  // Застосування класів для блоку графіку роботи
  let scheduleClass = cn(s.footer__schedule, s.schedule); 

  // Отримання інформації про тему з хука useTelegram
  const {isDarkTheme} = useTelegram() 

  // Отримання userId з контексту
  const userId = useContext(UserIdContext); 

  // Класи для мапи з умовами
  let mapClass = cn(s.footer__map, { 
    [s.footer__map_dark]: isDarkTheme, 
    [s.footer__map_light]: !isDarkTheme, 
    [s.browser]: !userId, 
  });

  return (
    // Футер з роллю та aria-label
    <footer className={s.footer} role="contentinfo" aria-label="Контактна інформація та режим роботи"> 
      {/* Основний блок футера */}
      <div className={s.footer__body}> 
        {/* Стовпець для контактів та графіку */}
        <div className={s.footer__column}> 
          {/* Блок контактів */}
          <div className={contactsClass}> 
            {/* Заголовок блоку контактів */}
            <h2 tabIndex={0} className={s.contacts__title} id="contacts-title">Контакти</h2> 
            {/* Рядок з адресою */}
            <div className={s.contacts__row}> 
              <FontAwesomeIcon
                className={s.contacts__icon} 
                icon={faLocationDot}
                size="1x" 
                aria-hidden="true"
              />
              {/* Текст з адресою */}
              <div tabIndex={0} className={s.contacts__text} aria-labelledby="contacts-title"> 
                м. Дніпро, бул. Слави, 2-Б, ж/м Перемога-5
              </div>
            </div>
            {/* Рядок з телефоном */}
            <div className={s.contacts__row}> 
              <FontAwesomeIcon
                className={s.contacts__icon}
                icon={faPhone} 
                size="1x" 
                aria-hidden="true" 
              />
              {/* Посилання на телефон */}
              <a className={s.contacts__text} href="tel:+380672353630" aria-label="Телефон для зв'язку з клінікою">+38 (067) 235-36-30</a> 
            </div>
            {/* Рядок з електронною поштою */}
            <div className={s.contacts__row}> 
              <FontAwesomeIcon
                className={s.contacts__icon} 
                icon={faEnvelope} 
                size="1x" 
                aria-hidden="true" 
              />
              {/* Посилання на електронну пошту */}
              <a className={s.contacts__text} href="mailto:info@amelsmart.com" aria-label="Електронна пошта для зв'язку з клінікою">info@amelsmart.com</a> 
            </div>
          </div>
          {/* Блок графіку роботи */}
          <div className={scheduleClass}> 
            {/* Заголовок блоку графіку */}
            <h2 tabIndex={0} className={s.schedule__title} id="schedule-title">Режим роботи</h2> 
            {/* Текст графіку роботи */}
            <div tabIndex={0} className={s.schedule__text} aria-labelledby="schedule-title"> 
              <span>Пн-Нд:</span> 09:00 - 19:00
            </div>
          </div>
          {/* Авторські права */}
          <div className={s.footer__copy} aria-label="Авторські права">© 2024. Amel Dental Clinic</div> 
        </div>
        {/* Другий стовпець для мапи */}
        <div className={s.footer__column}> 
          {/* Блок мапи */}
          <div className={mapClass}> 
            {/* Заголовок блоку мапи */}
            <h2 className={s.map__title} id="map-title">Мапа</h2> 
            <iframe 
              // Вбудована мапа Google
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2648.158014499648!2d35.06608951191168!3d48.41511063167951!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40dbfd14e149f1df%3A0xcb5e5d902f0cbee1!2sAmel%20Smart%20Clinic!5e0!3m2!1sru!2sua!4v1729514442989!5m2!1sru!2sua" 
              width="600" 
              height="450" 
              allowFullScreen 
              loading="lazy"
              title="Мапа клініки Amel Smart Clinic"
              referrerPolicy="no-referrer-when-downgrade"
              aria-labelledby="map-title" 
            >
            </iframe>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Експорт компоненту Footer
export default Footer
