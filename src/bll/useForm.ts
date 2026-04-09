import { useState } from "react";


export type ActionForm = {
  resetForm: () => void
  getTitle: (e: React.ChangeEvent<HTMLInputElement>) => void
  getPrice: (e: React.ChangeEvent<HTMLInputElement>) => void
  getCity: (e: React.ChangeEvent<HTMLInputElement>) => void
  getCattegories: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

export type InittalForm = {
  price: string,
  title: string,
  city: string,
  categories: string
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

export const translateCategories = (cat:string) => {
  const found = categories.find(c => c.value === cat)
  return found ? found.label : cat
}

export function useForm() {

  const InittalForm = {
    price: '',
    title: '',
    city: '',
    categories: ''
  }

  const [form, setForm] = useState<InittalForm>(InittalForm)

  function getTitle(e: React.ChangeEvent<HTMLInputElement>) {
    setForm(prev => ({
      ...prev,
      title: e.target.value
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


  const actionForm: ActionForm = { getCity, getPrice, getTitle, getCattegories, resetForm }

  return { actionForm, form, categories }
}