// Імпортуємо необхідні хуки з React, класи для стилізації та контекст користувача
import { useContext, useState } from 'react';
import classNames from 'classnames';
import s from './DoctorList.module.scss';
import cn from 'classnames';
import { UserIdContext } from '../../../context/UserIdContext';

// Компонент DoctorList приймає список лікарів, обробник кліків та обрану спеціалізацію
function DoctorList({ doctors, handleClickDoctor, selectedSpecialization }) {
  // Стан для активного лікаря
  const [activeDoctor, setActiveDoctor] = useState(null);
  // Отримуємо userId з контексту
  const userId = useContext(UserIdContext);

  // Функція для обробки кліку на лікаря
  const onClickDoctor = (doctor) => {
    setActiveDoctor(doctor._id);
    handleClickDoctor(doctor);
  };

  // Умовний клас для елементів списку на основі наявності userId
  let itemClass = cn(s.doctor__item, {
    [s.browser]: !userId,
  });

  // Повертаємо JSX для відображення списку лікарів
  return (
    <div className={s.doctor}>
      <h2 tabIndex={0} className={s.doctor__title}>Лікарі за спеціалізацією {selectedSpecialization}</h2>
      <ul className={s.doctor__list} role="list">
        {doctors.map(doctor => (
          <li
            key={doctor._id}
            // Обробник кліку на лікаря
            onClick={() => onClickDoctor(doctor)}
            // Обробник клавіатурної навігації
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClickDoctor(doctor);
              }
            }}
            tabIndex={0} 
            role="button" 
            className={classNames(itemClass, {
              // Додаємо активний клас для вибраного лікаря
              [s.doctor__item_active]: doctor._id === activeDoctor,
              [s.browser_active]: doctor._id === activeDoctor,
            })}
            aria-pressed={doctor._id === activeDoctor} 
            aria-label={`Оберіть лікаря ${doctor.name}`} 
          >
            {doctor.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Експортуємо компонент
export default DoctorList;

