import styles from "./AuthContainer.module.css";
import Image from "next/image";
import Card from "../UI/Card";
import { useState } from "react";

const AuthContainer = () => {
  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();

    setIsLoading(true);

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
    <Card>
      {/* <Image
        className={styles.snow}
        src="/snow.gif"
        alt="tv-snow"
        layout={"fill"}
      /> */}
      <p>Weeeee</p>
    </Card>
  );
};

export default AuthContainer;


// {!isLoading && <AuthForm onSubmit={submitHandler} isLoading={isLoading}/>}
// {isLoading && (
//   <Image src="/horse-loop.gif" alt="loading" width={80} height={60} />
// )}