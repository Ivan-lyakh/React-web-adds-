import type { GlobalList } from "../bll/useAddList";
import './ListItem.module.css'
import styles from './ListItem.module.css'
import { translateCategories } from "../bll/useForm";

export function ListItem(props: GlobalList){


  return(
    <div className={styles.item}>
      <h2>Название обявления: {props.title}</h2>
      <h2>Цена: {props.price}$</h2>
      <h2>Город: {props.city}</h2>
      <h2>Каттегория: {translateCategories(props.categories)}</h2>
    </div>
  )
}