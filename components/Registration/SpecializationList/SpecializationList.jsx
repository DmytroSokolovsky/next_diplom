// Імпортуємо необхідні хуки з React та модулі стилів
import { useContext, useState } from 'react';
import cn from 'classnames';
import s from './SpecializationList.module.scss';
import { UserIdContext } from './../../../context/UserIdContext';

// Компонент SpecializationList приймає список спеціалізацій і обробник кліків
function SpecializationList({ specializations, handleClickSpecialization }) {
  // Стан для активної спеціалізації
  const [activeSpecialization, setActiveSpecialization] = useState(null);
  // Отримуємо userId з контексту
  const userId = useContext(UserIdContext);

  // Функція для обробки кліку на спеціалізацію
  const onClickSpecialization = (specialization) => {
    setActiveSpecialization(specialization);
    handleClickSpecialization(specialization);
  };

  // Умовний клас для елементів списку на основі наявності userId
  let itemClass = cn(s.specialization__item, {
    [s.browser]: !userId,
  });

  // Повертаємо JSX для відображення списку спеціалізацій
  return (
    <div className={s.specialization}>
      <h2 tabIndex={0} className={s.specialization__title}>Оберіть спеціалізацію:</h2>
      <ul className={s.specialization__list} role="list">
        {specializations.map((specialization, index) => (
          <li
            key={specialization}
            // Обробник кліку на спеціалізацію
            onClick={() => onClickSpecialization(specialization)}
            // Обробник клавіатурної навігації
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClickSpecialization(specialization);
              }
            }}
            tabIndex={0} 
            role="button" 
            className={cn(itemClass, {
              // Додаємо активний клас для вибраної спеціалізації
              [s.specialization__item_active]: specialization === activeSpecialization,
              [s.browser_active]: specialization === activeSpecialization,
            })}
            aria-pressed={specialization === activeSpecialization} 
            aria-label={`Оберіть спеціалізацію ${specialization}`} 
          >
            {specialization}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Експортуємо компонент
export default SpecializationList;