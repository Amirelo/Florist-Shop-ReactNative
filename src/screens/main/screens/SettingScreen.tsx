// React and libs
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

// Redux
import {
  changeFontFamily,
  changeFontSize,
  changeLanguage,
  changeTheme,
  resetUserPreference,
} from '../../../redux/actions/PreferenceAction';

// Components
import {
  CustomButton,
  CustomText,
  CustomView,
  ItemRow,
} from '../../../components/atoms';
import {OptionsPanel, QuantityCounter} from '../../../components/molecules';
import {TextButton} from '../../../components/molecules/buttons';

// User Preferences
import lang from '../../../language/lang';
import themes from '../../../themes/themes';

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
  // Get currrent theme
  const themePref: keyof typeof themes = useSelector(
    (store: any) => store.preference.theme,
  );
  // Get currrent font
  const font: string = useSelector((store: any) => store.preference.font);

  // Get currrent font scale
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

  // Change font size
  const onChangeFontSize = (amount: number) => {
    dispatch(changeFontSize(amount));
  };

  // Reset preference to default
  const onResetPressed = () => {
    dispatch(resetUserPreference());
  };

  return (
    <CustomView type="fullscreen">
      <CustomView type="body">
        {/* Language */}
        <CustomText type="title" marginBottom={12}>
          {lang[langPref].text_language}
        </CustomText>
        {/* Button - change language */}
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
        {/* Button - change theme */}
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
        {/* Button - change font */}
        <TextButton type="tertiary" marginBottom={20} onPressed={onFontPressed}>
          {font ? font : 'Font Family'}
        </TextButton>

        {/* Font Size */}
        <ItemRow marginBottom={40}>
          <CustomText type="title">Font Size</CustomText>
          <QuantityCounter
            quantity={fontScale}
            onChanged={(amount: number) => {
              onChangeFontSize(amount);
            }}
            maxQuantity={5}
            minQuantity={-5}
          />
        </ItemRow>

        {/* Reset User Preference */}
        <TextButton type="tertiary" onPressed={onResetPressed}>
          Reset Default
        </TextButton>
      </CustomView>

      {/* Option Panel - Show available Languages */}
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

      {/* Option Panel - Show available Themes */}
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

      {/* Option Panel - Show available Fonts */}
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
