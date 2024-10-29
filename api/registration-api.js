// Імпортуємо бібліотеку axios та екземпляр instance для API-запитів
import axios from "axios";
import { instance } from "./api";

// Константа для токену бота Telegram, отримується з .env файлу
const TELEGRAM_BOT_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
// URL для надсилання повідомлень через API Telegram
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

// Об'єкт registrationAPI для роботи з функціональністю реєстрації та сповіщень
export const registrationAPI = {
  // Метод для створення запису (реєстрації) пацієнта
  addRecord(data) {
    return instance
      .post(`records`, data) 
      .then(response => response.data);
  },
  
  // Метод для надсилання повідомлення лікарю через Telegram
  sendMessageToDoctor(chat_id, text) {
    return axios.post(TELEGRAM_API_URL, {
      chat_id, 
      text
    }); 
  },
  
  // Метод для отримання списку всіх спеціалізацій лікарів
  getSpecializations() {
    return instance
      .get(`doctors/specializations/all`) 
      .then(response => response.data);
  },
  
  // Метод для отримання лікарів за спеціалізацією
  getDoctors(specialization) {
    return instance
      .get(`doctors/${specialization}`) 
      .then(response => response.data); 
  },
  
  // Метод для отримання розкладу лікаря за його doctorId
  getSchedule(doctorId) {
    return instance
      .get(`doctor/${doctorId}/schedule`) 
      .then(response => response.data); 
  },
}
