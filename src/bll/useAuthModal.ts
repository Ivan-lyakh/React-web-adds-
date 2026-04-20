import { useState } from "react";

export function useAuthModal() {

  const [email, setEmail] = useState('')

  const [password, setPassword] = useState('')

  const [registerMode, setRegisterMode] = useState(false)

  const [phone , setPhone ] = useState('')

  const [name , setName] = useState ('')

  const reset = () => {
    setEmail('')
    setPassword('')
  }

  const atributes = {email ,password , phone , name}

  return {registerMode , setRegisterMode, setPassword , setEmail ,  reset ,  atributes , setPhone , setName }
}