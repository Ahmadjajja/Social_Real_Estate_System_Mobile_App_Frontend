import React, { useState, useEffect } from 'react';
import { Box, Input, NativeBaseProvider, Image, Text, VStack, Select, CheckIcon, Button, FormControl, Stack, ScrollView, TextArea, Center, Heading, Toast } from 'native-base';
import { TouchableOpacity, FlatList, View, Dimensions, StyleSheet, Platform } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";
import * as ImagePicker from "expo-image-picker";
import baseURL from "../../assets/common/baseUrl";
import axios from 'axios';
import AsyncStorage from "@react-native-community/async-storage";
import mime from "mime";
import Error from "../../Shared/Error"


var { width } = Dimensions.get("window")


export default function CreateProduct(props) {

    const [categories, setCategories] = useState([])
    const [pickerValue, setPickerValue] = useState();
    const [mainImage, setMainImage] = useState('');
    const [image, setImage] = useState('');
    const [token, setToken] = useState();
    const [err, setErr] = useState();

    const [finishType, setFininshType] = useState('');
    const [reception, setReception] = useState()
    const [category, setCategory] = useState('')

    const [product, setProduct] = useState({
        tital: "",
        location: "",
        noOfBedrooms: 0,
        noOfBathrooms: 0,
        livingRooms: 0,
        price: 0,
        area: 0,
        diningRooms: 0,
        kitchen: 0,
    })

    useEffect(() => {


        AsyncStorage.getItem("jwt") //token comes from asyncStorage
            .then((res) => {
                setToken(res)
            })
            .catch((error) => console.log(error))

        // Categories
        axios
            .get(`${baseURL}categories`)
            .then((res) => setCategories(res.data))
            .catch((error) => alert("Error to load categories"));

        console.log("categories in createProducts folder", categories);

        //ImagePicker
        (async () => {
            if (Platform.OS !== "web") {
                const {
                    status,
                } = await ImagePicker.requestCameraPermissionsAsync();
                if (status !== "granted") {
                    alert("Sorry, we need camera roll permissions to make this work!")
                }
            }
        })(); //close callback here


        return () => {
            setCategories([])
        }
    }, [])

    const pickImage = async () => {
        // console.log("pickImage working");
        // console.log('result.uri,', result.uri)
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setMainImage(result.uri); 
            setImage(result.uri);
            console.log('result.uri');
        }
        console.log("Image", Image);
        console.log('mainImage', mainImage)
    }



    const handleChange = (name, value) => {
        setProduct(s => ({ ...s, [name]: value }))
    }

    const handleSubmit = () => {

        if (
            product.tital == "" ||
            product.location == "" ||
            product.noOfBedrooms == 0 ||
            product.noOfBathrooms == 0 ||
            product.price == 0 ||
            product.livingRooms == 0 ||
            product.area == 0 ||
            product.diningRooms == 0 ||
            product.kitchen == 0 ||
            image == '123' ||
            category == '' ||
            reception == undefined ||
            finishType == ''
        ) {
            setErr("Please fill in the form correctly")
        } else {
            setErr('')
            categories.forEach((item) => {
                if (category === item.name) {
                    console.log("ID of category => ", item.id, item.name)
                    setCategory(item.id)
                }
            })

            const newImageUri = "file:///" + image.split("file:/").join("");  //uses for android
            // image       => uses for android

            let productData = {
                tital: product.tital,
                location: product.location,
                finishType: finishType,
                noOfBedrooms: product.noOfBedrooms,
                noOfBathrooms: product.noOfBathrooms,
                livingRooms: product.livingRooms,
                reception: reception,
                image: {
                    uri: image,
                    type: mime.getType(image),
                    name: image.split("/").pop()
                },
                price: Number(product.price),
                category: category,
                area: Number(product.area),
                diningRooms: Number(product.diningRooms),
                kitchen: Number(product.kitchen),
            }
            console.log("productData  =>", productData);

            const config = {
                headers: {
                    "Content-Type": "multipart/form-Data", 
                    Authorization: `Bearer ${token}`
                }
            }
        
            axios
            .post(`${baseURL}products`, productData, config)
            .then((res) => {
                if( res.status == 200 || res.status == 201 ){
                    Toast.show({
                        topOffset: 60,
                        type: "success",
                        text1: "New Product added",
                        text2: ""
                    })
                    setTimeout(() => {
                        props.navigation.navigate("Products");
                    }, 500)
                }
            })
            .catch((error) => {
                Toast.show({
                    topOffset: 60,
                    type: "error",
                    text1: "Something went wrong",
                    text2: "please try again"
                })
            })
        }
    }




    return (
        <NativeBaseProvider>
            <View style={{
                flex: 1,
                paddingHorizontal: 20,
                marginTop: 30
            }}>
                <ScrollView>
                    <FormControl isRequired>
                        <Heading style={{ alignSelf: "center" }}>Add Product</Heading>
                        <Box style={styles.imageContainer}>
                            <Image style={styles.image} source={{ uri: mainImage }} />
                            <TouchableOpacity  style={styles.imagePicker}>
                                <Icon onPress={pickImage} name="camera" color="white" />
                            </TouchableOpacity>
                        </Box>
                        <Box flexDirection="column">
                            <Stack w="100%" >
                                <FormControl.Label>Title</FormControl.Label>
                                <Input _light={{
                                    bg: 'coolGray.100'
                                }} _dark={{
                                    bg: 'coolGray.800'
                                }} _hover={{
                                    bg: 'coolWhite.200'
                                }} shadow={2} placeholder="Product Title"
                                    isRequired
                                    onChangeText={(value) => handleChange("tital", value)}
                                    value={product.tital}
                                />
                            </Stack>
                            <VStack w="100%">
                                <FormControl.Label>Finish Type</FormControl.Label>
                                <Select shadow={2}
                                    minWidth="180px" accessibilityLabel="Choose Category"
                                    placeholder="Choose Finish Type" _selectedItem={{
                                        bg: 'teal.600',
                                        endIcon: <CheckIcon size="5" />
                                    }} _light={{
                                        bg: 'coolGray.100'
                                    }} _dark={{
                                        bg: 'coolGray.800'
                                    }}
                                    onValueChange={itemValue => setFininshType(itemValue)}
                                // onChangeText={(value) => handleChange("finishType", value)}
                                // value={product.finishType}
                                >
                                    <Select.Item shadow={2} label="Furnished" value="Furnished" />
                                    <Select.Item shadow={2} label=" Finished with ACs & Kitchen" value=" Finished with ACs & Kitchen" />
                                    <Select.Item shadow={2} label=" Finished without ACs" value=" Finished without ACs" />
                                </Select>
                            </VStack>
                        </Box>
                        <Box flexDirection="column">
                            <Stack w="100%" >
                                <FormControl.Label>Bedrooms</FormControl.Label>
                                <Input _light={{
                                    bg: 'coolGray.100'
                                }} _dark={{
                                    bg: 'coolGray.800'
                                }} _hover={{
                                    bg: 'coolWhite.200'
                                }} shadow={2} placeholder="Bedrooms"
                                    onChangeText={(value) => handleChange("noOfBedrooms", value)}
                                    value={product.noOfBedrooms}
                                    keyboardType="numeric"
                                />
                            </Stack>
                            <Stack w="100%" >
                                <FormControl.Label>Bathrooms</FormControl.Label>
                                <Input _light={{
                                    bg: 'coolGray.100'
                                }} _dark={{
                                    bg: 'coolGray.800'
                                }} _hover={{
                                    bg: 'coolWhite.200'
                                }} shadow={2} placeholder="Bathrooms"
                                    keyboardType="numeric"
                                    onChangeText={(value) => handleChange("noOfBathrooms", value)}
                                    value={product.noOfBathrooms} />
                            </Stack>
                        </Box>
                        <Box flexDirection="column">
                            <Stack w="100%" >
                                <FormControl.Label>Area</FormControl.Label>
                                <Input _light={{
                                    bg: 'coolGray.100'
                                }} _dark={{
                                    bg: 'coolGray.800'
                                }} _hover={{
                                    bg: 'coolWhite.200'
                                }} shadow={2} placeholder="Area"
                                    onChangeText={(value) => handleChange("area", value)}
                                    value={product.area}
                                    keyboardType="numeric"
                                />
                            </Stack>
                            <Stack w="100%" >
                                <FormControl.Label>Dining Rooms</FormControl.Label>
                                <Input _light={{
                                    bg: 'coolGray.100'
                                }} _dark={{
                                    bg: 'coolGray.800'
                                }} _hover={{
                                    bg: 'coolWhite.200'
                                }} shadow={2} placeholder="Bathrooms"
                                    onChangeText={(value) => handleChange("diningRooms", value)}
                                    value={product.diningRooms}
                                    keyboardType="numeric"
                                />
                            </Stack>
                        </Box>
                        <Box flexDirection="column">
                            <Stack w="100%">
                                <FormControl.Label>Living Rooms</FormControl.Label>
                                <Input _light={{
                                    bg: 'coolGray.100'
                                }} _dark={{
                                    bg: 'coolGray.800'
                                }} _hover={{
                                    bg: 'coolWhite.200'
                                }} shadow={2} placeholder="Living Rooms"
                                    onChangeText={(value) => handleChange("livingRooms", value)}
                                    value={product.livingRooms}
                                    keyboardType="numeric"
                                />
                            </Stack>
                            <VStack w="100%">
                                <FormControl.Label>Reception</FormControl.Label>
                                <Select shadow={2}
                                    minWidth="180px" accessibilityLabel="Choose Reception"
                                    placeholder="Choose Reception" _selectedItem={{
                                        bg: 'teal.600',
                                        endIcon: <CheckIcon size="5" />
                                    }} _light={{
                                        bg: 'coolGray.100'
                                    }} _dark={{
                                        bg: 'coolGray.800'
                                    }}
                                    onValueChange={itemValue => setReception(itemValue)}

                                // onChangeText={(value) => handleChange("reception", value)}
                                // value={product.reception}
                                >
                                    <Select.Item shadow={2} label="Yes" value="Yes" />
                                    <Select.Item shadow={2} label="NO" value="NO" />
                                </Select>
                            </VStack>
                        </Box>
                        <Box flexDirection="column">
                            <Stack w="100%">
                                <FormControl.Label>Price</FormControl.Label>
                                <Input _light={{
                                    bg: 'coolGray.100'
                                }} _dark={{
                                    bg: 'coolGray.800'
                                }} _hover={{
                                    bg: 'coolWhite.200'
                                }} shadow={2} placeholder="Price"
                                    onChangeText={(value) => handleChange("price", value)}
                                    value={product.price}
                                    keyboardType="numeric"
                                />
                            </Stack>
                            <VStack w="100%">
                                <FormControl.Label>Category</FormControl.Label>
                                <Select shadow={2}
                                    minWidth="180px" accessibilityLabel="Choose Category"
                                    placeholder="Choose Category" _selectedItem={{
                                        bg: 'teal.600',
                                        endIcon: <CheckIcon size="5" />
                                    }} _light={{
                                        bg: 'coolGray.100'
                                    }} _dark={{
                                        bg: 'coolGray.800'
                                    }}

                                    onValueChange={itemValue => setCategory(itemValue)}

                                // onChangeText={(value) => handleChange("category", value)}
                                // value={product.category}
                                >
                                    <Select.Item shadow={2} label="Apartment" value="Apartment" />
                                    <Select.Item shadow={2} label="Villa" value="Villa" />
                                    <Select.Item shadow={2} label="Studio" value="Studio" />
                                    <Select.Item shadow={2} label="Challet" value="Challet" />
                                    <Select.Item shadow={2} label="Twinhouse" value="Townhouse" />
                                </Select>
                            </VStack>
                        </Box>
                        <Box flexDirection="row" justifyContent={"center"}>
                            <Stack w="100%" >
                                <FormControl.Label>kitchen</FormControl.Label>
                                <Input _light={{
                                    bg: 'coolGray.100'
                                }} _dark={{
                                    bg: 'coolGray.800'
                                }} _hover={{
                                    bg: 'coolWhite.200'
                                }} shadow={2} placeholder="Kitchen"
                                    onChangeText={(value) => handleChange("kitchen", value)}
                                    value={product.kitchen}
                                    keyboardType="numeric"
                                />
                            </Stack>
                        </Box>
                        <Box w="100%" marginTop="2" style={{ marginBottom: 5 }}>
                            <FormControl.Label style={{ paddingRight: 175 }}>Location</FormControl.Label>
                            <TextArea h={20} placeholder="Location Here" w="100%"
                                onChangeText={(value) => handleChange("location", value)}
                                value={product.location}
                            />
                        </Box>
                        {err  ? <Error style={{ paddingBottom: 10 }} message={err} /> : null}
                        <Box style={{ marginVertical: 5 }}>
                            <Button onPress={handleSubmit}>Add Products</Button>
                        </Box>
                    </FormControl>
                </ScrollView>
            </View>
        </NativeBaseProvider >
    )
}

const styles = StyleSheet.create({
    imageContainer: {
        width: 200,
        height: 200,
        borderStyle: "solid",
        borderWidth: 8,
        padding: 0,
        justifyContent: 'center',
        alignItems: "center",
        borderRadius: 100,
        borderColor: "#E0E0E0",
        elevation: 10,
        marginLeft: 60,
        marginVertical: 10,
        backgroundColor: 'white'
    }, image: {
        width: "100%",
        height: "100%",
        borderRadius: 100
    },
    imagePicker: {
        position: "absolute",
        right: 5,
        bottom: 5,
        backgroundColor: "grey",
        padding: 8,
        borderRadius: 100,
        elevation: 20, //what does elevation
    }
})