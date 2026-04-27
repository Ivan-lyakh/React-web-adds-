import { useAdDetail } from "../bll/useAdDetails"
import { Loading } from "./Loading"
import styles from './AdDetails.module.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import { translateCategories } from "../bll/useForm";
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import noSaved from '../ui/images/noSaved.png'
import saved from '../ui/images/saved.png'
import { useFavorite } from "../bll/useFavorit"
import type { User } from "@supabase/supabase-js"

type Props = {
  actualUser: User | null
}

export function AdDetails(props: Props) {

  const { ad, loading } = useAdDetail()

  const userId = props.actualUser?.id

  const { isFavorite, toggleFavorite } = useFavorite(userId, ad?.id)


  if (loading) {
    return <Loading />
  }

  if (!ad) {
    return <div>Not Found</div>
  }

  const images = JSON.parse(ad.img)

  return (

    <div className={styles.details}>
      <div className={styles.container}>

        <div className={styles.detailsMain}>
          <div className={styles.detailsSwiper}>
            <div className={styles.detailsSwiperItem}>
              <h2 className={styles.title}>Название обявления: {ad.title}</h2>
            </div>
            <Swiper className={styles.swiper}
              modules={[Navigation, Pagination]}
              navigation
              spaceBetween={10}
              slidesPerView={1}
              pagination={{ clickable: true }}
            >
              {images.map((img: string, index: number) => (
                <SwiperSlide key={index}>
                  <img src={img} className={styles.image} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className={styles.detailsBody}>
            <div className={styles.detailsBodyItem}>
              <h2>Цена указанная продавцом: {Number(ad.price).toLocaleString('de-DE')}$</h2>
            </div>
            <div style={{paddingTop: "30px"}} className={styles.detailsBodyItem}>
              <h2>Каттегория: {translateCategories(ad.categories)}</h2>
            </div>
            <div className={styles.detailsBodyItem}>
              <h2>Город: {ad.city}</h2>
            </div>

            <div className={styles.info}>
              <h3>Дата публикации: {new Date(ad.date).toLocaleDateString('ru-RU')}</h3>
              {props.actualUser ? <h3 className={styles.savedNoSaved}>
                {isFavorite ? "В избранном:" : "Добавить в избранное:"}

                <span onClick={toggleFavorite}>
                  <img
                    src={isFavorite ? saved : noSaved}
                    alt="favorite"
                  />
                </span>
              </h3>
              :
              <h2>
                (Что бы открыть функцию сохранения обявления в избранное - необходимо авторизоваться!)
              </h2>
              }
            </div>
            <div className={styles.contact}>
              <h2>Контакт:</h2>
              <div className={styles.containerContact}>
                <h3>👤: {ad.name}</h3>
                <h3>📞: {ad.phone}</h3>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.detailsRead}>
          <h2>Описание обявления:</h2>
          <p>{ad.read}</p>
        </div>
      </div>
    </div>
  )
}