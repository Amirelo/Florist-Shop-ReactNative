import React from "react"
import { Button, Pressable, StyleSheet } from "react-native"

interface Props{
    onPressed?(): void,
    children: any,
    style: any
}

const CustomButton = (props: Props) => {
    return (
        <Pressable style={props.style} onPress={props.onPressed}>{props.children}</Pressable>
    )
}

export default CustomButton