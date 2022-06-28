import styles from "./UserSettings.module.css";
import Image from "next/image";

const clickSettingsHandler = () => {
  console.log("clicked settings"); // BRING UP USER SETTINGS PAGE
};

const UserSettings = () => {
  return (
    <div className={styles["user-settings"]}>
      <Image
        src="/profile-pic-placeholder.png"
        alt="profile pic"
        width={40}
        height={40}
      />
      <h3>Gryffonius</h3>
      <div className={styles["gear-container"]}>
        <Image
          type="button"
          className={styles["gear-icon"]}
          onClick={clickSettingsHandler}
          src="/settings-icon.svg"
          alt="settings"
          width={30}
          height={30}
        />
      </div>
    </div>
  );
};

export default UserSettings;
