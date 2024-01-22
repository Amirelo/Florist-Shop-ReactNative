import React from "react"
import { StyleSheet, View } from "react-native"
import CustomImage from "../atoms/CustomImage"
import CategoryModel from "../models/CategoryModel"
import CustomText from "../atoms/CustomText"

interface Props{
    marginTop?: number,
    category: CategoryModel
}

const ItemCategory = (props: Props) => {
    return (
    <View style={styles.view}>
        <CustomImage type="category" source={props.category.link}/>
        <CustomText>{props.category.name}</CustomText>
    </View>)
}

export default ItemCategory;

const styles = StyleSheet.create({
    view:{
        display:'flex',
        alignItems:'center',
        alignSelf:'baseline'
    }
})