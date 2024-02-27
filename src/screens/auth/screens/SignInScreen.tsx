// React and libs
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {faEnvelope, faLock} from '@fortawesome/free-solid-svg-icons';
import {faGoogle} from '@fortawesome/free-brands-svg-icons';

// Constants
import {
  IMAGE_AUTH_BACKGROUND,
  NAVIGATION_AUTH_SIGNUP,
  NAVIGATION_AUTH_VERIFY,
} from '../../../constants/AppConstants';

// Models
import {UserModel} from '../../../models';

// Services
import {
  SignInWithGoogle,
  checkIsSignIn,
  getUserInfo,
  passwordLogin,
} from '../AuthService';

// Redux
import {authorizeLogin} from '../../../redux/actions/LoginAction';
import {changeLanguage} from '../../../redux/actions/PreferenceAction';

// Components
import {
  CustomButton,
  CustomImage,
  CustomText,
  CustomView,
  ItemRow,
} from '../../../components/atoms';
import {CustomInput, OptionsPanel} from '../../../components/molecules';
import {SocialButton, TextButton} from '../../../components/molecules/buttons';

// User Preferences
import lang from '../../../language/lang';

const SignInScreen = () => {
  // Initial
  const navigation = useNavigation<NavigationProp<any>>();
  const dispatch = useDispatch();

  // Get current language
  const langPref: keyof typeof lang = useSelector(
    (store: any) => store.preference.language,
  );

  // Fields
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [languageOptionActive, setLanguageOptionActive] = React.useState(false);

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

  // Navigate to sign up
  const onSignUpPressed = () => {
    navigation.navigate(NAVIGATION_AUTH_SIGNUP);
  };

  // Navigate to Verify screen
  const onForgotPasswordPressed = () => {
    navigation.navigate(NAVIGATION_AUTH_VERIFY);
  };

  // Check fields not empty
  const checkFields = () => {
    const status = email.length > 0 && password.length > 0 ? true : false;
    return status;
  };

  // Check if user exist (for sign in with email and password)
  const checkAccount = async () => {
    const status: boolean = await passwordLogin(email, password);
    return status;
  };

  // Login if all check pass
  const handleLogin = async () => {
    if (checkFields()) {
      if (await checkAccount()) {
        console.log('Login Successful');
        const userInfo: UserModel =
          (await getUserInfo(email)) ?? new UserModel();
        console.log(userInfo);
        dispatch(authorizeLogin(email, userInfo));
      } else {
        console.log('Invalid username or password');
      }
    } else {
      console.log('Fields cannot be empty');
    }
  };

  // Check if user already sign in with google
  const checkSavedUser = async () => {
    if (await checkIsSignIn()) {
      const currentUser = await GoogleSignin.getCurrentUser();
      console.log('Current user:', currentUser?.user.email);
      const userInfo = await getUserInfo(currentUser!.user.email);
      dispatch(
        authorizeLogin((await GoogleSignin.signIn()).user.email, userInfo!),
      );
    } else {
      console.log('No previous Sign In session');
    }
  };

  // Sign in with google
  const onGooglePressed = async () => {
    const email = await SignInWithGoogle();
    if (email) {
      console.log('Sign in success with email:', email);
      const userInfo = await getUserInfo(email);
      if (userInfo != null) {
        dispatch(
          authorizeLogin((await GoogleSignin.signIn()).user.email, userInfo),
        );
        console.log('Login successful:', userInfo);
      } else {
        GoogleSignin.signOut();
        console.log('Fail to get user info');
      }
    } else {
      console.log('Login failed');
    }
  };

  // Navigate to Home Screen if user found
  React.useEffect(() => {
    checkSavedUser();
  }, []);

  return (
    <CustomView type={'fullscreen'}>
      {/* Background Image */}
      <CustomView type="backgroundImage">
        <CustomImage type="background" source={IMAGE_AUTH_BACKGROUND} />
      </CustomView>

      {/* Authentication Card */}
      <CustomView type="authCard">
        {/* Change Language */}
        <ItemRow marginBottom={30}>
          <CustomText type="title" fontWeight="bold">
            {lang[langPref]['signin_title']}
          </CustomText>
          <CustomButton onPressed={onLanguagePressed}>
            <CustomText type="subTitle">{`Language: ` + langPref}</CustomText>
          </CustomButton>
        </ItemRow>

        {/* Input - Email */}
        <CustomInput
          marginBottom={12}
          onChangeText={setEmail}
          placeholder={lang[langPref]['edEmail']}
          icon={faEnvelope}
        />

        {/* Input - Password */}
        <CustomInput
          marginBottom={20}
          onChangeText={setPassword}
          placeholder={lang[langPref]['edPass']}
          icon={faLock}
          hidden={true}
        />

        {/* Button: Change Password */}
        <TextButton
          alignSelf="flex-end"
          marginBottom={20}
          fontSize="subTitle"
          onPressed={onForgotPasswordPressed}
          textDecorationLine="underline">
          {lang[langPref]['signin_forgot']}
        </TextButton>

        {/* Button: Sign In */}
        <TextButton type="primary" onPressed={handleLogin} marginBottom={20}>
          {lang[langPref]['buttonLogin']}
        </TextButton>

        {/* Text - Other option */}
        <CustomText marginBottom={20} type="subTitle" alignSelf="center">
          {lang[langPref].signin_other_methods}
        </CustomText>

        {/* Google Sign In */}
        <SocialButton
          icon={faGoogle}
          onPressed={onGooglePressed}
          marginBottom={20}>
          {lang[langPref]['buttonGoogleSignIn']}
        </SocialButton>

        {/* Button: Go to Sign Up */}
        <TextButton
          alignSelf="center"
          textDecorationLine="underline"
          onPressed={onSignUpPressed}
          fontSize="subTitle"
          marginBottom={10}>
          {lang[langPref]['signin_no_account']}
        </TextButton>
      </CustomView>

      {/* Option Panel: change language */}
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
    </CustomView>
  );
};

export default SignInScreen;
