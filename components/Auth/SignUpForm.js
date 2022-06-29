import styles from "./SignUpForm.module.css";
import { useRouter } from "next/router";
import { useState, useReducer, useEffect } from "react";
import Card from "../UI/Card";

const initialFormState = {
  emailValue: "",
  emailIsTouched: false,
  passwordValue: "",
  passwordIsTouched: false,
  validatePasswordValue: "",
  validatePasswordIsTouched: false,
  formIsValid: false,
};

const formReducer = (state, action) => {
  if (action.type === "EMAIL_INPUT") {
    return {
      emailValue: action.val,
      emailIsTouched: state.emailIsTouched,
      passwordValue: state.passwordValue,
      passwordIsTouched: state.passwordIsTouched,
      validatePasswordValue: state.validatePasswordValue,
      validatePasswordIsTouched: state.validatePasswordIsTouched,
      formIsValid: state.formIsValid,
    };
  }
  if (action.type === "EMAIL_BLUR") {
    return {
      emailValue: state.emailValue,
      emailIsTouched: true,
      passwordValue: state.passwordValue,
      passwordIsTouched: state.passwordIsTouched,
      validatePasswordValue: state.validatePasswordValue,
      validatePasswordIsTouched: state.validatePasswordIsTouched,
      formIsValid: state.formIsValid,
    };
  }
  if (action.type === "PWD_INPUT") {
    return {
      emailValue: state.emailValue,
      emailIsTouched: state.emailIsTouched,
      passwordValue: action.val,
      passwordIsTouched: state.passwordIsTouched,
      validatePasswordValue: state.validatePasswordValue,
      validatePasswordIsTouched: state.validatePasswordIsTouched,
      formIsValid: state.formIsValid,
    };
  }
  if (action.type === "PWD_BLUR") {
    return {
      emailValue: state.emailValue,
      emailIsTouched: state.emailIsTouched,
      passwordValue: state.passwordValue,
      passwordIsTouched: true,
      validatePasswordValue: state.validatePasswordValue,
      validatePasswordIsTouched: state.validatePasswordIsTouched,
      formIsValid: state.formIsValid,
    };
  }
  if (action.type === "VAL_PWD_INPUT") {
    return {
      emailValue: state.emailValue,
      emailIsTouched: state.emailIsTouched,
      passwordValue: state.passwordValue,
      passwordIsTouched: state.passwordIsTouched,
      validatePasswordValue: action.val,
      validatePasswordIsTouched: state.validatePasswordIsTouched,
      formIsValid: state.formIsValid,
    };
  }
  if (action.type === "VAL_PWD_BLUR") {
    return {
      emailValue: state.emailValue,
      emailIsTouched: state.emailIsTouched,
      passwordValue: state.passwordValue,
      passwordIsTouched: state.passwordIsTouched,
      validatePasswordValue: state.validatePasswordValue,
      validatePasswordIsTouched: true,
      formIsValid: state.formIsValid,
    };
  }
  if (action.type === "FORM_VALID") {
    return {
      emailValue: state.emailValue,
      emailIsTouched: state.emailIsTouched,
      passwordValue: state.passwordValue,
      passwordIsTouched: state.passwordIsTouched,
      validatePasswordValue: state.validatePasswordValue,
      validatePasswordIsTouched: state.validatePasswordIsTouched,
      formIsValid: true,
    };
  }
  if (action.type === "FORM_INVALID") {
    return {
      emailValue: state.emailValue,
      emailIsTouched: state.emailIsTouched,
      passwordValue: state.passwordValue,
      passwordIsTouched: state.passwordIsTouched,
      validatePasswordValue: state.validatePasswordValue,
      validatePasswordIsTouched: state.validatePasswordIsTouched,
      formIsValid: false,
    };
  }
  return initialFormState;
};

const SignUpForm = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formState, dispatchForm] = useReducer(formReducer, initialFormState);

  // const authCtx = useContext(AuthContext);
  const router = useRouter();

  const emailIsValid = formState.emailValue.includes("@");
  const passwordIsValid = formState.passwordValue.trim().length >= 8;
  const valPwdIsValid = (formState.validatePasswordValue =
    formState.passwordValue);

  const emailHasError = !emailIsValid && formState.emailIsTouched;
  const passwordHasError = !passwordIsValid && formState.passwordIsTouched;
  const valPwdHasError = !valPwdIsValid && formState.validatePasswordIsTouched;

  useEffect(() => {
    if (
      emailIsValid &&
      passwordIsValid &&
      valPwdIsValid &&
      !emailHasError &&
      !passwordHasError &&
      valPwdHasError
    ) {
      dispatchForm({ type: "FORM_VALID" });
    } else {
      dispatchForm({ type: "FORM_INVALID" });
    }
  }, [emailIsValid, passwordIsValid, emailHasError, passwordHasError, valPwdIsValid, valPwdHasError]);

  const emailChangeHandler = (event) => {
    dispatchForm({ type: "EMAIL_INPUT", val: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchForm({ type: "PWD_INPUT", val: event.target.value });
  };

  const valPwdChangeHandler = (event) => {
    dispatchForm({ type: "VAL_PWD_INPUT", val: event.target.value });
  };

  const validateEmailHandler = () => {
    dispatchForm({ type: "EMAIL_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchForm({ type: "PWD_BLUR" });
  };

  const validateValPwdHandler = () => {
    dispatchForm({ type: "VAL_PWD_BLUR" });
  };

  let buttonText = "Next";

  if (valPwdHasError) {
    buttonText = "Passwords don't match.";
  }

  if (passwordHasError) {
    buttonText = "Passwords must be 8 characters long.";
  }

  if (emailHasError) {
    buttonText = "Please enter a valid email.";
  }

  if (formState.formIsValid) {
    buttonText = "Next";
  }

  // TEMPORARY SUBMIT HANDLER
  // WAITS 2 SECONDS AND NAVIGATES TO THE CORRECT PAGE

  const submitHandler = (e) => {
    e.preventDefault();

    setIsLoading(true);
  };

  return (
    <Card>
      <div className={styles.container}>
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
            <p>Please enter a valid email.</p>
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
            className={`${styles.control} ${valPwdHasError && styles.invalid}`}
          >
            <input
              placeholder="re-enter password"
              value={formState.validatePasswordValue}
              type="password"
              id="re-enter-password"
              onChange={valPwdChangeHandler}
              onBlur={validateValPwdHandler}
              required
            />
          </div>
          <div
            className={`${styles.actions} ${
              !formState.formIsValid && styles.invalid
            }`}
          >
            <button
              className={emailHasError || passwordHasError ? styles.error : ""}
              type="submit"
            >
              {buttonText}
            </button>
          </div>
        </form>
      </div>
    </Card>
  );
};

export default SignUpForm;
