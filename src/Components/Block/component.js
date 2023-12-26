import { useState } from "react";
import { ItemList } from "../ItemList/component";
import styles from "./style/style.module.css";
import { List } from "react-virtualized";

export const Block = ({
  currentCurrency,
  currencies,
  setCurrentCurrency,
  value,
  onChange,
  setError,
  disabledInput,
  typeInput,
}) => {
  const [openList, setOpenList] = useState(false);
  const [itemList, setItemsList] = useState(currencies);
  const [searchText, setSearchText] = useState("");

  const onChangeSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchText(searchValue);
    setItemsList(
      currencies.filter((currency) =>
        currency.name.toLowerCase().startsWith(searchValue)
      )
    );
  };

  const renderRow = ({ index, key, style }) => {
    return (
      <div
        className={styles.item}
        onClick={() => {
          setError("");
          setCurrentCurrency({ ...itemList[[index]], indexElement: index });
          setOpenList(!openList);
        }}
      >
        <ItemList
          key={key}
          currency={itemList[[index]]}
          style={style}
          selected={currentCurrency?.indexElement === index}
        />
      </div>
    );
  };

  return (
    <div className={styles.container}>
      {openList ? (
        <div className={styles.search_container}>
          <div className={styles.header}>
            <input
              placeholder="Search"
              value={searchText}
              onChange={(e) => onChangeSearch(e)}
            />

            <img
              onClick={() => setOpenList(!openList)}
              src="./images/close.svg"
              alt="close"
            />
          </div>

          {itemList.length > 0 ? (
            <List
              width={"100"}
              height={155}
              key={itemList.id}
              scrollToIndex={currentCurrency?.indexElement}
              rowRenderer={renderRow}
              rowCount={itemList.length}
              rowHeight={50}
              className={styles.scroling}
            />
          ) : (
            <div className={styles.empty}>There are no search results</div>
          )}
        </div>
      ) : (
        <div className={styles.block}>
          <input
            value={value}
            onChange={onChange}
            disabled={disabledInput}
            type={typeInput}
          />
          <div className={styles.box} onClick={() => setOpenList(!openList)}>
            {currentCurrency ? (
              <div className={styles.box_content}>
                {currentCurrency.image && (
                  <img src={currentCurrency.image} alt={""} />
                )}

                <div className={styles.box_text}>{currentCurrency.ticker}</div>
              </div>
            ) : (
              <div>Select</div>
            )}
            <img src="./images/arrow.svg" alt="arrow" />
          </div>
        </div>
      )}
    </div>
  );
};
