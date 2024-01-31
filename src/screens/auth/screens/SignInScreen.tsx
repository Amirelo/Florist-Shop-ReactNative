import {StyleSheet, View} from 'react-native';
import {CustomInput, OptionsPanel} from '../../../components/molecules';
import {faEnvelope, faLock} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import themes from '../../../themes/themes';
import {
  CustomButton,
  CustomImage,
  CustomText,
  ItemRow,
} from '../../../components/atoms';
import {useDispatch, useSelector} from 'react-redux';
import {authorizeLogin} from '../../../redux/actions/LoginAction';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import lang from '../../../language/lang';
import {changeLanguage} from '../../../redux/actions/PreferenceAction';
import { langText } from '../../../utils/Utils';

const SignInScreen = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [languageOptionActive, setLanguageOptionActive] = React.useState(false);

  const navigation = useNavigation<NavigationProp<any>>();
  const dispatch = useDispatch();

  const langPref: keyof typeof lang = useSelector(
    (store: any) => store.preference.language,
  );

  const onLanguagePressed = () => {
    setLanguageOptionActive(true);
  };

  const onLanguageOptionPressed = (lang: string) => {
    console.log('Option selected');
    dispatch(changeLanguage(lang));
    setLanguageOptionActive(false);
  };

  const checkFields = () => {
    const status = email.length > 0 && password.length > 0 ? true : false;
    return status;
  };

  const onSignUpPressed = () => {
    navigation.navigate('SignUp');
  };

  const onForgotPasswordPressed = () => {
    navigation.navigate('ChangePass');
  };

  const checkAccount = () => {
    const status =
      email == 'admin@gmail.com' && password == '123' ? true : false;
    return status;
  };

  const handleLogin = () => {
    checkFields()
      ? checkAccount()
        ? [console.log('Login Successful'), dispatch(authorizeLogin())]
        : console.log('Invalid username or password')
      : console.log('Fields cannot be empty');
  };

  return (
    <View style={styles.view}>
      <View style={{position: 'absolute', width: '100%', height: '100%'}}>
        
        <CustomImage
          type="background"
          resizeMode='cover'
          source="https://images.pexels.com/photos/2879820/pexels-photo-2879820.jpeg"
        />
      </View>

      <View style={styles.body}>
        <ItemRow marginBottom={30}>
          <CustomText type="title">{langText('signin_title')}</CustomText>

          <CustomButton onPressed={onLanguagePressed}>
            <CustomText type="subTitle">{`Language: ` + langPref}</CustomText>
          </CustomButton>
        </ItemRow>
        <CustomInput
          marginBottom={12}
          onChangeText={setEmail}
          placeholder={langText('edEmail')}
          icon={faEnvelope}
        />
        <CustomInput
          marginBottom={20}
          onChangeText={setPassword}
          placeholder={langText('edPass')}
          icon={faLock}
        />

        <CustomButton onPressed={onForgotPasswordPressed}>
          <CustomText marginBottom={20}>
            {langText('signin_forgot')}
          </CustomText>
        </CustomButton>

        <CustomButton onPressed={handleLogin} style={styles.orderButton}>
          <CustomText color={'white'}>{langText('buttonLogin')}</CustomText>
        </CustomButton>

        <CustomButton onPressed={onSignUpPressed}>
          <CustomText type="subTitle">
            {langText('signin_no_account')}
          </CustomText>
        </CustomButton>
      </View>
      {languageOptionActive ? (
        <OptionsPanel setActive={setLanguageOptionActive} title="Language">
          <CustomButton onPressed={() => onLanguageOptionPressed('vn')}>
            <CustomText marginBottom={20}>Vietnamese</CustomText>
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

export default SignInScreen;

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  orderButton: {
    marginBottom: 20,
    height: 48,
    borderRadius: 7,
    backgroundColor: themes['defaultTheme'].primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    justifyContent: 'center',
    backgroundColor: '#ffffff99',
    padding: 16,
    borderRadius: 7,
    marginTop: '30%',
    marginHorizontal: 16,
  },
});
