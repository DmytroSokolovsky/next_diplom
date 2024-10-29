// Імпортуємо необхідні бібліотеки та компоненти
import React from 'react';
import dynamic from 'next/dynamic';
import Preloader from "../components/Preloader/Preloader";
import { doctorsAPI } from '../api/doctors-api';

// Динамічно імпортуємо компонент Doctors з індикатором завантаження Preloader
const Doctors = dynamic(() => import('./../components/Doctors/Doctors'), {
  loading: () => <Preloader />, // Відображаємо Preloader під час завантаження Doctors
});

// Компонент-обгортка для передачі отриманих даних у компонент Doctors
const DoctorsWrapper = ({ doctorsBySpecialization, getDoctorsErrorMessage }) => {
  return (
    <Doctors 
      doctorsBySpecialization={doctorsBySpecialization} 
      getDoctorsErrorMessage={getDoctorsErrorMessage}
    />
  );
};

// Функція, що виконується на сервері перед рендерингом сторінки
export async function getServerSideProps() {
  let doctorsBySpecialization = {};
  let getDoctorsErrorMessage;

  try {
    // Запит на отримання всіх лікарів
    const data = await doctorsAPI.getAll();

    // Сортуємо лікарів за спеціалізаціями
    doctorsBySpecialization = data.reduce((acc, doctor) => {
      const specialization = doctor.specialization || "Нема спеціалізації";
      if (!acc[specialization]) {
        acc[specialization] = [];
      }
      acc[specialization].push(doctor);
      return acc;
    }, {});
  } catch (error) {
    // Обробляємо помилку у випадку невдалого запиту
    getDoctorsErrorMessage = 'Неможливо завантажити інформацію про лікарів';
  }

  // Повертаємо об'єкт props для використання в компоненті
  return {
    props: {
      doctorsBySpecialization,
      getDoctorsErrorMessage: getDoctorsErrorMessage || null,
    },
  };
}

export default DoctorsWrapper;