import Head from "next/head"
import Navbar from "../components/Navbar"
import styles from '../styles/Add.module.sass'
import { useState, useEffect } from "react"
import { auth, db } from '../conf/Firebase-conf'
import { onAuthStateChanged } from 'firebase/auth'
import { addDoc, collection } from "firebase/firestore"
import { useRouter } from "next/router"

function Add() {
  const router = useRouter()
  const [isConnected, setIsConnected] = useState(false)

  const [nurseToAdd, setnurseToAdd] = useState({
    lastName: '',
    firstName: '',
    email: '',
    website: '',
    phone: '',
    fullAdress: {
      address: '',
      city: '',
      zipcode: ''
    },
    zoning: null,
    schedule: {
      startTime: '',
      endTime: ''
    }
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    switch (name) {
      case 'address':
        setnurseToAdd(prevState => {
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
        setnurseToAdd(prevState => {
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
        setnurseToAdd(prevState => {
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
        setnurseToAdd(prevState => {
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
        setnurseToAdd(prevState => {
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

        setnurseToAdd(prevState => {
          return {
            ...prevState,
            zoning: formatedZoning
          }
        })
        break
      default:
        setnurseToAdd(prevState => {
          return {
            ...prevState,
            [name]: value
          }
        })
        break
    }
    console.log(nurseToAdd)
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        setIsConnected(false)
        router.push('/')
      } else {
        setIsConnected(true)
      }
    })
  }, [])

  const handleAddNurse = (e) => {
    e.preventDefault()
    const newNurseRef = collection(db, 'infirmier')
    addDoc(newNurseRef, nurseToAdd)
      .then(() => {
        router.push('/panel')
      })
    
  }

  return (
    isConnected
      ? <>
        <Head>
          <title>Ajouter un Client</title>
        </Head>
        <Navbar />
        <main className={styles.addLayout}>
          <h1 className={styles.titleAdd}>Ajouter un Client</h1>
          <form className={styles.addNurseForm}>
            <div className={styles.addNurseInput}>
              <label htmlFor="lastName">Nom</label>
              <input
                type='text'
                name='lastName'
                id='lastName'
                value={nurseToAdd.lastName}
                onChange={handleChange}
                required />
            </div>
            <div className={styles.addNurseInput}>
              <label htmlFor="firstName">Pr??nom</label>
              <input
                type='text'
                name='firstName'
                id='firstName'
                value={nurseToAdd.firstName}
                onChange={handleChange}
                required />
            </div>
            <div className={styles.addNurseInput}>
              <label htmlFor="phone">T??l??phone</label>
              <input 
              type='tel' 
              name='phone' 
              id='phone' 
              pattern="{0-9}10"
              value={nurseToAdd.phone}
              onChange={handleChange}
              required />
            </div>
            <div className={styles.addNurseInput}>
              <label htmlFor="email">E-mail</label>
              <input 
              type='email' 
              name='email' 
              id='email'
              value={nurseToAdd.email}
              onChange={handleChange}
              required />
            </div>
            <div className={styles.addNurseInput}>
              <label htmlFor="website">Site internet</label>
              <input 
              type='url' 
              name='website' 
              id='website'
              value={nurseToAdd.website}
              onChange={handleChange} />
            </div>
            <div className={styles.addNurseInput}>
              <label htmlFor="address">Adresse</label>
              <input 
              type='text' 
              name='address' 
              id='address' 
            value={nurseToAdd.fullAdress.address}
            onChange={handleChange}
            required />
            </div>
            <div className={styles.addNurseInput}>
              <label htmlFor="zipcode">Code Postal</label>
              <input 
              type='number' 
              name='zipcode' 
              id='zipcode'
              value={nurseToAdd.fullAdress.zipcode}
              onChange={handleChange}
              required />
            </div>
            <div className={styles.addNurseInput}>
              <label htmlFor="city">Ville</label>
              <input 
              type='text' 
              name='city' 
              id='city' 
              value={nurseToAdd.fullAdress.city}
              onChange={handleChange}
              required />
            </div>
            <div className={styles.addNurseInput}>
              <div>
                <label htmlFor="zoning">Zone d&apos;intervention</label>
                <br />
                <small>S??par??es par des virgules</small>
              </div>
              <textarea 
              name='zoning' 
              id='zoning' 
              cols={40} rows={7}
              value={nurseToAdd.zoning}
              onChange={handleChange}
              required />
            </div>
            <div className={styles.addNurseInput}>
              <p>Horaires de contacts</p>
              <label htmlFor="startTime">D??but</label>
              <input 
              type='time' 
              name='startTime' 
              id='startTime'
              value={nurseToAdd.schedule.startTime}
              onChange={handleChange} 
              required />
              <label htmlFor="endTime">Fin</label>
              <input 
              type='time' 
              name='endTime' 
              id='endTime'
              value={nurseToAdd.schedule.endTime}
              onChange={handleChange}
              required />
            </div>
            <button className={styles.addNurseButton} onClick={handleAddNurse}>Ajouter</button>
          </form>
        </main>
      </>
      : <div></div>
  )
}

export default Add