import Head from "next/head";
import styles from "../styles/Home.module.css";
import AuthForm from "../components/Auth/AuthForm";

const Home = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>BandTogether.io | Home</title>
        <meta
          name="description"
          content="Change the way you concert. By banding together with other like-minded performers, venues or live-media engineers, you can feel more confident about going to that next gig."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to BandTogether.io!</h1>
        <p className={styles.description}>Halt. &#9995; Who goes there?</p>
        <AuthForm />

        {/* <span /> */}
        <p className={styles.description}>
          New here? Choose your path. &#128128;
        </p>

        <div className={styles.grid}>
          <a
            href="https://nextjs.org/docs"
            className={`${styles.card} ${styles.performer}`}
          >
            <h2>Performer &rarr;</h2>
            <p>
              Get better gigs by linking up with other awesome performers in
              your area.
            </p>
          </a>

          <a
            href="https://nextjs.org/learn"
            className={`${styles.card} ${styles.booker}`}
          >
            <h2>Booker &rarr;</h2>
            <p>
              Know exactly who and what you&apos;re getting into before the tour
              van pulls up.
            </p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={`${styles.card} ${styles.engineer}`}
          >
            <h2>Engineer &rarr;</h2>
            <p>
              Find great people to work for and work with and earn what you
              deserve.
            </p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={`${styles.card} ${styles.fan}`}
          >
            <h2>Fan &rarr;</h2>
            <p>
              See more local shows you actually want to see and help others do
              the same!
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

export default Home;
