import { supabase } from "../supaBaseClient";
import { useState } from "react";
import { useEffect } from "react";
import { getUser } from "../dal/api";
import { type User } from '@supabase/supabase-js'

export type ActionUser = {
  handleLogout: () => void
  handleLogin: (email: string, password: string) => Promise<boolean>
  handleRegister: (email: string, password: string ,name: string , phone: string) => Promise<boolean>
  resetErorMessage: () => void
}

export function useUsers() {

  const [actualUser, setActualUser] = useState<null | User>(null)

  const [loading, setLoading] = useState(true)

  const [errorMessage, setErrorMessage] = useState<null | string>(null)

  function resetErorMessage() {
    setErrorMessage(null)
  }

  useEffect(() => {
    async function loadUser() {
      const result = await getUser()
      console.log(result)
      setActualUser(result)
      setLoading(false)
    }
    loadUser()
  }, [])

  const handleRegister = async (email: string, password: string, name: string, phone: string) => {

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          name: name,
          phone: phone
        }
      }
    })

    if (error) {
      setErrorMessage(error.message)
      return false
    }
    setActualUser(data.user)
    setErrorMessage(null)
    return true
  }

  const handleLogin = async (email: string, password: string) => {

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    })

    if (error) {
      setErrorMessage(error.message)
      return false
    }
    setErrorMessage(null)
    setActualUser(data.user)
    return true
  }

  const handleLogout = async () => {

    const { error } = await supabase.auth.signOut()

    if (error) {
      return console.log(error)
    }

    setActualUser(null)

  }

  const actionUser: ActionUser = { handleLogout, handleRegister, handleLogin, resetErorMessage }

  return { actualUser, loading, actionUser, errorMessage }
}

