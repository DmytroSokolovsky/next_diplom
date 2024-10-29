// Імпортуємо необхідні модулі та компоненти
import React from 'react';
import dynamic from 'next/dynamic';
import Preloader from '../../components/Preloader/Preloader';
import { registrationAPI } from './../../api/registration-api';

// Динамічний імпорт компоненту Registration з показом Preloader під час завантаження
const Registration = dynamic(() => import('./../../components/Registration/Registration'), {
  loading: () => <Preloader />,
});

// Компонент-обгортка для передачі пропсів у компонент Registration
const RegistrationWrapper = ({ doctorsSpecializations, specializationsErrorMessage }) => {
  return (
    <Registration 
      doctorsSpecializations={doctorsSpecializations} 
      specializationsErrorMessage={specializationsErrorMessage}
    />
  );
};

// Функція, що виконується на сервері для отримання даних перед рендерингом
export async function getServerSideProps(context) {
  let doctorsSpecializations = [];
  let specializationsErrorMessage;
  
  try {
    // Запит для отримання списку спеціалізацій лікарів
    const response = registrationAPI.getSpecializations();
    doctorsSpecializations = await response;
  } catch (error) {
    // Встановлення повідомлення про помилку, якщо запит не вдався
    specializationsErrorMessage = 'Помилка під час завантаження спеціалізацій лікарів';
  }
  
  // Повертаємо отримані дані як пропси до компонента
  return {
    props: {
      doctorsSpecializations: doctorsSpecializations || [],
      specializationsErrorMessage: specializationsErrorMessage || null,
    }
  };
}

export default RegistrationWrapper;



