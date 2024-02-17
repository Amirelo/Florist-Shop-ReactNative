import {StyleSheet, View} from 'react-native';
import {CustomButton, CustomText} from '../../../components/atoms';
import {OptionsPanel} from '../../../components/molecules';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {changeLanguage, changeTheme} from '../../../redux/actions/PreferenceAction';
import lang from '../../../language/lang';
import themes from '../../../themes/themes';
import {TextButton} from '../../../components/molecules/buttons';

const SettingScreen = () => {
  // Initial
  const dispatch = useDispatch();

  // Fields
  const [languageOptionActive, setLanguageOptionActive] = React.useState(false);
  const [themeOptionActive, setThemeOptionActive] = React.useState(false);

  // Get current language
  const langPref: keyof typeof lang = useSelector(
    (store: any) => store.preference.language,
  );

  const themePref: keyof typeof themes = useSelector((store:any) => store.preference.theme)

  // Open change language panel
  const onLanguagePressed = () => {
    setLanguageOptionActive(true);
  };

  // Change language by option
  const onLanguageOptionPressed = (lang: string) => {
    console.log('Language option selected:', lang);
    dispatch(changeLanguage(lang));
    setLanguageOptionActive(false);
  };

  // Open change theme panel
  const onThemePressed = () => {
    setThemeOptionActive(true)
  }

  // Change theme by option
  const onthemeOptionPressed = (theme:string) => {
    console.log('Theme option selected:', theme)
    dispatch(changeTheme(theme))
    setThemeOptionActive(false)
  }

  return (
    <View style={styles.view}>
      <View style={styles.body}>
        <TextButton type="tertiary" marginBottom={20} onPressed={onLanguagePressed}>
          {`Language: ` + langPref}
        </TextButton>
        <TextButton type="tertiary" onPressed={onThemePressed}>
          {`Theme: ` + themePref}
        </TextButton>
      </View>
      {languageOptionActive ? (
        <OptionsPanel setActive={setLanguageOptionActive} title="Language">
          <CustomButton onPressed={() => onLanguageOptionPressed('vn')}>
            <CustomText marginBottom={20}>Tiếng Việt</CustomText>
          </CustomButton>
          <CustomButton onPressed={() => onLanguageOptionPressed('en')}>
            <CustomText marginBottom={20}>English</CustomText>
          </CustomButton>
        </OptionsPanel>
      ) : (
        <></>
      )}

{themeOptionActive ? (
        <OptionsPanel setActive={setThemeOptionActive} title="Language">
          <CustomButton onPressed={() => onthemeOptionPressed('defaultTheme')}>
            <CustomText marginBottom={20}>Default</CustomText>
          </CustomButton>
          <CustomButton onPressed={() => onthemeOptionPressed('dark')}>
            <CustomText marginBottom={20}>Dark Theme</CustomText>
          </CustomButton>
        </OptionsPanel>
      ) : (
        <></>
      )}
    </View>
  );
};
export default SettingScreen;

const styles = StyleSheet.create({
  view: {
    height: '100%',
  },
  body: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 7,
    marginHorizontal: 16,
    marginTop: 20,
  },
});
