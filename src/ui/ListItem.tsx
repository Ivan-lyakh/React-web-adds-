
import './ListItem.module.css'
import styles from './ListItem.module.css'
import { translateCategories } from "../bll/useForm";
import { Link } from "react-router-dom";


type ListItemProps = {
  id: string;
  title: string;
  price: string;
  city: string;
  categories: string;
  img: string;
  read: string;
};

export function ListItem(props: ListItemProps) {

  return (
    <Link to={`/ad/${props.id}`}>
      <div className={styles.item}>
        <div className={styles.imgContainer}>
          <img
            className={styles.img}
            src={JSON.parse(props.img)[0]} />
        </div>
        <div className={styles.body}>
          <h2><b>{props.title}</b></h2>
          <h2>Цена: {Number(props.price).toLocaleString('de-DE')}$</h2>
          <h2>Город: {props.city}</h2>
          <h2>Каттегория: {translateCategories(props.categories)}</h2>
        </div>
      </div>
    </Link>
  )
}