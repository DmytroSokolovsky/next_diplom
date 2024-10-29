// Імпортуємо необхідні хуки, компоненти та стилі
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import s from './404.module.scss'
import cn from 'classnames'
import { UserIdContext } from '../context/UserIdContext.js';
import Wrapper from '../components/common/Wrapper/Wrapper.jsx';

// Компонент Error для обробки 404 сторінки з автоматичним перенаправленням
const Error = () => {
  // Створюємо стан для відліку секунд
  const [seconds, setSeconds] = useState(5);

  // Отримуємо userId з контексту, щоб визначити, чи користувач авторизований
  const userId = useContext(UserIdContext);

  // Використовуємо роутер для перенаправлення
  const router = useRouter();

  // Ефект для відліку часу і перенаправлення на головну сторінку
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds - 1); 
    }, 1000);

    const timer = setTimeout(() => {
      router.push('/'); 
    }, 5000);

    // Очищення таймерів при розмонтуванні компонента
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    }
  }, [router]);

  // Визначаємо клас для елемента з помилкою, враховуючи, чи користувач не авторизований
  let errorClass = cn(s.error, {
    [s.browser]: !userId,
  });

  return (
    <>
      <Wrapper>
        <div 
          className={errorClass}
          role="alert"
          aria-live="assertive"
          tabIndex="0"
        >
          Такої сторінки не існує. Через&nbsp;<span aria-live="polite">{seconds}</span>&nbsp;секунд ви будете перенаправлені на головну...
        </div>
      </Wrapper>
    </>
  );
};

export default Error;
