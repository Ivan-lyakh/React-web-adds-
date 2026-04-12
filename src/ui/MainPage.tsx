import './MainPage.module.css'
import styles from './MainPage.module.css'
import { CreateAds } from './CreateAds'
import { ListAds } from './ListAds'
import { useAddList } from '../bll/useAddList'
import { SideBar } from './SideBar'
import { useSideBar } from '../bll/useSideBar'
import { type ActionActive } from '../bll/useAddActive'
type Props = {
  addActiveStatus: boolean
  actionActive: ActionActive
}

export function MainPage(props: Props) {

  const { globalList, actionGL } = useAddList()

  const { searchActive ,actionFormSearch , searchForm} = useSideBar()

  if (props.addActiveStatus) {
    return (
      <div className={styles.mainPage}>
        <div className={styles.container}>
          <div className={styles.mainPageBody}>
            <CreateAds
              actionActive={props.actionActive}
              actionGL={actionGL}
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.mainPage}>
      <SideBar
      searchActive={searchActive}
      searchForm={searchForm}
      actionFormSearch={actionFormSearch}
      />
      <div className={styles.container}>
        <div className={styles.mainPageBody}>
          <ListAds
            searchForm={searchForm}
            globalList={globalList}
            searchActive={searchActive}
            actionFormSearch={actionFormSearch}/>
        </div>
      </div>
    </div>
  )

}