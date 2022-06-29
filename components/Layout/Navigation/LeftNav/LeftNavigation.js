import styles from "./LeftNavigation.module.css";
import UserSettings from "./UserSettings";
import { useState } from "react";

const LeftNavigation = () => {
  const [navHidden, setNavHidden] = useState(false);

  const hideLeftNavHandler = () => {
    setNavHidden(true);
  };

  const showLeftNavHandler = () => {
    setNavHidden(false);
  };

  return (
    <>
      <div onClick={showLeftNavHandler} className={styles.showtab}>
        <h2>&raquo;</h2>
      </div>
      <div className={`${styles["left-nav"]} ${navHidden && styles.hidden}`}>
        <div className={styles.following}>
          <div className={styles["following-header"]}>
            <h3>Following</h3>
            <div onClick={hideLeftNavHandler} className={styles.hidetab}>
              <h2>&laquo;</h2>
            </div>
          </div>
          <div className={styles["following-body"]}>
            <h3>BODY</h3>
          </div>
        </div>

        <UserSettings />
      </div>
    </>
  );
};

export default LeftNavigation;
