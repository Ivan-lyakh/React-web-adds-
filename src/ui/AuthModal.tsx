import { useAuthModal } from "../bll/useAuthModal"
import type { ActionUser } from "../bll/useUsers"
import styles from './AuthModal.module.css'

type Props = {
  setIsAuthOpen: React.Dispatch<React.SetStateAction<boolean>>
  errorMessage: null | string
  actionUser: ActionUser
}

export function AuthModal(props: Props) {

  const { email, registerMode, password, setRegisterMode, setEmail, setPassword } = useAuthModal()


  return (
    <div className={styles.authModal}>
      <div className={styles.container}>
        <div className={styles.body}>
          <div className={styles.columnHeader}>
            <h2>{registerMode  ? "Регестрация" : "Логин"}</h2>
            <button
            onClick={() => {
              props.setIsAuthOpen(false),
              props.actionUser.resetErorMessage()
            }}
            >❌</button>
          </div>
          <div className={styles.column}>
            <input
              placeholder="email*"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email" />

          </div>
          <div className={styles.column}>
            <input
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password" />

          </div>
          <div className={styles.column}>
            {props.errorMessage && <p style={{color: "red" , marginBottom: "10px"}}>Произошла ошибка,проверьте свой логин и пароль! </p>}
            <button
              onClick={async () => {
                if (registerMode) {
                  const result = await props.actionUser.handleRegister(email, password)
                  if (result) {
                    props.setIsAuthOpen(false)
                  }
                }
                else {
                  const result = await props.actionUser.handleLogin(email, password)
                  if (result) {
                    props.setIsAuthOpen(false)
                  }
                }
              }
              }
            >
              {registerMode ? 'Зарегестрироваться' : 'Войти'}
            </button>
          </div>
          <div className={styles.column}>
            {!registerMode && <h2>Нет аккаунта? <span onClick={() => setRegisterMode(true)}>Зарегестрируйте</span> его прямо сейчас!</h2>}
            {registerMode && <h2>Есть аккаунт? <span onClick={() => setRegisterMode(false)}>Войдите</span> в него прямо сейчас!</h2>}
          </div>
        </div>
      </div>
    </div>
  )
}