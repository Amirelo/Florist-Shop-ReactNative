import React from "react"
import lang from "../language/lang"
import CustomText from "../components/atoms/CustomText";
import { Image, StyleSheet, View } from "react-native";
import CardHelp from "../components/molecules/CardHelp";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const HomeScreen = () => {
    return (
        <View style = {styles.view}>
            <CustomText type="subTitle">FLORIST</CustomText>
            <CustomText type="header">Welcome!</CustomText>
            <CardHelp marginTop={24}/>
            <Image width={24} height={24} source={{uri:"https://cdn.pixabay.com/photo/2023/12/19/21/53/trees-8458467_1280.jpg"}}/>
        </View>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({
    view:{
        paddingHorizontal: 16
    }
})