import styles from '../styles/Navbar.module.sass'
import Link from 'next/link'
import { auth } from '../conf/Firebase-conf'
import { signOut } from 'firebase/auth'
import { useRouter } from 'next/router'

function Navbar({ userName }) {

	const router = useRouter()

	const handleSignOut = () => {
		signOut(auth)
			.then(() => {
				console.log('signOut success')
				router.push('/')
			})
			.catch((error) => {
				console.log(error.message)
			})
	}
	return (
		<nav className={styles.navbar}>
			<h2 className={styles.titleNavbar}>Panneau d&apos;adminstration</h2>
			{ userName ?
			<h4>Bienvenue, {userName} !</h4>: <h4>Ajouter un Client</h4>
			}
			<ul className={styles.listNavbar}>
				<li className={styles.linkNavbar}>
					<Link href='/add'>Ajouter</Link>
				</li>
				<li className={styles.linkNavbar}>
					<Link href='/panel'>Panel</Link>
				</li>
				<li className={styles.linkNavbar} onClick={handleSignOut} >
					Logout
				</li>
			</ul>
		</nav>
	)
}

export default Navbar