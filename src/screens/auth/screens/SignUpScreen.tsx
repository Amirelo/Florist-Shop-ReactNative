import {StyleSheet, View} from 'react-native';
import {CustomInput} from '../../../components/molecules';
import {faEnvelope, faLock} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import themes from '../../../themes/themes';
import {CustomImage, CustomText} from '../../../components/atoms';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {passwordSignUp} from '../AuthService';
import {IMAGE_AUTH_BACKGROUND} from '../../../constants/AppConstants';
import {TextButton} from '../../../components/molecules/buttons';
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

  // Sign up on press
  const onSignUpPressed = () => {
    checkFields()
      ? [
          passwordSignUp(email, password),
          navigation.navigate('Complete', {
            title: 'Verification email sent',
            description: 'You need to verify email before you can Sign In',
          }),
        ]
      : '';
  };

  // Return to SignInScreen on bottom text pressed
  const onGoBackPressed = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.view}>
      <View style={{position: 'absolute', width: '100%', height: '100%'}}>
        <CustomImage
          type="background"
          resizeMode="cover"
          source={IMAGE_AUTH_BACKGROUND}
        />
      </View>
      <View style={styles.body}>
        <CustomText marginBottom={30} type="title">
          {lang[langPref]['signup_title']}
        </CustomText>
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
          marginBottom={12}
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

        <TextButton onPressed={onGoBackPressed} fontSize="subTitle">
          {lang[langPref]['signup_have_account']}
        </TextButton>
      </View>
    </View>
  );
};

export default SignUpScreen;

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
