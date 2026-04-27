import { useEffect, useState } from "react"
import {
  addToFavorites,
  removeFromFavorites,
  checkFavorite
} from "../dal/api"

export function useFavorite(userId: string | undefined, adId: string | undefined) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function check() {
      if (!userId || !adId) return

      const data = await checkFavorite(userId, adId)
      setIsFavorite(!!data)
      setLoading(false)
    }

    check()
  }, [userId, adId])

  const toggleFavorite = async () => {
    if (!userId || !adId) return

    if (isFavorite) {
      await removeFromFavorites(userId, adId)
      setIsFavorite(false)
    } else {
      await addToFavorites(userId, adId)
      setIsFavorite(true)
    }
  }

  return {
    isFavorite,
    toggleFavorite,
    loading
  }
}