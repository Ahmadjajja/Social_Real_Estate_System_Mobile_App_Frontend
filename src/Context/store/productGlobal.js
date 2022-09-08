import React, { createContext, useState, useEffect } from 'react'      //diff b/w createContext and UseContext?
export const ProductContext = createContext();

import baseURL from "../../assets/common/baseUrl"
import axios from 'axios';

function ProductContextProvider(props) {

//   const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoader, setIsLoader] = useState(true)
//   const [userId, setUserId] = useState('')
  const [productsGlobal, setProductsGlobal] = useState([])
  const [categoriesGlobal, setCategoriesGlobal] = useState([])
  const [userPhoneNumber, setUserPhoneNumber] = useState('')
  useEffect(() => {
    axios
    .get(`${baseURL}products`)
    .then((res) => {
    //   setProductsGlobal("res.data in productGlobal", res.data);
      setProductsGlobal(res.data)
      setIsLoader(false);
      console.log("res.data in productGlobal", productsGlobal.length);

    })
    .catch((error) => {
      console.log("Api call error", error)
      setIsLoader(true);
    })

    axios
    .get(`${baseURL}categories`)
    .then((res) => {
        setCategoriesGlobal(res.data)
        console.log("res.data in categoriesGlobal=> " , categoriesGlobal)
      setIsLoader(false);
    })
    .catch((error) => {
      console.log("Api call error", error)
      setIsLoader(true);
    })
  }, [])

  return (
    <ProductContext.Provider value={{ isLoader, setIsLoader, productsGlobal, setProductsGlobal, categoriesGlobal,  setCategoriesGlobal, userPhoneNumber, setUserPhoneNumber}}>
      {props.children}
    </ProductContext.Provider>
  )
}
export default ProductContextProvider