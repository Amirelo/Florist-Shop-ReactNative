import {StyleSheet, View} from 'react-native';
import {CustomInput} from '../../../components/molecules';
import {faEnvelope, faLock} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import themes from '../../../themes/themes';
import {CustomButton, CustomImage, CustomText} from '../../../components/atoms';
import {useDispatch} from 'react-redux';
import {authorizeLogin} from '../../../redux/actions/LoginAction';
import { NavigationProp, useNavigation } from '@react-navigation/native';

const ChangePasswordScreen = () => {
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const navigation = useNavigation<NavigationProp<any>>();

  const onChangePasswordPressed = () => {
    navigation.goBack()
  }

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
          Change Password
        </CustomText>
        <CustomInput
          marginBottom={12}
          onChangeText={setPassword}
          placeholder="Password"
          icon={faLock}
        />
        <CustomInput
          marginBottom={20}
          onChangeText={setConfirmPassword}
          placeholder="Confirm Password"
          icon={faLock}
        />

        <CustomButton onPressed={onChangePasswordPressed} style={styles.orderButton}>
          <CustomText color={'white'}>Change Password</CustomText>
        </CustomButton>

      </View>
    </View>
  );
};

export default ChangePasswordScreen;

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
