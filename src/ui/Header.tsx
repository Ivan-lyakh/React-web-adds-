import './Header.module.css'
import styles from './Header.module.css'
import { type ActionActive } from '../bll/useAddActive'
import { Link } from 'react-router-dom'
import { type User } from '@supabase/supabase-js'
import { type ActionUser } from '../bll/useUsers'
import user from '../ui/images/user.png'
import { useState, useRef, useEffect } from 'react'

type Props = {
  actionActive: ActionActive
  actualUser: User | null
  actionUser: ActionUser
  setIsAuthOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function Header(props: Props) {

  const [isOpen, setIsOpen] = useState(false)

  const menuRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <div className={styles.headerBody}>
          <div
            className={styles.leftColumn}
          >
            <Link to={'/'}>
              <div
                className={styles.headerLogo}
                onClick={() => {
                  props.actionActive.addActiveFalse(),
                    props.setIsAuthOpen(false)
                }}>
                <h1>OXL</h1>
              </div>
            </Link>
          </div>
          <div className={styles.headerTools}>
            {props.actualUser &&
              <div className={styles.user} ref={menuRef}>

                <div className={styles.userName}>
                  <h2>{props.actualUser.user_metadata.name}</h2>
                </div>

                <img
                  src={user}
                  alt="user"
                  onClick={() => setIsOpen(!isOpen)}
                />

                <div
                  className={`${styles.dropDown} ${isOpen ? styles.open : ''}`}>
                  <div className={styles.dropDownInfo}>
                    <h3 className={styles.email}>{props.actualUser.email}</h3>
                    <h3 className={styles.email}>{props.actualUser.user_metadata.phone}</h3>
                  </div>
                  <h2 onClick={() => {
                    props.actionActive.addActiveTrue()
                    setIsOpen(false)
                  }}>
                    Создать обявления
                  </h2>

                  <h2>Мои обялвения</h2>
                  <h2>Сохраненные обявления</h2>

                  <button onClick={() => {
                    props.actionUser.handleLogout()
                    setIsOpen(false)
                    props.actionActive.addActiveFalse()
                  }}>
                    Выйти
                  </button>
                </div>
              </div>}
            {!props.actualUser && <button
              onClick={() => props.setIsAuthOpen(true)}
            >Войти</button>}
          </div>
        </div>
      </div>
    </div>
  )
}