import Head from 'next/head'
import styles from '../styles/Home.module.sass'
import { auth } from '../conf/Firebase-conf'
import { onAuthStateChanged , signInWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react'
import {useRouter} from 'next/router'

export default function Home() {
  const router = useRouter()

  const [credentials, setCredentials] = useState(
    {
      email: '',
      password: ''
    }
  )

  const handleCredentialChange = (event) => {
    const { name, value } = event.target
    setCredentials(prevState => {
      return {
        ...prevState,
        [name]: value
      }
    })
    // console.log(credentials)
  }

  const handleConnexion = (email, password, event) => {
    event.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
      .then ((userCredential) => {
        console.log(userCredential.user)
      })
      .catch ((error) => {
        console.log(error.code)
        console.log(error.message)
      })
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      router.push('/panel')
    }
  })

  return (
    <div>
      <Head>
        <title>Nurse Mobius Login</title>
        <meta name="description" content="Login page for Nurse Mobius administration" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.formWindow}>
        <div className={styles.formLogo}>
          <img src='/LogoBlanc.svg' className={styles.logo} />
        </div>
        <form className={styles.formConnect}>
          <div className={styles.inputDiv}>
            <label htmlFor='email'>Adresse e-mail</label>
            <input type='email' name='email' id='email' value={credentials.email} onChange={handleCredentialChange} required />
          </div>

          <div className={styles.inputDiv}>
            <label htmlFor='password'>Mot de passe</label>
            <input type='password' name='password' id='password' value={credentials.password} onChange={handleCredentialChange} required />
          </div>
          <button className={styles.formButton} onClick={(e) => handleConnexion(credentials.email, credentials.password, e)}>Se connecter</button>
        </form>
      </main>
    </div>
  )
}
