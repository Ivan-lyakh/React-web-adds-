import { useState } from "react";

export type ActionActive = {
  addActiveTrue: () => void
  addActiveFalse: () => void
}

export function useAddActive() {

  const [addActiveStatus, setAddActiveStatus] = useState<boolean>(false)

  const addActiveTrue = () => setAddActiveStatus(true)

  const addActiveFalse = () => setAddActiveStatus(false)

  const actionActive: ActionActive = {
    addActiveTrue,
    addActiveFalse
  }

  return { addActiveStatus, actionActive }
}