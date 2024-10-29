// Імпортуємо екземпляр axios з налаштованим базовим URL для API-запитів
import { instance } from "./api";

// Об'єкт doctorsAPI для роботи із запитами, пов'язаними з лікарями
export const doctorsAPI = {
  // Метод для отримання списку всіх лікарів
  getAll() {
    return instance
      .get(`doctors`) 
      .then(response => response.data); 
  },
  
  // Метод для отримання даних конкретного лікаря за telegramId
  getOne(telegramId) {
    return instance
      .get(`doctor/${telegramId}`) 
      .then(response => response.data);
  }
}
