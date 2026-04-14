import './Header.module.css'
import styles from './Header.module.css'
import { type ActionActive } from '../bll/useAddActive'
import { Link } from 'react-router-dom'


type Props = {
  actionActive: ActionActive
}

export function Header(props: Props) {

  return (
    <Link to={'/'}>
      <div className={styles.header}>
        <div className={styles.container}>
          <div className={styles.headerBody}>
            <div
              className={styles.headerLogo}
              onClick={() => props.actionActive.addActiveFalse()}>
              <h1>OXL</h1>
            </div>
            <div className={styles.headerTools}>
              <button
                onClick={() => props.actionActive.addActiveTrue()}>
                Добавить
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}