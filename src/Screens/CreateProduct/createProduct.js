import React, { useState } from 'react'
import { Box, Input, NativeBaseProvider, Image, Text, VStack, Select, CheckIcon, Button, FormControl, Stack, ScrollView, TextArea, Center, } from 'native-base'
import {
    TouchableOpacity, FlatList, View, Dimensions
} from 'react-native';

var { width } = Dimensions.get("window")

export default function Addproducts() {
    const [category, setCategory] = useState(category)
    const [reception, setReception] = useState("NO")
    const [product, setProduct] = useState({
        tital: "",
        location: "",
        finishType: "",
        noOfBedrooms: 0,
        noOfBathrooms: 0,
        livingRooms: 0,
        reception: false,
        image: "",
        price: 0,
        category: "",
        area: 0,
        diningRooms: 0,
        kitchen: 0,
    })



    const handleChange = (name, value) => {
        setProduct(s => ({ ...s, [name]: value }))
    }

    const handleSubmit = () => {
        let productData = {
            tital: product.tital,   
            location: product.location,
            finishType: product.finishType,  
            noOfBedrooms: product.noOfBedrooms,
            noOfBathrooms: product.noOfBathrooms,
            livingRooms: product.livingRooms,
            reception: reception === "YES" ? true : false,
            image: product.image,
            price: Number(product.price),
            category: product.category,
            area: Number(product.area),
            diningRooms: Number(product.diningRooms),
            kitchen: Number(product.kitchen),
        }
        console.log("productData before images uploaded =>", product);
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
                                // onChangeText={(value) => handleChange("nameProduct", value)}
                                // value={product.nameProduct}
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
                                // onValueChange={itemValue => setCategory(itemValue)}
                                >
                                    <Select.Item shadow={2} label="Furnished" value="Furnished" />
                                    <Select.Item shadow={2} label=" Finished with ACs & Kitchen" value=" Finished with ACs & Kitchen" />
                                    <Select.Item shadow={2} label=" Finished without ACs" value=" Finished without ACs" />
                                </Select>
                            </VStack>
                            {/* <Stack mx="2" w="50%" maxWidth="180px">
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
                                // value={product.price}
                                />
                            </Stack> */}
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
                                // onChangeText={(value) => handleChange("room", value)}
                                // value={product.room}
                                    keyboardType="numeric"
                                />
                            </Stack>
                            <Stack  w="100%" >
                                <FormControl.Label>Bathrooms</FormControl.Label>
                                <Input _light={{
                                    bg: 'coolGray.100'
                                }} _dark={{
                                    bg: 'coolGray.800'
                                }} _hover={{
                                    bg: 'coolWhite.200'
                                }} shadow={2} placeholder="Bathrooms"
                                keyboardType="numeric"
                                // onChangeText={(value) => handleChange("duration", value)}
                                />
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
                                // onChangeText={(value) => handleChange("room", value)}
                                    // value={product.room}
                                    keyboardType="numeric"
                                    />
                            </Stack>
                            <Stack  w="100%" >
                                <FormControl.Label>Dining Rooms</FormControl.Label>
                                <Input _light={{
                                    bg: 'coolGray.100'
                                }} _dark={{
                                    bg: 'coolGray.800'
                                }} _hover={{
                                    bg: 'coolWhite.200'
                                }} shadow={2} placeholder="Bathrooms"
                                // onChangeText={(value) => handleChange("duration", value)}
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
                                    // onChangeText={(value) => handleChange("room", value)}
                                    // value={product.room}
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
                                    // onValueChange={itemValue => setCategory(itemValue)}
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
                                    // onChangeText={(value) => handleChange("room", value)}
                                    // value={product.room}
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
                                    // onValueChange={itemValue => setCategory(itemValue)}
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
                                // onChangeText={(value) => handleChange("room", value)}
                                // value={product.room}
                                    keyboardType="numeric"
                                    />
                            </Stack>
                        </Box>
                        <Box alignItems="center" w="100%" marginTop="2" shadow={2} style={{marginBottom: 270}}>
                        <FormControl.Label style={{paddingRight: 175}}>Location</FormControl.Label>
                            <TextArea h={20} placeholder="Description Here" w="75%"
                                // onChangeText={(value) => handleChange("description", value)}
                                // value={product.description}
                                maxW="300" />
                        </Box>
                        {/* {images.length === 0 ? ( */}

                        <Box maxWidth="320"
                            width='75%'
                            height='22%'
                            backgroundColor="teal.300"
                            justifyContent="center"
                            alignItems="center"
                            margin="auto"
                            style={{marginBottom: 10}}
                            >
                            <TouchableOpacity
                            // onPress={handleSelcetImages}
                            >
                                <Text style={{
                                    color: "red"
                                }}>Add Image</Text>
                            </TouchableOpacity>
                        </Box>    
                        <Box >
                            <Button onPress={() => handleSubmit}>Add Products</Button>
                        </Box>
                    </FormControl>
                        </ScrollView>
            </View>
        </NativeBaseProvider >
    )
}