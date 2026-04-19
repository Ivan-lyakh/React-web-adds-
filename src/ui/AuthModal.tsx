import type { ActionActive } from "../bll/useAddActive"
import { useAuthModal } from "../bll/useAuthModal"
import type { ActionUser } from "../bll/useUsers"
import styles from './AuthModal.module.css'

type Props = {
  setIsAuthOpen: React.Dispatch<React.SetStateAction<boolean>>
  errorMessage: null | string
  actionUser: ActionUser
}

export function AuthModal(props: Props) {

  const { email, registerMode, password, setRegisterMode, setEmail, setPassword, reset } = useAuthModal()


  return (
    <div className={styles.authModal}>
      <div className={styles.container}>
        <div className={styles.body}>
          <div className={styles.columnHeader}>
            <h2>{registerMode ? "Регистрация" : "Логин"}</h2>
            <button
              onClick={() => {
                props.setIsAuthOpen(false),
                  props.actionUser.resetErorMessage()
                reset()
              }}
            >❌</button>
          </div>
          <div className={styles.column}>
            <input
              name="random-email"
              autoComplete="off"
              placeholder="email*"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email" />

          </div>
          <div className={styles.column}>
            <input
              name="random-password"
              autoComplete="new-password"
              placeholder="password*"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password" />

          </div>
          <div className={styles.column}>
            {props.errorMessage && !registerMode && <p style={{ color: "red", marginBottom: "10px" }}>Произошла ошибка,проверьте свой логин и пароль! </p>}
            {props.errorMessage && registerMode && <p style={{ color: "red", marginBottom: "10px" }}>Произошла ошибка, данный email адресс уже используеться в нашей системе ,или же он был введен неккоректно </p>}
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
            {!registerMode && <h2>Нет аккаунта? <span onClick={() => { setRegisterMode(true), props.actionUser.resetErorMessage(), reset() }}>Зарегестрируйте</span> его прямо сейчас!</h2>}
            {registerMode && <h2>Есть аккаунт? <span onClick={() => { setRegisterMode(false), props.actionUser.resetErorMessage(), reset() }}>Войдите</span> в него прямо сейчас!</h2>}
          </div>
        </div>
      </div>
    </div>
  )
}