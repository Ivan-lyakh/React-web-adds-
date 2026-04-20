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
  read: string ,
  categories: string
  img: string
}

export type newForm = {
  price: string,
  title: string,
  city: string,
  categories: string,
  read: string,
  name: string,
  phone: string,
  user_id: string 
  img: string[]
}


export function useAddList() {

  const [globalList, setGlobalList] = useState<GlobalList[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      const data = await getAds()
      if (data) setGlobalList(data)
      setLoading(false)
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

  return { globalList, actionGL, loading }
}