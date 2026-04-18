import './Header.module.css'
import styles from './Header.module.css'
import { type ActionActive } from '../bll/useAddActive'
import { Link } from 'react-router-dom'
import { type User } from '@supabase/supabase-js'
import { type ActionUser } from '../bll/useUsers'


type Props = {
  actionActive: ActionActive
  actualUser: User | null
  actionUser: ActionUser
  setIsAuthOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function Header(props: Props) {



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
            <button
              className={styles.createAds}
              onClick={() => props.actionActive.addActiveTrue()}>
              Создать обявления
            </button>
          </div>
          <div className={styles.headerTools}>
            <button
            onClick={() => {props.actualUser === null ? props.setIsAuthOpen(true) : props.actionUser.handleLogout()}}
            >
              {props.actualUser === null ? "Войти" : "Выйти"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}