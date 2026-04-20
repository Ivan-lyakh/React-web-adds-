
import { useState } from "react"
import { useAuthModal } from "../bll/useAuthModal"
import type { ActionUser } from "../bll/useUsers"
import styles from './AuthModal.module.css'

type Props = {
  setIsAuthOpen: React.Dispatch<React.SetStateAction<boolean>>
  errorMessage: null | string
  actionUser: ActionUser
}

export function AuthModal(props: Props) {

  const [visiblePassword, setVisiblePassword] = useState(false)

  const { registerMode, setRegisterMode, setEmail, setPassword, reset, atributes, setPhone, setName } = useAuthModal()


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
                  setVisiblePassword(false)
                reset()
              }}
            >❌</button>
          </div>
          <div className={styles.column}>
            <input
              name="random-email"
              autoComplete="off"
              placeholder="email*"
              value={atributes.email}
              onChange={(e) => setEmail(e.target.value)}
              type="email" />

          </div>
          <div className={styles.column}>
            <div className={styles.passwordWrapper}>
              <input
                name="random-password"
                autoComplete="new-password"
                placeholder="password*"
                value={atributes.password}
                onChange={(e) => setPassword(e.target.value)}
                type={visiblePassword ? "text" : "password"}
              />

              <span
                onClick={() => setVisiblePassword(!visiblePassword)}
                className={styles.toggleBtn}>
                {visiblePassword ? '🙉' : '🙈'}
              </span>
            </div>


          </div>

          {registerMode &&
            <div className={styles.body}>
              <div className={styles.column}>
                <input
                  name="random-text"
                  autoComplete="off"
                  placeholder="your name*"
                  value={atributes.name}
                  onChange={(e) => setName(e.target.value)}
                  type="text" />
              </div>

              <div className={styles.column}>
                <input
                  name="random-text"
                  autoComplete="off"
                  placeholder="phone*"
                  value={atributes.phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="phone" />
              </div>
            </div>
          }

          <div className={styles.column}>
            {props.errorMessage && !registerMode && <p style={{ color: "red", marginBottom: "10px" }}>Произошла ошибка,проверьте свой логин и пароль! </p>}
            {props.errorMessage && registerMode && <p style={{ color: "red", marginBottom: "10px" }}>Произошла ошибка, данный email адресс уже используеться в нашей системе ,или же он был введен неккоректно </p>}
            <button
              onClick={async () => {
                if (registerMode) {
                  const result = await props.actionUser.handleRegister(atributes.email, atributes.password, atributes.name, atributes.phone)
                  if (result) {
                    props.setIsAuthOpen(false)
                  }
                }
                else {
                  const result = await props.actionUser.handleLogin(atributes.email, atributes.password)
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
            {!registerMode && <h2>Нет аккаунта? <span onClick={() => { setRegisterMode(true), props.actionUser.resetErorMessage(), reset(), setVisiblePassword(false) }}>Зарегестрируйте</span> его прямо сейчас!</h2>}
            {registerMode && <h2>Есть аккаунт? <span onClick={() => { setRegisterMode(false), props.actionUser.resetErorMessage(), reset(), setVisiblePassword(false) }}>Войдите</span> в него прямо сейчас!</h2>}
          </div>
        </div>
      </div>
    </div>
  )
}