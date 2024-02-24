//import React from 'react';
import { View, Text, StyleSheet , Image} from 'react-native';
import {FontAwesome} from "@expo/vector-icons";
import colors from "../constants/colors";
import {useNavigation} from '@react-navigation/native';






function TopBar() {
    const navigation = useNavigation();

    function _onPressButton() {
    
    navigation.navigate('Search Movies');
    console.log("Search Movies");
  }

    return (
        <View style={styles.container}>
            <View >
                <Image style={styles.icon} source={require("../assets/icons/popcorn.png")}></Image>
            </View>
            <FontAwesome name="comments" size={40} color="#5c5c5c"/>
            <FontAwesome name="user" size={40} color="#5c5c5c"/>
            <FontAwesome name="search" size={40} color="#5c5c5c" onPress={_onPressButton}  />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 60,
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 15,
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.12,
        shadowRadius: 5.46,
        elevation:9,
    },
    icon: {
        width: 40,
        height: 40
    },

})

export default TopBar