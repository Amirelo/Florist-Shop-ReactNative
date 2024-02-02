import {StyleSheet, View} from 'react-native';
import {CustomButton, CustomText} from '../../../components/atoms';
import {OptionsPanel} from '../../../components/molecules';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {changeLanguage} from '../../../redux/actions/PreferenceAction';
import lang from '../../../language/lang';
import themes from '../../../themes/themes';

const SettingScreen = () => {
  // Initial
  const dispatch = useDispatch();

  // Fields
  const [languageOptionActive, setLanguageOptionActive] = React.useState(false);

  // Get current language
  const langPref: keyof typeof lang = useSelector(
    (store: any) => store.preference.language,
  );

  // Open change language panel
  const onLanguagePressed = () => {
    setLanguageOptionActive(true);
  };

  // Change language by option
  const onLanguageOptionPressed = (lang: string) => {
    console.log('Option selected');
    dispatch(changeLanguage(lang));
    setLanguageOptionActive(false);
  };

  return (
    <View style={styles.view}>
      <View style={styles.body}>
        <CustomButton onPressed={onLanguagePressed}>
          <CustomText type="subTitle">{`Language: ` + langPref}</CustomText>
        </CustomButton>
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
    </View>
  );
};
export default SettingScreen;

const styles = StyleSheet.create({
  view: {
    height:'100%',
  },
  couponButton: {
    marginTop: 20,
    marginBottom: 20,
    height: 48,
    borderWidth: 1,
    borderRadius: 7,
    backgroundColor: 'white',
    borderColor: themes['defaultTheme'].textSecondaryColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 7,
    marginTop: '30%',
    marginHorizontal: 16,
  },
});
