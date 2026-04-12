import type { GlobalList } from "../bll/useAddList";
import './ListItem.module.css'
import styles from './ListItem.module.css'
import { translateCategories } from "../bll/useForm";


export function ListItem(props: GlobalList) {

  return (
    <div className={styles.item}>
      <div className={styles.imgContainer}>
        <img
          className={styles.img}
          src={JSON.parse(props.img)[0]} />
      </div>
      <div>
        <h2><b>{props.title}</b></h2>
        <h2>Цена: {props.price}$</h2>
        <h2>Город: {props.city}</h2>
        <h2>Каттегория: {translateCategories(props.categories)}</h2>
      </div>
    </div>
  )
}