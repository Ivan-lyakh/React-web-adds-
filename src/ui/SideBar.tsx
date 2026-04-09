import { useForm } from '../bll/useForm'
import type { ActionFormSearch, InittalFormFilter } from '../bll/useSideBar'
import './SideBar.module.css'
import styles from './SideBar.module.css'

type Props = {
  actionFormSearch: ActionFormSearch
  searchForm: InittalFormFilter
  searchActive: boolean
}

export function SideBar(props: Props) {

  const { categories } = useForm()


  return (
    <div className={styles.sideBar}>
      <div className={styles.container}>
        <div className={styles.sideBarBody}>
          <div className={styles.sideBarColumn}>
            <div className={styles.sideBarHeader}>
              <div className={styles.sideBarCattegories}>
                <select
                  value={props.searchForm.categories}
                  onChange={(e) => props.actionFormSearch.getCattegories(e)}
                >
                  <option value="" disabled>
                    Выберите категорию
                  </option>
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles.sideBarTitle}>
                <input
                  onChange={(e) => props.actionFormSearch.getTitle(e)}
                  value={props.searchForm.title}
                  placeholder="Что вы ищите?"
                  type="text" />
              </div>
            </div>
          </div>
          <div className={styles.sideBarColumn}>
            <div className={styles.sideBarPrice}>
              <input
                value={props.searchForm.minPrice}
                onChange={(e) => props.actionFormSearch.getMinPrice(e)}
                placeholder='min-price'
                type="number" />
              <input
                onChange={(e) => props.actionFormSearch.getMaxPrice(e)}
                value={props.searchForm.maxPrice}
                placeholder='max-price'
                type="number" />
            </div>
          </div>
        </div>
        <div className={styles.sideBarLiveSearch}>
          <h2>{props.searchActive ?  "Live-поиск активирован 🟢" : "Live-поиск не активирован 🔴 для активации нажмите на кнопку"}</h2>
          <div className={styles.sideBarButton}>
            <button
              onClick={() => {
                props.actionFormSearch.searchActiveTogle()
              }}
            >{props.searchActive ? "Деативировать" : "Активировать"}</button>
          </div>
        </div>
      </div>
    </div>
  )
}