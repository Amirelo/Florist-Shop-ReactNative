import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { CustomButton } from "../../atoms";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { StyleSheet } from "react-native";
import themes from "../../../themes/themes";

interface Props{
    icon: IconProp,
    onPressed?(): void,
}

const ImageButton = (props:Props) => {
    return (
        <CustomButton style={styles.view} onPressed={props.onPressed}>
            <FontAwesomeIcon icon={props.icon} color="white"/>
        </CustomButton>
    )
}

export default ImageButton;

const styles = StyleSheet.create({
    view:{
        backgroundColor: themes['defaultTheme'].primaryColor,
        alignSelf:'baseline',
        padding:8,
        borderRadius: 7
    }
})