import React, { useState } from 'react'
import { Box, Input, NativeBaseProvider, Image, Text, VStack, Select, CheckIcon, Button, FormControl, Stack, ScrollView, TextArea, Center, } from 'native-base'
// import storage from '@react-native-firebase/storage';
// import { launchImageLibrary } from "react-native-image-picker";
// import firebase from "@react-native-firebase/app";
// import firestore from "@react-native-firebase/firestore";

import {
    TouchableOpacity, FlatList, View,
} from 'react-native';
export default function Addproducts() {
    // const [images, setImages] = useState([])
    // const [category, setCategory] = useState(null)
    // const [urls, setUrls] = useState([])
    // const [state, setState] = useState({
    //     nameProduct: "",
    //     price: "",
    //     room: "",
    //     duration: "",
    //     location: "",
    //     description: ""
    // })



    // const handleChange = (name, value) => {
    //     setState(s => ({ ...s, [name]: value }))
    // }

    // let options = {
    //     title: 'Select Images',
    //     customButtons: [
    //         {
    //             name: 'customOptionKey',
    //             title: 'Choose file from Custom Option',
    //         },
    //     ],
    //     storageOptions: {
    //         skipBackup: true,
    //         path: 'images',
    //     },
    //     selectionLimit: 4
    // };

    // const handleSelcetImages = async (e) => {
    //     await launchImageLibrary(options, (response) => {
    //         if (response.didCancel) {
    //             console.log('User cancelled image picker');
    //         } else if (response.error) {
    //             console.log('ImagePicker Error: ', response.error);
    //         } else if (response.customButton) {
    //             console.log('User tapped custom button: ', response.customButton);
    //             alert(response.customButton);
    //         }
    //         else if (response.assets.length < 3) {
    //             alert("please add 3 to 4 images")
    //         } else if (response.assets.length > 4) {
    //             alert("please add 3 to 4 images")
    //         }
    //         else {
    //             for (let i = 0; i < response.assets.length; i++) {
    //                 const newImage = response.assets[i];
    //                 newImage["id"] = Math.random();
    //                 setImages((prevState) => [...prevState, newImage]);
    //             }
    //         }
    //     });
    // }
    // const handleUpload = async () => {
    //     // if (state.nameProduct === "") {
    //     //     return alert(" Please enter Products Name")
    //     // }
    //     // if (state.price === "") {
    //     //     return alert("Please enter Price")
    //     // }
    //     // if (state.calorie === "") {
    //     //     return alert("Please enter calorie")
    //     // }
    //     // if (state.duration === "") {
    //     //     return alert("Please enter duration")
    //     // }
    //     // if (state.location === "") {
    //     //     return alert("Please enter location")
    //     // }
    //     // if (state.category === null) {
    //     //     return alert("Please enter category")
    //     // } 
    //     if (category === "House") {
    //         return {
    //             category,
    //             url: "https://firebasestorage.googleapis.com/v0/b/native-app-d0681.appspot.com/o/images%2Frn_image_picker_lib_temp_a123cfb6-9654-40ed-b5a7-11ef268b532b.jpg?alt=media&token=64e6a00a-43ec-4b2e-b62b-c53076d111e7"
    //         }
    //     }

    //     // if (images.length === 0) {
    //     //     return alert("Please Selected Images")
    //     // }

    //     const urls = [];
    //     images.map(async (image, i) => {
    //         await storage().ref(`images/${image.fileName}`).putFile(image.uri)
    //             .then(async () => {
    //                 const url = await storage().ref(`images/${image.fileName}`).getDownloadURL();
    //                 console.log(url)
    //                 urls.push(url)
    //             })
    //             .catch(err => {
    //                 console.error("err at " + i + " =>", err)
    //             })
    //         if (i === (images.length - 1)) {
    //             let formData = {
    //                 nameProduct: state.nameProduct,
    //                 price: Number(state.price),
    //                 room: Number(state.room),
    //                 duration: state.duration,
    //                 category: category,
    //                 description: state.description,
    //                 location: state.location,
    //                 images: urls,
    //                 createDate: firebase.firestore.FieldValue.serverTimestamp(),
    //                 id: Math.random().toString(36).slice(2)
    //             }
    //             console.log("formData before images uploaded =>", formData)

    //             await firestore().collection('products').doc(formData.id).set(formData)
    //                 .then(() => {
    //                     alert("products has been successfully added.")
    //                     setImages([])
    //                 })
    //                 .catch(err => {
    //                     console.error(err)
    //                 })
    //             console.log("formData after images uploaded =>", formData)
    //         }
    //     })

    // };




    return (
        <NativeBaseProvider>
            <View style={{
                flex: 1,
                paddingHorizontal: 20,
                marginTop: 30
            }}>
                <Box w="100%" safeArea>
                    <FormControl isRequired>
                        <Box flexDirection="row">
                            <Stack w="50%" maxWidth="180px">
                                <FormControl.Label>Product Name</FormControl.Label>
                                <Input _light={{
                                    bg: 'coolGray.100'
                                }} _dark={{
                                    bg: 'coolGray.800'
                                }} _hover={{
                                    bg: 'coolWhite.200'
                                }} shadow={2} placeholder="Product Name"
                                    isRequired
                                    // onChangeText={(value) => handleChange("nameProduct", value)}
                                    // value={state.nameProduct}
                                />
                            </Stack>
                            <Stack mx="2" w="50%" maxWidth="180px">
                                <FormControl.Label>Price</FormControl.Label>
                                <Input _light={{
                                    bg: 'coolGray.100'
                                }} _dark={{
                                    bg: 'coolGray.800'
                                }} _hover={{
                                    bg: 'coolWhite.200'
                                }} shadow={2} placeholder="$ Price"
                                    keyboardType="numeric"
                                    // onChangeText={(value) => handleChange("price", value)}
                                    // value={state.price}
                                />
                            </Stack>
                        </Box>
                        <Box flexDirection="row">
                            <Stack w="50%" maxWidth="180px">
                                <FormControl.Label>room</FormControl.Label>
                                <Input _light={{
                                    bg: 'coolGray.100'
                                }} _dark={{
                                    bg: 'coolGray.800'
                                }} _hover={{
                                    bg: 'coolWhite.200'
                                }} shadow={2} placeholder="Calorie"
                                    // onChangeText={(value) => handleChange("room", value)}
                                    // value={state.room}
                                    keyboardType="numeric"
                                />
                            </Stack>
                            <Stack mx="2" w="50%" maxWidth="180px">
                                <FormControl.Label>Duration</FormControl.Label>
                                <Input _light={{
                                    bg: 'coolGray.100'
                                }} _dark={{
                                    bg: 'coolGray.800'
                                }} _hover={{
                                    bg: 'coolWhite.200'
                                }} shadow={2} placeholder="Duration min"
                                    // onChangeText={(value) => handleChange("duration", value)}
                                />
                            </Stack>
                        </Box>
                        <Box flexDirection="row">
                            <VStack >
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
                                    // onValueChange={itemValue => setCategory(itemValue)}
                                >
                                    <Select.Item shadow={2} label="House" value="House" />
                                    <Select.Item shadow={2} label="Hotel" value="Hotel" />
                                    <Select.Item shadow={2} label="condo" value="condo" />
                                    <Select.Item shadow={2} label="Apartment" value="Apartment" />
                                </Select>
                            </VStack>
                            <Stack mx="2" w="50%" maxWidth="180px">
                                <FormControl.Label>Location</FormControl.Label>
                                <Input _light={{
                                    bg: 'coolGray.100'
                                }} _dark={{
                                    bg: 'coolGray.800'
                                }} _hover={{
                                    bg: 'coolWhite.200'
                                }} shadow={2} placeholder="Location"
                                    // onChangeText={(value) => handleChange("location", value)}
                                    // value={state.location}
                                />
                            </Stack>
                        </Box>
                        <FormControl.Label>Description</FormControl.Label>
                        <Box alignItems="center" w="100%" marginTop="2" shadow={2}>
                            <TextArea h={20} placeholder="Description Here" w="75%"
                                // onChangeText={(value) => handleChange("description", value)}
                                // value={state.description}
                                maxW="300" />
                        </Box>
                        {/* {images.length === 0 ? ( */}

                            <Box maxWidth="320"
                                width='70%'
                                height='22%'
                                backgroundColor="teal.300"
                                justifyContent="center"
                                alignItems="center"
                                margin="auto"
                            >
                                <TouchableOpacity
                                    // onPress={handleSelcetImages}
                                >
                                    <Text style={{
                                        color: "red"
                                    }}>Add Image</Text>
                                </TouchableOpacity>
                            </Box>
                        {/* ) : (
                            images.map((item, index) => {
                                return (
                                    <Center key={index} >
                                        <Image margin="2" source={{
                                            uri: item.uri
                                        }} alt="Alternate Text" size='xs' />
                                    </Center>
                                )
                            })

                        )
                        } */}
                        <Box >
                            <Button >Add Products</Button>
                        </Box>
                    </FormControl>
                </Box>
            </View>
        </NativeBaseProvider >
    )
}