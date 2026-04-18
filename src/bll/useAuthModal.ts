import { useState } from "react";

export function useAuthModal() {

  const [email, setEmail] = useState('')

  const [password, setPassword] = useState('')

  const [registerMode, setRegisterMode] = useState(false)

  return {registerMode , setRegisterMode, setPassword , password, setEmail , email   }
}