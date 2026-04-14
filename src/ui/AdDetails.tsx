import { useAdDetail } from "../bll/useAdDetails"
import { Loading } from "./Loading"
import styles from './AdDetails.module.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
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

  console.log(images)

  return (

    <div className={styles.details}>
      <div className={styles.container}>

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
    </div>
  )
}