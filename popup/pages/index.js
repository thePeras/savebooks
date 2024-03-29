import Head from 'next/head'
import styles from '@/styles/Login.module.css'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Head>
        <title>SaveBooks</title>
        <meta name="description" content="Save your books in categories" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h4 className={styles.phrase}>“Wisdom sets bounds even to knowledge.”</h4>
        <p className={styles.author}>Nietzsche</p>

        <Link href="/home">
        <div className={styles.googleLogin}>
          <svg aria-hidden="true" width="18" height="18" viewBox="0 0 18 18" className={styles.svg}>
            <g>
                <path d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18z" fill="#4285F4"></path>
                <path d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 0 1-7.18-2.54H1.83v2.07A8 8 0 0 0 8.98 17z" fill="#34A853"></path>
                <path d="M4.5 10.52a4.8 4.8 0 0 1 0-3.04V5.41H1.83a8 8 0 0 0 0 7.18l2.67-2.07z" fill="#FBBC05"></path>
                <path d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 0 0 1.83 5.4L4.5 7.49a4.77 4.77 0 0 1 4.48-3.3z" fill="#EA4335"></path>
            </g>
          </svg>
          Log in with Google
        </div>
        </Link>
      </main>
    </>
  )
}
