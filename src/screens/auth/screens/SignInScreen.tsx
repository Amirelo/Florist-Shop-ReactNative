import {StyleSheet, View} from 'react-native';
import {CustomInput} from '../../../components/molecules';
import {faEnvelope, faLock} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import themes from '../../../themes/themes';
import {CustomButton, CustomText} from '../../../components/atoms';
import { useDispatch, useSelector } from 'react-redux';
import { authorizeLogin } from '../../../redux/actions/LoginAction';

const SignInScreen = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

    const dispatch = useDispatch();

    const isLoggedIn = useSelector((store:any) => store.isLoggedIn.isLoggedIn)
    const handleLogin = () => {
        console.log("Login Button pressed")
        dispatch(authorizeLogin())
    }

  return (
    <View style={styles.view}>
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

      <CustomButton onPressed={handleLogin} style={styles.orderButton}>
        <CustomText color={'white'}>Sign In</CustomText>
      </CustomButton>
      <CustomText>{'status: ' + isLoggedIn}</CustomText>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  view: {
    paddingHorizontal: 16,
    paddingTop: 30,
  },
  orderButton: {
    marginBottom: 20,
    height: 48,
    borderRadius: 7,
    backgroundColor: themes['defaultTheme'].primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
