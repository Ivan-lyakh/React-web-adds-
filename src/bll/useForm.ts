import { useState } from "react";
import { supabase } from "../supaBaseClient";

export type ActionForm = {
  resetForm: () => void
  getTitle: (e: React.ChangeEvent<HTMLInputElement>) => void
  getRead: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  getPrice: (e: React.ChangeEvent<HTMLInputElement>) => void
  getCity: (e: React.ChangeEvent<HTMLInputElement>) => void
  getFiles: (e: React.ChangeEvent<HTMLInputElement>) => void
  getCattegories: (e: React.ChangeEvent<HTMLSelectElement>) => void
  upload: (file: File) => Promise<string>
  setMainImage: (index: number) => void
  deleteImg: (index: number) => void
  statusTogle: () => void
  getName: (name: string) => void
  getPhone: (phone: string) => void
  getUserId: (id: string) => void
}

export type InittalForm = {
  price: string,
  title: string,
  city: string,
  categories: string,
  img: File[],
  read: string,
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

  const [status, setStatus] = useState(false)

  const statusTogle = () => setStatus(true)

  const InittalForm = {
    price: '',
    title: '',
    read: '',
    city: '',
    categories: '',
    user_id: '',
    name: '',
    phone: '',
    img: []
  }

  const [form, setForm] = useState<InittalForm>(InittalForm)

  function getTitle(e: React.ChangeEvent<HTMLInputElement>) {
    setForm(prev => ({
      ...prev,
      title: e.target.value
    }))
  }

  function getRead(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setForm(prev => ({
      ...prev,
      read: e.target.value
    }))
  }

  function getName(name: string) {
    setForm(prev => ({
      ...prev,
      name: name
    }))
  }

  function getPhone(phone: string) {
    setForm(prev => ({
      ...prev,
      phone: phone
    }))
  }

  function getUserId(id: string) {
    setForm(prev => ({
      ...prev,
      user_id: id
    }))
  }

  async function upload(file: File): Promise<string> {
    const ext = file.type.split('/')[1]
    const fileName = `${crypto.randomUUID()}.${ext}`

    const { error } = await supabase.storage
      .from('ads-img')
      .upload(fileName, file, {
        contentType: file.type,
      })

    if (error) {
      console.error('UPLOAD ERROR:', error)
      throw new Error('Upload failed')
    }

    const { data } = supabase.storage
      .from('ads-img')
      .getPublicUrl(fileName)

    return data.publicUrl
  }

  const setMainImage = (index: number) => {
    setForm(prev => {
      const newArr = [...prev.img];

      const selected = newArr[index]; 

      newArr.splice(index, 1);
      newArr.unshift(selected); 

      return {
        ...prev,
        img: newArr
      };
    });
  };

  const deleteImg = (index: number) => {
    setForm(prev => {
      const newArr = [...prev.img];

      newArr.splice(index, 1);

      return {
        ...prev,
        img: newArr
      };
    });
  };

  const MAX_FILES = 12;

  function getFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;

    if (!files) return;

    const newFiles = Array.from(files);

    setForm(prev => {
      const availableSlots = MAX_FILES - prev.img.length;

      const filesToAdd = newFiles.slice(0, availableSlots);

      if (newFiles.length > availableSlots) {
        alert(`Можно добавить только ${availableSlots} фото`);
      }

      return {
        ...prev,
        img: [...prev.img, ...filesToAdd]
      };
    });
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

  const actionForm: ActionForm = { getCity, getPrice, getTitle, getCattegories, resetForm, getFiles, upload, setMainImage, deleteImg, statusTogle, getRead, getName, getPhone, getUserId }

  return { actionForm, form, categories, status }
}