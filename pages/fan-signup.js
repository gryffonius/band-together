import styles from "../styles/Signup.module.css";
import SignUp from "../components/Auth/SignUp";
import Head from "next/head";

const FanSignup = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>BandTogether.io | Fan Signup</title>
        <meta
          name="description"
          content="Do you love concerts? Do you love stumbling upon amazing shows in your backyard? HELL YES! Take the guesswork out of seeing shows in your area and find exactly what your looking for when the mood strikes."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Sign up</h1>
        <SignUp />
      </main>

      <footer className={styles.footer}>
        <p>&#169; BandTogether.io</p>
      </footer>
    </div>
  );
};

export default FanSignup;
