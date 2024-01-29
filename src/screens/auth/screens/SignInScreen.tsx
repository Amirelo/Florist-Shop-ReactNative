import {StyleSheet, View} from 'react-native';
import {CustomInput} from '../../../components/molecules';
import {faEnvelope, faLock} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import themes from '../../../themes/themes';
import {CustomButton, CustomImage, CustomText} from '../../../components/atoms';
import {useDispatch} from 'react-redux';
import {authorizeLogin} from '../../../redux/actions/LoginAction';
import { NavigationProp, useNavigation } from '@react-navigation/native';

const SignInScreen = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const navigation = useNavigation<NavigationProp<any>>();
  const dispatch = useDispatch();

  const checkFields = () => {
    const status = email.length > 0 && password.length > 0 ? true : false;
    return status;
  };

  const onSignUpPressed = () => {
    navigation.navigate('SignUp')
  }

  const onForgotPasswordPressed = () => {
    navigation.navigate('ChangePass')
  }

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
          type="match_parent"
          source="https://images.pexels.com/photos/2879820/pexels-photo-2879820.jpeg"
        />
      </View>
      <View style={styles.body}>
        <CustomText marginBottom={30} type="title">
          Sign In
        </CustomText>
        <CustomInput
          marginBottom={12}
          onChangeText={setEmail}
          placeholder="Email"
          icon={faEnvelope}
        />
        <CustomInput
          marginBottom={20}
          onChangeText={setPassword}
          placeholder="Password"
          icon={faLock}
        />

        <CustomButton onPressed={onForgotPasswordPressed}>
          <CustomText marginBottom={20}>Forgot Password</CustomText>
        </CustomButton>

        <CustomButton onPressed={handleLogin} style={styles.orderButton}>
          <CustomText color={'white'}>Sign In</CustomText>
        </CustomButton>

        <CustomButton onPressed={onSignUpPressed}>
          <CustomText type="subTitle">
            Don't have an account? Sign Up
          </CustomText>
        </CustomButton>
      </View>
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
