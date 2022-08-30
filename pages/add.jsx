import Head from "next/head"
import Navbar from "../components/Navbar"
import styles from '../styles/Add.module.sass'

function Add() {

  return (
    <>
      <Head>
        <title>Ajouter une infirmière</title>
      </Head>
      <Navbar />
      <main className={styles.addLayout}>
        <h1 className={styles.titleAdd}>Ajouter une infirmière</h1>
        <form className={styles.addNurseForm}>
          <div className={styles.addNurseInput}>
            <label htmlFor="lastName">Nom</label>
            <input type='text' name='lastName' id='lastName' required />
          </div>
          <div className={styles.addNurseInput}>
            <label htmlFor="firstName">Prénom</label>
            <input type='text' name='firstName' id='firstName' required />
          </div>
          <div className={styles.addNurseInput}>
            <label htmlFor="phone">Téléphone</label>
            <input type='tel' name='phone' id='phone' pattern='[0-9]{2} [0-9]{2} [0-9]{2} [0-9]{2} [0-9]{2}' required />
          </div>
          <div className={styles.addNurseInput}>
            <label htmlFor="email">E-mail</label>
            <input type='email' name='email' id='email' required />
          </div>
          <div className={styles.addNurseInput}>
            <label htmlFor="website">Site internet</label>
            <input type='url' name='website' id='website' />
          </div>
          <div className={styles.addNurseInput}>
            <label htmlFor="address">Adresse</label>
            <input type='text' name='address' id='address' required />
          </div>
          <div className={styles.addNurseInput}>
            <label htmlFor="zipcode">Code Postal</label>
            <input type='number' name='zipcode' id='zipcode' required />
          </div>
          <div className={styles.addNurseInput}>
            <label htmlFor="city">Ville</label>
            <input type='text' name='city' id='city' required />
          </div>
          <div className={styles.addNurseInput}>
            <div>
              <label htmlFor="zoning">Zone d'intervention</label>
              <br />
              <small>Séparées par des virgules</small>
            </div>
            <textarea name='zoning' id='zoning' cols={40} rows={7} required />
          </div>
          <div className={styles.addNurseInput}>
            <p>Horaires de contacts</p>
            <label htmlFor="startTime">Début</label>
            <input type='time' name='startTime' id='startTime' required />
            <label htmlFor="endTime">Fin</label>
            <input type='time' name='endTime' id='endTime' required />
          </div>
          <button className={styles.addNurseButton}>Ajouter</button>
        </form>
      </main>
    </>
  )
}

export default Add