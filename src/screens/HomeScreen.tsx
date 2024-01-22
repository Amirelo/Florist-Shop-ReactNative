import React from "react"
import lang from "../language/lang"
import CustomText from "../components/atoms/CustomText";
import { FlatList, StyleSheet, View } from "react-native";
import CardHelp from "../components/molecules/CardHelp";
import CategoryModel from "../components/models/CategoryModel";
import ItemCategory from "../components/molecules/ItemCategory";

const HomeScreen = () => {
    var list = new Array<CategoryModel>();
    const testCategory = new CategoryModel('test', 'https://images.pexels.com/photos/16061696/pexels-photo-16061696/free-photo-of-a-grass-field-and-rocky-mountains-covered-in-fog.jpeg')
    list.push(testCategory)
    const testCategory1 = new CategoryModel('test1', 'https://images.pexels.com/photos/16061696/pexels-photo-16061696/free-photo-of-a-grass-field-and-rocky-mountains-covered-in-fog.jpeg')
    list.push(testCategory1)
    const testCategory2 = new CategoryModel('test2', 'https://images.pexels.com/photos/16061696/pexels-photo-16061696/free-photo-of-a-grass-field-and-rocky-mountains-covered-in-fog.jpeg')
    list.push(testCategory2)
    const testCategory3 = new CategoryModel('test3', 'https://images.pexels.com/photos/16061696/pexels-photo-16061696/free-photo-of-a-grass-field-and-rocky-mountains-covered-in-fog.jpeg')
    list.push(testCategory3)
    console.log(list)
    return (
        <View style={styles.view}>
            <CustomText type="subTitle">{lang['en'].appBarHome}</CustomText>
            <CustomText type="header">Welcome!</CustomText>
            <CardHelp marginTop={24} />
            <FlatList
                style={{ marginTop: 24 }}
                contentContainerStyle={{ justifyContent: 'space-between', width: '100%' }}
                horizontal={true}
                data={list}
                keyExtractor={item => item.name}
                renderItem={({ item }) =>
                    <ItemCategory category={item} />} />
        </View>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({
    view: {
        paddingHorizontal: 16
    }
})