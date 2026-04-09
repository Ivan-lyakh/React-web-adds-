import { useEffect, useState } from "react";
import { getAds } from "../dal/api";
import { addAds } from "../dal/api";
import type { InittalForm } from "./useForm";

export type ActionGL = {
  addGlobalList: (form: InittalForm) => void
}

export type GlobalList = {
  title: string
  price: string
  city: string
  id: string
  categories: string
}


export function useAddList() {

  const [globalList, setGlobalList] = useState<GlobalList[]>([])

  useEffect(() => {
    async function loadData() {
      const data = await getAds()
      if (data) setGlobalList(data)
    }

    loadData()
  }, [])


  async function addGlobalList(form: InittalForm) {
    await addAds(form)

    const updated = await getAds()
    if (updated) {
      setGlobalList(updated)
    }
  }

  const actionGL: ActionGL = { addGlobalList }

  return { globalList, actionGL }
}