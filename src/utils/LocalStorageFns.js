import React from "react"
// 
// Code adopted from:
// https://www.robinwieruch.de/react-uselocalstorage-hook/
// Robin Wieruch 
// Last accessed: November 26, 2022
// 
export const useLocalStorage = (storageKey, fallbackState) => {
  const [value, setValue] = React.useState(
    JSON.parse(localStorage.getItem(storageKey)) ?? fallbackState
  );

  React.useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(value))
  }, [value, storageKey])

  return [value, setValue]
}
