import { useCallback } from 'react';

// Хук для інтеграції з Telegram WebApp API
export function useTelegram() {
  // Ініціалізація об'єкта tg з Telegram WebApp API, якщо він доступний у браузері
  const tg = typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;

  // Функція для закриття WebApp
  const onClose = useCallback(() => {
    if (tg) {
      tg.close(); 
    }
  }, [tg]); 

  // Функція для повідомлення про готовність WebApp
  const onReady = useCallback(() => {
    if (tg) {
      tg.ready(); 
    }
  }, [tg]);

  // Функція для показу головної кнопки
  const showMainButton = useCallback(() => {
    if (tg) {
      tg.MainButton.show(); 
    }
  }, [tg]); 

  // Функція для приховування головної кнопки
  const hideMainButton = useCallback(() => {
    if (tg) {
      tg.MainButton.hide(); 
    }
  }, [tg]); 

  // Функція для встановлення тексту на головній кнопці
  const setButtonText = useCallback((buttonText) => {
    if (tg) {
      tg.MainButton.setParams({ text: buttonText }); 
    }
  }, [tg]);

  // Функція для налаштування обробника події натискання на головну кнопку
  const setEventMainButtonClicked = useCallback((callback) => {
    if (tg) {
      tg.onEvent('mainButtonClicked', callback);
    }
  }, [tg]);

  // Функція для видалення обробника події натискання на головну кнопку
  const removeEventMainButtonClicked = useCallback((callback) => {
    if (tg) {
      tg.offEvent('mainButtonClicked', callback); 
    }
  }, [tg]); 

  // Функція для відправки даних до Telegram
  const sendDataToTelegram = useCallback((data) => {
    if (tg) {
      tg.sendData(JSON.stringify(data)); 
    }
  }, [tg]); 

  // Перевірка, чи активна темна тема
  const isDarkTheme = tg ? tg.colorScheme === 'dark' : false;

  // Повертаємо об'єкт з усіма функціями та властивостями
  return {
    tg,
    onClose,
    onReady,
    showMainButton,
    hideMainButton,
    setButtonText,
    setEventMainButtonClicked,
    removeEventMainButtonClicked,
    sendDataToTelegram,
    isDarkTheme
  };
}

