import { useSelector } from "react-redux";
import lang from "../language/lang";
import { Dimensions } from "react-native";




export const langText = (text: keyof typeof lang['vn']) =>{ 
  const langPref: keyof typeof lang = useSelector(
    (store: any) => store.preference.language,
  );
  const currentLang = lang[langPref]
  return currentLang[text]
}

export const deviceWidth = Dimensions.get('screen').width
export const deviceHeight = Dimensions.get('screen').height