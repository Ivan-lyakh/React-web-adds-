
import { createRoot } from 'react-dom/client'
import './index.module.css'
import styles from './index.module.css'
import { Header } from './ui/Header'
import { MainPage } from './ui/MainPage'
import { Footer } from './ui/Footer'
import { useAddActive } from './bll/useAddActive'
import { AdDetails } from './ui/AdDetails'
import { BrowserRouter, Routes, Route } from "react-router-dom"

createRoot(document.getElementById('root')!).render(
  <Main />
)

function Main() {

  const { addActiveStatus, actionActive } = useAddActive()

  return (
    <BrowserRouter>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <Header
            actionActive={actionActive} />
        </div>
        <div className={styles.main}>
          <Routes>
            <Route path='/' element={
              <MainPage
                actionActive={actionActive}
                addActiveStatus={addActiveStatus} />} />
            <Route path="/ad/:id" element={
              <AdDetails/>} />
          </Routes>
        </div>
        <div className={styles.footer}>
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  )
}