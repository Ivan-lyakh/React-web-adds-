import { ListItem } from "./ListItem"
import styles from './ListAds.module.css'
import type { GlobalList } from "../bll/useAddList"
import { type ActionFormSearch } from "../bll/useSideBar"
import { ErorFilterResult } from "./Eror"

type Props = {
  globalList: GlobalList[]
  actionFormSearch: ActionFormSearch
}

export function FilterResult(props: Props) {

  const filteredAds = props.globalList.filter(ad => props.actionFormSearch.selectFilter(ad))

  return (
    <div className={styles.listAdd}>
      <div className={styles.listAddHeader}>Количество обявлений по вашему фильтру:{filteredAds.length}</div>
      <div className={styles.listAddBody}>
        {filteredAds.length > 0 ? (
          filteredAds.map(ad => (
            <ListItem key={ad.id} {...ad} />
          ))
        ) : (
          <ErorFilterResult />
        )}
      </div>
    </div>
  )
}