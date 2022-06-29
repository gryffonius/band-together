import { useReducer, useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

// import AuthContext from "../../context/auth-context";
// import { useRouter } from "next/router";

import styles from "./AuthForm.module.css";

const initialFormState = {
  emailValue: "",
  emailIsTouched: false,
  passwordValue: "",
  passwordIsTouched: false,
  formIsValid: false,
};

const formReducer = (state, action) => {
  if (action.type === "EMAIL_INPUT") {
    return {
      emailValue: action.val,
      emailIsTouched: state.emailIsTouched,
      passwordValue: state.passwordValue,
      passwordIsTouched: state.passwordIsTouched,
      formIsValid: state.formIsValid,
    };
  }
  if (action.type === "EMAIL_BLUR") {
    return {
      emailValue: state.emailValue,
      emailIsTouched: true,
      passwordValue: state.passwordValue,
      passwordIsTouched: state.passwordIsTouched,
      formIsValid: state.formIsValid,
    };
  }
  if (action.type === "PASSWORD_INPUT") {
    return {
      emailValue: state.emailValue,
      emailIsTouched: state.emailIsTouched,
      passwordValue: action.val,
      passwordIsTouched: state.passwordIsTouched,
      formIsValid: state.formIsValid,
    };
  }
  if (action.type === "PASSWORD_BLUR") {
    return {
      emailValue: state.emailValue,
      emailIsTouched: state.emailIsTouched,
      passwordValue: state.passwordValue,
      passwordIsTouched: true,
      formIsValid: state.formIsValid,
    };
  }
  if (action.type === "FORM_IS_VALID") {
    return {
      emailValue: state.emailValue,
      emailIsTouched: state.emailIsTouched,
      passwordValue: state.passwordValue,
      passwordIsTouched: state.passwordIsTouched,
      formIsValid: true,
    };
  }
  if (action.type === "FORM_IS_INVALID") {
    return {
      emailValue: state.emailValue,
      emailIsTouched: state.emailIsTouched,
      passwordValue: state.passwordValue,
      passwordIsTouched: state.passwordIsTouched,
      formIsValid: false,
    };
  }
  return initialFormState;
};

const AuthForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formState, dispatchForm] = useReducer(formReducer, initialFormState);

  // const authCtx = useContext(AuthContext);
  const router = useRouter();

  const emailIsValid = formState.emailValue.includes("@");
  const passwordIsValid = formState.passwordValue.trim().length >= 8;

  const emailHasError = !emailIsValid && formState.emailIsTouched;
  const passwordHasError = !passwordIsValid && formState.passwordIsTouched;

  useEffect(() => {
    if (
      emailIsValid &&
      passwordIsValid &&
      !emailHasError &&
      !passwordHasError
    ) {
      dispatchForm({ type: "FORM_IS_VALID" });
    } else {
      dispatchForm({ type: "FORM_IS_INVALID" });
    }
  }, [emailIsValid, passwordIsValid, emailHasError, passwordHasError]);

  const emailChangeHandler = (event) => {
    dispatchForm({ type: "EMAIL_INPUT", val: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchForm({ type: "PASSWORD_INPUT", val: event.target.value });
  };

  const validateEmailHandler = () => {
    dispatchForm({ type: "EMAIL_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchForm({ type: "PASSWORD_BLUR" });
  };

  let buttonText = "Who goes there?";

  if (passwordHasError) {
    buttonText = "Passwords must be 8 characters long.";
  }

  if (emailHasError) {
    buttonText = "Please enter a valid email.";
  }

  if (formState.formIsValid) {
    buttonText = "Login";
  }

    // TEMPORARY SUBMIT HANDLER
  // WAITS 2 SECONDS AND NAVIGATES TO THE CORRECT PAGE

  const submitHandler = (e) => {
    e.preventDefault();

    setIsLoading(true);

    setTimeout(() => router.replace('/'), 3000) 
    // const enteredEmail = formState.emailValue;
    // const enteredPassword = formState.passwordValue;

    // const url = ""; // SIGN IN ENDPOINT URL

    // fetch(url, {
    //   method: "POST",
    //   body: JSON.stringify({
    //     email: enteredEmail,
    //     password: enteredPassword,
    //     returnSecureToken: true,
    //   }),
    //   headers: { "Content-Type": "application/json" },
    // })
    //   .then((res) => {
    //     setIsLoading(false);
    //     if (res.ok) {
    //       return res.json();
    //     } else {
    //       return res.json().then((data) => {
    //         let errorMessage = "Authentication failed!";
    //         if (data && data.error && data.error.message) {
    //           errorMessage = data.error.message;
    //         }
    //         throw new Error(errorMessage);
    //       });
    //     }
    //   })
    //   .then((data) => {
    //     const expirationTime = new Date(
    //       new Date().getTime() + +data.expiresIn * 1000
    //     );
    //     authCtx.login(data.idToken, expirationTime.toISOString());
    //     router.replace("/");
    //   })
    //   .catch((err) => {
    //     alert(err.message);
    //   });
  };

  return (
    <section className={`${styles.auth} ${isLoading && styles.background}`}>
      {isLoading && (
        <>
          <Image
            className={styles.horse}
            src="/horse-loop.gif"
            alt="horse gallopping"
            height={300}
            width={400}
          />
        </>
      )}
      {!isLoading && (
        <>
          <Image
            className={styles.snow}
            src="/snow.gif"
            alt="tv-snow"
            layout={"fill"}
          />
          <div className={styles.halt}>
            <p>Halt. &#9995;</p>
          </div>
          <form className={styles.form} onSubmit={submitHandler}>
            <div
              className={`${styles.control} ${emailHasError && styles.invalid}`}
            >
              <input
                placeholder="email"
                value={formState.emailValue}
                type="email"
                id="email"
                onChange={emailChangeHandler}
                onBlur={validateEmailHandler}
                required
              />
            </div>
            <div
              className={`${styles.control} ${
                passwordHasError && styles.invalid
              }`}
            >
              <input
                placeholder="password"
                value={formState.passwordValue}
                type="password"
                id="password"
                onChange={passwordChangeHandler}
                onBlur={validatePasswordHandler}
                required
              />
            </div>
            <div
              className={`${styles.actions} ${
                !formState.formIsValid && styles.invalid
              }`}
            >
              <button
                className={
                  emailHasError || passwordHasError ? styles.error : ""
                }
                type="submit"
              >
                {buttonText}
              </button>
            </div>
          </form>
        </>
      )}
    </section>
  );
};

export default AuthForm;
