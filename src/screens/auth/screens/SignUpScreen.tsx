import {StyleSheet, View} from 'react-native';
import {CustomInput} from '../../../components/molecules';
import {faAddressCard, faEnvelope, faLock} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import themes from '../../../themes/themes';
import {CustomButton, CustomImage, CustomText} from '../../../components/atoms';
import {useDispatch} from 'react-redux';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import { langText } from '../../../utils/Utils';
import { passwordSignUp } from '../AuthService';
import { IMAGE_AUTH_BACKGROUND } from '../../../constants/AppConstants';
import { TextButton } from '../../../components/molecules/buttons';

const SignUpScreen = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const navigation = useNavigation<NavigationProp<any>>();
  const dispatch = useDispatch();

  // Check if all fields are not empty
  const checkFields = () => {
    const status = email.length > 0 && password.length > 0 && confirmPassword.length >0 && password == confirmPassword? true : false;
    return status;
  };

  // Sign up on press
  const onSignUpPressed = () =>{
    checkFields() ? [passwordSignUp(email, password), 
      //navigation.goBack()
    ] :''
  }

  // Return to SignInScreen on bottom text pressed
  const onGoBackPressed = () => {
    navigation.goBack();
  };


  return (
    <View style={styles.view}>
      <View style={{position: 'absolute', width: '100%', height: '100%'}}>
        <CustomImage
          type="background"
          resizeMode='cover'
          source={IMAGE_AUTH_BACKGROUND}
        />
      </View>
      <View style={styles.body}>
        <CustomText marginBottom={30} type="title">
          {langText('signup_title')}
        </CustomText>
        <CustomInput
          marginBottom={12}
          onChangeText={setEmail}
          placeholder={langText('edEmail')}
          icon={faEnvelope}
        />
        <CustomInput
          marginBottom={12}
          onChangeText={setPassword}
          placeholder={langText('edPass')}
          icon={faLock}
        />
        <CustomInput
          marginBottom={12}
          onChangeText={setConfirmPassword}
          placeholder={langText('edConPass')}
          icon={faLock}
        />

        <TextButton marginBottom={20} type='primary' onPressed={onGoBackPressed}>{langText('buttonSignUp')}</TextButton>

        <TextButton fontSize='subTitle'>{langText('signup_have_account')}</TextButton>
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
