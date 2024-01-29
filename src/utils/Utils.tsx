import { useSelector } from "react-redux";
import lang from "../language/lang";




export const langText = (text: keyof typeof lang['vn']) =>{ 
  const langPref: keyof typeof lang = useSelector(
    (store: any) => store.preference.language,
  );
  const currentLang = lang[langPref]
  return currentLang[text]
}
