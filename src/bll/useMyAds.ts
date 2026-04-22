import { useEffect, useState } from "react";
import { getMyAds } from "../dal/api";

export function useMyAds(userId: string | undefined) {

  const [myAds, setMyAds] = useState<null | any[]>(null)

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      if (userId) {
        const result = await getMyAds(userId)
        setMyAds(result.data)
        setLoading(false)
      }
    }

    loadData()
  }, [])




  return { myAds, loading }
}