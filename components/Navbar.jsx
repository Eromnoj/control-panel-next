import styles from '../styles/Navbar.module.sass'
import Link from 'next/link'

function Navbar() {
  return (
    <nav className={styles.navbar}>
        <h2 className={styles.titleNavbar}>Panneau d'adminstration</h2>
        <h4>Bienvenue, utilisateur !</h4>
        <ul className={styles.listNavbar}>
            <li className={styles.linkNavbar}> 
                <Link href='/add'>Ajouter</Link>
            </li>
            <li className={styles.linkNavbar}>
                <Link href='/panel'>Panel</Link>
            </li>
            <li className={styles.linkNavbar}>
                Logout
            </li>
        </ul>
    </nav>
  )
}

export default Navbar