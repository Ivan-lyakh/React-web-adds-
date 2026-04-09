import './Footer.module.css'
import styles from './Footer.module.css'

export function Footer(){
  return(
    <div className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerBody}>
          <h1>Footer</h1>
        </div>
      </div>
    </div>
  )
}