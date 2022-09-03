import { Image, View, StyleSheet, Text, ScrollView, Button, Dimensions } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'

import { Left, Right, Container, Heading, HStack } from "native-base"
import Toast from 'react-native-toast-message'
import Icon from "react-native-vector-icons/Ionicons"
import Feather from "react-native-vector-icons/Feather"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import FontAwesome from "react-native-vector-icons/FontAwesome"

//  REDUX
import { connect } from 'react-redux'
import * as actions from '../../Redux/Actions/cartActions'
import { TouchableOpacity } from 'react-native-gesture-handler'

//Context API
import AuthGlobal from "../../Context/store/AuthGlobal"

var { width, height } = Dimensions.get("window")

const SingleProducts = (props) => {
    const context = useContext(AuthGlobal)
    const [item, setItem] = useState(props.route.params.item);
    // const [availability, setAvailability] = useState('');
    console.log("from single product", props.route.params.item)

    return (
        <View style={styles.Container}>
            <ScrollView style={{ marginBottom: 80, padding: 5 }}>
                <View style={{ marginBottom: 20 }}>
                    <View style={{ alignItems: 'center' }}>
                        <Heading>{item.tital}</Heading>
                    </View>
                    <View>
                        <Image
                            source={{
                                uri: item.image ?
                                    item.image :
                                    "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png"
                            }}
                            resizeMode='contain'
                            style={styles.image}
                        />
                    </View>
                    <View style={[styles.Box, { flexDirection: 'row', width: width, }]} >
                        <Icon
                            name='location'
                            style={{ position: 'relative' }}
                            // color={color}
                            size={30}
                        />
                        <Text style={{ paddingLeft: 10 }}>{item.location}</Text>
                    </View>
                    <View style={[styles.Box, { flexDirection: 'row', width: width, }]} >
                        <Feather
                            name='type'
                            style={{ position: 'relative' }}
                            // color={color}
                            size={30}
                        />
                        <Text style={{ paddingLeft: 10 }}>{item.finishType}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={[styles.Box, { flexDirection: 'row', width: width / 2.1, justifyContent: 'space-between' }]} >
                            <MaterialCommunityIcons
                                name='currency-rupee'
                                style={{ position: 'relative' }}
                                // color={color}
                                size={30}
                            />
                            <Text style={{ paddingLeft: 10 }}>{item.price} PKR</Text>
                        </View>
                        <View style={[styles.Box, { flexDirection: 'row', width: width / 2.1, justifyContent: 'space-between' }]} >
                            <Text>Area</Text>
                            <Text>{item.area} sq. ft.</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={[styles.Box, { flexDirection: 'row', width: width / 2.1, justifyContent: 'space-between' }]} >
                            <Text>Bedrooms</Text>
                            <Text>{item.noOfBedrooms}</Text>
                        </View>
                        <View style={[styles.Box, { flexDirection: 'row', width: width / 2.1, justifyContent: 'space-between' }]} >
                            <Text>Living Rooms</Text>
                            <Text>{item.livingRooms}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={[styles.Box, { flexDirection: 'row', width: width / 2.1, justifyContent: 'space-between' }]} >
                            <Text>Bathrooms</Text>
                            <Text>{item.noOfBathrooms}</Text>
                        </View>
                        <View style={[styles.Box, { flexDirection: 'row', width: width / 2.1, justifyContent: 'space-between' }]} >
                            <Text>Reception</Text>
                            <Text>{item.reception ? "YES" : "NO"}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={[styles.Box, { flexDirection: 'row', width: width / 2.1, justifyContent: 'space-between' }]} >
                            <Text>Dining Rooms</Text>
                            <Text>{item.diningRooms}</Text>
                        </View>
                        <View style={[styles.Box, { flexDirection: 'row', width: width / 2.1, justifyContent: 'space-between' }]} >
                            <Text>Kitchen</Text>
                            <Text>{item.kitchen}</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
            {/* <View > */}
            <HStack style={styles.bottomContainer}>
                <TouchableOpacity>
                    <FontAwesome
                        name='heart-o'
                        style={{ position: 'relative' }}
                        color={"green"}
                        size={30}
                        onPress={() => {
                            props.addItemToCart(props.route.params.item),
                                Toast.show({
                                    topOffset: 60,
                                    type: "success",
                                    text1: `${item.tital} added to Cart`,
                                    text2: "Go to your cart to complete order  "
                                })
                            // console.log("props in Single Product",props.route.params.item)
                        }}
                    />
                </TouchableOpacity>
                {/* <Button
                    style={styles.AddButton}
                    title='Add'
                    onPress={() => {
                        props.addItemToCart(props.route.params.item),
                            Toast.show({
                                topOffset: 60,
                                type: "success",
                                text1: `${item.tital} added to Cart`,
                                text2: "Go to your cart to complete order  "
                            })
                        // console.log("props in Single Product",props.route.params.item)
                    }}
                /> */}
                <Button
                    style={styles.AddButton}
                    title='Contact'
                    onPress={() => {
                        {
                            context.stateUser.isAuthenticated === false ? <>
                                {
                                    Toast.show({
                                        topOffset: 60,
                                        type: "success",
                                        text1: "Please login into your account to contact",
                                        text2: ""
                                    })
                                    // props.navigation.navigate('Login')
                                }
                            </>
                                :
                                null
                        }
                    }}
                />
            </HStack>

            {/* </View> */}
        </View>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        addItemToCart: (product) =>
            dispatch(actions.addToCart({ quantity: 1, product }))
    }
}

const styles = StyleSheet.create({
    Container: {
        position: 'relative',
        height: '100%',
        backgroundColor: "white"
    }, Box: {
        padding: 10,
        borderRadius: 10,
        marginTop: 20,
        // marginBottom: 5,
        // margin: 10,
        alignItems: "center",
        elevation: 8,
        backgroundColor: "white",
    },
    // imageContainer: {
    //     backgroundColor: 'white',
    //     padding: 0,
    //     margin: 0
    // },
    image: {
        width: '100%',
        height: 250
    },
    contentContainer: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentHeader: {
        marginBottom: 20
    },
    contentText: {
        fontSize: 18,
        marginBottom: 20
    },
    bottomContainer: {
        flexDirection: 'row',
        width: "100%",
        justifyContent: 'space-between',
        // alignItems: 'flex-end',
        paddingHorizontal: 10,
        paddingBottom: 10,
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: 'white',
        marginBottom: 10
    },
    price: {
        fontSize: 24,
        color: 'red',
    }, AddButton: {
        // marginRight: 10
        backgroundColor: "green"
    }
    // availabilityContainer: {
    //     marginBottom: 20,
    //     alignItems: "center"
    // },
    // availability: {
    //     flexDirection: 'row',
    //     marginBottom: 10,
    // }
})


export default connect(null, mapDispatchToProps)(SingleProducts)