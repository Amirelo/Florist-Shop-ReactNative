import {StyleSheet, View} from 'react-native';
import {
  CustomButton,
  CustomText,
  CustomView,
  Divider,
} from '../../../components/atoms';
import {OptionsPanel, QuantityCounter} from '../../../components/molecules';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  changeFontFamily,
  changeFontSize,
  changeLanguage,
  changeTheme,
} from '../../../redux/actions/PreferenceAction';
import lang from '../../../language/lang';
import themes from '../../../themes/themes';
import {TextButton} from '../../../components/molecules/buttons';

const SettingScreen = () => {
  // Initial
  const dispatch = useDispatch();

  // Fields
  const [languageOptionActive, setLanguageOptionActive] = React.useState(false);
  const [themeOptionActive, setThemeOptionActive] = React.useState(false);
  const [fontOptionActive, setFontOptionActive] = React.useState(false);

  // Get current language
  const langPref: keyof typeof lang = useSelector(
    (store: any) => store.preference.language,
  );

  const themePref: keyof typeof themes = useSelector(
    (store: any) => store.preference.theme,
  );

  const font: string = useSelector((store: any) => store.preference.font);

  const fontScale: number = useSelector(
    (store: any) => store.preference.fontScale,
  );

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
    setThemeOptionActive(true);
  };

  // Change theme by option
  const onthemeOptionPressed = (theme: string) => {
    console.log('Theme option selected:', theme);
    dispatch(changeTheme(theme));
    setThemeOptionActive(false);
  };

  // Open change theme panel
  const onFontPressed = () => {
    setFontOptionActive(true);
  };

  // Change theme by option
  const onFontOptionPressed = (font: string) => {
    console.log('Theme option selected:', font);
    dispatch(changeFontFamily(font));
    setFontOptionActive(false);
  };

  const onChangeFontSize = (amount: number) => {
    dispatch(changeFontSize(amount));
  };

  return (
    <CustomView type="fullscreen">
      <CustomView type="body">
        {/* Language */}
        <CustomText type="title" marginBottom={12}>
          {lang[langPref].text_language}
        </CustomText>
        <TextButton
          type="tertiary"
          marginBottom={20}
          onPressed={onLanguagePressed}>
          {langPref == 'vn' ? 'Tiếng Việt' : 'English'}
        </TextButton>

        {/* Theme */}
        <CustomText type="title" marginBottom={12}>
          {lang[langPref].text_theme}
        </CustomText>
        <TextButton
          type="tertiary"
          onPressed={onThemePressed}
          marginBottom={20}>
          {themePref == 'defaultTheme'
            ? lang[langPref].theme_default
            : lang[langPref].theme_dark}
        </TextButton>

        {/* Font Family */}
        <CustomText type="title" marginBottom={12}>
          Font Family
        </CustomText>
        <TextButton type="tertiary" marginBottom={20} onPressed={onFontPressed}>
          {font ? font : 'Font Family'}
        </TextButton>

        {/* Font Size */}
        <CustomText type="title" marginBottom={12}>
          Font Size
        </CustomText>
        <QuantityCounter
          quantity={fontScale}
          onChanged={(amount: number) => {
            onChangeFontSize(amount);
          }}
          maxQuantity={5}
          minQuantity={-5}
        />

        <TextButton>Reset Default</TextButton>
      </CustomView>
      {languageOptionActive ? (
        <OptionsPanel setActive={setLanguageOptionActive} title="Language">
          <CustomButton onPressed={() => onLanguageOptionPressed('vn')}>
            <CustomText type="subTitle" marginBottom={20}>
              Tiếng Việt
            </CustomText>
          </CustomButton>
          <CustomButton onPressed={() => onLanguageOptionPressed('en')}>
            <CustomText type="subTitle" marginBottom={20}>
              English
            </CustomText>
          </CustomButton>
        </OptionsPanel>
      ) : (
        <></>
      )}

      {themeOptionActive ? (
        <OptionsPanel setActive={setThemeOptionActive} title="Language">
          <CustomButton onPressed={() => onthemeOptionPressed('defaultTheme')}>
            <CustomText type="subTitle">
              {lang[langPref].theme_default}
            </CustomText>
          </CustomButton>
          <CustomButton onPressed={() => onthemeOptionPressed('dark')}>
            <CustomText type="subTitle">{lang[langPref].theme_dark}</CustomText>
          </CustomButton>
        </OptionsPanel>
      ) : (
        <></>
      )}

      {fontOptionActive ? (
        <OptionsPanel setActive={setThemeOptionActive} title="Language">
          <TextButton onPressed={() => onFontOptionPressed('')}>
            Default
          </TextButton>
          <TextButton onPressed={() => onFontOptionPressed('Inter')}>
            Inter
          </TextButton>
          <TextButton onPressed={() => onFontOptionPressed('DancingScript')}>
            Dancing Script
          </TextButton>
        </OptionsPanel>
      ) : (
        <></>
      )}
    </CustomView>
  );
};
export default SettingScreen;
