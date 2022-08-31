import React, { useState, useEffect, useCallback, useContext } from 'react'
import { View, ActivityIndicator, StyleSheet, Dimensions, FlatList, ScrollView } from 'react-native'
import { Container, Header, Icon, Input, Item, Text, StatusBar, Box, HStack, IconButton, VStack, Heading, Ionicons } from 'native-base'
import ProductList from "./ProductList.js";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SearchedProducts from './SearchedProducts.js';
import Banner from "../../Shared/Banner"
import CategoryFilter from "./CategoryFilter"
import { ProductContext } from '../../Context/store/productGlobal.js';

import { useFocusEffect } from '@react-navigation/native';

import baseURL from "../../assets/common/baseUrl"
import axios from 'axios';

// const data = require('../../assets/data/products.json')
// const productsCategories = require('../../assets/data/categories.json')

var { height } = Dimensions.get('window')

const ProductContainer = (props) => {

  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([])
  const [focus, setFocus] = useState();
  const [categories, setCategories] = useState([]);
  const [productsCtg, setProductsCtg] = useState([])
  const [active, setActive] = useState()
  const [initialState, setInitialState] = useState([])
  const [loading, setLoading] = useState(true)

  //context values
  const { isLoader, setIsLoader, productsGlobal, setProductsGlobal, categoriesGlobal, setCategoriesGlobal } = useContext(ProductContext);



  useEffect(() => {
    // console.log("res.data in productGlobal", productsGlobal);



    setFocus(false)
    setActive(-1)
    setProducts(productsGlobal)
    setProductsFiltered(productsGlobal);
    setProductsCtg(productsGlobal)
    setInitialState(productsGlobal)
    setLoading(false)
    console.log("productsGlobal", productsGlobal)



    //Categories
    setCategories(categoriesGlobal)
    // console.log("categoriesGlobal in ")



    return () => {
      setProducts([])
      // console.log(products)
      setProductsFiltered([]);
      setFocus()
      setCategories([])
      setActive()
      setInitialState([])
      setProductsCtg([])
    }
  }, [productsGlobal])







  const SearchedProduct = (text) => {
    // console.log(text.toLowerCase())
    setProductsFiltered(
      products.filter((item) => item.tital.toLowerCase().includes(text.toLowerCase()))
    )
  }


  const openList = () => {
    setFocus(true);
  }

  const onBlur = () => {
    setFocus(false);
  }

  //Categories
  const changeCtg = (ctg) => {
    {
      ctg === 'all'
        ?
        [setProductsCtg(initialState), setActive(true)]
        : [
          setProductsCtg(
            products.filter((i) => i.category._id === ctg), //here may be error
            setActive(true)
          ),
        ]
    }
  }

  return (
    <>
      {
        loading == false ? (
          <Box style={{ paddingBottom: 50 }}>
            <HStack py="3" justifyContent="space-between" alignItems="center" w="900%" maxW="350">
              <HStack >
                <Input
                  placeholder="Search"
                  variant="filled"
                  width="100%"
                  borderRadius="10"
                  py="1"
                  px="2"
                  borderWidth="0"
                  InputLeftElement={<FontAwesome style={{ paddingLeft: 10 }} name="search" size={20} color="black" />}
                  onFocus={openList}
                  InputRightElement={
                    focus == true ?
                      <FontAwesome name="close" style={{ paddingRight: 10 }} size={20} color="black" onPress={onBlur} />
                      : null
                  }

                  onChangeText={(text) => SearchedProduct(text)}
                />

              </HStack>
            </HStack>

            {focus == true ? (
              <SearchedProducts
                navigation={props.navigation}
                productsFiltered={productsFiltered}

              />
            ) : (
              <ScrollView>
                <View style={{ flexDirection: 'column', flex: 1 }}>
                  <View>
                    <Banner />
                  </View>
                  {productsGlobal.length != 0 && categoriesGlobal != 0 ?
                    (
                      <>
                        <View>
                          <CategoryFilter
                            categories={categories}
                            CategoryFilter={changeCtg}
                            productsCtg={productsCtg}
                            active={active}
                            setActive={setActive}
                          />
                        </View>

                        {productsCtg.length > 0 ?  //may be filtered products but not yet confirm confusion going on
                          (
                            <View style={styles.listContainer}>
                              {
                                productsCtg.map((item) => {
                                  return (
                                    <ProductList
                                      navigation={props.navigation}
                                      key={item._id}
                                      item={item}
                                    />
                                  )
                                })
                              }

                            </View>
                          ) : (
                            <View style={[styles.center, { height: height / 2 }]}>
                              <Text>No products found</Text>
                            </View>
                          )
                        }
                      </>
                    ) :
                    (
                      <>
                        <Box style={ { backgroundColor: '#f2f2f2', flex: 1, paddingTop: 150}}>
                          <ActivityIndicator size="large" color="red" />
                        </Box>
                      </>
                    )
                  }
                </View>
              </ScrollView>
            )}
          </Box>

        ) : (
          <Box style={{ backgroundColor: '#f2f2f2', height: "100%" }}>
            <ActivityIndicator size="large" color="red" />
          </Box>
        )
      }
    </>

  )
}

const styles = StyleSheet.create({
  container: {
    // flexDirection:"row",
    flexWrap: "wrap",
    backgroundColor: "gainsboro",
    paddingBottom: 50,
    height: height,
  },
  listContainer: {
    // minHeight: height,

    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
    backgroundColor: "gainsboro",
    paddingBottom: 50,
  }, center: {
    justifyContent: "center",
    alignItems: "center",
  }
});

export default ProductContainer