import Image from 'next/image'
import styles from './page.module.css'



export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      

      <div className={styles.grid}>
        <a
          href="http://localhost:3000/user"
          className={styles.card}
          rel="noopener noreferrer"
        >
          <h2>
            User <span>-&gt;</span>
          </h2>
          <p>Gestion du compte</p>
        </a>

        <a
          href="http://localhost:3000/dashboard"
          className={styles.card}
          rel="noopener noreferrer"
        >
          <h2>
            Agenda <span>-&gt;</span>
          </h2>
          <p>Agenda personnel</p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Templates <span>-&gt;</span>
          </h2>
          <p>Explore the Next.js 13 playground.</p>
        </a>

        <a
          href="https://www.linkedin.com/in/r%C3%A9mi-rault-334ba2199/"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Linkedin <span>-&gt;</span>
          </h2>
          <p>
            Page de contact de Rémi RAULT
          </p>
        </a>
      </div>
    </main>
  )
}
