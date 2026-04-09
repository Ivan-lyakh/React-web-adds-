
import { createRoot } from 'react-dom/client'
import './index.module.css'
import styles from './index.module.css'
import { Header } from './ui/Header'
import { MainPage } from './ui/MainPage'
import { Footer } from './ui/Footer'
import { useAddActive } from './bll/useAddActive'

createRoot(document.getElementById('root')!).render(
  <Main />
)

function Main() {

  const { addActiveStatus , actionActive} = useAddActive()

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Header
          actionActive={actionActive}/>
      </div>
      <div className={styles.main}>
        <MainPage
          addActiveStatus={addActiveStatus}/>
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  )
}