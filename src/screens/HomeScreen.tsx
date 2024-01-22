import React from "react"
import lang from "../language/lang"
import CustomText from "../components/atoms/CustomText";
import {StyleSheet, View } from "react-native";
import CardHelp from "../components/molecules/CardHelp";
import CustomImage from "../components/atoms/CustomImage";
import CategoryModel from "../components/models/CategoryModel";
import ItemCategory from "../components/molecules/ItemCategory";

const HomeScreen = () => {
    const testCategory = new CategoryModel('test', 'https://images.pexels.com/photos/16061696/pexels-photo-16061696/free-photo-of-a-grass-field-and-rocky-mountains-covered-in-fog.jpeg')
    return (
        <View style = {styles.view}>
            <CustomText type="subTitle">{lang['en'].appBarHome}</CustomText>
            <CustomText type="header">Welcome!</CustomText>
            <CardHelp marginTop={24}/>
            <ItemCategory category={testCategory}/>
            
        </View>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({
    view:{
        paddingHorizontal: 16
    }
})