import classNames from "classnames";
import styles from "./style/style.module.css";

export const ItemList = ({ currency, style, selected }) => {
  return (
    <div
      className={classNames(styles.container, selected && styles.active)}
      style={style}
    >
      {currency.image && <img src={currency.image} alt="" />}

      <div className={styles.tricker}>{currency.ticker}</div>
      <div className={styles.name}>{currency.name}</div>
    </div>
  );
};
