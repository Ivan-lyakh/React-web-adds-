import { useState } from "react";
import { type GlobalList } from "./useAddList";


export type ActionFormSearch = {
  resetForm: () => void
  getTitle: (e: React.ChangeEvent<HTMLInputElement>) => void
  getCity: (e: React.ChangeEvent<HTMLInputElement>) => void
  getCattegories: (e: React.ChangeEvent<HTMLSelectElement>) => void
  getMinPrice: (e: React.ChangeEvent<HTMLInputElement>) => void
  getMaxPrice: (e: React.ChangeEvent<HTMLInputElement>) => void
  searchActiveTogle: () => void
  selectFilter: (ad: GlobalList) => void
}

export type InittalFormFilter = {
  minPrice: string,
  maxPrice: string,
  title: string,
  city: string,
  categories: string
}

  const InittalFormFilter = {
    minPrice: '',
    maxPrice: '',
    title: '',
    city: '',
    categories: ''
  }


export function useSideBar() {

  const [searchActive, setSearchActive] = useState<boolean>(false)

  const [searchForm, setSearchForm] = useState<InittalFormFilter>(InittalFormFilter)

  function selectFilter(ad: GlobalList) {
  const { categories, city, minPrice, maxPrice, title } = searchForm

    return (

      (!categories || ad.categories === categories) &&

      (!city || ad.city.toLowerCase().includes(city.toLowerCase())) &&

      (!minPrice || Number(ad.price) >= Number(minPrice)) &&

      (!maxPrice || Number(ad.price) <= Number(maxPrice)) &&

      (!title || ad.title.toLowerCase().includes(title.toLowerCase()))

    )
  }

  function getTitle(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchForm(prev => ({
      ...prev,
      title: e.target.value
    }))
  }

  function getMinPrice(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchForm(prev => ({
      ...prev,
      minPrice: e.target.value
    }))
  }

  function getMaxPrice(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchForm(prev => ({
      ...prev,
      maxPrice: e.target.value
    }))
  }


  function getCity(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchForm(prev => ({
      ...prev,
      city: e.target.value
    }))
  }

  function getCattegories(e: React.ChangeEvent<HTMLSelectElement>) {
    setSearchForm(prev => ({
      ...prev,
      categories: e.target.value
    }))
  }


  function resetForm() {
    setSearchForm(InittalFormFilter)
  }

  function searchActiveTogle() {
    setSearchActive(!searchActive)
  }


  const actionFormSearch: ActionFormSearch = { getCity, getMinPrice , getMaxPrice , getTitle, getCattegories, resetForm , searchActiveTogle , selectFilter }

  return { searchActive, searchForm, actionFormSearch  }
}