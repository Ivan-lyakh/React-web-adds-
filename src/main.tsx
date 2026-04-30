
import { createRoot } from 'react-dom/client'
import { Header } from './ui/Header'
import { MainPage } from './ui/MainPage'
import { Footer } from './ui/Footer'
import { useAddActive } from './bll/useAddActive'
import { AdDetails } from './ui/AdDetails'
import { HashRouter, Routes, Route } from "react-router-dom"
import { useUsers } from './bll/useUsers'
import { useState } from 'react'
import { AuthModal } from './ui/AuthModal'
import styles from './index.module.css'
import './index.module.css'

createRoot(document.getElementById('root')!).render(
  <Main />
)

function Main() {

  const { addActiveStatus, actionActive } = useAddActive()

  const { actualUser, actionUser, errorMessage } = useUsers()

  const [myAdsOpen, setMyAdsOpen] = useState(false)

  const [isAuthOpen, setIsAuthOpen] = useState(false)

  const [savedAdOpen, setSavedAdOpen] = useState(false)

  return (

    <HashRouter>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <Header
            setMyAdsOpen={setMyAdsOpen}
            setIsAuthOpen={setIsAuthOpen}
            setSavedAdOpen={setSavedAdOpen}
            actionUser={actionUser}
            actualUser={actualUser}
            actionActive={actionActive} />
        </div>
        <div className={styles.main}>
          <Routes>
            <Route path='/' element={
              <MainPage
                savedAdOpen={savedAdOpen}
                myAdsOpen={myAdsOpen}
                actualUser={actualUser}
                actionActive={actionActive}
                setMyAdsOpen={setMyAdsOpen}
                addActiveStatus={addActiveStatus} />} />
            <Route path="/ad/:id" element={
              <AdDetails
                actualUser={actualUser}
              />} />
          </Routes>
        </div>
        <div className={styles.footer}>
          <Footer />
        </div>
        {isAuthOpen && <AuthModal
          actionUser={actionUser}
          errorMessage={errorMessage}
          setIsAuthOpen={setIsAuthOpen} />}
      </div>
    </HashRouter>
  )
}