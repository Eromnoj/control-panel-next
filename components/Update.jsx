import styles from '../styles/Update.module.sass'

const Update = ({ handleClick }) => {
  return (
    <div className={styles.updateComponent}>

    <div className={styles.updateLayout}>
        <h1 className={styles.titleUpdate}>Modifier infirmière</h1>
        <form className={styles.updateNurseForm}>
          <div className={styles.updateNurseInput}>
            <label htmlFor="lastName">Nom</label>
            <input type='text' name='lastName' id='lastName' required />
          </div>
          <div className={styles.updateNurseInput}>
            <label htmlFor="firstName">Prénom</label>
            <input type='text' name='firstName' id='firstName' required />
          </div>
          <div className={styles.updateNurseInput}>
            <label htmlFor="phone">Téléphone</label>
            <input type='tel' name='phone' id='phone' pattern='[0-9]{2} [0-9]{2} [0-9]{2} [0-9]{2} [0-9]{2}' required />
          </div>
          <div className={styles.updateNurseInput}>
            <label htmlFor="email">E-mail</label>
            <input type='email' name='email' id='email' required />
          </div>
          <div className={styles.updateNurseInput}>
            <label htmlFor="website">Site internet</label>
            <input type='url' name='website' id='website' />
          </div>
          <div className={styles.updateNurseInput}>
            <label htmlFor="updateress">Adresse</label>
            <input type='text' name='updateress' id='updateress' required />
          </div>
          <div className={styles.updateNurseInput}>
            <label htmlFor="zipcode">Code Postal</label>
            <input type='number' name='zipcode' id='zipcode' required />
          </div>
          <div className={styles.updateNurseInput}>
            <label htmlFor="city">Ville</label>
            <input type='text' name='city' id='city' required />
          </div>
          <div className={styles.updateNurseInput}>
            <div>
              <label htmlFor="zoning">Zone d'intervention</label>
              <br />
              <small>Séparées par des virgules</small>
            </div>
            <textarea name='zoning' id='zoning' cols={40} rows={7} required />
          </div>
          <div className={styles.updateNurseInput}>
            <p>Horaires de contacts</p>
            <label htmlFor="startTime">Début</label>
            <input type='time' name='startTime' id='startTime' required />
            <label htmlFor="endTime">Fin</label>
            <input type='time' name='endTime' id='endTime' required />
          </div>
          <button className={styles.updateNurseButton}>Ajouter</button>
        </form>
        <button className={styles.updateNurseButton} onClick={handleClick}>Annuler</button>

      </div>
      </div>
  );
}

export default Update