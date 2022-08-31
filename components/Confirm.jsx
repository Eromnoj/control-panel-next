import styles from '../styles/Confirm.module.sass'
import { db } from '../conf/Firebase-conf';
import { doc, deleteDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';

const Confirm = ({ handleClick, deleteNurse }) => {
  const router = useRouter()
  const refreshData = () => {
    router.replace(router.asPath)
  }
  const handleDelete = (id) => {
    const docRef = doc(db, 'infirmier', id)
    deleteDoc(docRef)
      .then(() => {
        refreshData()
        handleClick()
      })
  }

  return (
    <div className={styles.confirmLayout}>
      <div className={styles.confirmBox}>
        <h1 className={styles.confirmTitle}>Confirmer la suppression de {deleteNurse.nurseData.firstName} {deleteNurse.nurseData.lastName}?</h1>
        <h2>N° {deleteNurse.id}</h2>
        <button className={styles.confirmButton} onClick={() => handleDelete(deleteNurse.id)}>Supprimer</button>
        <button className={styles.confirmButton} onClick={handleClick}>Annuler</button>
      </div>
    </div>
  );
}

export default Confirm 