import { StyleSheet, View } from "react-native"
import { CustomText, ItemRow } from "../../../components/atoms";

const AboutUsScreen = () => {
    return (
        <View style={styles.view}>
            <ItemRow marginBottom={12}>
                <CustomText type="subTitle">Creator:</CustomText>
                <CustomText type="subTitle">Trần Vũ Minh Đăng</CustomText>
            </ItemRow>

            <ItemRow marginBottom={12}>
                <CustomText type="subTitle">Undergraduate from:</CustomText>
                <CustomText type="subTitle">FPT Polytechnic</CustomText>
            </ItemRow>

            <ItemRow marginBottom={12}>
                <CustomText type="subTitle">Phone:</CustomText>
                <CustomText type="subTitle">0582814653</CustomText>
            </ItemRow>

            <ItemRow marginBottom={12}>
                <CustomText type="subTitle">Technologies:</CustomText>
                <CustomText type="subTitle">React Native</CustomText>
            </ItemRow>
        </View>
    )
};

export default AboutUsScreen;

const styles = StyleSheet.create({
    view:{
        paddingHorizontal: 16,
        paddingTop: 30
    }
})