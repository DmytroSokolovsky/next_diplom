// Імпортуємо необхідні модулі та компоненти
import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import DoctorsImage from './../../images/doctors.jpg';
import Avatar from './../../images/avatar.png';
import Image from "next/image"
import cn from 'classnames'
import s from './Doctors.module.scss'
import Head from "next/head";
import Toast from './../common/Toast/Toast';
import Wrapper from './../common/Wrapper/Wrapper';

// Основний компонент, який відповідає за відображення лікарів
const Doctors = ({ doctorsBySpecialization: initialDoctorsBySpecialization, getDoctorsErrorMessage }) => {
  // Стан для лікарів за спеціалізацією та для повідомлення про помилки
  const [doctorsBySpecialization, setDoctorsBySpecialization] = useState(initialDoctorsBySpecialization || {});
  const [errorMessage, setErrorMessage] = useState(getDoctorsErrorMessage || "");

  // Ефект, який слідкує за зміною повідомлення про помилку
  useEffect(() => {
    if (getDoctorsErrorMessage) {
      setErrorMessage(getDoctorsErrorMessage)
    }
  }, [getDoctorsErrorMessage]);

  // Задаємо клас для блоку лікарів
  let blockClass = cn(s.doctors__block, s.block);

  return (
    <>
      {/* Налаштування мета-тегів для SEO */}
      <Head>
        <title>Наші лікарі - Amel Smart Clinic</title>
        <meta name="description" content="Команда лікарів Amel Smart Clinic, які працюють за сучасними міжнародними протоколами, мають профільну освіту і регулярно підвищують кваліфікацію" />
        <meta name="keywords" content="Amel Smart Clinic, лікарі, стоматологи, медична клініка, кваліфікація лікарів" />
        <meta property="og:title" content="Наші лікарі - Amel Smart Clinic" />
        <meta property="og:description" content="Дізнайтеся більше про лікарів нашої клініки, які володіють сучасними технологіями та навичками роботи на цифровому обладнанні" />
      </Head>
      {/* Обгортка для стилізації */}
      <Wrapper>
        <div className={s.doctors}>
            {/* Заголовок та фотографія лікарів */}
            <div className={s.doctors__header}>
              <h1 className={s.doctors__text} aria-label="Опис команди лікарів Amel Smart Clinic" tabIndex={0}>
                Сьогодні стоматологія є однією з найбільш високотехнологічних галузей. Тому команда Amel Smart складається з прогресивних фахівців, які володіють найостаннішими технологіями та навичками роботи на цифровому оборудованіі. Наші лікарі працюють за сучасними міжнародними протоколами, мають профільну освіту, систематично проходять курси підвищення кваліфікації, беруть участь в міжнародних конгресах. На базі клініки регулярно проходять семінари з залученням кращих світових фахівців стоматології. Наші клієнти завжди можуть отримати професійну пораду і підтримку. Для себе і всієї своєї родини.
              </h1>
              <div className={s.doctors__photo} role="img" aria-label="Фотографія лікарів клініки" tabIndex={0}>
                <Image priority={true} src={DoctorsImage} alt="Фотографія всіх лікарів нашої клініки" />
              </div>
            </div>
            {/* Відображення лікарів за спеціалізацією */}
            <div className={s.doctors__bottom}>
              {Object.keys(doctorsBySpecialization).map((specialization) => (
                <section key={specialization} className={blockClass} aria-labelledby={`Заголовок-${specialization}`}>
                  <h2 id={`Заголовок-${specialization}`} className={s.block__specialization} tabIndex={0}>{specialization}</h2>
                  <ul className={s.block__items} role="list">
                    {doctorsBySpecialization[specialization].map((doctor) => (
                      <Fragment key={doctor?.telegram_id}>
                        <li className={s.item}>
                          <Link tabIndex={0} href={`/doctors/${doctor?.telegram_id}`} className={s.item__link} aria-label={`Лікар ${doctor?.name}, спеціалізація: ${specialization}`}>
                            <div className={s.item__photo} aria-hidden="true">
                              {doctor?.photo ? (
                                <img
                                  src={doctor?.photo}
                                  alt={`Фото лікаря ${doctor?.name}`}
                                />
                              ) : (
                                <Image
                                  priority={true}
                                  src={Avatar}
                                  alt={`Фото лікаря ${doctor?.name}`}
                                />
                              )}
                            </div>
                            <h3 className={s.item__name}>{doctor?.name}</h3>
                          </Link>
                        </li>
                      </Fragment>
                    ))} 
                  </ul>
                </section>
              ))}
            </div>
            {/* Відображення повідомлення про помилку, якщо є */}
            {errorMessage && <Toast errorMessage={errorMessage} />}
        </div>
      </Wrapper>
    </>
  );
};

// Експортуємо компонент
export default Doctors;
