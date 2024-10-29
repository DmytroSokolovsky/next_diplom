// Імпортуємо необхідні хуки та функції з React
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import cn from 'classnames';
import s from './Toast.module.scss';

// Компонент Toast для відображення повідомлень про помилки
const Toast = ({ errorMessage }) => {
  // Стан для відстеження часу
  const [seconds, setSeconds] = useState(0);

  // Стан для перевірки, чи компонент рендериться на клієнті
  const [isClient, setIsClient] = useState(false); 

  // Основний клас для стилів
  let toastClass = cn(s.toast);

  // Відкриваємо тост, якщо час перевищує 0
  if (seconds > 0) {
    toastClass = cn(s.toast, {
      [s.open]: true,
    });
  }

  // Закриваємо тост після 2.7 секунд
  if (seconds >= 2.7) {
    toastClass = cn(s.toast, {
      [s.open]: false,
    });
  }

  // Використовуємо useEffect для оновлення часу відображення тосту
  useEffect(() => {
    setIsClient(true); 

    const interval = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds + 0.3); 
    }, 300);

    // Очищаємо інтервал при демонтажі компонента
    return () => {
      clearInterval(interval);
    };
  }, [setSeconds]);

  // Якщо час перевищує 3 секунди, не рендеримо тост
  if (seconds >= 3) return null;

  // Якщо компонент не рендериться на клієнті, не рендеримо тост
  if (!isClient) return null; 

  // Створюємо портал для тосту
  return createPortal(
    <div className={toastClass}>
      <span>{errorMessage}</span>
    </div>,
    document.body
  );
};

// Експортуємо компонент
export default Toast;

