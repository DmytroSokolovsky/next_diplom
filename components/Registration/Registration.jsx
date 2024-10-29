// Імпорт необхідних модулів і бібліотек
import { useCallback, useContext, useEffect, useState } from 'react';
import s from './Registration.module.scss'
import Head from "next/head";
import Wrapper from './../common/Wrapper/Wrapper';
import { useTelegram } from '../../hooks/useTelegram';
import { UserIdContext } from '../../context/UserIdContext';
import Toast from '../common/Toast/Toast';
import SpecializationList from './SpecializationList/SpecializationList';
import DoctorList from './DoctorList/DoctorList';
import DateList from './DateList/DateList';
import TimeSlotList from './TimeSlotList/TimeSlotList';
import PatientInfo from './PatientInfo/PatientInfo';
import { registrationAPI } from '../../api/registration-api';

function Registration({ doctorsSpecializations, specializationsErrorMessage }) {  
  // Отримання Telegram API
  const { tg, onReady, showMainButton, hideMainButton, setButtonText, setEventMainButtonClicked, removeEventMainButtonClicked, sendDataToTelegram } = useTelegram();

  // Стани для зберігання даних
  const [specializations, setSpecializations] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedSpecialization, setSelectedSpecialization] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [availableDates, setAvailableDates] = useState([]); 
  const [selectedDate, setSelectedDate] = useState(null); 
  const [availableSlots, setAvailableSlots] = useState([]); 
  const [selectedSlot, setSelectedSlot] = useState(null); 
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [isDataEntered, setIsDataEntered] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false); 
  const [errorMessage, setErrorMessage] = useState('');  

  // Отримання userId з контексту
  let userId = useContext(UserIdContext);

  // Функція для відправки даних
  const onSendData = useCallback(async () => {
    const currentUserId = userId ? Number(userId) : null;

    // Формування даних для відправки
    const data = {
      doctor: selectedDoctor.name,
      doctor_id: selectedDoctor.telegram_id, 
      specialization: selectedSpecialization,
      date: selectedDate,
      time: selectedSlot,
      user_id: currentUserId,
      patient_name: patientName,
      patient_phone_number: Number(patientPhone),
    };

    // Повідомлення для лікаря
    const messageForDoctor =         
  `
  ✍️ У вас новий запис на прийом:

  👨‍🦱 Пацієнт: ${data.patient_name}
  📞 Номер телефону: ${data.patient_phone_number}
  📅 Дата: ${data.date}
  ⏰ Час: ${data.time}
  `;

    try {
      // Додавання запису
      await registrationAPI.addRecord(data);

      if (userId) {
        // Відправка даних до Telegram
        sendDataToTelegram(data);
      } else {
        if (data.doctor_id) {
          try {
            // Відправка повідомлення лікарю
            await registrationAPI.sendMessageToDoctor(data.doctor_id, messageForDoctor);
          } catch (error) {
            console.error('Помилка при відправленні повідомлення лікарю:', error);
          }
        }
        alert('Ви успішно записалися на прийом');
      }
      resetForm();
    } catch (error) {
      if (userId) {
        setErrorMessage('Помилка при записі на прийом. Спробуйте знову');
      } else {
        alert('Помилка при записі на прийом. Спробуйте знову');
      }
      resetForm();
    }
  }, [selectedDoctor, selectedSpecialization, selectedSlot, selectedDate, patientName, patientPhone, userId, sendDataToTelegram]);

  useEffect(() => {
    if (specializationsErrorMessage) {
      setErrorMessage(specializationsErrorMessage)
    }
  }, []);

  // Скидання форми
  const resetForm = () => {
    setDoctors([]);
    setSelectedSpecialization(null);
    setSelectedDoctor(null);
    setAvailableDates([]);
    setSelectedDate(null);
    setAvailableSlots([]);
    setSelectedSlot(null);
    setPatientName('');
    setPatientPhone('');
    setIsDataEntered(false);
    setIsFormValid(false); 
  };

  // Обробка вводу даних пацієнта
  const handleDataInput = useCallback(() => {
    const phoneRegex = /^380\d{9}$/; 
    if (patientName.trim() !== '' && phoneRegex.test(patientPhone)) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
    setIsDataEntered(true);
  }, [patientName, patientPhone]);

  // Виклик при готовності Telegram
  useEffect(() => {
    onReady();
    setEventMainButtonClicked(onSendData);
    return () => {
      removeEventMainButtonClicked(onSendData);
    };
  }, [onSendData, onReady, tg, setEventMainButtonClicked, removeEventMainButtonClicked]);

  // Обробка натискання клавіші Enter
  const handleKeyDown = useCallback((event) => {
    if (event.key === 'Enter') {
      if (userId && selectedSlot && isFormValid) {
        onSendData(); 
      }
    }
  }, [onSendData, isFormValid, selectedSlot, userId]);

  // Завантаження спеціалізацій лікарів
  useEffect(() => {
    setSpecializations(doctorsSpecializations);
  }, []);

  // Встановлення тексту кнопки
  useEffect(() => {
    setButtonText('Записатися');
  }, [tg, setButtonText]);

  // Показ/сховування основної кнопки
  useEffect(() => {
    if (selectedSlot && isFormValid) {
      showMainButton();
    } else {
      hideMainButton();
    }
  }, [selectedSlot, showMainButton, hideMainButton, isFormValid]);

  // Обробка вибору спеціалізації
  const handleClickSpecialization = (specialization) => {
    if (isDataEntered) {
      setSelectedSpecialization(specialization);
      setSelectedDoctor(null);
      setAvailableDates([]);
      setSelectedDate(null);
      setSelectedSlot(null);
      registrationAPI.getDoctors(specialization).then(setDoctors).catch(error => {
        setErrorMessage('Помилка при завантаженні лікарів за цією спеціалізацією');
      });
    }
  };

  // Обробка вибору лікаря
  const handleClickDoctor = (doctor) => {
    setSelectedDoctor(doctor);
    setSelectedDate(null);
    setSelectedSlot(null);
    registrationAPI.getSchedule(doctor._id).then(response => {
      const availableDates = response.filter(day => day.time_slots.some(slot => slot.is_available));
      setAvailableDates(availableDates);
    }).catch(error => {
      setErrorMessage('Помилка під час завантаження розкладу лікаря');
    });
  };

  // Обробка вибору дати
  const handleSelectDate = (date) => {
    setSelectedDate(date);
    setSelectedSlot(null); 
    const selectedDay = availableDates.find(day => day.day === date);
    if (selectedDay) {
      const availableSlots = selectedDay.time_slots.filter(slot => slot.is_available);
      setAvailableSlots(availableSlots);
    }
  };

  // Обробка вибору слоту
  const handleSelectSlot = (slot) => {
    setSelectedSlot(slot); 
  };

  // Показ повідомлення про помилку
  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage(''); 
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  return (
    <>
      <Head>
        <title>Запис до лікаря - Amel Dental Clinic</title>
        <meta name="description" content="Запис до лікаря через Telegram бот або веб-інтерфейс в клініці Amel Dental Clinic. Оберіть спеціалізацію, лікаря та зручний час для візиту." />
        <meta name="keywords" content="Запис до лікаря, Amel Dental Clinic, клініка, Telegram бот, медичні послуги, стоматологія" />
        <meta property="og:title" content="Запис до лікаря в Amel Dental Clinic" />
        <meta property="og:description" content="Офіційний Telegram бот для запису до лікаря в клініці Amel Dental Clinic. Легкий спосіб записатися на прийом через веб або мобільний інтерфейс." />
      </Head>
      <Wrapper>
        <div className={s.registration} onKeyDown={handleKeyDown}>
          <PatientInfo
            patientName={patientName}
            setPatientName={setPatientName}
            patientPhone={patientPhone}
            setPatientPhone={setPatientPhone}
            handleDataInput={handleDataInput}
          />
          <SpecializationList
            specializations={specializations}
            handleClickSpecialization={handleClickSpecialization}
          />
          {selectedSpecialization && (
            <DoctorList
              doctors={doctors}
              handleClickDoctor={handleClickDoctor}
              selectedSpecialization={selectedSpecialization}
            />
          )}
          {availableDates.length > 0 && selectedDoctor && (
            <DateList
              availableDates={availableDates}
              handleSelectDate={handleSelectDate}
              selectedDoctor={selectedDoctor}
            />
          )}
          {availableSlots.length > 0 && selectedDate && (
            <TimeSlotList
              availableSlots={availableSlots}
              handleSelectSlot={handleSelectSlot}
              selectedDate={selectedDate}
            />
          )}
          {!userId && selectedSlot && isFormValid &&             
            <button
              className={s.registration__button}
              type="button"
              onClick={onSendData}
              aria-label="Записатися на прийом"
              disabled={!isFormValid}
            >
            Записатися
            </button>
          }
          {errorMessage && <Toast errorMessage={errorMessage} />}  
        </div>
      </Wrapper>
    </>
  );
}

export default Registration;





