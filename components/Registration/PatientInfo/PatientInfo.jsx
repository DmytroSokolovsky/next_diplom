// Імпортуємо необхідні хуки з React та модулі стилів
import { useCallback, useContext, useEffect, useState } from 'react';
import s from './PatientInfo.module.scss';
import cn from 'classnames';
import { UserIdContext } from './../../../context/UserIdContext';

// Компонент PatientInfo приймає необхідні пропси для відображення інформації про пацієнта
function PatientInfo({ patientName, setPatientName, patientPhone, setPatientPhone, handleDataInput }) {
  // Стан для валідації імені та телефону
  const [isNameValid, setIsNameValid] = useState(true);
  const [isPhoneValid, setIsPhoneValid] = useState(true);

  // Отримуємо userId з контексту
  const userId = useContext(UserIdContext);

  // Функція для валідації імені
  const validateName = useCallback(() => {
    setIsNameValid(patientName.trim() !== '');
  }, [patientName]);

  // Функція для валідації телефону з використанням регулярного виразу
  const validatePhone = useCallback(() => {
    const phoneRegex = /^380\d{9}$/;
    setIsPhoneValid(phoneRegex.test(patientPhone));
  }, [patientPhone]);

  // Ефект, який спрацьовує при зміні імені або телефону
  useEffect(() => {
    validateName();
    validatePhone();
    handleDataInput();
  }, [patientName, patientPhone, handleDataInput, validateName, validatePhone]);

  // Обробник зміни імені
  const handleChangeName = (e) => {
    setPatientName(e.target.value);
  };

  // Обробник зміни телефону
  const handleChangePhone = (e) => {
    setPatientPhone(e.target.value);
  };

  // Умовний клас для блоку на основі наявності userId
  let blockClass = cn(s.info__block, {
    [s.browser]: !userId,
  });

  // Повертаємо JSX для відображення інформації про пацієнта
  return (
    <div className={s.info}>
      <h1 tabIndex={0} className={s.info__title}>Запис</h1>
      <div className={blockClass}>
        <label>
          <span>ПІБ:</span>
          <input
            placeholder="ПІБ"
            type="text"
            value={patientName}
            onChange={handleChangeName}
            onBlur={validateName}
            required
          />
          {/* Повідомлення про помилку для імені */}
          {!isNameValid && <p tabIndex={0}>Поле обов'язкове до заповнення</p>}
        </label>
      </div>
      <div className={blockClass}>
        <label>
          <span>Номер телефону:</span>
          <input
            placeholder="Номер телефону"
            type="tel"
            value={patientPhone}
            onChange={handleChangePhone}
            onBlur={validatePhone} 
            required
          />
          {/* Повідомлення про помилку для телефону */}
          {!isPhoneValid && <p tabIndex={0}>Формат повинен бути 380 ХХ ХХХХХХХ</p>}
        </label>
      </div>
    </div>
  );
}

// Експортуємо компонент
export default PatientInfo;
