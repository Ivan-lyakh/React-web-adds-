
import type { newForm } from "../bll/useAddList";
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


export async function addAds(newItem: newForm) {
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