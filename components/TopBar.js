import React from 'react';
import { View, Text, StyleSheet , Image} from 'react-native';
import {FontAwesome} from "@expo/vector-icons"
function TopBar() {
    return (
        <View style={styles.container}>
            <View >
                <Image style={styles.icon} source={require("../assets/icons/popcorn.png")}></Image>
            </View>
            <FontAwesome name="comments" size={24} color="#5c5c5c"/>
            <FontAwesome name="user" size={24} color="#5c5c5c"/>
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
        width: 24,
        height: 24
    },

})

export default TopBar