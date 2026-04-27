import { useEffect, useState } from "react"
import { getSavedIds, getAdsByIds } from "../dal/api"

export function useSavedAd(userId: string | undefined) {
  const [ads, setAds] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      if (!userId) return

      const saved = await getSavedIds(userId)
      const ids = saved.map(i => i.ad_id)

      if (ids.length === 0) {
        setAds([])
        setLoading(false)
        return
      }

      const result = await getAdsByIds(ids)
      setAds(result)
      setLoading(false)
    }

    load()
  }, [userId])

  return { ads, loading }
}