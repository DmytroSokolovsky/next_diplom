// Імпортуємо необхідні модулі та компоненти
import React from 'react';
import dynamic from 'next/dynamic';
import Preloader from '../../components/Preloader/Preloader';
import { doctorsAPI } from './../../api/doctors-api';

// Динамічний імпорт компоненту DoctorDetails з показом Preloader під час завантаження
const Doctor = dynamic(() => import('./../../components/Doctors/DoctorDetails/DoctorDetails'), {
  loading: () => <Preloader />,
});

// Компонент-обгортка для передачі пропсів у компонент DoctorDetails
const DoctorWrapper = ({ doctorData, doctorErrorMessage }) => {
  return (
    <Doctor 
      doctorData={doctorData} 
      doctorErrorMessage={doctorErrorMessage}
    />
  );
};

// Функція, що виконується на сервері для отримання даних перед рендерингом
export async function getServerSideProps({ params }) {
  // Отримуємо id лікаря з параметрів маршруту
  let doctorId = params.id;
  let doctorData = [];
  let doctorErrorMessage;

  try {
    // Запит для отримання інформації про лікаря за його id
    const data = await doctorsAPI.getOne(doctorId);
    doctorData = data;
  } catch (error) {
    // Встановлюємо повідомлення про помилку, якщо запит не вдався
    doctorErrorMessage = 'Неможливо завантажити інформацію про лікаря';
  }

  // Повертаємо отримані дані як пропси до компонента
  return {
    props: {
      doctorData,
      doctorErrorMessage: doctorErrorMessage || null,
    },
  };
}

export default DoctorWrapper;
