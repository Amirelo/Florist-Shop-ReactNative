import React from "react";
import { StyleSheet, View } from "react-native";
import CustomImage from "../atoms/CustomImage";
import CustomText from "../atoms/CustomText";
import ProductModel from "../models/ProductModel";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";

interface Props {
    product: ProductModel
}

const ItemProductBig = (props: Props) => {
    return (
        <View style={styles.view}>
            <View>
                <CustomImage type="match_parent" source={props.product.links[0]} />
                <View style={styles.body}>
                    <CustomText>{ProductModel.name}</CustomText>
                    <View style={styles.rating}>
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                    </View>
                </View>
            </View>
        </View>
    )
}

export default ItemProductBig;

const styles = StyleSheet.create({
    view: {
        width: '80%',
        height: '35%',
        padding: 12
    },
    rating: {
        flexDirection: 'row'
    },
    body:{
        flexDirection:'row',
        justifyContent:'space-between'
    }
})