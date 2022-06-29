import styles from "./TopNav.module.css";

const TopNav = (props) => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>

      </div>
      <nav>
        <ul>
          <li>Calendar</li>
          <li>Map</li>
        </ul>
      </nav>
    </header>
  )
};

export default TopNav;
