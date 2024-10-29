// Імпортуємо стилі з модуля RecordItem.module.scss
import s from './RecordItem.module.scss';

// Компонент RecordItem для відображення інформації про запис
function RecordItem({ record, onDelete }) {
  return (
    <div className={s.record} role="article" aria-labelledby={`record-${record._id}`}>
      <p tabIndex={0}><span>Лікар:</span> {record.doctor}</p>
      <p tabIndex={0}><span>Дата:</span> {record.date}</p>
      <p tabIndex={0}><span>Час:</span> {record.time}</p>
      <button 
        className={s.record__delete} 
        onClick={() => onDelete(record)} 
        aria-label={`Видалити запис до лікаря ${record.doctor} на ${record.date} о ${record.time}`}
      >
        Видалити запис
      </button>
    </div>
  );
}

// Експортуємо компонент
export default RecordItem;


