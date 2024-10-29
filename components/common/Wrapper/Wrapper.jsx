// Імпортуємо компоненти Footer та Header
import Footer from "../../Footer/Footer"
import Header from "../../Header/Header"
import s from './Wrapper.module.scss'

// Компонент Wrapper для обгортки основного контенту
const Wrapper = ({children}) => {
  return (
    <>
      {/* Відображаємо заголовок */}
      <Header/>
      {/* Основний контент сайту */}
      <main className={s.main}>
        <div className={s.container}>
          {/* Вставляємо дочірні компоненти */}
          {children}
        </div>
      </main>
      {/* Відображаємо футер */}
      <Footer/>
    </>
  )
}

// Експортуємо компонент
export default Wrapper
