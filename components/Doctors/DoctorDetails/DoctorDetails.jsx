import { useEffect, useState } from "react";
import Avatar from './../../../images/avatar.png'; 
import Image from "next/image"; 
import cn from 'classnames'; 
import s from './DoctorDetails.module.scss';
import Error from "./../../../pages/404"; 
import { useRouter } from "next/router";
import Head from "next/head"; 
import Toast from "../../common/Toast/Toast"; 
import Wrapper from "../../common/Wrapper/Wrapper"; 

const DoctorDetails = ({ doctorData, doctorErrorMessage }) => {
  // Отримання параметрів запиту з маршруту
  const { query } = useRouter();

  // Стан для даних лікаря
  const [doctor, setDoctor] = useState(doctorData || null);

  // Стан для повідомлення про помилку
  const [errorMessage, setErrorMessage] = useState(""); 


  // Перевірка, чи id є числом
  const isNumber = !isNaN(query.id);

  useEffect(() => {
    if (doctorErrorMessage) { 
      setErrorMessage(doctorErrorMessage);
    }
  }, []);

  // Функція для додавання 30 хвилин до часу
  const addThirtyMinutes = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    let newHours = hours;
    let newMinutes = minutes + 30;

    if (newMinutes >= 60) { 
      newMinutes = newMinutes - 60; 
      newHours = newHours + 1; 
    }

    return `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}`; 
  };

  // Функція для отримання діапазону часу на день
  const getTimeRangeForDay = (day) => {
    if (!day.time_slots || day.time_slots.length === 0) return "Нема даних"; 
    const firstSlot = day.time_slots[0].time; 
    const lastSlot = day.time_slots[day.time_slots.length - 1].time; 
    const lastSlotWithExtraTime = addThirtyMinutes(lastSlot); 

    return `${firstSlot} - ${lastSlotWithExtraTime}`; 
  };

  // Функція для фільтрації розкладу
  const getFilteredSchedule = (schedule) => {
    const today = new Date(); 
    const monthAhead = new Date(today); 
    monthAhead.setMonth(today.getMonth() + 1); 

    return schedule.filter(day => {
      const [dayNum, monthNum] = day.day.split('.').map(Number);
      const date = new Date(today.getFullYear(), monthNum - 1, dayNum);
      return date >= today && date <= monthAhead; 
    });
  };
  
  let scheduleClass = cn(s.details__schedule, s.schedule); 

  if (!isNumber) { 
    return <Error />; 
  }

  // Отримання відфільтрованого розкладу лікаря
  const filteredSchedule = getFilteredSchedule(doctor?.schedule || []);

  return (
    <>
      <Head>
        <title>{`Інформація про лікаря ${doctor?.name} - Amel Dental Clinic`}</title> 
        <meta name="description" content={`Доктор ${doctor?.name}. Спеціалізація: ${doctor?.specialization}. Телефон: ${doctor?.phone_number}.`} /> // Опис для SEO
        <meta name="keywords" content={`Лікар, ${doctor?.specialization}, ${doctor?.name}, клініка`} /> 
        <meta property="og:title" content={`Доктор ${doctor?.name}`} /> 
        <meta property="og:description" content={`Спеціалізація: ${doctor?.specialization}. Телефон: ${doctor?.phone_number}`} />
        <meta property="og:image" content={doctor?.photo || Avatar} />
      </Head>
      <Wrapper>
        <div className={s.details} role="article" aria-labelledby={`Доктор-${doctor?.name}`}> 
          <h1 id={`Доктор-${doctor?.name}`} className={s.details__name} tabIndex={0}>
            {doctor?.name} 
          </h1>
          <div className={s.details__header}>
            {doctor?.photo ? (
              <div className={s.details__photo} tabIndex={0}>
                <img
                  src={doctor?.photo || Avatar}
                  alt={`Фото лікаря ${doctor?.name}`}
                  role="img"
                  aria-labelledby={`Фото лікаря-${doctor?.id}`}
                />
              </div>
            ) : (
              <div className={s.details__photo} tabIndex={0}>
                <Image
                  priority={true}
                  src={doctor?.photo || Avatar}
                  alt={`Фото лікаря ${doctor?.name}`}
                  role="img"
                  aria-labelledby={`Фото лікаря-${doctor?.id}`}
                />
              </div>
            )}
          </div>
          <div className={s.details__bottom}>
            <p tabIndex={0}><span>Спеціалізація:</span> {doctor?.specialization}</p> 
            <p tabIndex={0}>
              <span>Телефон:</span>
              <a 
                href={`tel:${doctor?.phone_number}`} 
                aria-label={`Зателефонувати лікарю ${doctor?.name} за номером ${doctor?.phone_number}`} 
              >
                {doctor?.phone_number} 
              </a>
            </p>
            <p tabIndex={0}><span>Освіта:</span> {doctor?.education}</p>
            <p tabIndex={0} className={s.details__info}><span>Інформація:</span> {doctor?.info}</p> 
            <h3 tabIndex={0} className={scheduleClass} aria-live="polite">Розклад роботи:</h3>
            <ul className={s.schedule__list} aria-label="Розклад роботи лікаря">
              {filteredSchedule?.map((day) => ( 
                <li tabIndex={0} key={day.day} aria-labelledby={`schedule-${day.day}`}>
                  <span id={`Розклад-${day.day}`}>{day.day}:</span> {getTimeRangeForDay(day)} 
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Wrapper>
      {errorMessage && <Toast errorMessage={errorMessage} />} 
    </>
  );
};

 // Експорт компонента
export default DoctorDetails
