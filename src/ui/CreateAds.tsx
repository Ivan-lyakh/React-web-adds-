
import type { ActionGL, newForm } from '../bll/useAddList'
import { categories, useForm } from '../bll/useForm'
import './CreateAds.module.css'
import styles from './CreateAds.module.css'

type Props = {
  actionGL: ActionGL
}

export function CreateAds(props: Props) {

  const { form, actionForm } = useForm()


  return (
    <div className={styles.createAds}>

      <form
        className={styles.createAdsBody}
        onSubmit={async (e) => {
          e.preventDefault()

          const files = form.img
          console.log('FILES:', files)


          const urls = await Promise.all(
            files.map(file => {
              console.log('UPLOAD FILE:', file)
              return actionForm.upload(file)
            })
          )

          const newForm: newForm = {
            ...form,
            img: urls
          }

          props.actionGL.addGlobalList(newForm)
          actionForm.resetForm()
        }}>


        <div className={styles.createAdsColumn}>
          <input
            required
            value={form.title}
            onChange={(e) => actionForm.getTitle(e)}
            placeholder='Введите название:'
            type="text" />
        </div>

        <div className={styles.createAdsColumn}>
          <select
            value={form.categories}
            onChange={(e) => actionForm.getCattegories(e)}
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


        <div className={styles.createAdsColumn}>
          <input
            required
            value={form.price}
            onChange={(e) => actionForm.getPrice(e)}
            placeholder='Цена:'
            type='number' />
        </div>

        <div className={styles.createAdsColumn}>
          <input
            value={form.city}
            onChange={(e) => actionForm.getCity(e)}
            required
            placeholder='Город:'
            type='text' />
        </div>

        <div className={styles.createAdsColumn}>
          <input
            onChange={(e) => actionForm.getFiles(e)}
            required
            type='file' />
        </div>

        <div className={styles.createAdsButton}>
          <button
            type='submit'>Отправить</button>
        </div>
      </form>
    </div>

  )
}