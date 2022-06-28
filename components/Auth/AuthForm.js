import { useReducer, useContext, useState, useEffect } from "react";
import AuthContext from "../../context/auth-context";
import { useRouter } from "next/router";

import classes from "./AuthForm.module.css";

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
  const [formState, dispatchForm] = useReducer(formReducer, initialFormState);

  const [isLoading, setIsLoading] = useState(true);

  const authCtx = useContext(AuthContext);
  const router = useRouter();

  const emailIsValid = formState.emailValue.includes("@");
  const passwordIsValid = formState.passwordValue.trim().length >= 6;

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

  const submitHandler = (e) => {
    e.preventDefault();

    const enteredEmail = formState.emailValue;
    const enteredPassword = formState.passwordValue;

    // OPTIONAL VALIDATION

    setIsLoading(true);

    const url = ""; // SIGN IN ENDPOINT URL

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication failed!";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        const expirationTime = new Date(
          new Date().getTime() + +data.expiresIn * 1000
        );
        authCtx.login(data.idToken, expirationTime.toISOString());
        router.replace("/");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  let buttonText = "Who you is?";

  if (passwordHasError) {
    buttonText = "Passwords must be 6 characters long.";
  }

  if (emailHasError) {
    buttonText = "Please enter a valid email.";
  }

  if (formState.formIsValid) {
    buttonText = "Login";
  }

  return (
    <>
      {!isLoading && (
        <section className={classes.auth}>
          <form onSubmit={submitHandler}>
            <div
              className={`${classes.control} ${
                emailHasError && classes.invalid
              }`}
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
              className={`${classes.control} ${
                passwordHasError && classes.invalid
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
              className={`${classes.actions} ${
                !formState.formIsValid && classes.invalid
              }`}
            >
              <button type="submit">{buttonText}</button>
              {isLoading && <p>Loading...</p>}
              {/* ADD LOADING SPINNER */}
            </div>
          </form>
        </section>
      )}
      {isLoading && (
        <section className={classes.loading}>
          <svg
            width="58"
            height="58"
            viewBox="0 0 58 58"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g fill="none" fillRule="evenodd">
              <g transform="translate(2 1)" stroke="#FFF" strokeWidth="1.5">
                <circle
                  cx="42.601"
                  cy="11.462"
                  r="5"
                  fillOpacity="1"
                  fill="#fff"
                >
                  <animate
                    attributeName="fill-opacity"
                    begin="0s"
                    dur="1.3s"
                    values="1;0;0;0;0;0;0;0"
                    calcMode="linear"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle
                  cx="49.063"
                  cy="27.063"
                  r="5"
                  fillOpacity="0"
                  fill="#fff"
                >
                  <animate
                    attributeName="fill-opacity"
                    begin="0s"
                    dur="1.3s"
                    values="0;1;0;0;0;0;0;0"
                    calcMode="linear"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle
                  cx="42.601"
                  cy="42.663"
                  r="5"
                  fillOpacity="0"
                  fill="#fff"
                >
                  <animate
                    attributeName="fill-opacity"
                    begin="0s"
                    dur="1.3s"
                    values="0;0;1;0;0;0;0;0"
                    calcMode="linear"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle cx="27" cy="49.125" r="5" fillOpacity="0" fill="#fff">
                  <animate
                    attributeName="fill-opacity"
                    begin="0s"
                    dur="1.3s"
                    values="0;0;0;1;0;0;0;0"
                    calcMode="linear"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle
                  cx="11.399"
                  cy="42.663"
                  r="5"
                  fillOpacity="0"
                  fill="#fff"
                >
                  <animate
                    attributeName="fill-opacity"
                    begin="0s"
                    dur="1.3s"
                    values="0;0;0;0;1;0;0;0"
                    calcMode="linear"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle
                  cx="4.938"
                  cy="27.063"
                  r="5"
                  fillOpacity="0"
                  fill="#fff"
                >
                  <animate
                    attributeName="fill-opacity"
                    begin="0s"
                    dur="1.3s"
                    values="0;0;0;0;0;1;0;0"
                    calcMode="linear"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle
                  cx="11.399"
                  cy="11.462"
                  r="5"
                  fillOpacity="0"
                  fill="#fff"
                >
                  <animate
                    attributeName="fill-opacity"
                    begin="0s"
                    dur="1.3s"
                    values="0;0;0;0;0;0;1;0"
                    calcMode="linear"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle cx="27" cy="5" r="5" fillOpacity="0" fill="#fff">
                  <animate
                    attributeName="fill-opacity"
                    begin="0s"
                    dur="1.3s"
                    values="0;0;0;0;0;0;0;1"
                    calcMode="linear"
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
            </g>
          </svg>
        </section>
      )}
    </>
  );
};

export default AuthForm;
