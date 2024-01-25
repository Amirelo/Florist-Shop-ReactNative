import { StyleSheet, View } from "react-native"
import { CustomInput } from "../../../components/molecules";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { useRoute } from "@react-navigation/native";

const UpdateInfoScreen = () => {
    const [title, setTitle] = React.useState('');
    const route = useRoute<any>();
    React.useEffect(()=>{
        if(route.params?.type){
            setTitle(route.params.type)
        }
    },[])

    return (
        <View style={styles.view}>
            <CustomInput marginTop={20} placeholder={title}/>
        </View>
    )
}

export default UpdateInfoScreen;

const styles = StyleSheet.create({
    view:{
        paddingHorizontal: 16
    }
})