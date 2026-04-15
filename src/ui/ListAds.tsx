

import { type GlobalList } from "../bll/useAddList"
import type { ActionFormSearch, InittalFormFilter } from "../bll/useSideBar"
import './ListAds.module.css'
import styles from './ListAds.module.css'
import { ListItem } from "./ListItem"
import { FilterResult } from "./FilterResult"


type Props = {
  globalList: GlobalList[]
  searchActive: boolean
  searchForm: InittalFormFilter
  actionFormSearch: ActionFormSearch
  loading: boolean
}



export function ListAds(props: Props) {


  if (props.globalList.length === 0) {
    return (
      <div className={styles.listAdd}>
        <div className={styles.listAddBody}>
          <h1>На данный момент нет обявлений</h1>
        </div>
      </div>
    )
  }

  if (props.searchActive) {
    return (
      <FilterResult
        globalList={props.globalList}
        actionFormSearch={props.actionFormSearch}
      />
    )
  }


  return (
    <div className={styles.listAdd}>
      <div className={styles.listAddHeader}>Количество обявлений на сайте:{props.globalList.length}</div>
      <div className={styles.listAddBody}>
        {props.globalList.map(ad => {
          return (
            <ListItem
              key={ad.id}
              title={ad.title}
              price={ad.price}
              city={ad.city}
              id={ad.id}
              read={ad.read}
              categories={ad.categories}
              img={ad.img}
            />
          )
        })}
      </div>
    </div>
  )
}