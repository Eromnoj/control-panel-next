import Head from "next/head"
import styles from '../styles/Panel.module.sass'
import Navbar from "../components/Navbar"
import Update from "../components/Update"
import { useState } from "react"
import Confirm from "../components/Confirm"

function Panel() {
    const [isUpdating, setIsUpdating] = useState(false)
    const [isConfirming, setIsConfirming] = useState(false)

    const handleUpdateClick = () => {
      setIsUpdating(!isUpdating)
    }

    const handleDeleteClick = () => {
      setIsConfirming(!isConfirming)
    }
  return (
    <>
      <Head>
        <title>Panneau de contrôle</title>
      </Head>
      <Navbar />
      <main className={styles.panelLayout}>
        <div className={styles.searchArea}>
          <form className={styles.formPanel}>
            <label htmlFor='search'>Rechercher le nom d'une infirmière</label>
            <input type='text' name='search' id='search' required />
            <button className={styles.searchButton} id='searchButton'>Recherche</button>
          </form>
        </div>

        <div className={styles.displayArea}>
          <table className={styles.tableNurse}>
            <thead className={styles.tableNurseHead}>
              <tr>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Téléphone</th>
                <th>Id</th>
                <th>Modifier</th>
                <th>Supprimer</th>
              </tr>
            </thead>
            <tbody className={styles.tableNurseBody}>
              <tr>
                <td>Martin</td>
                <td>Martine</td>
                <td>06 40 40 40 41</td>
                <td>34DRFFEfefz23</td>
                <td><button className={styles.panelButton} onClick={handleUpdateClick}>Modifier</button></td>
                <td><button className={styles.panelButton} onClick={handleDeleteClick}>Supprimer</button></td>

              </tr>
              <tr>
                <td>Martin</td>
                <td>Martine</td>
                <td>06 40 40 40 41</td>
                <td>34DRFFEfefz23</td>
                <td><button className={styles.panelButton}>Modifier</button></td>
                <td><button className={styles.panelButton}>Supprimer</button></td>

              </tr>
              <tr>
                <td>Martin</td>
                <td>Martine</td>
                <td>06 40 40 40 41</td>
                <td>34DRFFEfefz23</td>
                <td><button className={styles.panelButton}>Modifier</button></td>
                <td><button className={styles.panelButton}>Supprimer</button></td>

              </tr>
              <tr>
                <td>Martin</td>
                <td>Martine</td>
                <td>06 40 40 40 41</td>
                <td>34DRFFEfefz23</td>
                <td><button className={styles.panelButton}>Modifier</button></td>
                <td><button className={styles.panelButton}>Supprimer</button></td>

              </tr>
              <tr>
                <td>Martin</td>
                <td>Martine</td>
                <td>06 40 40 40 41</td>
                <td>34DRFFEfefz23</td>
                <td><button className={styles.panelButton}>Modifier</button></td>
                <td><button className={styles.panelButton}>Supprimer</button></td>

              </tr>
              <tr>
                <td>Martin</td>
                <td>Martine</td>
                <td>06 40 40 40 41</td>
                <td>34DRFFEfefz23</td>
                <td><button className={styles.panelButton}>Modifier</button></td>
                <td><button className={styles.panelButton}>Supprimer</button></td>

              </tr>
              <tr>
                <td>Martin</td>
                <td>Martine</td>
                <td>06 40 40 40 41</td>
                <td>34DRFFEfefz23</td>
                <td><button className={styles.panelButton}>Modifier</button></td>
                <td><button className={styles.panelButton}>Supprimer</button></td>

              </tr>
              <tr>
                <td>Martin</td>
                <td>Martine</td>
                <td>06 40 40 40 41</td>
                <td>34DRFFEfefz23</td>
                <td><button className={styles.panelButton}>Modifier</button></td>
                <td><button className={styles.panelButton}>Supprimer</button></td>

              </tr>
              <tr>
                <td>Martin</td>
                <td>Martine</td>
                <td>06 40 40 40 41</td>
                <td>34DRFFEfefz23</td>
                <td><button className={styles.panelButton}>Modifier</button></td>
                <td><button className={styles.panelButton}>Supprimer</button></td>

              </tr>
              <tr>
                <td>Martin</td>
                <td>Martine</td>
                <td>06 40 40 40 41</td>
                <td>34DRFFEfefz23</td>
                <td><button className={styles.panelButton}>Modifier</button></td>
                <td><button className={styles.panelButton}>Supprimer</button></td>

              </tr>
            </tbody>
            <tfoot className={styles.tableNurseFoot}>
              <tr>
                <td colSpan={6}><div><button className={styles.panelButton}>Previous</button>1 <span className={styles.tableCurrentPage}>2</span> 3<button className={styles.panelButton}>Next</button></div></td>
              </tr>
            </tfoot>
          </table>
        </div>

      </main>
      
      {isUpdating && <Update handleClick={handleUpdateClick} />}
      {isConfirming && <Confirm handleClick={handleDeleteClick} />}
    </>
  )
}

export default Panel
