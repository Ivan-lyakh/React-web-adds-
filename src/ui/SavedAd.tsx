import type { User } from "@supabase/supabase-js"
import { useSavedAd } from "../bll/useSaveAd"
import { Loading } from "./Loading"
import { ListItem } from "./ListItem"
import styles from './ListAds.module.css'


type Props = {
  actualUser: User | null
}

export function SavedAd(props: Props) {

  const { ads, loading } = useSavedAd(props.actualUser?.id)

  console.log(ads)

  if (loading) {
    return (
      <Loading />
    )
  }

  if (ads.length === 0) {
    return (
      <div>
        <h2 style={{ fontFamily: "Jost" }}>У вас пока нет сохраненных обявлений!</h2>
      </div>
    )
  }

  return (
    <div className={styles.listAdd}>
      <div className={styles.listAddHeader}>Сохраненные обявления: {ads.length}</div>
      <div className={styles.listAddBody}>
        {ads.map(ad => {
          return (
            <div onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <ListItem
                date={ad.date}
                key={ad.id}
                title={ad.title}
                price={ad.price}
                city={ad.city}
                id={ad.id}
                read={ad.read}
                categories={ad.categories}
                img={ad.img}
              />
            </div>
          )
        })}
      </div>
    </div>
  )


}