import Head from "next/head"
import styles from '../styles/Panel.module.sass'
import Navbar from "../components/Navbar"
import Update from "../components/Update"
import { useEffect, useState } from "react"
import Confirm from "../components/Confirm"
import { collection, getDocs, getDoc, doc } from "firebase/firestore"
import { auth, db } from '../conf/Firebase-conf'
import { onAuthStateChanged } from 'firebase/auth'
import { useRouter } from "next/router"


function Panel({ data }) {

  const router = useRouter()
  const [isConnected, setIsConnected] = useState(false)
  const [adminData, setAdminData] = useState([])
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        setIsConnected(false)
        router.push('/')
      } else {
        setIsConnected(true)
        const fetchUserData = async () => {
          const adminResponse = await getDoc(doc(db, 'admin', user.uid))
          setAdminData(adminResponse.data())
        }
        fetchUserData()
      }
    })
  }, [])

  const [isUpdating, setIsUpdating] = useState(false)
  const [updateNurse, setUpdateNurse] = useState('')
  const handleUpdateClick = (nurse) => {
    setUpdateNurse(nurse)
    setIsUpdating(!isUpdating)
  }

  const [isConfirming, setIsConfirming] = useState(false)
  const [deleteNurse, setDeleteNurse] = useState('')
  const handleDeleteClick = (nurse) => {
    setDeleteNurse(nurse)
    setIsConfirming(!isConfirming)
  }

  const [displayNurseList, setDisplayNurseList] = useState([])
  useEffect(() => {
    setDisplayNurseList(data)
    setDisplayNurseList(prev => prev.sort((a, b) => (a.nurseData.lastName > b.nurseData.lastName) ? 1 : ((b.nurseData.lastName > a.nurseData.lastName) ? -1 : 0)))
  }, [data])

  const handleSearch = (e) => {
    const searchTerm = e.target.value
    setDisplayNurseList(data.filter(item => item.nurseData.lastName.toLowerCase().includes(searchTerm.toLowerCase())))

  }

  const [firstItem, setFirstItem] = useState(0)
  const [lastItem, setLastItem] = useState(10)

  const nurseList = displayNurseList.slice(firstItem, lastItem).map(nurse => {
    return (
      <tr key={nurse.id}>
        <td>{nurse.nurseData.lastName}</td>
        <td>{nurse.nurseData.firstName}</td>
        <td>{nurse.nurseData.fullAdress.address}<br />
          {nurse.nurseData.fullAdress.zipcode} {nurse.nurseData.fullAdress.city}</td>
        <td>{nurse.nurseData.phone}</td>
        <td>{nurse.nurseData.email}</td>
        <td>{nurse.nurseData.website}</td>
        <td><button className={styles.panelButton} onClick={() => handleUpdateClick(nurse)}>Modifier</button></td>
        {adminData.fullRight && <td><button className={styles.panelButton} onClick={() => handleDeleteClick(nurse)}>Supprimer</button></td>}
      </tr>
    )
  })

  const handlePagination = (way) => {
    if (way === 'prev') {
      if (firstItem < 0) {
        setFirstItem(prev => prev + 10)
        setLastItem(prev => prev + 10)
        return
      }
      setFirstItem(prev => prev - 10)
      setLastItem(prev => prev - 10)
    } else if (way === 'next') {
      if (lastItem >= displayNurseList.length) {
        setLastItem(displayNurseList.length)
        setFirstItem(displayNurseList.length - 10)
        return
      }
      setFirstItem(prev => prev + 10)
      setLastItem(prev => prev + 10)
    }
  }


  return (
    isConnected
      ? <div>
        <Head>
          <title>Panneau de contrôle</title>
        </Head>
        <Navbar userName={adminData.name}/>

        <main className={styles.panelLayout}>
          <div className={styles.searchArea}>
            <form className={styles.formPanel}>
              <label htmlFor='search'>Rechercher le nom d&apos;une infirmière</label>
              <input type='text' name='search' id='search' onChange={handleSearch} />
              {/* <button className={styles.searchButton} id='searchButton'>Recherche</button> */}
            </form>
          </div>

          <div className={styles.displayArea}>
            <table className={styles.tableNurse}>
              <thead className={styles.tableNurseHead}>
                <tr>
                  <th>Nom</th>
                  <th>Prénom</th>
                  <th>Adresse</th>
                  <th>Téléphone</th>
                  <th>email</th>
                  <th>Site internet</th>
                  <th>Modifier</th>
                  {adminData.fullRight && <th>Supprimer</th>}
                </tr>
              </thead>
              <tbody className={styles.tableNurseBody}>
                {nurseList}
              </tbody>
              <tfoot className={styles.tableNurseFoot}>
                <tr>
                  <td colSpan={9}><div>
                    {firstItem > 0 && <button className={styles.panelButton} onClick={() => handlePagination('prev')}>Previous</button>}
                    {lastItem < displayNurseList.length && <button className={styles.panelButton} onClick={() => handlePagination('next')}>Next</button>}
                  </div></td>
                </tr>
              </tfoot>
            </table>
          </div>

        </main>

        {isUpdating && <Update handleClick={handleUpdateClick} updateNurse={updateNurse} />}
        {isConfirming && <Confirm handleClick={handleDeleteClick} deleteNurse={deleteNurse} />}
      </div>
      : <div></div>
  )
}

export default Panel

export const getServerSideProps = async () => {

  const nurseRef = collection(db, 'infirmier')

  const response = await getDocs(nurseRef)
  const data = response.docs.map(doc => ({
    id: doc.id,
    nurseData: doc.data()
  }))
  return {
    props: {
      data: data
    }
  }
}
