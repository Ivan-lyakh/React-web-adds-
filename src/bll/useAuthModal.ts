import { useState } from "react";

export function useAuthModal() {

  const [email, setEmail] = useState('')

  const [password, setPassword] = useState('')

  const [registerMode, setRegisterMode] = useState(false)

  const reset = () => {
    setEmail('')
    setPassword('')
  }

  return {registerMode , setRegisterMode, setPassword , password, setEmail , email ,reset  }
}