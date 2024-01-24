import { StyleSheet, View } from "react-native"
import { CustomInput } from "../../../components/molecules";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const UpdateInfoScreen = () => {
    return (
        <View style={styles.view}>
            <CustomInput icon={faUser} marginTop={20} placeholder="Email"/>
        </View>
    )
}

export default UpdateInfoScreen;

const styles = StyleSheet.create({
    view:{
        paddingHorizontal: 16
    }
})