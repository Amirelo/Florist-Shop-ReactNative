import React from "react"
import { ColorValue, StyleSheet, Text, TextStyle } from "react-native"

interface Props{
    title: String,
    color: ColorValue,
    type: keyof typeof styles
}

const CustomText = (props: Props) => {
    return <Text style={[{color: props.color}, props.type] as TextStyle}>{props.title}</Text>
}

export default CustomText;

const styles = StyleSheet.create({
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