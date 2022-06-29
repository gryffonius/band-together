import styles from "./RightNavigation.module.css";
import { useState } from "react";

const RightNavigation = () => {
  const [navHidden, setNavHidden] = useState(false);

  const hideRightNavHandler = () => {
    setNavHidden(true);
  };

  const showRightNavHandler = () => {
    setNavHidden(false);
  };

  return (
    <>
      <div onClick={showRightNavHandler} className={styles.showtab}>
        <h2>&laquo;</h2>
      </div>
      <div className={`${styles["right-nav"]} ${navHidden && styles.hidden}`}>
        <div className={styles.gigfeed}>
          <div className={styles["gigfeed-header"]}>
            <h3>Gig Feed</h3>
            <div onClick={hideRightNavHandler} className={styles.hidetab}>
              <h2>&raquo;</h2>
            </div>
          </div>
          <div className={styles["gigfeed-body"]}>
            <h3>BODY</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default RightNavigation;
