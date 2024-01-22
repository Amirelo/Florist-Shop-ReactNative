import React from "react";
import { Image } from "react-native";

interface Props{
    source: string
}

const CustomImage = (props:Props) => {
    return <Image source={{uri:props.source}}/>
}