// Імпортуємо необхідні модулі та компоненти
import React from 'react';
import dynamic from 'next/dynamic';
import Preloader from './../../components/Preloader/Preloader';
import { recordsAPI } from './../../api/records-api';

// Динамічний імпорт компоненту Records з показом Preloader під час завантаження
const Records = dynamic(() => import('./../../components/Records/Records'), {
  loading: () => <Preloader />,
});

// Компонент-обгортка для передачі пропсів у компонент Records
const RecordsWrapper = ({ records, getRecordsErrorMessage }) => {
  return (
    <Records 
      records={records} 
      getRecordsErrorMessage={getRecordsErrorMessage}
    />
  );
};

// Функція, що виконується на сервері для отримання даних перед рендерингом
export async function getServerSideProps(context) {
  // Отримуємо user_id з параметрів запиту
  const { user_id } = context.query;
  let records = [];
  let getRecordsErrorMessage;

  if (user_id) {
    try {
      // Запит для отримання записів користувача за user_id
      const data = await recordsAPI.get(user_id);
      records = data;
    } catch (error) {
      // Встановлюємо повідомлення про помилку, якщо запит не вдався
      getRecordsErrorMessage = 'Неможливо завантажити ваші записи';
    }
  }

  // Повертаємо отримані дані як пропси до компонента
  return {
    props: {
      records,
      getRecordsErrorMessage: getRecordsErrorMessage || null,
    },
  };
}

export default RecordsWrapper;