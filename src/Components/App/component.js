import styles from "./style/style.module.css";
import { Currencies } from "../Currencies/component";
import { useState } from "react";

export const AppComponent = () => {
  const [error, setError] = useState("");

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <div className={styles.title}>Crypto Exchange</div>
        <div className={styles.subtitle}>Exchange fast and easy</div>
        
        <Currencies setError={setError} error={error} />

        <div className={styles.address_container}>
          <div>Your Ethereum address</div>
          <div className={styles.input_container}>
            <input className={styles.input}></input>
            <div className={styles.btn_container}>
              <button>Exchange</button>
              <div className={styles.error}>{error}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
