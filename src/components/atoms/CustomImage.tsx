import React from "react";
import { Image, ImageStyle, StyleSheet } from "react-native";
import themes from "../../themes/themes";

interface Props {
    source: string
    type?: keyof typeof styles
}

const CustomImage = (props: Props) => {
    const selectedStyle = props.type ? props.type : 'default'
    return <Image style={[styles[selectedStyle], { resizeMode: 'stretch' }] as ImageStyle} source={{ uri: props.source }} />
}

export default CustomImage;

const styles = StyleSheet.create({
    default: {
        width: 50,
        height: 50,
    },
    icon: {
        width: 24,
        height: 24,
    },
    category: {
        width: 70,
        height: 70,
        borderRadius: 7,
        borderWidth: 2,
        borderColor: themes['defaultTheme'].primaryColor
    },
    match_parent:{
        width:'auto',
        height:149,
        borderRadius: 7
    }

})