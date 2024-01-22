import React from "react"
import { ColorValue, StyleSheet, Text, TextStyle } from "react-native"

interface Props{
    children: String,
    color?: ColorValue,
    type?: keyof typeof styles
}

const CustomText = (props: Props) => {
    const selectedType = props.type ? props.type : 'normal';
    return <Text style={[{color: props.color ? props.color : "#000000" }, styles[selectedType]] as TextStyle}>{props.children}</Text>
}

export default CustomText;

const styles = StyleSheet.create({
    big:{
        fontSize: 40,
    },
    header:{
        fontSize: 33,
    },
    subHeader:{
        fontSize: 30,
    },
    title:{
        fontSize: 20,
    },
    subTitle:{
        fontSize: 16,
    },
    normal:{
        fontSize: 14,
    },
    small:{
        fontSize: 12,
    }
})