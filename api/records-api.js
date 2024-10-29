// Імпортуємо екземпляр axios для виконання API-запитів
import { instance } from "./api";

// Об'єкт recordsAPI для роботи із запитами, пов'язаними з записами пацієнтів
export const recordsAPI = {
  // Метод для отримання даних про конкретний запис за recordId
  get(recordId) {
    return instance
      .get(`records/${recordId}`) 
      .then(response => response.data);
  },
  
  // Метод для видалення запису за recordId
  delete(recordId) {
    return instance
      .delete(`records/${recordId}`) 
      .then(response => response.data);
  }
}
 