import './MainPage.module.css'
import styles from './MainPage.module.css'
import { CreateAds } from './CreateAds'
import { ListAds } from './ListAds'
import { useAddList } from '../bll/useAddList'
import { SideBar } from './SideBar'
import { useSideBar } from '../bll/useSideBar'
import { type ActionActive } from '../bll/useAddActive'
import { Loading } from './Loading'
import type { User } from '@supabase/supabase-js'
import { MyAds } from './MyAds'
import {  useState } from 'react'
import { SavedAd } from './SavedAd'


type Props = {
  addActiveStatus: boolean
  actionActive: ActionActive
  actualUser: User | null
  myAdsOpen: boolean
  savedAdOpen: boolean
  setMyAdsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function MainPage(props: Props) {

  const { globalList, actionGL, loading } = useAddList()

  const { searchActive, actionFormSearch, searchForm } = useSideBar()

  const [deleteAds, setDeleteAds] = useState(false)



  if (deleteAds) {
    return (
      <div className={styles.deleteAds}>
        <h2>Ваше обявления было удалено!</h2>
        <button
          onClick={() => {
            setDeleteAds(false)
            window.location.reload();
          }}
        >Ок</button>
      </div>
    )
  }

  if (props.savedAdOpen) {
    return (
      <div className={styles.mainPage}>
        <div className={styles.container}>
          <div className={styles.mainPageBody}>
            <SavedAd
              actualUser={props.actualUser}
            />
          </div>
        </div>
      </div>
    )
  }

  if (props.myAdsOpen) {
    return (
      <div className={styles.mainPage}>
        <div className={styles.container}>
          <div className={styles.mainPageBody}>
            <MyAds
              setDeleteAds={setDeleteAds}
              actionActive={props.actionActive}
              actualUser={props.actualUser}
              setMyAdsOpen={props.setMyAdsOpen}
            />
          </div>
        </div>
      </div>
    )
  }

  if (props.addActiveStatus) {
    return (
      <div className={styles.mainPage}>
        <div className={styles.container}>
          <div className={styles.mainPageBody}>
            <CreateAds
              actualUser={props.actualUser}
              actionActive={props.actionActive}
              actionGL={actionGL}
            />
          </div>
        </div>
      </div>
    )
  }

  if (loading) {
    return <Loading />
  }

  else {
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
              loading={loading}
              searchForm={searchForm}
              globalList={globalList}
              searchActive={searchActive}
              actionFormSearch={actionFormSearch} />
          </div>
        </div>
      </div>
    )
  }

}