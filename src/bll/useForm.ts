import { useState } from "react";
import { supabase } from "../supaBaseClient";

export type ActionForm = {
  resetForm: () => void
  getTitle: (e: React.ChangeEvent<HTMLInputElement>) => void
  getPrice: (e: React.ChangeEvent<HTMLInputElement>) => void
  getCity: (e: React.ChangeEvent<HTMLInputElement>) => void
  getFiles: (e: React.ChangeEvent<HTMLInputElement>) => void
  getCattegories: (e: React.ChangeEvent<HTMLSelectElement>) => void
  upload: (file: File) => Promise<string>
}


export type InittalForm = {
  price: string,
  title: string,
  city: string,
  categories: string,
  img: File[]
}

export const categories = [
  { label: "Авто", value: "auto" },
  { label: "Аксессуары", value: "accessories" },
  { label: "Бытовая техника", value: "appliances" },
  { label: "Вакансии", value: "jobs" },
  { label: "Гаджеты", value: "gadgets" },
  { label: "Детские товары", value: "kids" },
  { label: "Дом и сад", value: "home" },
  { label: "Животные", value: "animals" },
  { label: "Запчасти", value: "parts" },
  { label: "Игры и консоли", value: "games" },
  { label: "Инструменты", value: "tools" },
  { label: "Книги", value: "books" },
  { label: "Красота и здоровье", value: "beauty" },
  { label: "Мебель", value: "furniture" },
  { label: "Недвижимость", value: "real_estate" },
  { label: "Одежда и обувь", value: "clothes" },
  { label: "Спорт и отдых", value: "sport" },
  { label: "Услуги", value: "services" },
  { label: "Электроника", value: "electronics" },
  { label: "Ювелирные изделия", value: "jewelry" }
]

export const translateCategories = (cat: string) => {
  const found = categories.find(c => c.value === cat)
  return found ? found.label : cat
}

export function useForm() {

  const InittalForm = {
    price: '',
    title: '',
    city: '',
    categories: '',
    img: []
  }

  const [form, setForm] = useState<InittalForm>(InittalForm)

  function getTitle(e: React.ChangeEvent<HTMLInputElement>) {
    setForm(prev => ({
      ...prev,
      title: e.target.value
    }))
  }

  async function upload(file: File) {

    const fileName = Date.now() + '-' + file.name

    const { error } = await supabase.storage
      .from('ads-img')
      .upload(fileName, file, {
        contentType: file.type,
      })


    const { data } = supabase.storage
      .from('ads-img')
      .getPublicUrl(fileName)

    if (error) {
      console.error('UPLOAD ERROR:', error)
    }

    return data.publicUrl
  }



  function getFiles(e: React.ChangeEvent<HTMLInputElement>) {

    const files = e.target.files

    setForm(prev => ({
      ...prev,
      img: files ? Array.from(files) : []
    }))
  }

  function getPrice(e: React.ChangeEvent<HTMLInputElement>) {
    setForm(prev => ({
      ...prev,
      price: e.target.value
    }))
  }

  function getCity(e: React.ChangeEvent<HTMLInputElement>) {
    setForm(prev => ({
      ...prev,
      city: e.target.value
    }))
  }

  function getCattegories(e: React.ChangeEvent<HTMLSelectElement>) {
    setForm(prev => ({
      ...prev,
      categories: e.target.value
    }))
  }

  function resetForm() {
    setForm(InittalForm)
  }


  const actionForm: ActionForm = { getCity, getPrice, getTitle, getCattegories, resetForm, getFiles, upload }

  return { actionForm, form, categories }
}