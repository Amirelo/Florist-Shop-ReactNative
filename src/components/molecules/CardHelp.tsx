import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { CustomText } from "../atoms"
import { StyleSheet, View, ViewStyle } from "react-native"
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons"
import themes from "../../themes/themes"

interface Props{
    marginTop?: number,
    marginBottom?:number,
}

const CardHelp = (props: Props) => {
    return (
        <View style={[styles.view, {marginTop: props.marginTop, marginBottom: props.marginBottom}] as ViewStyle}>
            <View>
                <CustomText type="big" color={'#ffffff'}>Need help?</CustomText>
                <CustomText type="subTitle" color={'#ffffff'}>Make an appointment or chat with us.</CustomText>
            </View>

            <FontAwesomeIcon color="white" size={39} icon={faCalendarDays} />
        </View>
    )
}

export default CardHelp

const styles = StyleSheet.create({
    view: {
        backgroundColor: themes['defaultTheme'].primaryColor,
        borderRadius: 7,
        borderBottomLeftRadius: 0,
        paddingHorizontal: 20,
        paddingVertical: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})