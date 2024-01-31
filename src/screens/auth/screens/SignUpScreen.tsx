import {StyleSheet, View} from 'react-native';
import {CustomInput} from '../../../components/molecules';
import {faAddressCard, faEnvelope, faLock} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import themes from '../../../themes/themes';
import {CustomButton, CustomImage, CustomText} from '../../../components/atoms';
import {useDispatch} from 'react-redux';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import { langText } from '../../../utils/Utils';

const SignUpScreen = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [fullname, setFullname] = React.useState('');

  const navigation = useNavigation<NavigationProp<any>>();
  const dispatch = useDispatch();

  // Check if all fields are not empty
  const checkFields = () => {
    const status = email.length > 0 && password.length > 0 && confirmPassword.length >0? true : false;
    return status;
  };

  // Return to SignInScreen on bottom text pressed
  const onGoBackPressed = () => {
    navigation.goBack();
  };

  // Sign up on press
  const onSignUpPressed = () =>{
    navigation.goBack();
  }

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

        <CustomInput
          marginBottom={12}
          onChangeText={setFullname}
          placeholder={langText('edFullname')}
          icon={faAddressCard}
        />
        <CustomButton onPressed={onSignUpPressed} style={styles.orderButton}>
          <CustomText color={'white'}>{langText('buttonSignUp')}</CustomText>
        </CustomButton>

        <CustomButton onPressed={onGoBackPressed}>
          <CustomText type="subTitle">
           {langText('signup_have_account')}
          </CustomText>
        </CustomButton>
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
    backgroundColor: '#ffffff99',
    padding: 16,
    borderRadius: 7,
    marginTop: '30%',
    marginHorizontal: 16,
  },
});
