import { useMyAds } from "../bll/useMyAds"
import { type User } from "@supabase/supabase-js"
import { Loading } from "./Loading"
import styles from './MyAds.module.css'
import { translateCategories } from "../bll/useForm"
import { handleDelete } from "../dal/api"
import { useState } from "react"

type Props = {
  actualUser: User | null
  setMyAdsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function MyAds(props: Props) {

  const userId = props.actualUser?.id

  console.log(userId)

  const { myAds, loading } = useMyAds(userId)

  const [deleteAds, setDeleteAds] = useState(false)

  if (loading) {
    return (
      <Loading />
    )
  }

  if (deleteAds) {
    return (
      <div>
        <h1>Ваше обявления было удалено!</h1>
        <button
          onClick={() => {
            setDeleteAds(false)
            window.location.reload();
          }}
        >Ок</button>
      </div>
    )
  }

  if (myAds?.length === 0) {
    return (
      <h1>У вас пока нет обявлений!</h1>
    )
  }


  return (
    <div className={styles.myAds}>
      {myAds &&
        myAds.map(item => {
          return (
            <div
              key={Date.now()}>
              <div
                className={styles.itemBody}
              >
                <div className={styles.itemTools}>
                  <button
                    onClick={() => {
                      userId &&
                        handleDelete(item.id)
                      setDeleteAds(true)
                    }}
                  >Удалить</button>
                </div>
                <div
                  className={styles.item}>
                  <div className={styles.itemSection}>
                    <img src={JSON.parse(item.img)[0]} alt="img" />
                  </div>

                  <div className={styles.itemSectionBody}>
                    <h2>{item.title}</h2>
                    <h2>{translateCategories(item.categories)}</h2>
                    <h2>{Number(item.price).toLocaleString('de-DE')}$</h2>
                    <h2>{item.city}</h2>
                  </div>
                </div>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}