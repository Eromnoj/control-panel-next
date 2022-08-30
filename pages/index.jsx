import Head from 'next/head'
import styles from '../styles/Home.module.sass'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Nurse Mobius Login</title>
        <meta name="description" content="Login page for Nurse Mobius administration" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main  className={styles.formWindow}>
      <div className={styles.formLogo}>
        <img src='/LogoBlanc.svg' className={styles.logo}/>
      </div>
        <form className={styles.formConnect}>
            <div className={styles.inputDiv}>
                <label htmlFor='email'>Adresse e-mail</label>
                <input type='email' name='email' id='email' required />
            </div>
            
            <div className={styles.inputDiv}>
                <label htmlFor='password'>Mot de passe</label>
                <input type='password' name='password' id='password' required />
            </div>
            <button className={styles.formButton}>Se connecter</button>
        </form>
      </main>
    </div>
  )
}
