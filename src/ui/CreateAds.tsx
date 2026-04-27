
import type { User } from '@supabase/supabase-js'
import type { ActionActive } from '../bll/useAddActive'
import type { ActionGL, newForm } from '../bll/useAddList'
import { categories, useForm } from '../bll/useForm'
import './CreateAds.module.css'
import styles from './CreateAds.module.css'

type Props = {
  actionGL: ActionGL
  actionActive: ActionActive
  actualUser: User | null
}

export function CreateAds(props: Props) {

  const { form, actionForm, status } = useForm()



  if (!status) {
    return (

      <div className={styles.createAds}>

        <form
          className={styles.createAdsBody}
          onSubmit={async (e) => {

            e.preventDefault()

            console.log("STEP 1: submit started")

            const files = form.img
            console.log("STEP 2: files", files)

            actionForm.statusTogle()

            console.log("STEP 3: start upload")

            const urls: string[] = []

            for (const file of files) {
              try {
                console.log("Uploading:", file)

                const url = await actionForm.upload(file)

                console.log("Uploaded URL:", url)

                if (url) {
                  urls.push(url)
                } else {
                  console.warn("EMPTY URL")
                }

              } catch (e) {
                console.error("UPLOAD ERROR:", e)
              }
            }

            console.log("STEP 4: urls ready", urls)


            if (!props.actualUser) {
              console.log("NO USER")
              return
            }

            console.log("STEP 5: creating form")
            const newForm: newForm = {
              ...form,
              img: urls,
              name: props.actualUser.user_metadata?.name || "No name",
              phone: props.actualUser.user_metadata?.phone || "No phone",
              user_id: props.actualUser.id || "" ,
              date: new Date().toISOString()
            }

            console.log(newForm)
            await props.actionGL.addGlobalList(newForm)
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
              required
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
            <div className={styles.createAdsFile}>
              <label className={styles.customFileUpload}>
                Загрузить фото!
                <input
                  type="file"
                  multiple
                  onChange={(e) => actionForm.getFiles(e)}
                />
              </label>
              <div><h2>(max - 12)</h2></div>
            </div>
          </div>

          <div className={styles.createAdsColumn}>
            {form.img.length === 0 ?
              <div>
                <h1>Фото не загружено!</h1>
              </div>
              :
              <div>
                <div style={{ paddingBottom: "15px" }}>
                  <p>Вы можете выбрать фото которе будет на обложке обявления кликнув по нему!</p>
                  <p>Фото которе выделено синей рамкой будет использовано для обложки вашего обявления!</p>
                </div>
                <div className={styles.createAdsPreviev}>
                  {
                    form.img.map((file, index) => (
                      <div className={styles.createAdsPrevievItem} key={index}>
                        <img
                          onClick={() => actionForm.setMainImage(index)}
                          src={URL.createObjectURL(file)}
                          alt="preview"
                          style={
                            index === 0
                              ? { border: "3px solid blue", borderRadius: "5px" }
                              : { border: "3px solid orange", borderRadius: "5px" }
                          }
                        />

                        <button
                          className={styles.deleteBtn}
                          onClick={() => actionForm.deleteImg(index)}
                        >
                          ❌
                        </button>
                      </div>
                    ))
                  }
                </div>
              </div>
            }
          </div>

          <div className={styles.createAdsColumn}>
            <textarea
              value={form.read}
              onChange={(e) => actionForm.getRead(e)}
              required
              placeholder='Опишите ваш товар:' />
          </div>


          <div className={styles.createAdsButton}>
            <button
              type='submit'>Опубликовать</button>
          </div>
        </form>
      </div >
    )
  }

  return (
    <div className={styles.statusDone}>
      <h1>Спасибо,ваше обявления было добавлено в наш список!✅</h1>
      <p>Вы сможете найти его на
        <button
          onClick={() => props.actionActive.addActiveFalse()}
        >
          Главной Странице
        </button>
      </p>
    </div>
  )
}