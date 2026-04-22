
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


export async function getDetails(id: string) {
  const { data } = await supabase
    .from("ads")
    .select("*")
    .eq("id", id)
    .single()

  return { data }
}

export async function getMyAds(userId: string) {
  const { data } = await supabase
    .from("ads")
    .select("*")
    .eq("user_id", userId)
  return { data }
}

export const handleDelete = async (adsId: string) => {
  const { error } = await supabase
    .from('ads')
    .delete()
    .eq('id', adsId);

  if (error) {
    console.error(error);
  }
};

export const getUser = async () => {
  const { data } = await supabase.auth.getUser()

  return data.user
}