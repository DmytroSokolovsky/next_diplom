// Імпортуємо необхідні хуки з React, класи для стилізації та контекст користувача
import { useContext, useState } from 'react';
import classNames from 'classnames';
import s from './DateList.module.scss';
import cn from 'classnames';
import { UserIdContext } from './../../../context/UserIdContext';

// Компонент DateList приймає доступні дати, обробник вибору дати та обраного лікаря
function DateList({ availableDates, handleSelectDate, selectedDoctor }) {
  // Стан для активної дати
  const [activeDate, setActiveDate] = useState(null);
  // Отримуємо userId з контексту
  const userId = useContext(UserIdContext);

  // Функція для обробки кліку на дату
  const onClickDate = (date) => {
    setActiveDate(date);
    handleSelectDate(date);
  };

  // Умовний клас для елементів списку на основі наявності userId
  let itemClass = cn(s.date__item, {
    [s.browser]: !userId,
  });

  // Повертаємо JSX для відображення списку доступних дат
  return (
    <div className={s.date}>
      <h2 tabIndex={0} className={s.date__title}>Доступні дати прийому лікаря {selectedDoctor.name}</h2>
      <ul className={s.date__list} role="list">
        {availableDates.map(slot => (
          <li
            key={slot.day}
            // Обробник кліку на дату
            onClick={() => onClickDate(slot.day)}
            // Обробник клавіатурної навігації
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClickDate(slot.day);
              }
            }}
            tabIndex={0} 
            role="button" 
            className={classNames(itemClass, {
              // Додаємо активний клас для вибраної дати
              [s.date__item_active]: slot.day === activeDate,
              [s.browser_active]: slot.day === activeDate,
            })}
            aria-pressed={slot.day === activeDate} 
            aria-label={`Оберіть дату ${slot.day}`} 
          >
            {slot.day}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Експортуємо компонент
export default DateList;

