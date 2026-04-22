import { useAdDetail } from "../bll/useAdDetails"
import { Loading } from "./Loading"
import styles from './AdDetails.module.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import { translateCategories } from "../bll/useForm";
import 'swiper/css'
import 'swiper/css/navigation'

import 'swiper/css/pagination'

export function AdDetails() {

  const { ad, loading } = useAdDetail()

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
              <h2>Название обявления: {ad.title}</h2>
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
            <div className={styles.detailsBodyItem}>
              <h2>Каттегория: {translateCategories(ad.categories)}</h2>
            </div>
            <div className={styles.detailsBodyItem}>
              <h2>Город: {ad.city}</h2>
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