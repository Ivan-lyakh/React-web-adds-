
import type { newForm } from "../bll/useAddList";
import { supabase } from "../supaBaseClient";

export async function addToFavorites(userId: string, adId: string) {
  const { error } = await supabase
    .from("savedAd")
    .insert([{ user_id: userId, ad_id: adId }])

  if (error) console.error(error)
}

export async function removeFromFavorites(userId: string, adId: string) {
  const { error } = await supabase
    .from("savedAd")
    .delete()
    .eq("user_id", userId)
    .eq("ad_id", adId)

  if (error) console.error(error)
}

export async function checkFavorite(userId: string, adId: string) {
  const { data } = await supabase
    .from("savedAd")
    .select("*")
    .eq("user_id", userId)
    .eq("ad_id", adId)
    .maybeSingle()

  return data
}

export async function getSavedIds(userId: string) {
  const { data, error } = await supabase
    .from("savedAd")
    .select()
    .eq("user_id", userId)

  if (error) {
    console.error(error)
    return []
  }

  return data
}

export async function getAdsByIds(ids: string[]) {
  const { data, error } = await supabase
    .from("ads")
    .select("*")
    .in("id", ids)

  if (error) {
    console.error(error)
    return []
  }

  return data
}

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
    console.log("Ошибка добавления в главыный спискок!")
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


