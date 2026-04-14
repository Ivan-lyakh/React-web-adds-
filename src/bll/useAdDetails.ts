
import { getDetails } from "../dal/api"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import type { GlobalList } from "./useAddList"


export function useAdDetail() {

  const { id } = useParams()
  const [ad, setAd] = useState<GlobalList | null>(null)
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    async function loadData() {
      if (id) {
        const result = await getDetails(id)
        setAd(result.data)
        setLoading(false)
      }
    }

    loadData()
  }, [id])

  return { ad, loading }
}
