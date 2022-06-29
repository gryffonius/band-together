import styles from "./SignUp.module.css";
import SignUpForm from "./SignUpForm";

const SignUp = () => {
  return (
    <>
      <h3 className={styles.description}>
        Sign up with an email and password.
      </h3>
      <SignUpForm />
    </>
  );
};

export default SignUp;
