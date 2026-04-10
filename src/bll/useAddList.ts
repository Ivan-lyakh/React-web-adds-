import { useEffect, useState } from "react";
import { getAds } from "../dal/api";
import { addAds } from "../dal/api";


export type ActionGL = {
  addGlobalList: (form: newForm) => void
}

export type GlobalList = {
  title: string
  price: string
  city: string
  id: string
  categories: string
  img: string
}

export type newForm = {
  price: string,
  title: string,
  city: string,
  categories: string,
  img: string[]
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


  async function addGlobalList(form: newForm) {
    await addAds(form)

    const updated = await getAds()
    if (updated) {
      setGlobalList(updated)
    }
  }

  const actionGL: ActionGL = { addGlobalList }

  return { globalList, actionGL }
}