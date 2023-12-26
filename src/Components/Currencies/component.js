import React, { useEffect, useState } from "react";
import { Block } from "../Block/component";
import styles from "./style/style.module.css";

export const Currencies = ({ setError, error }) => {
  const [currencies, setCurrencies] = useState();

  const [toCurrency, setToCurrency] = useState();
  const [fromCurrency, setFromCurrenciy] = useState();

  const [exchange, setExchange] = useState();
  const [estimatedAmount, setEstimatedAmount] = useState();

  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    setIsLoad(true);
    fetch(
      "https://api.changenow.io/v2/exchange/currencies?active=&flow=standard&buy=&sell=",
      {
        method: "GET",
        headers: {
          "x-changenow-api-key":
            "c9155859d90d239f909d2906233816b26cd8cf5ede44702d422667672b58b0cd",
          "Content-Type": "application/json;charset=utf-8",
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          setIsLoad(false);
          return response.json();
        }
      })
      .then((data) => {
        setCurrencies(
          data.map((item) => {
            return { ...item, id: "id" + Math.random().toString(16).slice(2) };
          })
        );
      })
      .catch((error) => new Error(error));
  }, []);

  useEffect(() => {
    if (toCurrency && fromCurrency) {
      setIsLoad(true);

      fetch(
        `https://api.changenow.io/v2/exchange/min-amount?fromCurrency=${fromCurrency.ticker}&toCurrency=${toCurrency.ticker}&fromNetwork=${fromCurrency.network}&toNetwork=${toCurrency.network}&flow=standard`,
        {
          method: "GET",
          headers: {
            "x-changenow-api-key":
              "c9155859d90d239f909d2906233816b26cd8cf5ede44702d422667672b58b0cd",
            "Content-Type": "application/json;charset=utf-8",
          },
        }
      )
        .then((response) => {
          setIsLoad(false);
          if (response.ok) {
            return response.json();
          } else {
            setError("This pair is disabled now");
          }
        })
        .then((data) => {
          setExchange({ ...data, fromAmount: data.minAmount });
        })
        .catch((error) => new Error(error));
    }
  }, [fromCurrency, setError, toCurrency]);

  useEffect(() => {
    if (
      toCurrency &&
      fromCurrency &&
      exchange?.fromAmount >= exchange?.minAmount
    ) {
      fetch(
        `https://api.changenow.io/v2/exchange/estimated-amount?fromCurrency=${
          exchange.fromCurrency
        }&toCurrency=${exchange.toCurrency}&fromAmount=${
          exchange.fromAmount ? exchange.fromAmount : exchange.minAmount
        }&toAmount=&fromNetwork=${exchange.fromNetwork}&toNetwork=${
          exchange.toNetwork
        }&flow=${exchange.flow}&type=&useRateId=`,
        {
          method: "GET",
          headers: {
            "x-changenow-api-key":
              "c9155859d90d239f909d2906233816b26cd8cf5ede44702d422667672b58b0cd",
            "Content-Type": "application/json;charset=utf-8",
          },
        }
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) => {
          setEstimatedAmount(data);
        })
        .catch((error) => new Error(error));
    }
  }, [exchange, fromCurrency, toCurrency]);

  return !isLoad ? (
    <div className={styles.container}>
      {currencies && (
        <>
          <Block
            currencies={currencies}
            currentCurrency={fromCurrency}
            setError={setError}
            setCurrentCurrency={setFromCurrenciy}
            value={error.length === 0 ? exchange?.fromAmount : ""}
            disabledInput={toCurrency && fromCurrency ? false : true}
            typeInput="number"
            onChange={(e) => {
              if (fromCurrency) {
                const valueNumber = Number(e.target.value);
                if (valueNumber <= exchange?.minAmount) {
                  setEstimatedAmount({
                    ...estimatedAmount,
                    toAmount: "-",
                    errorSymbol: "⚠️",
                  });
                }
                setExchange({ ...exchange, fromAmount: e.target.value });
              }
            }}
          />

          <img
            className={styles.swap}
            onClick={() => {
              setToCurrency(fromCurrency);
              setFromCurrenciy(toCurrency);
            }}
            src="./images/swap.svg"
            alt="swap"
          />

          <Block
            currencies={currencies}
            currentCurrency={toCurrency}
            setCurrentCurrency={setToCurrency}
            value={error.length === 0 ? estimatedAmount?.toAmount : ""}
            setError={setError}
            disabledInput={toCurrency && fromCurrency ? false : true}
            onChange={(e) => {
              if (toCurrency) {
                console.log(toCurrency);
                setEstimatedAmount({
                  ...estimatedAmount,
                  toAmount: e.target.value,
                });
              }
            }}
          />
          <div className={styles.error}>{estimatedAmount?.errorSymbol}</div>
        </>
      )}
    </div>
  ) : (
    <div className={styles.loading}>Loading...</div>
  );
};
