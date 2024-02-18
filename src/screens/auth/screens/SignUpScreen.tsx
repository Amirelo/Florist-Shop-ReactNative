import {Image, StyleSheet, View} from 'react-native';
import {CustomInput} from '../../../components/molecules';
import {
  faArrowLeft,
  faBackspace,
  faEnvelope,
  faLock,
} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import themes from '../../../themes/themes';
import {CustomImage, CustomText, CustomView} from '../../../components/atoms';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {passwordSignUp} from '../AuthService';
import {
  IMAGE_AUTH_BACKGROUND,
  NAVIGATION_AUTH_ACTIONCOMPLETE,
} from '../../../constants/AppConstants';
import {ImageButton, TextButton} from '../../../components/molecules/buttons';
import lang from '../../../language/lang';
import {useSelector} from 'react-redux';

const SignUpScreen = () => {
  // Fields
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  // Saved language
  const langPref: keyof typeof lang = useSelector(
    (store: any) => store.preference.language,
  );

  // Navigation
  const navigation = useNavigation<NavigationProp<any>>();

  // Check if all fields are not empty
  const checkFields = () => {
    const status =
      email.length > 0 &&
      password.length > 0 &&
      confirmPassword.length > 0 &&
      password == confirmPassword
        ? true
        : false;
    return status;
  };

  const onBackButtonPressed = () => {
    navigation.goBack();
  };

  // Sign up on press
  const onSignUpPressed = () => {
    checkFields()
      ? [
          passwordSignUp(email, password),
          navigation.navigate(NAVIGATION_AUTH_ACTIONCOMPLETE, {
            title: lang[langPref]['complete_signup_title'],
            description: lang[langPref]['complete_signup_description'],
          }),
        ]
      : '';
  };

  // Return to SignInScreen on bottom text pressed
  const onGoBackPressed = () => {
    navigation.goBack();
  };

  return (
    <CustomView>
      <CustomView type={'backgroundImage'}>
        <CustomImage
          type="background"
          resizeMode="cover"
          source={IMAGE_AUTH_BACKGROUND}
        />
      </CustomView>
      <CustomView type={'authCard'}>
        <CustomView type={'itemRow'} marignBottom={20}>
          <ImageButton icon={faArrowLeft} onPressed={onBackButtonPressed} />
          <CustomText type="title" fontWeight="bold">
            {lang[langPref]['signup_title']}
          </CustomText>
        </CustomView>
        <CustomInput
          marginBottom={12}
          onChangeText={setEmail}
          placeholder={lang[langPref]['edEmail']}
          icon={faEnvelope}
        />
        <CustomInput
          marginBottom={12}
          onChangeText={setPassword}
          placeholder={lang[langPref]['edPass']}
          icon={faLock}
          hidden={true}
        />
        <CustomInput
          marginBottom={20}
          onChangeText={setConfirmPassword}
          placeholder={lang[langPref]['edConPass']}
          icon={faLock}
          hidden={true}
        />

        <TextButton
          marginBottom={20}
          type="primary"
          onPressed={onSignUpPressed}>
          {lang[langPref]['buttonSignUp']}
        </TextButton>

        <TextButton
          onPressed={onGoBackPressed}
          textDecorationLine="underline"
          fontSize="subTitle"
          alignSelf="center"
          marginBottom={20}>
          {lang[langPref]['signup_have_account']}
        </TextButton>
      </CustomView>
    </CustomView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  body: {
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 7,
    marginTop: '30%',
    marginHorizontal: 16,
  },
});
