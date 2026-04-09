
import type { InittalForm } from "../bll/useForm";
import { supabase } from "../supaBaseClient";

export async function getAds() {
  const { data, error } = await supabase.from('ads').select('*')

  if (error) {
    console.log(error)
    return (
      null
    )
  }

  return data
}


export async function addAds(newItem: InittalForm) {
  const { data, error } = await supabase
    .from('ads')
    .insert([newItem])
    .select()

  if (error) {
    console.log(error)
    return null
  }

  if (!data) return null

  return data[0].id
}