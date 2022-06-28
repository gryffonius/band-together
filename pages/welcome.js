import Head from "next/head";
import styles from "../styles/Welcome.module.css";
import AuthForm from "../components/Auth/AuthForm";

const Welcome = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>BandTogether.io | Home</title>
        <meta
          name="description"
          content="Follow your favorite performers, venues or live engineers. Find shows. List and inventory your gear. Find gigs. Create your own showbills. Make sure the venue can support your power and I/O needs. Never go into a show unprepared again!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to BandTogether.io!</h1>
        
        <AuthForm />

        <p className={styles.description}>
          New here? Choose your path. &#128128;
        </p>

        <div className={styles.grid}>
          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={`${styles.card} ${styles.fan}`}
          >
            <h2>Fan &rarr;</h2>
            <p>
              See more shows you actually want to see and support your favorite performers, venues and more!
            </p>
          </a>

          <a
            href="https://nextjs.org/docs"
            className={`${styles.card} ${styles.performer}`}
          >
            <h2>Performer &rarr;</h2>
            <p>
              Get better gigs, plan full tours yourself and log your gear to make gigging easy-breezy.
            </p>
          </a>

          <a
            href="https://nextjs.org/learn"
            className={`${styles.card} ${styles.booker}`}
          >
            <h2>Booker &rarr;</h2>
            <p>
              Know exactly who and what you&apos;re getting into before the tour
              van (or sedan) even pulls up.
            </p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={`${styles.card} ${styles.engineer}`}
          >
            <h2>Engineer &rarr;</h2>
            <p>
              Find the best performers and venues to work with and earn what you
              truly deserve.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>&#169; BandTogether.io</p>
      </footer>
    </div>
  );
};

export default Welcome;
