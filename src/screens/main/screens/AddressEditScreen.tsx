import React from "react";
import themes from "../../../themes/themes";
import { StyleSheet, View } from "react-native"
import { CustomInput } from "../../../components/molecules";
import { CustomButton, CustomText } from "../../../components/atoms";
import { RouteProp, useRoute } from "@react-navigation/native";
import { AddressModel } from "../../../models";

const AddressEdit = () => {
    const [address, setAddress] = React.useState<AddressModel>();
    const route = useRoute<RouteProp<any>>();
    React.useEffect(()=>{
        if(route.params?.item){
            setAddress(route.params.item)
        }
    },[])

    return (
    <View style={styles.view}>
        <CustomInput marginBottom={8} placeholder="Street">{address?.street}</CustomInput>
        <CustomInput marginBottom={8} placeholder="Street number">{address?.streetNumber}</CustomInput>
        <CustomInput marginBottom={8} placeholder="District">{address?.district}</CustomInput>
        <CustomInput marginBottom={8} placeholder="Ward">{address?.ward}</CustomInput>
        <CustomInput marginBottom={20} placeholder="City">{address?.city}</CustomInput>
        <CustomButton style={styles.button}>
            <CustomText color={'white'}>Edit Address</CustomText>
        </CustomButton>
    </View>
    )
}

export default AddressEdit;

const styles = StyleSheet.create({
    view:{
        paddingHorizontal: 16
    },
    button:{
        backgroundColor:themes['defaultTheme'].primaryColor,
        alignItems:'center',
        paddingVertical: 16,
        borderRadius:7
    }
})