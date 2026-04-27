import { useMyAds } from "../bll/useMyAds"
import { type User } from "@supabase/supabase-js"
import { Loading } from "./Loading"
import styles from './MyAds.module.css'
import { translateCategories } from "../bll/useForm"
import { handleDelete } from "../dal/api"
import type { ActionActive } from "../bll/useAddActive"

type Props = {
  actualUser: User | null
  setMyAdsOpen: React.Dispatch<React.SetStateAction<boolean>>
  actionActive: ActionActive
  setDeleteAds: React.Dispatch<React.SetStateAction<boolean>>
}

export function MyAds(props: Props) {

  const userId = props.actualUser?.id


  const { myAds, loading } = useMyAds(userId)



  if (loading) {
    return (
      <Loading />
    )
  }


  if (myAds?.length === 0) {
    return (
      <div className={styles.noAds}>

        <div>
          <h2>У вас пока нет обявлений :(</h2>
        </div>
        <div>
          <p>Но не розстраивайтесь,Вы в любой момент можете его
            <span>
              <button onClick={() => {
                props.actionActive.addActiveTrue()
                props.setMyAdsOpen(false)
              }}>создать</button>
            </span>
            :)</p>
        </div>
      </div>

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
                      props.setDeleteAds(true)
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