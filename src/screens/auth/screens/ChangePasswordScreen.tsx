import {StyleSheet, View} from 'react-native';
import {CustomInput} from '../../../components/molecules';
import {faArrowRotateBack, faLock} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import themes from '../../../themes/themes';
import {CustomImage, CustomText} from '../../../components/atoms';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {langText} from '../../../utils/Utils';
import {IMAGE_AUTH_BACKGROUND} from '../../../constants/AppConstants';
import {TextButton} from '../../../components/molecules/buttons';

const ChangePasswordScreen = () => {
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const navigation = useNavigation<NavigationProp<any>>();

  const onChangePasswordPressed = () => {
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
          {langText('changePass_title')}
        </CustomText>
        <CustomInput
          marginBottom={12}
          onChangeText={setPassword}
          placeholder={langText('edPass')}
          icon={faLock}
        />
        <CustomInput
          marginBottom={20}
          onChangeText={setConfirmPassword}
          placeholder={langText('edConPass')}
          icon={faLock}
        />

        <TextButton
          type="primary"
          onPressed={onChangePasswordPressed}
          marginBottom={20}>
          {langText('buttonChangePass')}
        </TextButton>
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
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 7,
    marginTop: '30%',
    marginHorizontal: 16,
  },
});
