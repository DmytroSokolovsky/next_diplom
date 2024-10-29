// Імпортуємо бібліотеку axios для виконання HTTP-запитів
import axios from "axios";

// Створюємо екземпляр axios з налаштованим базовим URL для API
export const instance = axios.create({
  baseURL: 'https://api-diplom-eupy.onrender.com/api/'
});
