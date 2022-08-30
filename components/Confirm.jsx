import styles from '../styles/Confirm.module.sass'

const Confirm = ({ handleClick }) => {
  return (
    <div className={styles.confirmLayout}>
      <div className={styles.confirmBox}>
        <h1 className={styles.confirmTitle}>Confirmer la suppression ?</h1>
        <button className={styles.confirmButton}>Supprimer</button>
        <button className={styles.confirmButton} onClick={handleClick}>Annuler</button>
      </div>
    </div>
  );
}

export default Confirm 