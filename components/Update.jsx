import { useState } from 'react'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../conf/Firebase-conf'
import styles from '../styles/Update.module.sass'
import { useRouter } from 'next/router'

const Update = ({ handleClick, updateNurse }) => {
  const [nurseToUpdate, setNurseToUpdate] = useState({
    lastName: updateNurse.nurseData.lastName,
    firstName: updateNurse.nurseData.firstName,
    email: updateNurse.nurseData.email,
    website: updateNurse.nurseData.website,
    phone: updateNurse.nurseData.phone,
    fullAdress: {
      address: updateNurse.nurseData.fullAdress.address,
      city: updateNurse.nurseData.fullAdress.city,
      zipcode: updateNurse.nurseData.fullAdress.zipcode
    },
    zoning: updateNurse.nurseData.zoning,
    schedule: {
      startTime: updateNurse.nurseData.schedule.startTime,
      endTime: updateNurse.nurseData.schedule.endTime
    }
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    switch (name) {
      case 'address':
        setNurseToUpdate(prevState => {
          return {
            ...prevState,
            fullAdress: {
              ...prevState.fullAdress,
              address: value
            }
          }
        })
        break
      case 'city':
        setNurseToUpdate(prevState => {
          return {
            ...prevState,
            fullAdress: {
              ...prevState.fullAdress,
              city: value
            }
          }
        })
        break
      case 'zipcode':
        setNurseToUpdate(prevState => {
          return {
            ...prevState,
            fullAdress: {
              ...prevState.fullAdress,
              zipcode: value
            }
          }
        })
        break
      case 'startTime':
        setNurseToUpdate(prevState => {
          return {
            ...prevState,
            schedule: {
              ...prevState.schedule,
              startTime: value
            }
          }
        })
        break
      case 'endTime':
        setNurseToUpdate(prevState => {
          return {
            ...prevState,
            schedule: {
              ...prevState.schedule,
              endTime: value
            }
          }
        })
        break
      case 'zoning':
        const prepareZoning = value.split(',')
        const formatedZoning = prepareZoning.map(e => e.trim())

        setNurseToUpdate(prevState => {
          return {
            ...prevState,
            zoning: formatedZoning
          }
        })
        break
      default:
        setNurseToUpdate(prevState => {
          return {
            ...prevState,
            [name]: value
          }
        })
        break
    }
    console.log(nurseToUpdate)
  }

  const router = useRouter()
  const refreshData = () => {
    router.replace(router.asPath)
  }


  const updateToFirebase = (e) => {
    e.preventDefault()

    const docRef = doc(db, 'infirmier', updateNurse.id)
    updateDoc(docRef, nurseToUpdate).then(() => {
      refreshData()
      handleClick()
    })


  }

  return (
    <div className={styles.updateComponent}>

      <div className={styles.updateLayout}>
        <h1 className={styles.titleUpdate}>Modifier infirmière n° {updateNurse.id}</h1>
        <form className={styles.updateNurseForm}>
          <div className={styles.updateNurseInput}>
            <label htmlFor="lastName">Nom</label>
            <input
              type='text'
              name='lastName'
              id='lastName'
              value={nurseToUpdate.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.updateNurseInput}>
            <label htmlFor="firstName">Prénom</label>
            <input
              type='text'
              name='firstName'
              id='firstName'
              value={nurseToUpdate.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.updateNurseInput}>
            <label htmlFor="phone">Téléphone</label>
            <input
              type='tel'
              name='phone'
              id='phone'
              value={nurseToUpdate.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.updateNurseInput}>
            <label htmlFor="email">E-mail</label>
            <input
              type='email'
              name='email'
              id='email'
              value={nurseToUpdate.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.updateNurseInput}>
            <label htmlFor="website">Site internet</label>
            <input
              type='url'
              name='website'
              id='website'
              value={nurseToUpdate.website}
              onChange={handleChange}
            />
          </div>
          <div className={styles.updateNurseInput}>
            <label htmlFor="address">Adresse</label>
            <input
              type='text'
              name='address'
              id='address'
              value={nurseToUpdate.fullAdress.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.updateNurseInput}>
            <label htmlFor="zipcode">Code Postal</label>
            <input
              type='number'
              name='zipcode'
              id='zipcode'
              value={nurseToUpdate.fullAdress.zipcode}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.updateNurseInput}>
            <label htmlFor="city">Ville</label>
            <input
              type='text'
              name='city'
              id='city'
              value={nurseToUpdate.fullAdress.city}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.updateNurseInput}>
            <div>
              <label htmlFor="zoning">Zone d'intervention</label>
              <br />
              <small>Séparées par des virgules</small>
            </div>
            <textarea
              name='zoning'
              id='zoning'
              cols={40} rows={7}
              value={nurseToUpdate.zoning}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <div className={styles.updateNurseInput}>
            <p>Horaires de contacts</p>
            <label htmlFor="startTime">Début</label>
            <input
              type='time'
              name='startTime'
              id='startTime'
              value={nurseToUpdate.schedule.startTime}
              onChange={handleChange}
              required
            />
            <label htmlFor="endTime">Fin</label>
            <input
              type='time'
              name='endTime'
              id='endTime'
              value={nurseToUpdate.schedule.endTime}
              onChange={handleChange}
              required
            />
          </div>
          <button className={styles.updateNurseButton} onClick={updateToFirebase}>Modifier</button>
        </form>
        <button className={styles.updateNurseButton} onClick={handleClick}>Annuler</button>

      </div>
    </div>
  );
}

export default Update