import React from "react"
import lang from "../language/lang"
import CustomText from "../components/atoms/CustomText";
import {StyleSheet, View } from "react-native";
import CardHelp from "../components/molecules/CardHelp";
import CustomImage from "../components/atoms/CustomImage";

const HomeScreen = () => {
    return (
        <View style = {styles.view}>
            <CustomText type="subTitle">{lang['en'].appBarHome}</CustomText>
            <CustomText type="header">Welcome!</CustomText>
            <CardHelp marginTop={24}/>
            <CustomImage type="category" source="https://cdn.pixabay.com/photo/2023/12/19/21/53/trees-8458467_1280.jpg"/>
            <CustomText marginTop={10}>All</CustomText>
        </View>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({
    view:{
        paddingHorizontal: 16
    }
})