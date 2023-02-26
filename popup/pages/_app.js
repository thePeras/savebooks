import '@/styles/globals.css'
import stars from '@/styles/Stars.module.css'

export default function App({ Component, pageProps }) {
  return (
    <main>
      <content>
        <div className={stars.stars}></div>
        <div className={stars.stars2}></div>
        <div className={stars.stars3}></div>

        <Component {...pageProps} />
      </content>
    </main>
  )
}
