import { useState, useEffect } from "react";


export const useLocalStorage = (darkMode: boolean, remember: boolean) => {
  const [ item, setItem ] = useState<object>({})
  const [ error, setError ] = useState<unknown>()
  const [ loading, setLoading ] = useState<boolean>(true);

  const config = {
    darkMode: darkMode,
    remember: remember,
  }

  useEffect(() => {
    try {
      const localStorageItem = localStorage.getItem('banco-nc-config');
      let parsedItem;

      if (!localStorageItem) {
        localStorage.setItem('banco-nc-config', JSON.stringify(config));
        parsedItem = config;
      } else {
        parsedItem = JSON.parse(localStorageItem);
        setItem(parsedItem);
      }
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false);
    }
  }, [])


  const saveItem = (newItem) => {
    localStorage.setItem('banco-nc-config', JSON.stringify(config));
    setItem(newItem);
  };

  return {
    item, 
    saveItem, 
    loading, 
    error
  };
}