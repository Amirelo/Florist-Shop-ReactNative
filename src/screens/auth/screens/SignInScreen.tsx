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
import {SignInWithGoogle, checkIsSignIn, passwordLogin} from '../AuthService';
import {IMAGE_AUTH_BACKGROUND} from '../../../constants/AppConstants';
import {SocialButton, TextButton} from '../../../components/molecules/buttons';
import {faGoogle} from '@fortawesome/free-brands-svg-icons';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const SignInScreen = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [languageOptionActive, setLanguageOptionActive] = React.useState(false);

  const navigation = useNavigation<NavigationProp<any>>();
  const dispatch = useDispatch();

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
    console.log('Option selected:', lang);
    dispatch(changeLanguage(lang));
    setLanguageOptionActive(false);
  };

  // Check fields not empty
  const checkFields = () => {
    const status = email.length > 0 && password.length > 0 ? true : false;
    return status;
  };

  // Navigate to sign up
  const onSignUpPressed = () => {
    navigation.navigate('SignUp');
  };

  // Navigate to Verify screen
  const onForgotPasswordPressed = () => {
    navigation.navigate('Verify');
  };

  // Check if user exist (for sign in with email and password)
  const checkAccount = async () => {
    const status: boolean = await passwordLogin(email, password);
    return status;
  };

  // Login if all check pass
  const handleLogin = async () => {
    checkFields()
      ? (await checkAccount())
        ? [console.log('Login Successful'), dispatch(authorizeLogin(email))]
        : console.log('Invalid username or password')
      : console.log('Fields cannot be empty');
  };

  // Sign in with google
  const onGooglePressed = async () => {
    (await SignInWithGoogle())
      ? dispatch(authorizeLogin((await GoogleSignin.signIn()).user.email))
      : console.log('Login failed');
  };

  // Check if user already sign in with google
  const checkSavedUser = async () => {
    (await checkIsSignIn())
      ? dispatch(authorizeLogin((await GoogleSignin.signIn()).user.email))
      : console.log('No user found');
  };

  // Navigate to Home Screen if user found
  React.useEffect(() => {
    checkSavedUser();
  }, []);

  return (
    <View style={styles.view}>
      <View style={{position: 'absolute', width: '100%', height: '100%'}}>
        <CustomImage type="background" source={IMAGE_AUTH_BACKGROUND} />
      </View>

      <View style={styles.body}>
        <ItemRow marginBottom={30}>
          <CustomText type="title">{lang[langPref]['signin_title']}</CustomText>

          <CustomButton onPressed={onLanguagePressed}>
            <CustomText type="subTitle">{`Language: ` + langPref}</CustomText>
          </CustomButton>
        </ItemRow>
        <CustomInput
          marginBottom={12}
          onChangeText={setEmail}
          placeholder={lang[langPref]['edEmail']}
          icon={faEnvelope}
        />
        <CustomInput
          marginBottom={20}
          onChangeText={setPassword}
          placeholder={lang[langPref]['edPass']}
          icon={faLock}
          hidden={true}
        />

        <TextButton marginBottom={20} onPressed={onForgotPasswordPressed}>
          {lang[langPref]['signin_forgot']}
        </TextButton>

        <TextButton type="primary" onPressed={handleLogin} marginBottom={20}>
          {lang[langPref]['buttonLogin']}
        </TextButton>

        <TextButton
          onPressed={onSignUpPressed}
          fontSize="subTitle"
          marginBottom={20}>
          {lang[langPref]['signin_no_account']}
        </TextButton>
        <SocialButton
          icon={faGoogle}
          onPressed={onGooglePressed}
          marginBottom={10}>
          {lang[langPref]['buttonGoogleSignIn']}
        </SocialButton>
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
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 7,
    marginTop: '30%',
    marginHorizontal: 16,
  },
});
