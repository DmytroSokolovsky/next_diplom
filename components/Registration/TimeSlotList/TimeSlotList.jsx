// Імпортуємо необхідні хуки з React, стилі та контекст користувача
import { useContext, useState } from 'react';
import s from './TimeSlotList.module.scss';
import cn from 'classnames';
import { UserIdContext } from './../../../context/UserIdContext';

// Компонент TimeSlotList приймає доступні часові слоти, обробники вибору, дати, фокусу та розфокусу
function TimeSlotList({ availableSlots, handleSelectSlot, selectedDate, handleFocusSlot, handleBlurSlot }) {
  // Стан для активного слоту
  const [activeSlot, setActiveSlot] = useState(null);
  // Отримуємо userId з контексту
  const userId = useContext(UserIdContext);

  // Функція для обробки кліку на часовий слот
  const onClickSlot = (slot) => {
    setActiveSlot(slot);
    handleSelectSlot(slot);
  };

  // Умовний клас для елементів списку на основі наявності userId
  let itemClass = cn(s.time__item, {
    [s.browser]: !userId,
  });

  // Повертаємо JSX для відображення списку доступних часових слотів
  return (
    <div className={s.time}>
      <h2 tabIndex={0} className={s.time__title}>Доступні часи прийому {selectedDate}</h2>
      <ul className={s.time__list} role="list">
        {availableSlots.map(slot => (
          <li
            key={slot.time}
            // Обробник кліку на слот
            onClick={() => onClickSlot(slot.time)}
            // Обробник клавіатурної навігації
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClickSlot(slot.time);
              }
            }}
            tabIndex={0} 
            role="button" 
            className={cn(itemClass, {
              // Додаємо активний клас для вибраного слоту
              [s.time__item_active]: slot.time === activeSlot,
              [s.browser_active]: slot.time === activeSlot,
            })}
            aria-pressed={slot.time === activeSlot} 
            aria-label={`Оберіть час ${slot.time}`} 
          >
            {slot.time}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Експортуємо компонент
export default TimeSlotList;

