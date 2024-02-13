import React from "react";
import themes from "../../../themes/themes";
import { StyleSheet, View } from "react-native"
import { CustomInput } from "../../../components/molecules";
import { CustomButton, CustomText } from "../../../components/atoms";
import { RouteProp, useRoute } from "@react-navigation/native";
import { AddressModel } from "../../../models";

const AddressEdit = () => {
    const locationHCM = {"1":["Bến Thành", "Bến Nghé", "Đa Kao", "Nguyễn Cư Trinh", "Nguyễn Thái Bình", "Tân Định", "Cô Giang", "Cầu Ông Lãnh", "Phạm Ngũ Lão", "Cầu Kho"],  
    "3": ["1", "2", "3", "4", "5", "9", "10", "11", "12", "13", "14", "Võ Thị Sáu"],  
    "4": ["1", "2", "3", "4", "6", "8", "9", "10", "13", "14", "15", "16", "18"],  
    "5": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14"],  
    "6": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14"],  
    "7": ["Phú Mỹ", "Phú Thuận", "Bình Thuận", "Tân Phong", "Tân Phú", "Tân Hưng", "Tân Kiểng", "Tân Quy", "Tân Thuận Đông", "Tân Thuận Tây"],  
    "8": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16"],  
    "10":["1", "2", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"],  
    "11":["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16"],  
    "12":["An Phú Đông", "Đông Hưng Thuận", "Tân Hưng Thuận", "Hiệp Thành", "Thới An", "Tân Thới Nhất", "Tân Thới Hiệp", "Tân Chánh Hiệp", "Thạnh Lộc", "Thạnh Xuân", "Trung Mỹ Tây"],  
    "Tân Bình":["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"],  
    "Bình Tân":["Hòa Thạnh", "Phú Thạnh", "Hiệp Tân", "Phú Trung", "Phú Thọ Hòa", "Sơn Kỳ", "Tân Quý", "Tân Sơn Nhì", "Tân Thành", "Tân Thới Hòa", "Tây Thạnh"],  
    "Bình Thạnh":["1", "2", "3", "4", "5", "7", "8", "9", "10", "11", "13", "15", "17"],  
    "Tân Phú":["An Lạc", "An Lạc A", "Bình Hưng Hòa", "Bình Hưng Hòa A", "Bình Hưng Hòa B", "Tân Tạo", "Tân Tạo A", "Bình Trị Đông A", "Bình Trị Đông B"],  
    "Gò Vấp":["1", "2", "3", "5", "6", "7", "11", "12", "13", "14", "15", "17", "19", "21", "22", "24", "25", "26", "27", "28"], 
    "Phú Nhuận":["1", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17"]}
  

    // Fields
    const [address, setAddress] = React.useState<AddressModel>();
    
    // Route
    const route = useRoute<RouteProp<any>>();
    
    // Get data from route
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